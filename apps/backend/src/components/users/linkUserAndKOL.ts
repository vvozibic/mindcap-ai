import { PrismaClient } from "@prisma/client";
import { updateKOLByUsername } from "../kols/updateKOLByUsername";

const prisma = new PrismaClient();

export async function linkUserAndKOL(username: string) {
  if (!username) {
    console.warn("⚠️ linkUserAndKOL called without username");
    return null;
  }

  // 1. Находим юзера
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error(`User ${username} not found`);

  // 2. Пытаемся найти KOL по username
  let kol = await prisma.kOL.findUnique({
    where: { twitterUsername: username },
  });

  // 3. Если нет KOL → создаем/обновляем
  if (!kol) {
    kol = await updateKOLByUsername(username);
    console.log(`✅ Created/updated KOL for ${username}`);
  }

  // 4. Привязываем, если еще не связано
  if (kol && user.kolId !== kol.id) {
    await prisma.user.update({
      where: { id: user.id },
      data: { kolId: kol.id },
    });
    console.log(`🔗 Linked user ${user.id} (${username}) to KOL ${kol.id}`);
  }

  return kol;
}
