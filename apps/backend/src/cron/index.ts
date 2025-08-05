import { enrichKOLsFromProjects } from "../components/kols/enrichKOLsFromProjects";
import { enrichKOLStats } from "../components/kols/enrichKOLStats";
import { enrichNarratives } from "../components/narratives/enrichNarratives";
import { enrichProjectsByNarratives } from "../components/projects/enrichProjectsByNarratives";
import { fetchRubyWalletScores } from "../components/wallets/fetchRubyWalletScores";
import { startTimer } from "./utils";

import cron from "node-cron";

// 9:50 AM MSK every day "50 6 * * *"
// 15:00 PM MSK every day "0 12 * * *"
cron.schedule("0 0 * * *", async () => {
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
    console.log("✅ [CRON] Обогащение KOL'ов из проектов завершено");

    console.log("🔄 [CRON] Запуск enrichKOLStats...");
    await enrichKOLStats();
    console.log("✅ [CRON] Обогащение KOL статистики завершено");

    console.log("🔄 [CRON] Запуск fetchRubyWalletScores...");
    await fetchRubyWalletScores();
    console.log("✅ [CRON] Получение ruby wallet score завершено");

    console.log("✅ [CRON] Обогащение завершено");
  } catch (e) {
    console.error("❌ [CRON] Ошибка:", e);
  }
  end();
});
