import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fillNulls() {
  const updated = await prisma.influencer.updateMany({
    where: {
      OR: [
        { tweetsCount: null },
        { followings: null },
        { followersCount: null },
      ],
    },
    data: {
      tweetsCount: "0",
      followings: "0",
      followersCount: "0",
    },
  });

  console.log(`✅ Updated ${updated.count} influencers with null values`);
  await prisma.$disconnect();
}

fillNulls().catch((err) => {
  console.error(err);
  process.exit(1);
});
