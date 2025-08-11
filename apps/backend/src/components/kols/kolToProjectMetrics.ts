import { prisma } from "../../prisma";

function log1p(x: number): number {
  return Math.log(1 + x);
}

const BATCH_SIZE = 200;

async function processBatch(skip: number) {
  const kolLinks = await prisma.kOLToProject.findMany({
    include: { kol: true },
    where: {
      mindoMetric: null,
      kol: {
        kolScore: { not: null },
        avgLikes: { not: null },
        avgViews: { not: null },
        totalPosts: { not: null },
        hidden: false,
      },
    },
    skip,
    take: BATCH_SIZE,
  });

  const updates = kolLinks.map((record) => {
    const kolScore = record.kol.kolScore;
    const avgLikes = record.kol.avgLikes;
    const avgViews = record.kol.avgViews;
    const totalPosts = record.totalPosts;
    const totalComments = Number(record.totalComments);

    const qualityScore =
      1 * log1p(avgLikes) + 1.5 * log1p(totalComments) + 0.1 * log1p(avgViews);

    const proofOfWork = totalPosts + qualityScore;
    const mindoMetric = proofOfWork * kolScore;

    return prisma.kOLToProject.update({
      where: { id: record.id },
      data: { qualityScore, proofOfWork, mindoMetric },
    });
  });

  await prisma.$transaction(updates);
  console.log(`✅ Обновлено ${kolLinks.length} записей (skip = ${skip})`);
}

async function main() {
  const totalCount = await prisma.kOLToProject.count();
  for (let skip = 0; skip < totalCount; skip += BATCH_SIZE) {
    await processBatch(skip);
  }

  console.log("🎉 Готово. Все записи обновлены.");
}

main().catch((e) => {
  console.error("❌ Ошибка:", e);
});
