import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import { getProfile } from "../../external-api/protokols/methods/kols";

const prisma = new PrismaClient();

export async function enrichUser(screenName: string, skipIfExists = true) {
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

    await prisma.user.upsert({
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
