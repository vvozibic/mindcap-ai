import { Prisma, PrismaClient } from "@prisma/client";
import { PointEventType } from "./constants";

const prisma = new PrismaClient();

type AwardPointsArgs = {
  userId: number;
  type: PointEventType;
  basePoints: number;
  idempotencyKey: string;
  createdAt?: Date;
  meta?: Prisma.JsonValue;
};

export async function awardPoints(params: AwardPointsArgs) {
  const { userId, type, basePoints, idempotencyKey } = params;
  const createdAt = params.createdAt ?? new Date();
  const meta = params.meta;

  return prisma.$transaction(async (tx) => {
    // Пытаемся создать сразу; уникальный индекс не даст продублировать
    try {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { baseMultiplier: true, earnedPoints: true },
      });
      if (!user) throw new Error(`User ${userId} not found`);

      const multiplier = Math.max(1, user.baseMultiplier ?? 1);
      const effective = basePoints * multiplier; // или round — по вашей политике

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

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { earnedPoints: { increment: effective } },
        select: { id: true, earnedPoints: true, baseMultiplier: true },
      });

      return { event: ev, user: updatedUser };
    } catch (e: any) {
      // Идемпотентность: если ключ уже есть — отдаём существующее событие
      if (e.code === "P2002") {
        const existing = await tx.pointEvent.findFirst({
          where: { userId, type, idempotencyKey },
        });
        if (existing) {
          const user = await tx.user.findUnique({
            where: { id: userId },
            select: { id: true, earnedPoints: true, baseMultiplier: true },
          });
          return { event: existing, user };
        }
      }
      throw e;
    }
  });
}
