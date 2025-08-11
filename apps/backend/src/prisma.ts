import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn"],
  });

// в dev пересоздаётся при HMR — сохраняем инстанс в global
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
