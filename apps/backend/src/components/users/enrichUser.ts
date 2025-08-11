import fs from "fs/promises";
import { getProfile } from "../../external-api/protokols/methods/kols";
import { awardPoints } from "../points/awardPoints"; // если файл реально так называется — ок
import { PointEventType, POINTS } from "../points/constants"; // см. заметку про нейминг

import { prisma } from "../../prisma";

const EARLY_END = new Date("2025-08-25T23:59:59Z");

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

    const now = new Date();
    const inEarly = now <= EARLY_END;

    // Создаём/обновляем пользователя. baseMultiplier ставим ТОЛЬКО при создании.
    const user = await prisma.user.upsert({
      where: { username },
      update: {
        avatarUrl: data.avatar_url,
        platform: "twitter",
      },
      create: {
        username: data.username,
        avatarUrl: data.avatar_url,
        platform: "twitter",
        baseMultiplier: inEarly ? 2 : 1,
      },
    });

    // Выдаём бейдж (идемпотентно) только в ранний период
    if (inEarly) {
      const badge = await prisma.badge.findUnique({
        where: { slug: "EARLY_BELIEVER" },
        select: { id: true, defaultPriority: true },
      });

      if (badge) {
        await prisma.userBadge.upsert({
          where: { userId_badgeId: { userId: user.id, badgeId: badge.id } },
          update: {
            priority: badge.defaultPriority,
            expiresAt: EARLY_END,
          },
          create: {
            userId: user.id,
            badgeId: badge.id,
            priority: badge.defaultPriority,
            expiresAt: EARLY_END,
          },
        });
      }
    }

    // Регистрационные поинты — идемпотентно
    await awardPoints({
      userId: user.id,
      type: PointEventType.REGISTER,
      basePoints: POINTS[PointEventType.REGISTER],
      idempotencyKey: `register-${user.id}`,
      createdAt: now,
    });

    // Обрабатываем рефералку в транзакции
    if (referralCodeFrom) {
      await prisma.$transaction(async (tx) => {
        const fresh = await tx.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            referredById: true,
            referralCode: true,
            username: true,
          },
        });
        if (!fresh) return;

        if (
          !fresh.referredById &&
          referralCodeFrom !== fresh.referralCode // нельзя сам себя
        ) {
          const referrer = await tx.user.findUnique({
            where: { referralCode: referralCodeFrom },
            select: { id: true, username: true },
          });

          if (referrer && referrer.id !== fresh.id) {
            // фиксируем связь один раз
            await tx.user.update({
              where: { id: fresh.id },
              data: { referredById: referrer.id },
            });

            // Никаких прямых инкрементов earnedPoints — только через события
            await awardPoints({
              userId: referrer.id,
              type: PointEventType.REFERRAL_QUALIFIED,
              basePoints: POINTS[PointEventType.REFERRAL_QUALIFIED],
              idempotencyKey: `referral-${referrer.id}-${fresh.id}`, // уникально на пару
              createdAt: new Date(),
              meta: { refereeId: fresh.id, refereeUsername: fresh.username },
            });

            console.log(
              `🎉 ${fresh.username} referred by ${referrer.username}`
            );
          }
        }
      });
    }

    console.log(`✅ User saved: ${username}`);
  } catch (err: any) {
    const message = err?.response?.data || err?.message || "Unknown error";
    console.error(`❌ Failed: ${username} —`, message);
    // NDJSON-лог: по строке на ошибку
    await fs.appendFile(
      "failed-influencers.ndjson",
      JSON.stringify({
        handle: username,
        error: typeof message === "string" ? message : JSON.stringify(message),
        ts: new Date().toISOString(),
      }) + "\n"
    );
  }
}
