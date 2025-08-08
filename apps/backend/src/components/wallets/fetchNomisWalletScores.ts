import { PrismaClient, Wallet } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

const NOMIS_API_KEY = process.env.NOMIS_API_KEY!;
const NOMIS_CLIENT_ID = process.env.NOMIS_CLIENT_ID!;
const NOMIS_API_URL = "https://api.nomis.cc/api/v1/ethereum/wallet";

export async function fetchNomisWalletScore(w: Wallet) {
  try {
    const res = await fetch(`${NOMIS_API_URL}/${w.address}/score`, {
      headers: {
        "X-API-Key": NOMIS_API_KEY,
        "X-ClientId": NOMIS_CLIENT_ID,
      },
    });

    if (!res.ok) {
      console.warn(`❌ Nomis API error for ${w.address}: ${res.status}`);
      return;
    }

    const data = (await res.json()) as { data: { score: number } };
    if (!data || typeof data.data.score !== "number") {
      console.warn(`❌ Invalid Nomis response for ${w.address}`);
      return;
    }

    await prisma.wallet.update({
      where: { id: w.id },
      data: {
        nomisWalletScore: data.data.score,
        nomisWalletScoreFetchedAt: new Date(),
      },
    });

    console.log(`✅ Updated NomisScore for ${w.address}: ${data.data.score}`);
  } catch (err) {
    console.error(`⚠️ Failed to fetch NomisScore for ${w.address}:`, err);
  }
}

export async function fetchNomisWalletScores() {
  const wallets = await prisma.wallet.findMany({
    where: {
      chain: { in: ["eip155:1"] },
      OR: [
        { nomisWalletScoreFetchedAt: null },
        {
          nomisWalletScoreFetchedAt: {
            lt: new Date(Date.now() - 24 * 3600 * 1000),
          },
        },
      ],
    },
    take: 50, // Ограничим батч
  });

  for (const w of wallets) {
    await fetchNomisWalletScore(w);
  }
}

if (require.main === module) {
  fetchNomisWalletScores()
    .then(() => {
      console.log("🎉 Nomis wallets score update done");
      return prisma.$disconnect();
    })
    .catch((err) => {
      console.error(err);
      prisma.$disconnect();
    });
}
