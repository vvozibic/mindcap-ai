import { BadgeSlug, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const badges = [
    {
      slug: "EARLY_BELIEVER" as BadgeSlug,
      label: "Early Believer",
      description: "Joined during the early believer period",
      defaultPriority: 10,
    },
    {
      slug: "KAITO_YAPPER" as BadgeSlug,
      label: "Kaito Yapper",
      description: "Special member of the Kaito Yapper community",
      defaultPriority: 20,
    },
  ];

  for (const badge of badges) {
    const existing = await prisma.badge.findUnique({
      where: { slug: badge.slug },
    });
    if (existing) {
      console.log(`✅ Badge ${badge.slug} already exists`);
      continue;
    }
    await prisma.badge.create({ data: badge });
    console.log(`🎯 Created badge: ${badge.slug}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
