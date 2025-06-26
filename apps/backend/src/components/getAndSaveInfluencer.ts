import { PrismaClient } from "@prisma/client";
import axios from "axios";
import fs from "fs/promises";
import { retryWithDelay } from "./retryWithDelay";

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

export async function getAndSaveInfluencer(
  screenName: string,
  skipIfExists = true
) {
  const username = screenName.toLowerCase();

  try {
    if (skipIfExists) {
      const exists = await prisma.influencer.findUnique({
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

    await prisma.influencer.upsert({
      where: { username },
      update: {
        name: data.name,
        bio: data.description,
        avatarUrl: data.avatar,
        bannerUrl: data.banner,
        profileUrl: `https://twitter.com/${data.screen_name}`,
        platform: "twitter",
        verified: data.verified,
        tweetsCount: data.tweets_count.toString(),
        followersCount: data.followers_count.toString(),
        followings: data.friends_count.toString(),
        twitterScoutJsonRaw: data,
      },
      create: {
        username,
        name: data.name,
        bio: data.description,
        avatarUrl: data.avatar,
        bannerUrl: data.banner,
        profileUrl: `https://twitter.com/${data.screen_name}`,
        platform: "twitter",
        verified: data.verified,
        tweetsCount: data.tweets_count.toString(),
        followersCount: data.followers_count.toString(),
        followings: data.friends_count.toString(),
        businessAccount: false,
        twitterScoutJsonRaw: data,
      },
    });

    console.log(`✅ Saved: ${username}`);
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
