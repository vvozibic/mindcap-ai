import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("adminfi", 10);

  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {
      password: hash,
      role: "admin",
    },
    create: {
      username: "admin",
      password: hash,
      role: "admin",
    },
  });

  console.log(`✅ Admin created/updated: ${admin.username}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
