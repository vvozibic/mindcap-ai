import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import { getAndSaveInfluencer } from "./getAndSaveInfluencer";
import { users } from "./users";

const prisma = new PrismaClient();

function extractHandle(url: string): string | null {
  const match = url.match(/(?:twitter\.com|x\.com)\/@?([\w\d_]+)/i);
  return match ? match[1].toLowerCase() : null;
}

async function saveAllInfluencersParallel(concurrency = 6) {
  const handles = users.map(extractHandle).filter(Boolean) as string[];

  // Читаем уже сохранённые username из базы
  const existingInfluencers = await prisma.influencer.findMany({
    select: { username: true },
  });
  const existingUsernames = new Set(
    existingInfluencers.map((i) => i.username.toLowerCase())
  );

  const filteredHandles = handles.filter((h) => !existingUsernames.has(h));

  const failed: { handle: string; error: string }[] = [];
  let active = 0;
  let index = 0;

  return new Promise<void>((resolve, reject) => {
    const runNext = async () => {
      if (index >= filteredHandles.length) {
        if (active === 0) {
          if (failed.length > 0) {
            await fs.writeFile(
              "failed-handles.json",
              JSON.stringify(failed, null, 2)
            );
            console.warn(
              `⚠️ ${failed.length} handles failed. Written to failed-handles.json`
            );
          }
          resolve();
        }
        return;
      }

      const handle = filteredHandles[index++];
      active++;

      try {
        await getAndSaveInfluencer(handle);
        console.log(`✅ Saved: ${handle}`);
      } catch (err: any) {
        console.warn(`❌ Failed: ${handle}`);
        failed.push({ handle, error: err.message || String(err) });
      } finally {
        active--;
        runNext();
      }
    };

    for (let i = 0; i < concurrency; i++) {
      runNext();
    }
  });
}

saveAllInfluencersParallel(6)
  .then(() => {
    console.log("🎉 Done");
    return prisma.$disconnect();
  })
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
