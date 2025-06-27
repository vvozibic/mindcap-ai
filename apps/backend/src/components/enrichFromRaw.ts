import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function enrichInfluencers() {
  const influencers = await prisma.influencer.findMany({
    where: {
      protokolsJsonRaw: {
        not: null,
      },
    },
    select: {
      id: true,
      protokolsJsonRaw: true,
    },
  });

  for (const inf of influencers) {
    const raw = inf.protokolsJsonRaw as any;
    const totalLikes = raw?.total_account_likes || 0;
    const totalViews = raw?.total_account_views || 0;
    const totalReplies = raw?.total_account_replies || 0;
    const totalComments = raw?.total_account_comments || 0;
    const totalRetweets = raw?.total_account_retweets || 0;

    await prisma.influencer.update({
      where: { id: inf.id },
      data: { totalLikes, totalViews, totalReplies, totalComments, totalRetweets },
    });

    console.log(
      `🧠 Updated influencer ${inf.id} → added data ${totalLikes} ${totalViews} ${totalReplies} ${totalComments} ${totalRetweets}`
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
// }

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
