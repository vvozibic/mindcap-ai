import pLimit from "p-limit";
import { logToDb } from "../../external-api/protokols/client";
import { getKOLsInProjects } from "../../external-api/protokols/methods/kols";

import { prisma } from "../../prisma";
const limit = pLimit(5);

const usernames = [
  "TollanUniverse",
  "0G_labs",
  "XEN_Crypto",
  "OrderlyNetwork",
  "TrophyHunt_Me",
  "bonk_inu",
];

export async function enrichKOLsFromProjects() {
  const projects = await prisma.project.findMany({
    // where: {
    //   twitterUsername: {
    //     in: usernames,
    //   },
    //   kols: {},
    // },
    orderBy: {
      coinMarketCap: "desc",
    },
  });
  console.log(`🔍 Найдено проектов: ${projects.length}`);

  await Promise.all(
    projects.map((project) =>
      limit(async () => {
        try {
          const { data: kols } = await getKOLsInProjects(project.twitterId);
          console.log(
            `✅ Проект ${project.twitterDisplayName}: ${kols.length} KOLs`
          );

          for (const k of kols) {
            if (!k?.id) continue;

            const kol = await prisma.kOL.upsert({
              where: { twitterId: k.id },
              update: {
                // hidden: false,
                twitterUsername: k.username,
                twitterDisplayName: k.display_name,
                twitterAvatarUrl: k.avatar_url,
                twitterDescription: k.description,
                twitterFollowersCount: k.followers_count,
                twitterFollowingCount: k.following_count,
                twitterIsVerified: k.is_verified,
                twitterLang: k.lang,
                twitterGoldBadge: k.gold_badge,
                twitterCreatedAt: new Date(k.profile_created_at),

                fetchedAt: new Date(),
              },
              create: {
                twitterId: k.id,
                twitterUsername: k.username,
                twitterDisplayName: k.display_name,
                twitterAvatarUrl: k.avatar_url,
                twitterDescription: k.description,
                twitterFollowersCount: k.followers_count,
                twitterFollowingCount: k.following_count,
                twitterIsVerified: k.is_verified,
                twitterLang: k.lang || "en",
                twitterGoldBadge: k.gold_badge ?? false,
                twitterCreatedAt: new Date(k.profile_created_at),
                fetchedAt: new Date(),
              },
            });

            await prisma.kOLToProject.upsert({
              where: {
                kolId_projectId: {
                  kolId: kol.id,
                  projectId: project.id,
                },
              },
              update: {
                totalViews: k.total_views,
                totalPosts: k.total_posts,
                totalInteractions: k.total_interactions,
                totalComments: k.total_comments,
                fetchedAt: new Date(),
              },
              create: {
                kolId: kol.id,
                projectId: project.id,
                totalViews: k.total_views,
                totalPosts: k.total_posts,
                totalInteractions: k.total_interactions,
                totalComments: k.total_comments,
                fetchedAt: new Date(),
              },
            });
          }

          // await logToDb(
          //   "SUCCESS",
          //   `KOLs from ${project.twitterDisplayName} enriched`
          // );
        } catch (err: any) {
          console.error(
            `❌ Ошибка обогащения ${project.twitterDisplayName}:`,
            err.message
          );
          await logToDb(
            "ERROR",
            `Failed to fetch KOLs for ${project.twitterDisplayName}: ${err.message}`
          );
        }
      })
    )
  );

  console.log("🎯 Завершено enrichKOLsFromProjects");
}

if (require.main === module) {
  enrichKOLsFromProjects()
    .then(() => {
      console.log("🎉 Sync KOLs done");
      return prisma.$disconnect();
    })
    .catch((err) => {
      console.error(err);
      prisma.$disconnect();
    });
}
