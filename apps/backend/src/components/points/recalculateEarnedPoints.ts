import { prisma } from "../../prisma";

async function recalcAllEarnedPointsPrisma() {
  const sums = await prisma.pointEvent.groupBy({
    by: ["userId"],
    _sum: { effectivePoints: true },
  });

  // Обновляем тем, у кого есть события
  for (const { userId, _sum } of sums) {
    await prisma.user.update({
      where: { id: userId },
      data: { earnedPoints: _sum.effectivePoints ?? 0 },
    });
  }

  // Пользователям без событий — 0
  await prisma.user.updateMany({
    where: { id: { notIn: sums.map((s) => s.userId) } },
    data: { earnedPoints: 0 },
  });

  console.log("✅ earnedPoints recalculated (Prisma-only)");
}

recalcAllEarnedPointsPrisma()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
