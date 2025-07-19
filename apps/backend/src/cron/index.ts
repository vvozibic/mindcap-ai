import { enrichNarratives } from "../components/narratives/enrichNarratives";
import { enrichProjectsByNarratives } from "../components/projects/enrichProjectsByNarratives";
import { startTimer } from "./utils";

async function main() {
  const end = startTimer("enrichAll");

  await enrichNarratives();

  await enrichProjectsByNarratives();

  end();
}

main().catch((err) => {
  console.error("❌ Cron job failed:", err);
  process.exit(1);
});
