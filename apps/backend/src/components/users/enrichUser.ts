import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import { getProfile } from "../../external-api/protokols/methods/kols";
import { awardPoints } from "../points/awardPonts";
import { PointEventType, POINTS } from "../points/constansts";

const prisma = new PrismaClient();

export async function enrichUser(
  screenName: string,
  skipIfExists = true,
  referralCodeFrom?: string
) {
  const username = screenName.toLowerCase();

  try {
    if (skipIfExists) {
      const exists = await prisma.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (exists) {
        console.log(`ℹ️ Already in DB: ${username}`);
        return;
      }
    }

    const stats = await getProfile(username);
    const data = stats?.data;

    if (!data) return;

    const user = await prisma.user.upsert({
      where: { username },
      update: {
        username: data.username,
        avatarUrl: data.avatar_url,
        platform: "twitter",
      },
      create: {
        username: data.username,
        avatarUrl: data.avatar_url,
        platform: "twitter",
      },
    });

    await awardPoints({
      userId: user.id,
      type: PointEventType.REGISTER,
      basePoints: POINTS[PointEventType.REGISTER],
      idempotencyKey: `register-${user.id}`,
      createdAt: new Date(),
    });

    if (
      referralCodeFrom &&
      !user.referredById &&
      referralCodeFrom !== user.referralCode
    ) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: referralCodeFrom },
      });

      if (referrer && referrer.id !== user.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            referredById: referrer.id,
          },
        });

        await prisma.user.update({
          where: { id: referrer.id },
          data: {
            earnedPoints: { increment: 10 },
          },
        });

        await awardPoints({
          userId: referrer.id,
          type: PointEventType.REFERRAL_QUALIFIED,
          basePoints: POINTS[PointEventType.REFERRAL_QUALIFIED],
          idempotencyKey: `referral-${referrer.id}`, // один ключ на реферала
          createdAt: new Date(),
          meta: { refereeId: referrer.id },
        });

        console.log(`🎉 ${user.username} referred by ${referrer.username}`);
      }
    }

    console.log(`✅ User saved: ${username}`);
  } catch (err: any) {
    const message = err?.response?.data || err?.message || "Unknown error";
    console.error(`❌ Failed: ${username} —`, message);

    const failed = {
      handle: username,
      error: typeof message === "string" ? message : JSON.stringify(message),
    };

    await fs.writeFile(
      "failed-influencers.json",
      JSON.stringify([failed], null, 2),
      { flag: "a" }
    );
  }
}
