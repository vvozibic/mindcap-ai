import { PrismaClient } from "@prisma/client";
import {
  getNarrativeDetails,
  getNarrativeList,
} from "../../external-api/protokols";
import { logToDb } from "../../external-api/protokols/client";

const prisma = new PrismaClient();

export async function enrichNarratives() {
  try {
    const { data: narratives } = await getNarrativeList();

    for (const n of narratives) {
      try {
        const { data } = await getNarrativeDetails(n.slug);

        if (!data) {
          await logToDb("SKIP", `No data returned for ${n.slug}`, n.slug);
          continue;
        }

        await prisma.narrative.upsert({
          where: { narrativeId: data.narrative_id },
          update: {
            name: data.name,
            slug: data.slug,
            description: data.description,
            projectCount: data.project_count,
            totalViews: data.total_views,
            totalPosts: data.total_posts,
            totalMarketCapUsd: data.market_cap.total_market_cap_usd,
            marketCapChange24h: data.market_cap.change_24h,
            marketCapChange7d: data.market_cap.change_7d,
            marketCapChange30d: data.market_cap.change_30d,
            marketCapChange90d: data.market_cap.change_90d,
            mindsharePercent: data.mindshare.mindshare_percent,
            mindshareChange24h: data.mindshare.change_24h,
            mindshareChange7d: data.mindshare.change_7d,
            mindshareChange30d: data.mindshare.change_30d,
            mindshareChange90d: data.mindshare.change_90d,
            fetchedAt: new Date(),
          },
          create: {
            narrativeId: data.narrative_id,
            name: data.name,
            slug: data.slug,
            description: data.description,
            projectCount: data.project_count,
            totalViews: data.total_views,
            totalPosts: data.total_posts,
            totalMarketCapUsd: data.market_cap.total_market_cap_usd,
            marketCapChange24h: data.market_cap.change_24h,
            marketCapChange7d: data.market_cap.change_7d,
            marketCapChange30d: data.market_cap.change_30d,
            marketCapChange90d: data.market_cap.change_90d,
            mindsharePercent: data.mindshare.mindshare_percent,
            mindshareChange24h: data.mindshare.change_24h,
            mindshareChange7d: data.mindshare.change_7d,
            mindshareChange30d: data.mindshare.change_30d,
            mindshareChange90d: data.mindshare.change_90d,
            fetchedAt: new Date(),
          },
        });

        await prisma.narrativeSnapshot.create({
          data: {
            narrativeId: data.narrative_id,
            projectCount: data.project_count,
            totalViews: data.total_views,
            totalPosts: data.total_posts,
            totalMarketCapUsd: data.market_cap.total_market_cap_usd,
            marketCapChange24h: data.market_cap.change_24h,
            marketCapChange7d: data.market_cap.change_7d,
            marketCapChange30d: data.market_cap.change_30d,
            marketCapChange90d: data.market_cap.change_90d,
            mindsharePercent: data.mindshare.mindshare_percent,
            mindshareChange24h: data.mindshare.change_24h,
            mindshareChange7d: data.mindshare.change_7d,
            mindshareChange30d: data.mindshare.change_30d,
            mindshareChange90d: data.mindshare.change_90d,
            source: "Protokols",
            updatedBy: "cron",
          },
        });

        console.log(`✅ Synced: ${data.slug}`);
        await logToDb("SUCCESS", `Narrative synced: ${data.slug}`, data.slug);
      } catch (err: any) {
        console.error(`❌ Failed to process ${n.slug}:`, err);
        await logToDb(
          "ERROR",
          `Failed to process narrative ${n.slug}: ${err.message}`,
          n.slug
        );
      }
    }

    console.log("✅ Narratives enrichment complete");
    await logToDb("SUCCESS", `Narratives enrichment complete`);
  } catch (error) {
    console.error("❌ Failed to enrich narratives:", error);
    await logToDb("FATAL", `Failed to enrich narratives: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

enrichNarratives()
  .then(() => {
    console.log("🎉 Sync narratives done");
    return prisma.$disconnect();
  })
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
