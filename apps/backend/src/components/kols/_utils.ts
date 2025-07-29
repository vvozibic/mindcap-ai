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

export async function fetchTopKOLs(username: string) {
  try {
    const res = await fetch(
      `https://public-api.protokols.io/api/v1/project/${username}/top-contributors`,
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
  const smartFollowersPercent =
    protocolsData?.smart_followers_count &&
    scoutData?.followers_count &&
    scoutData.followers_count > 0
      ? +(
          (protocolsData.smart_followers_count / scoutData.followers_count) *
          100
        ).toFixed(2)
      : 0;

  return {
    // TweetScout
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
    twitterRegisterDate: scoutData?.register_date || 0,

    // Protokols
    kolScore: protocolsData?.kol_score ?? 0,
    smartFollowers: protocolsData?.smart_followers_count ?? 0,
    smartFollowersPercent,
    engagementRate: protocolsData?.engagement_rate,
    avgViews: protocolsData?.avg_views,
    avgLikes: protocolsData?.avg_likes,
    totalPosts: protocolsData?.total_account_posts,
    totalViews: protocolsData?.total_account_views,
    totalLikes: protocolsData?.total_account_likes,
    totalRetweets: protocolsData?.total_account_retweets,
    totalReplies: protocolsData?.total_account_replies,
    totalComments: protocolsData?.total_account_comments,
    protokolsJsonRaw: protocolsData,
  };
}
