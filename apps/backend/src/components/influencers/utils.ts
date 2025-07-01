export async function fetchFromTweetScout(username: string) {
  try {
    const res = await fetch(`https://api.tweetscout.io/v2/info/${username}`, {
      headers: {
        Accept: "application/json",
        ApiKey: process.env.TWEETSCOUT_API_KEY || "",
      },
    });

    if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn(`TweetScout fetch failed for ${username}:`, err);
    return null;
  }
}

export async function fetchFromProtocols(username: string) {
  try {
    const res = await fetch(
      `https://public-api.protokols.io/api/v1/profile/${username}/stats?timeframe=30d`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PROTOKOLS_API_KEY}`,
        },
      }
    );

    if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn(`Protokols fetch failed for ${username}:`, err);
    return null;
  }
}

export function normalizeInfluencerData({
  username,
  scoutData,
  protocolsData,
}: {
  username: string;
  scoutData: any;
  protocolsData: any;
}) {
  return {
    // tweetscout
    username,
    name: scoutData?.name,
    bio: scoutData?.description,
    avatarUrl: scoutData?.avatar,
    bannerUrl: scoutData?.banner,
    profileUrl: `https://twitter.com/${scoutData?.screen_name}`,
    platform: "twitter",
    verified: scoutData?.verified,
    tweetsCount: String(scoutData?.tweets_count),
    followersCount: String(scoutData?.followers_count),
    followings: String(scoutData?.friends_count),
    tweetsCountNumeric: scoutData?.tweets_count,
    followersCountNumeric: scoutData?.followers_count,
    followingsNumeric: scoutData?.friends_count,
    businessAccount: false,
    twitterScoutJsonRaw: scoutData,

    // protocols
    kolScore: protocolsData?.kol_score,
    smartFollowers: protocolsData?.smart_followers_count,
    engagementRate: protocolsData?.engagement_rate,
    avgViews: protocolsData?.avg_views,
    avgLikes: protocolsData?.avg_likes,
    totalPosts: protocolsData?.total_posts,
    protokolsJsonRaw: protocolsData,
  };
}
