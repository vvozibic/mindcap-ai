import { enrichNarratives } from "../components/narratives/enrichNarratives";
import { startTimer } from "./utils";

async function main() {
  const end = startTimer("enrichNarratives");
  await enrichNarratives();
  end();
}

main().catch((err) => {
  console.error("❌ Cron job failed:", err);
  process.exit(1);
});
