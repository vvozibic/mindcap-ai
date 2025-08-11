import pLimit from "p-limit";
import { logToDb } from "../../external-api/protokols/client";
import { getProfileStats } from "../../external-api/protokols/methods/kols";

import { prisma } from "../../prisma";
const limit = pLimit(20);
const fetchedDate = new Date().toISOString().split("T")[0];

export async function enrichKOLStats() {
  const kols = await prisma.kOL.findMany({
    where: {
      kolScore: null,
    },
    select: {
      id: true,
      twitterId: true,
      twitterUsername: true,
    },
  });

  console.log(`🔁 Вторая волна: обновление ${kols.length} KOL'ов`);

  await Promise.all(
    kols.map((kol) =>
      limit(async () => {
        try {
          const stats = await getProfileStats(kol.twitterId);
          const data = stats?.data;
          if (!data) return;

          // ⬇️ Обновление глобальных полей KOL
          await prisma.$transaction([
            prisma.kOL.update({
              where: { id: kol.id },
              data: {
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
                totalOrganicInteractions: BigInt(
                  data.total_organic_interactions
                ),
                totalAccountPosts: data.total_account_posts,
                totalAccountViews: BigInt(data.total_account_views),
                totalAccountInteractions: BigInt(
                  data.total_account_interactions
                ),
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
            prisma.kOLSnapshot.upsert({
              where: {
                kolId_fetchedDate: {
                  kolId: kol.id,
                  fetchedDate,
                },
              },
              update: {},
              create: {
                kolId: kol.id,
                fetchedDate,
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
                totalOrganicInteractions: BigInt(
                  data.total_organic_interactions
                ),
                totalAccountPosts: data.total_account_posts,
                totalAccountViews: BigInt(data.total_account_views),
                totalAccountInteractions: BigInt(
                  data.total_account_interactions
                ),
                totalAccountComments: data.total_account_comments,
                totalAccountLikes: data.total_account_likes,
                totalAccountRetweets: data.total_account_retweets,
                totalAccountReplies: data.total_account_replies,
                totalPostsChange: data.total_posts_change,
                totalViewsChange: data.total_views_change,
                totalInteractionsChange: data.total_interactions_change,
              },
            }),
          ]);

          console.log(`✅ Обновлён KOL: ${kol.twitterUsername}`);
        } catch (err: any) {
          console.error(
            `❌ Ошибка при обновлении ${kol.twitterUsername}:`,
            err.message
          );
          await logToDb(
            "ERROR",
            `Failed to enrich ${kol.twitterUsername}: ${err.message}`
          );
        }
      })
    )
  );

  console.log("🎯 Завершена enrichKOLStats");
}

if (require.main === module) {
  enrichKOLStats()
    .then(() => {
      console.log("🎉 Вторая волна завершена");
      return prisma.$disconnect();
    })
    .catch((err) => {
      console.error(err);
      prisma.$disconnect();
    });
}
