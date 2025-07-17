import { PrismaClient } from "@prisma/client";
import axios from "axios";
import fs from "fs/promises";
import { retryWithDelay } from "../_retryWithDelay";

const prisma = new PrismaClient();

export type TweetScoutResponse = {
  avatar: string;
  banner: string;
  can_dm: boolean;
  description: string;
  followers_count: number;
  friends_count: number;
  id: string;
  name: string;
  register_date: string;
  screen_name: string;
  tweets_count: number;
  verified: boolean;
};

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

    const data = await retryWithDelay(() =>
      axios
        .get<TweetScoutResponse>(
          `https://api.tweetscout.io/v2/info/${username}`,
          {
            headers: {
              Accept: "application/json",
              ApiKey: process.env.TWEETSCOUT_API_KEY || "",
            },
          }
        )
        .then((res) => res.data)
    );

    await prisma.user.upsert({
      where: { username },
      update: {
        username: data.screen_name,
        avatarUrl: data.avatar,
        platform: "twitter",
      },
      create: {
        username: data.screen_name,
        avatarUrl: data.avatar,
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
