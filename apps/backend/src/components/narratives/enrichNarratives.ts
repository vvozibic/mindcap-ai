// scripts/enrichNarratives.ts
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

const BASE_URL = "https://public-api.protokols.io/api/v1/narratives";

async function enrichNarratives() {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${process.env.PROTOKOLS_API_KEY}`,
      },
    });

    const { data: narratives } = await res.json();

    console.log(narratives);

    if (!Array.isArray(narratives)) {
      throw new Error("Invalid narratives list");
    }

    for (const base of narratives) {
      const detailRes = await fetch(`${BASE_URL}/${base.slug}`, {
        headers: {
          Authorization: `Bearer ${process.env.PROTOKOLS_API_KEY}`,
        },
      });

      const { data } = await detailRes.json();

      if (!data) continue;

      await prisma.narrative.upsert({
        where: { narrativeId: data.narrative_id },
        update: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          projectCount: data.project_count,
          totalViews: data.total_views,
          totalPosts: data.total_posts,
          marketCapUsd: data.market_cap.total_market_cap_usd,
          marketCapChange24h: data.market_cap.change_24h,
          marketCapChange7d: data.market_cap.change_7d,
          marketCapChange30d: data.market_cap.change_30d,
          marketCapChange90d: data.market_cap.change_90d,
          mindsharePercent: data.mindshare.mindshare_percent,
          mindshareChange24h: data.mindshare.change_24h,
          mindshareChange7d: data.mindshare.change_7d,
          mindshareChange30d: data.mindshare.change_30d,
          mindshareChange90d: data.mindshare.change_90d,
        },
        create: {
          narrativeId: data.narrative_id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          projectCount: data.project_count,
          totalViews: data.total_views,
          totalPosts: data.total_posts,
          marketCapUsd: data.market_cap.total_market_cap_usd,
          marketCapChange24h: data.market_cap.change_24h,
          marketCapChange7d: data.market_cap.change_7d,
          marketCapChange30d: data.market_cap.change_30d,
          marketCapChange90d: data.market_cap.change_90d,
          mindsharePercent: data.mindshare.mindshare_percent,
          mindshareChange24h: data.mindshare.change_24h,
          mindshareChange7d: data.mindshare.change_7d,
          mindshareChange30d: data.mindshare.change_30d,
          mindshareChange90d: data.mindshare.change_90d,
        },
      });
    }

    console.log("Narratives enriched successfully");
  } catch (error) {
    console.error("Failed to enrich narratives:", error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  enrichNarratives();
}
