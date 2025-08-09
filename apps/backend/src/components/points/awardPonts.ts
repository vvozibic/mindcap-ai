import { PrismaClient } from "@prisma/client";
import { PointEventType } from "./constansts";
const prisma = new PrismaClient();

export async function awardPoints(params: {
  userId: number;
  type: PointEventType;
  basePoints: number;
  idempotencyKey: string;
  createdAt: Date;
  meta?: any;
}) {
  const { userId, type, basePoints, idempotencyKey, createdAt, meta } = params;

  return prisma.$transaction(async (tx) => {
    const exists = await tx.pointEvent.findFirst({
      where: { userId, idempotencyKey },
      select: { id: true },
    });
    if (exists) return exists;

    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { baseMultiplier: true },
    });
    if (!user) throw new Error(`User ${userId} not found`);

    const effective = Math.round(basePoints * (user.baseMultiplier ?? 1));

    const ev = await tx.pointEvent.create({
      data: {
        userId,
        type,
        basePoints,
        effectivePoints: effective,
        idempotencyKey,
        createdAt,
        meta,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { earnedPoints: { increment: effective } },
    });

    return ev;
  });
}
