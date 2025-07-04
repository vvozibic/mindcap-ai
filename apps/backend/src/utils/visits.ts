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

/**
 * Добавляет визит в очередь (не чаще 1 раза на 5 минут на ip+path)
 */
export function queuePageVisit(ip: string, path: string, userAgent?: string) {
  const key = `${ip}-${path}`;
  const now = Date.now();
  const last = lastVisitCache.get(key) || 0;

  if (now - last < 5 * 60 * 1000) return;

  lastVisitCache.set(key, now);
  visitQueue.push({ ip, path, userAgent, timestamp: now });

  // Убери после отладки
  console.log(`👁 Queued visit: ${ip} => ${path}`);
}

// 🔁 Интервал для записи данных в базу
async function flushVisitQueue() {
  if (visitQueue.length === 0) return;

  const batch = [...visitQueue];
  visitQueue.length = 0;

  try {
    await prisma.pageVisit.createMany({
      data: batch.map(({ ip, path, userAgent }) => ({ ip, path, userAgent })),
      skipDuplicates: true,
    });
    console.log(`✅ Saved ${batch.length} visits`);
  } catch (err) {
    console.error("❌ Failed to insert page visits:", err);
    visitQueue.unshift(...batch);
  }
}

// ⏱ Периодический запуск
setInterval(flushVisitQueue, 60 * 1000); // каждую минуту
