import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function safeParseInt(value: string | null | undefined): number | null {
  const n = parseInt(value ?? "", 10);
  return isNaN(n) ? null : n;
}

async function migrate() {
  const influencers = await prisma.influencer.findMany({
    where: {
      OR: [
        { tweetsCountNumeric: 0 },
        { followersCountNumeric: 0 },
        { followingsNumeric: 0 },
      ],
    },
  });

  for (const inf of influencers) {
    await prisma.influencer.update({
      where: { id: inf.id },
      data: {
        tweetsCountNumeric: safeParseInt(inf.tweetsCount),
        followersCountNumeric: safeParseInt(inf.followersCount),
        followingsNumeric: safeParseInt(inf.followings),
      },
    });
  }

  console.log(`✅ Migrated ${influencers.length} influencers`);
  await prisma.$disconnect();
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
