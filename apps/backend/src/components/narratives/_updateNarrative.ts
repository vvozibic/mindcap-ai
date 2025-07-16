import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateNarratives({
  source = "Protokols",
  updatedBy = "cron",
}) {
  const apiData = await fetchNarrativesFromProtokols();

  for (const n of apiData) {
    const {
      narrative_id,
      name,
      slug,
      description,
      project_count,
      total_views,
      total_posts,
      market_cap,
      mindshare,
    } = n;

    const marketCapData = market_cap || {};
    const mindshareData = mindshare || {};

    const narrative = await prisma.narrative.upsert({
      where: { narrativeId: narrative_id },
      create: {
        narrativeId: narrative_id,
        name,
        slug,
        description,
        projectCount: project_count,
        totalViews: total_views,
        totalPosts: total_posts,
        marketCapUsd: marketCapData.total_market_cap_usd ?? 0,
        marketCapChange24h: marketCapData.change_24h ?? 0,
        marketCapChange7d: marketCapData.change_7d ?? 0,
        marketCapChange30d: marketCapData.change_30d ?? 0,
        marketCapChange90d: marketCapData.change_90d ?? 0,
        mindsharePercent: mindshareData.mindshare_percent ?? 0,
        mindshareChange24h: mindshareData.change_24h ?? 0,
        mindshareChange7d: mindshareData.change_7d ?? 0,
        mindshareChange30d: mindshareData.change_30d ?? 0,
        mindshareChange90d: mindshareData.change_90d ?? 0,
      },
      update: {
        name,
        slug,
        description,
        projectCount: project_count,
        totalViews: total_views,
        totalPosts: total_posts,
        marketCapUsd: marketCapData.total_market_cap_usd ?? 0,
        marketCapChange24h: marketCapData.change_24h ?? 0,
        marketCapChange7d: marketCapData.change_7d ?? 0,
        marketCapChange30d: marketCapData.change_30d ?? 0,
        marketCapChange90d: marketCapData.change_90d ?? 0,
        mindsharePercent: mindshareData.mindshare_percent ?? 0,
        mindshareChange24h: mindshareData.change_24h ?? 0,
        mindshareChange7d: mindshareData.change_7d ?? 0,
        mindshareChange30d: mindshareData.change_30d ?? 0,
        mindshareChange90d: mindshareData.change_90d ?? 0,
        fetchedAt: new Date(),
      },
    });

    await prisma.narrativeSnapshot.create({
      data: {
        narrativeId: narrative.id,
        projectCount: project_count,
        totalViews: total_views,
        totalPosts: total_posts,
        marketCapUsd: marketCapData.total_market_cap_usd ?? 0,
        marketCapChange24h: marketCapData.change_24h ?? 0,
        marketCapChange7d: marketCapData.change_7d ?? 0,
        marketCapChange30d: marketCapData.change_30d ?? 0,
        marketCapChange90d: marketCapData.change_90d ?? 0,
        mindsharePercent: mindshareData.mindshare_percent ?? 0,
        mindshareChange24h: mindshareData.change_24h ?? 0,
        mindshareChange7d: mindshareData.change_7d ?? 0,
        mindshareChange30d: mindshareData.change_30d ?? 0,
        mindshareChange90d: mindshareData.change_90d ?? 0,
        source,
        updatedBy,
      },
    });
  }

  console.log(`✅ Updated ${apiData.length} narratives`);
}
