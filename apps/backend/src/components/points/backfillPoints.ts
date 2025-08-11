import { prisma } from "../../prisma";
import { awardPoints } from "./awardPoints";
import { PointEventType, POINTS } from "./constants";

async function main() {
  const now = new Date();

  // 1) Регистрация
  const users = await prisma.user.findMany({
    select: { id: true, baseMultiplier: true },
  });
  for (const u of users) {
    await awardPoints({
      userId: u.id,
      type: PointEventType.REGISTER,
      basePoints: POINTS[PointEventType.REGISTER],
      idempotencyKey: `register-${u.id}`,
      createdAt: now,
    });
  }

  // 2) Квалифицированные рефералы (у кого есть referredById)
  const referees = await prisma.user.findMany({
    where: { referredById: { not: null } },
    select: { id: true, referredById: true },
  });

  for (const r of referees) {
    const referrerId = r.referredById!;
    await awardPoints({
      userId: referrerId,
      type: PointEventType.REFERRAL_QUALIFIED,
      basePoints: POINTS[PointEventType.REFERRAL_QUALIFIED],
      idempotencyKey: `referral-${r.id}`, // один ключ на реферала
      createdAt: now,
      meta: { refereeId: r.id },
    });
  }

  const usersWithWallets = await prisma.user.findMany({
    where: { wallets: { some: {} } },
    select: { id: true },
  });

  for (const u of usersWithWallets) {
    const exists = await prisma.pointEvent.findFirst({
      where: { userId: u.id, idempotencyKey: `first-wallet-${u.id}` },
      select: { id: true },
    });
    if (exists) continue;

    // (опционально) записать какой именно кошелёк — возьмём самый ранний
    const firstWallet = await prisma.wallet.findFirst({
      where: { userId: u.id },
      orderBy: { createdAt: "asc" },
      select: { id: true, address: true },
    });

    await awardPoints({
      userId: u.id,
      type: PointEventType.CONNECT_FIRST_WALLET,
      basePoints: POINTS[PointEventType.CONNECT_FIRST_WALLET],
      idempotencyKey: `first-wallet-${u.id}`,
      createdAt: now,
      meta: firstWallet
        ? { walletId: firstWallet.id, address: firstWallet.address }
        : undefined,
    });
  }
  // 3) (опционально) Пересчёт кэша earnedPoints с нуля, если хочешь гарантировать консистентность:
  //  — если выше мы инкрементим, это не обязательно; оставляю примером —
  // const sums = await prisma.pointEvent.groupBy({
  //   by: ["userId"],
  //   _sum: { effectivePoints: true },
  // });
  // for (const s of sums) {
  //   await prisma.user.update({
  //     where: { id: s.userId },
  //     data: { earnedPoints: s._sum.effectivePoints ?? 0 },
  //   });
  // }

  console.log("✅ Backfill complete");
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
