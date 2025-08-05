import { PrismaClient, Wallet } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();
const RUBY_API_KEY = process.env.RUBYSCORE_API_KEY!;
const RUBY_API_URL = "https://rubyscore.io/public_api/data/score";

export async function fetchRubyWalletScore(w: Wallet) {
  try {
    const res = await fetch(`${RUBY_API_URL}?wallet=${w.address}`, {
      headers: { "x-api-key": RUBY_API_KEY },
    });

    if (!res.ok) {
      console.warn(`❌ RubyScore error for ${w.address}: ${res.status}`);
    }

    const data = (await res.json()) as { ok: boolean; result: number };
    if (!data.ok) {
      console.warn(`❌ Invalid response for ${w.address}`);
    }

    await prisma.wallet.update({
      where: { id: w.id },
      data: {
        rubyWalletScore: data.result,
        rubyWalletScoreFetchedAt: new Date(),
      },
    });

    console.log(`✅ Updated RubyScore for ${w.address}: ${data.result}`);
  } catch (err) {
    console.error(`⚠️ Failed to fetch RubyScore for ${w.address}:`, err);
  }
}

export async function fetchRubyWalletScores() {
  // Берем все EVM кошельки, у которых score старый или отсутствует
  const wallets = await prisma.wallet.findMany({
    where: {
      chain: { in: ["eip155:1"] },
      OR: [
        { rubyWalletScoreFetchedAt: null },
        {
          rubyWalletScoreFetchedAt: {
            lt: new Date(Date.now() - 24 * 3600 * 1000),
          },
        },
      ],
    },
    take: 50, // ограничиваем батч, чтобы не упереться в лимиты API
  });

  for (const w of wallets) {
    try {
      const res = await fetch(`${RUBY_API_URL}?wallet=${w.address}`, {
        headers: { "x-api-key": RUBY_API_KEY },
      });

      if (!res.ok) {
        console.warn(`❌ RubyScore error for ${w.address}: ${res.status}`);
        continue;
      }

      const data = (await res.json()) as { ok: boolean; result: number };
      if (!data.ok) {
        console.warn(`❌ Invalid response for ${w.address}`);
        continue;
      }

      await prisma.wallet.update({
        where: { id: w.id },
        data: {
          rubyWalletScore: data.result,
          rubyWalletScoreFetchedAt: new Date(),
        },
      });

      console.log(`✅ Updated RubyScore for ${w.address}: ${data.result}`);
    } catch (err) {
      console.error(`⚠️ Failed to fetch RubyScore for ${w.address}:`, err);
    }
  }
}

if (require.main === module) {
  fetchRubyWalletScores()
    .then(() => {
      console.log("🎉 Ruby wallets score update done");
      return prisma.$disconnect();
    })
    .catch((err) => {
      console.error(err);
      prisma.$disconnect();
    });
}
