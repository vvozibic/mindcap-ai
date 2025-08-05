import { PrismaClient } from "@prisma/client";
import { logToDb } from "../../external-api/protokols/client";
import {
  getProfile,
  getProfileStats,
} from "../../external-api/protokols/methods/kols";

const prisma = new PrismaClient();

export async function updateKOLByUsername(username: string) {
  try {
    const { data: profile } = await getProfile(username);
    const stats = await getProfileStats(username);
    const data = stats?.data;
    if (!data) return;

    // ⬇️ Обновление глобальных полей KOL
    const kol = await prisma.$transaction([
      prisma.kOL.upsert({
        where: { twitterUsername: username },
        create: {
          twitterId: profile.id,
          twitterUsername: profile.username,
          twitterDisplayName: profile.display_name,
          twitterAvatarUrl: profile.avatar_url,
          twitterDescription: profile.description,
          twitterFollowersCount: profile.followers_count,
          twitterFollowingCount: profile.following_count,
          twitterIsVerified: profile.is_verified,
          twitterLang: profile.lang || "en",
          twitterGoldBadge: profile.gold_badge ?? false,
          twitterCreatedAt: new Date(profile.profile_created_at),
          hidden: false,
          kolScore: data.kol_score,
          smartFollowersCount: data.smart_followers_count,
          followersChange: data.followers_change,
          smartEngagement: data.smart_engagement,
          smartEngagementChange: data.smart_engagement_change,
          engagementRate: data.engagement_rate,
          avgViews: data.avg_views,
          avgLikes: data.avg_likes,
          threadsCount: data.threads_count,
          totalPosts: data.total_posts,
          totalViews: BigInt(data.total_views),
          totalInteractions: BigInt(data.total_interactions),
          totalOrganicPosts: data.total_organic_posts,
          totalOrganicViews: BigInt(data.total_organic_views),
          totalOrganicInteractions: BigInt(data.total_organic_interactions),
          totalAccountPosts: data.total_account_posts,
          totalAccountViews: BigInt(data.total_account_views),
          totalAccountInteractions: BigInt(data.total_account_interactions),
          totalAccountComments: data.total_account_comments,
          totalAccountLikes: data.total_account_likes,
          totalAccountRetweets: data.total_account_retweets,
          totalAccountReplies: data.total_account_replies,
          totalPostsChange: data.total_posts_change,
          totalViewsChange: data.total_views_change,
          totalInteractionsChange: data.total_interactions_change,
          fetchedAt: new Date(),
        },
        update: {
          hidden: false,
          kolScore: data.kol_score,
          smartFollowersCount: data.smart_followers_count,
          followersChange: data.followers_change,
          smartEngagement: data.smart_engagement,
          smartEngagementChange: data.smart_engagement_change,
          engagementRate: data.engagement_rate,
          avgViews: data.avg_views,
          avgLikes: data.avg_likes,
          threadsCount: data.threads_count,
          totalPosts: data.total_posts,
          totalViews: BigInt(data.total_views),
          totalInteractions: BigInt(data.total_interactions),
          totalOrganicPosts: data.total_organic_posts,
          totalOrganicViews: BigInt(data.total_organic_views),
          totalOrganicInteractions: BigInt(data.total_organic_interactions),
          totalAccountPosts: data.total_account_posts,
          totalAccountViews: BigInt(data.total_account_views),
          totalAccountInteractions: BigInt(data.total_account_interactions),
          totalAccountComments: data.total_account_comments,
          totalAccountLikes: data.total_account_likes,
          totalAccountRetweets: data.total_account_retweets,
          totalAccountReplies: data.total_account_replies,
          totalPostsChange: data.total_posts_change,
          totalViewsChange: data.total_views_change,
          totalInteractionsChange: data.total_interactions_change,
          fetchedAt: new Date(),
        },
      }),
    ]);

    console.log(`✅ Обновлён KOL: ${username}`);
    return kol[0];
  } catch (err: any) {
    console.error(`❌ Ошибка при обновлении ${username}:`, err.message);
    await logToDb("ERROR", `Failed to enrich ${username}: ${err.message}`);
  }
}
