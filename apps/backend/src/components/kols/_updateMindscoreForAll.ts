import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Считаем сумму всех kolScore
  const { totalScore } = await prisma.kOL
    .aggregate({
      _sum: {
        kolScore: true,
      },
    })
    .then((res) => ({
      totalScore: res._sum.kolScore ?? 0,
    }));

  if (totalScore === 0) {
    console.warn("❌ Total kolScore is zero, aborting update.");
    return;
  }

  console.log(`✅ Total kolScore: ${totalScore}`);

  // Обновляем через raw SQL — точнее и быстрее
  const updated = await prisma.$executeRawUnsafe(`
    UPDATE "KOL"
    SET "kolScorePercentFromTotal" = "kolScore"::double precision / ${totalScore}
  `);

  console.log(`✅ Updated ${updated} influencers`);
}

main()
  .catch((e) => {
    console.error("❌ Error updating mindshareNum:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
