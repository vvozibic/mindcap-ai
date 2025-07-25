import { PrismaClient } from "@prisma/client";
import { startTimer } from "../cron/utils";
import { enrichKOLsFromProjects } from "./kols/enrichKOLsFromProjects";
import { enrichKOLStats } from "./kols/enrichKOLStats";
import { enrichNarratives } from "./narratives/enrichNarratives";
import { enrichProjectsByNarratives } from "./projects/enrichProjectsByNarratives";

const prisma = new PrismaClient();

async function enrichAll(concurrency = 6) {
  const end = startTimer("enrichAll");
  console.log("🔁 [CRON] Запуск обогащения...");
  try {
    console.log("🔄 [CRON] Запуск enrichNarratives...");
    await enrichNarratives();
    console.log("✅ [CRON] Обогащение нарративов завершено");

    console.log("🔄 [CRON] Запуск enrichProjectsByNarratives...");
    await enrichProjectsByNarratives();
    console.log("✅ [CRON] Обогащение проектов по нарративам завершено");

    console.log("🔄 [CRON] Запуск enrichKOLsFromProjects...");
    await enrichKOLsFromProjects();
    console.log("✅ [CRON] Обогащение KOLs из проектов завершено");

    console.log("🔄 [CRON] Запуск enrichKOLStats...");
    await enrichKOLStats();
    console.log("✅ [CRON] Обогащение KOL статистики завершено");

    console.log("✅ [CRON] Обогащение завершено");
  } catch (e) {
    console.error("❌ [CRON] Ошибка:", e);
  }
  end();
}

enrichAll(6)
  .then(() => {
    console.log("🎉 Done");
    return prisma.$disconnect();
  })
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
