import pLimit from "p-limit";
import { getProjectsInNarrative } from "../../external-api/protokols";
import { logToDb } from "../../external-api/protokols/client";

import { prisma } from "../../prisma";
const limit = pLimit(5);

const fetchedDate = new Date().toISOString().split("T")[0];

export async function enrichProjectsByNarratives() {
  const narratives = await prisma.narrative.findMany();
  console.log(`🔍 Найдено нарративов: ${narratives.length}`);

  await Promise.all(
    narratives.map((narrative) =>
      limit(async () => {
        try {
          const { data: projects } = await getProjectsInNarrative(
            narrative.slug
          );

          for (const p of projects) {
            if (!p.twitter_profile?.id) continue;

            const project = await prisma.project.upsert({
              where: { twitterId: p.twitter_profile.id },
              update: {
                twitterUsername: p.twitter_profile.username,
                twitterDisplayName: p.twitter_profile.display_name,
                twitterAvatarUrl: p.twitter_profile.avatar_url,
                twitterDescription: p.twitter_profile.description,
                twitterDescriptionLink: p.twitter_profile.description_link,
                twitterIsVerified: p.twitter_profile.is_verified,
                twitterGoldBadge: p.twitter_profile.gold_badge,
                twitterLang: p.twitter_profile.lang,

                fetchedAt: new Date(),
              },
              create: {
                twitterId: p.twitter_profile.id,
                twitterUsername: p.twitter_profile.username,
                twitterDisplayName: p.twitter_profile.display_name,
                twitterAvatarUrl: p.twitter_profile.avatar_url,
                twitterDescription: p.twitter_profile.description,
                twitterDescriptionLink: p.twitter_profile.description_link,
                twitterFollowersCount: p.twitter_profile.followers_count,
                twitterFollowingCount: p.twitter_profile.following_count,
                twitterIsVerified: p.twitter_profile.is_verified,
                twitterGoldBadge: p.twitter_profile.gold_badge,
                twitterLang: p.twitter_profile.lang,
                twitterCreatedAt: new Date(
                  p.twitter_profile.profile_created_at
                ),

                mindshare: 0,

                coinSymbol: p.coin.symbol,
                coinMarketCap: p.coin.market_cap,
                coinPrice: p.coin.price,
                coinContractAddress: p.coin.contract_address,
                coinName: p.coin.name,
                coinImageUrl: p.coin.image_url,

                createdAt: new Date(),
                fetchedAt: new Date(),
              },
            });

            await prisma.projectSnapshot.upsert({
              where: {
                projectId_narrativeId_fetchedDate: {
                  projectId: project.id,
                  narrativeId: narrative.id,
                  fetchedDate,
                },
              },
              update: {},
              create: {
                projectId: project.id,
                narrativeId: narrative.id,

                totalViews: p.total_views,
                totalPosts: p.total_posts,

                mindsharePercent: p.mindshare.mindshare_percent,
                mindshareChange24h: p.mindshare.change_24h,
                mindshareChange7d: p.mindshare.change_7d,
                mindshareChange30d: p.mindshare.change_30d,
                mindshareChange90d: p.mindshare.change_90d,

                source: "Protokols",
                updatedBy: "cron",

                fetchedDate,
              },
            });

            await prisma.projectToNarrative.upsert({
              where: {
                narrativeId_projectId: {
                  narrativeId: narrative.id,
                  projectId: project.id,
                },
              },
              update: {
                mindsharePercent: p.mindshare.mindshare_percent,
                mindshareChange24h: p.mindshare.change_24h,
                mindshareChange7d: p.mindshare.change_7d,
                mindshareChange30d: p.mindshare.change_30d,
                mindshareChange90d: p.mindshare.change_90d,

                totalViews: p.total_views,
                totalPosts: p.total_posts,
              },
              create: {
                narrativeId: narrative.id,
                projectId: project.id,

                mindsharePercent: p.mindshare.mindshare_percent,
                mindshareChange24h: p.mindshare.change_24h,
                mindshareChange7d: p.mindshare.change_7d,
                mindshareChange30d: p.mindshare.change_30d,
                mindshareChange90d: p.mindshare.change_90d,

                totalViews: p.total_views,
                totalPosts: p.total_posts,
              },
            });
          }

          console.log(
            `✅ Нарратив ${narrative.slug}: ${projects.length} проектов`
          );
          // await logToDb("SUCCESS", `Projects from ${narrative.slug} enriched`);
        } catch (err: any) {
          console.error(`❌ Ошибка обогащения ${narrative.slug}:`, err.message);
          await logToDb(
            "ERROR",
            `Failed to fetch projects for ${narrative.slug}: ${err.message}`
          );
        }
      })
    )
  );

  // 🔄 Пересчёт общего mindshare по всем проектам
  // сначала собираются все projectToNarrative со связями и мапятся в Record<projectId, total>, а затем всё обновляется через Promise.all
  const links = await prisma.projectToNarrative.findMany({
    include: {
      narrative: true,
    },
  });

  const mindshareMap: Record<string, number> = {};

  for (const link of links) {
    const narrativeShare = link.narrative.mindsharePercent;
    const projectShare = link.mindsharePercent;
    const contribution = (narrativeShare * projectShare) / 100;

    if (!mindshareMap[link.projectId]) {
      mindshareMap[link.projectId] = 0;
    }

    mindshareMap[link.projectId] += contribution;
  }

  const updateLimit = pLimit(10);

  await Promise.all(
    Object.entries(mindshareMap).map(([projectId, totalMindshare]) =>
      updateLimit(() =>
        prisma.project.update({
          where: { id: projectId },
          data: { mindshare: totalMindshare },
        })
      )
    )
  );

  console.log("🎯 Завершено enrichProjectsByNarratives");
}

if (require.main === module) {
  enrichProjectsByNarratives()
    .then(() => {
      console.log("🎉 Sync projects done");
      return prisma.$disconnect();
    })
    .catch((err) => {
      console.error(err);
      prisma.$disconnect();
    });
}
