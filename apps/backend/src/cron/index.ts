import { enrichNarratives } from "../components/narratives/enrichNarratives";
import { enrichProjectsByNarratives } from "../components/projects/enrichProjectsByNarratives";
import { startTimer } from "./utils";

import cron from "node-cron";

// 9:50 AM MSK every day
cron.schedule("50 6 * * *", async () => {
  const end = startTimer("enrichAll");
  console.log("🔁 [CRON] Запуск обогащения...");
  try {
    console.log("🔄 [CRON] Запуск enrichNarratives...");
    await enrichNarratives();
    console.log("✅ [CRON] Обогащение нарративов завершено");

    console.log("🔄 [CRON] Запуск enrichProjectsByNarratives...");

    await enrichProjectsByNarratives();

    console.log("✅ [CRON] Обогащение проектов по нарративам завершено");

    console.log("✅ [CRON] Обогащение завершено");
  } catch (e) {
    console.error("❌ [CRON] Ошибка:", e);
  }
  end();
});
