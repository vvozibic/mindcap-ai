import dotenv from "dotenv";
import { mainCron } from "../../backend/src/cron/index.ts";
dotenv.config();

(async () => {
  try {
    console.log("🚀 Starting enrichment...");
    await mainCron();
    console.log("✅ Done");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed:", err);
    process.exit(1);
  }
})();
