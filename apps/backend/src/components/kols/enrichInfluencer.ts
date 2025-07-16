import { PrismaClient } from "@prisma/client";
import {
  fetchFromProtocols,
  fetchFromTweetScout,
  normalizeInfluencerData,
} from "./utils";

const prisma = new PrismaClient();

export async function enrichInfluencer(username: string) {
  const scout = await fetchFromTweetScout(username);

  const protocols = await fetchFromProtocols(username);

  const data = normalizeInfluencerData({
    username,
    scoutData: scout,
    protocolsData: protocols,
  });

  await prisma.influencer.upsert({
    where: { username },
    update: data,
    create: data,
  });

  console.log(`✅ Succescfully enrich: ${username}`);
}
