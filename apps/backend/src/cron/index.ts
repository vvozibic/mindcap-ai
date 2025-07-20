import { startTimer } from "./utils";

export async function mainCron() {
  const end = startTimer("enrichAll");

  // await enrichNarratives();

  // await enrichProjectsByNarratives();

  end();
}

// main().catch((err) => {
//   console.error("❌ Cron job failed:", err);
//   process.exit(1);
// });
