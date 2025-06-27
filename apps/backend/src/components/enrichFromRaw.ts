import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function enrichInfluencers() {
  const influencers = await prisma.influencer.findMany({
    where: {
      twitterScoutJsonRaw: {
        not: null,
      },
    },
    select: {
      id: true,
      twitterScoutJsonRaw: true,
    },
  });

  for (const inf of influencers) {
    const raw = inf.twitterScoutJsonRaw as any;
    const twitterRegisterDate = raw?.register_date || 0;

    await prisma.influencer.update({
      where: { id: inf.id },
      data: {
        twitterRegisterDate,
      },
    });

    console.log(
      `🧠 Updated influencer ${inf.id} → added data ${twitterRegisterDate}`
    );
  }
  // }
  // async function enrichProjects() {
  //   const projects = await prisma.project.findMany({
  //     where: {
  //       rawData: {
  //         not: null,
  //       },
  //     },
  //     select: {
  //       id: true,
  //       rawData: true,
  //     },
  //   });

  //   for (const project of projects) {
  //     const raw = project.rawData as any;
  //     const categories = raw?.categories || [];

  //     await prisma.project.update({
  //       where: { id: project.id },
  //       data: {
  //         category: categories[0] || null,
  //         categories, // сохраняем весь массив
  //       },
  //     });

  //     console.log(
  //       `🏷 Updated project ${project.id} → categories = ${JSON.stringify(
  //         categories
  //       )}`
  //     );
  //   }
}

async function run() {
  await enrichInfluencers();
  // await enrichProjects();
  await prisma.$disconnect();
}

run().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
