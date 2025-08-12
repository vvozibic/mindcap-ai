import { prisma } from "../../prisma";
import { enrichUser } from "./enrichUser";
import { linkUserAndKOL } from "./linkUserAndKOL";

async function main(username: string) {
  await enrichUser(username, false, undefined).catch(console.error);

  await linkUserAndKOL(username).catch(console.error);
}

main("DeRonin_")
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
