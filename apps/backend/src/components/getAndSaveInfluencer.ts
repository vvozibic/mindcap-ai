import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

type TweetScoutResponse = {
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

export async function getAndSaveInfluencer(screenName: string) {
  try {
    const { data } = await axios.get<TweetScoutResponse>(
      `https://api.tweetscout.io/v2/info/${screenName}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWEETSCOUT_API_KEY}`,
        },
      }
    );

    await prisma.influencer.upsert({
      where: { username: data.screen_name },
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
      },
      create: {
        name: data.name,
        username: data.screen_name,
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
      },
    });

    console.log(`✅ Saved influencer: ${data.screen_name}`);
  } catch (err: any) {
    console.error(
      `❌ Failed to fetch/save ${screenName}:`,
      err?.response?.data || err
    );
  }
}
