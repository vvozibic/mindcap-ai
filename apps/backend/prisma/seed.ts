import bcrypt from "bcryptjs";

import { prisma } from "../src/prisma";

async function main() {
  const hash = await bcrypt.hash("", 10);
  const hashProject = await bcrypt.hash("", 10);

  // const admin = await prisma.adminUser.upsert({
  //   where: { username: "admin" },
  //   update: {
  //     password: hash,
  //     role: "admin",
  //   },
  //   create: {
  //     username: "admin",
  //     password: hash,
  //     role: "admin",
  //   },
  // });

  // console.log(`✅ Admin created/updated: ${admin.username}`);

  const adminProjectUser = await prisma.adminUser.create({
    data: {
      username: "0G_ADMIN",
      password: hashProject,
      role: "PROJECT",
      project: {
        connect: { id: "4d3105db-b451-4edc-bee3-2204a0cf4d22" },
      },
    },
  });

  console.log(`✅ Admin created/updated: ${adminProjectUser.username}`);

  // const solana = await prisma.project.upsert({
  //   where: { slug: "solana" },
  //   update: {},
  //   create: {
  //     name: "Solana",
  //     slug: "solana",
  //     description: "High-performance blockchain",
  //     category: "Smart Contract Platform",
  //     website: "https://solana.com",
  //     launchDate: new Date("2020-03-16"),
  //     marketCap: "$45B",
  //     mindshare: "94",
  //     kolAttention: "93",
  //     engagement: "92",
  //     trustScore: "91",
  //     rewardPoolUsd: "200000",
  //     rewardRank: "2",
  //     twitter: "https://twitter.com/solana",
  //   },
  // });

  // const influencers = [
  //   {
  //     name: "Alex Thompson",
  //     username: "@cryptoalex",
  //     avatarUrl: "/avatars/alex.png",
  //     platform: "X (Twitter)",
  //     followersCount: "120000",
  //     smartFollowers: "85000",
  //     expertise: "DeFi, Crypto",
  //     mindshare: "98",
  //     pow: "92",
  //     poi: "95",
  //     poe: "97",
  //     moneyScore: "89",
  //   },
  //   {
  //     name: "Sophia Chen",
  //     username: "@sophiaconchain",
  //     platform: "X (Twitter)",
  //     followersCount: "105000",
  //     smartFollowers: "78000",
  //     expertise: "Web3 Marketing",
  //     mindshare: "96",
  //     pow: "94",
  //     poi: "91",
  //     poe: "93",
  //     moneyScore: "92",
  //   },
  //   {
  //     name: "Marcus Johnson",
  //     username: "@mjcrypto",
  //     platform: "X (Twitter)",
  //     followersCount: "98000",
  //     smartFollowers: "72000",
  //     expertise: "Insight Provider",
  //     mindshare: "94",
  //     pow: "89",
  //     poi: "96",
  //     poe: "90",
  //     moneyScore: "87",
  //   },
  // ];

  // for (const data of influencers) {
  //   const influencer = await prisma.influencer.upsert({
  //     where: { username: data.username },
  //     update: {},
  //     create: data,
  //   });

  //   // await prisma.mention.create({
  //   //   data: {
  //   //     projectId: solana.id,
  //   //     influencerId: influencer.id,
  //   //     mindshare: influencer.mindshare,
  //   //     pow: influencer.pow,
  //   //     poi: influencer.poi,
  //   //     poe: influencer.poe,
  //   //     smartFollowers: influencer.smartFollowers,
  //   //   },
  //   // });
  // }

  // console.log("✅ Seeded Influencers");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
