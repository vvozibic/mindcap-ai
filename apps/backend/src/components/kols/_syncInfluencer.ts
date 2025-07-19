import { PrismaClient } from "@prisma/client";
import { users } from "./_users";
import {
  fetchFromProtocols,
  fetchFromTweetScout,
  normalizeInfluencerData,
} from "./_utils";

const prisma = new PrismaClient();

// Укажи сюда ID проекта, к которому нужно привязать всех инфлюенсеров
const PROJECT_ID = "c0399045-d516-46c8-8c8e-842d24c61439"; // заменишь на нужный

function extractUsername(urlOrHandle: string): string | null {
  const trimmed = urlOrHandle.trim();
  const match = trimmed.match(/(?:twitter\.com|x\.com)\/([A-Za-z0-9_]+)/i);
  if (match) return match[1];
  if (/^[A-Za-z0-9_]{1,15}$/.test(trimmed)) return trimmed;
  return null;
}

export async function syncInfluencersFromList(rawList: string[]) {
  for (const raw of rawList) {
    const username = extractUsername(raw);
    if (!username) {
      console.warn(`❌ Invalid input: ${raw}`);
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

syncInfluencersFromList(users)
  .then(() => console.log("🎉 Done"))
  .catch(console.error);
