import { PrismaClient } from "@prisma/client";
import { updateKOLByUsername } from "../kols/updateKOLByUsername";
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { kolId: null, username: { not: null } },
    select: { id: true, username: true },
  });

  console.log(`Найдено ${users.length} пользователей без kolId`);

  for (const user of users) {
    const kol = await prisma.kOL.findUnique({
      where: { twitterUsername: user.username! },
      select: { id: true },
    });

    if (!kol) {
      await updateKOLByUsername(user.username);
      continue;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { kolId: kol.id },
    });

    console.log(`✅ Проставлен kolId ${kol.id} для пользователя ${user.id}`);
  }

  console.log("🎯 Маппинг завершён");
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
