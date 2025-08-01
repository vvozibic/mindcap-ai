import { PrismaClient } from "@prisma/client";
import {
  fetchFromProtocols,
  fetchFromTweetScout,
  normalizeInfluencerData,
} from "./_utils";

const prisma = new PrismaClient();

// Укажи сюда ID проекта, к которому нужно привязать всех инфлюенсеров
const PROJECT_ID = "bac45b9f-a371-415f-b10e-115ef61edea2"; // заменишь на нужный

export async function fetchTopKOLs(username: string): Promise<any[]> {
  const result: any[] = [];
  let cursor: string | null = null;
  const limit = 20;

  try {
    while (result.length < 100) {
      const url = new URL(
        `https://public-api.protokols.io/api/v1/project/${username}/top-contributors`
      );
      url.searchParams.set("limit", String(limit));
      if (cursor) url.searchParams.set("cursor", cursor);

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${process.env.PROTOKOLS_API_KEY}`,
        },
      });

      if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);
      const json = await res.json();

      result.push(...json.data);
      cursor = json.pagination?.cursor;
      if (!cursor) break; // достигли конца
    }

    return result.slice(0, 100); // ограничим точно сотней
  } catch (err) {
    console.warn(`Protokols fetch failed for ${username}:`, err);
    return result;
  }
}

// function extractUsername(urlOrHandle: string): string | null {
//   const trimmed = urlOrHandle.trim();
//   const match = trimmed.match(/(?:twitter\.com|x\.com)\/([A-Za-z0-9_]+)/i);
//   if (match) return match[1];
//   if (/^[A-Za-z0-9_]{1,15}$/.test(trimmed)) return trimmed;
//   return null;
// }

export async function syncInfluencersFromList() {
  const users = await fetchTopKOLs("OrderlyNetwork");

  console.log(`🔍 Found ${users.length} influencers to sync`);
  console.log(users.map((u) => u.username).join(", "));

  for (const user of users) {
    const username = user.username;
    if (!username) {
      console.warn(`❌ Invalid input: ${user.username}`);
      continue;
    }

    console.log(`🔍 Syncing ${username}...`);

    const [scoutData, protocolsData] = await Promise.all([
      fetchFromTweetScout(username),
      fetchFromProtocols(username),
    ]);

    if (!scoutData) {
      console.warn(`⚠️ Skipped ${username}, no scout data`);
      continue;
    }

    const data = normalizeInfluencerData({
      username,
      scoutData,
      protocolsData,
    });

    const influencer = await prisma.influencer.upsert({
      where: { username },
      update: data,
      create: data,
    });

    await prisma.influencerToProtokolsProject.upsert({
      where: {
        influencerId_projectId: {
          influencerId: influencer.id,
          projectId: PROJECT_ID,
        },
      },
      update: {}, // ничего не обновляем, просто ensure связь
      create: {
        influencerId: influencer.id,
        projectId: PROJECT_ID,
      },
    });

    console.log(`✅ Linked: ${username} → project ${PROJECT_ID}`);
    await new Promise((r) => setTimeout(r, 1000)); // avoid rate limits
  }
}

syncInfluencersFromList()
  .then(() => console.log("🎉 Done"))
  .catch(console.error);
