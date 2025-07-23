import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const { totalScore } = await prisma.kOL
    .aggregate({
      _sum: {
        kolScore: true,
      },
      where: {
        hidden: false,
      },
    })
    .then((res) => ({
      totalScore: res._sum.kolScore ?? 0,
    }));

  if (totalScore === 0) {
    console.warn("❌ Total kolScore is zero, aborting update.");
    return;
  }

  console.log(`✅ Total kolScore (visible only): ${totalScore}`);

  const updated = await prisma.$executeRawUnsafe(`
    UPDATE "KOL"
    SET "kolScorePercentFromTotal" = ("kolScore"::double precision / ${totalScore}) * 100
    WHERE "hidden" = false
  `);

  console.log(`✅ Updated ${updated} visible influencers`);
}

main()
  .catch((e) => {
    console.error("❌ Error updating kolScorePercentFromTotal:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
