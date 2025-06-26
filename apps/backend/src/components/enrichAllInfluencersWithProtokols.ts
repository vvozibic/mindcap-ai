import { PrismaClient } from "@prisma/client";
import { enrichWithProtokolsData } from "./enrichWithProtokolsData";

const prisma = new PrismaClient();

export async function enrichAllInfluencersWithProtokols() {
  const influencers = await prisma.influencer.findMany({
    select: { username: true },
  });

  for (const [i, { username }] of influencers.entries()) {
    console.log(`(${i + 1}/${influencers.length}) 🧠 Enriching ${username}...`);

    try {
      const data = await enrichWithProtokolsData(username);

      if (!data) continue;

      await prisma.influencer.update({
        where: { username },
        data: {
          kolScore: data.kol_score,
          smartFollowers: data.smart_followers_count,
          engagementRate: data.engagement_rate,
          avgViews: data.avg_views,
          avgLikes: data.avg_likes,
          totalPosts: data.total_posts,
          protokolsJsonRaw: data,
        },
      });

      console.log(`✅ Saved: ${username}`);
    } catch (err: any) {
      console.warn(`❌ Failed: ${username}`, err?.message || err);
    }

    await new Promise((r) => setTimeout(r, 1000)); // rate limit
  }

  await prisma.$disconnect();
}

enrichAllInfluencersWithProtokols()
  .then(() => console.log("🎉 Done"))
  .catch(console.error);
