import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface VisitEntry {
  ip: string;
  path: string;
  userAgent?: string;
  timestamp: number;
}

const visitQueue: VisitEntry[] = [];
const lastVisitCache = new Map<string, number>(); // key: `${ip}-${path}`

export function queuePageVisit(ip: string, path: string, userAgent?: string) {
  const key = `${ip}-${path}`;
  const now = Date.now();
  const last = lastVisitCache.get(key) || 0;

  // 5 минутный лимит на логирование по IP+path
  if (now - last < 5 * 60 * 1000) return;

  lastVisitCache.set(key, now);
  visitQueue.push({ ip, path, userAgent, timestamp: now });
}

// Периодическая запись в БД (например, в express backend)
setInterval(async () => {
  if (visitQueue.length === 0) return;

  const batch = [...visitQueue];
  visitQueue.length = 0; // очищаем очередь

  try {
    await prisma.pageVisit.createMany({
      data: batch.map(({ ip, path, userAgent }) => ({ ip, path, userAgent })),
      skipDuplicates: true,
    });
  } catch (err) {
    console.error("Failed to insert page visits:", err);
    // откат если надо: visitQueue.unshift(...batch)
  }
}, 60 * 1000); // раз в минуту
