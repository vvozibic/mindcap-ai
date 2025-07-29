import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();
const API_KEY = process.env.PROTOKOLS_API_KEY;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const syncNarrativeProjects = async () => {
  const narratives = await prisma.narrative.findMany();
  console.log(`🔍 Всего нарративов: ${narratives.length}`);

  for (const narrative of narratives) {
    console.log(`\n🌐 Обрабатываю нарратив: ${narrative.slug}`);

    try {
      const response = await fetch(
        `https://public-api.protokols.io/api/v1/narratives/${narrative.slug}/projects`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        console.error(`❌ Ошибка запроса: ${response.statusText}`);
        continue;
      }

      const data = (await response.json()) as { data?: any[] };
      const projects = (data.data || []) as any[];

      console.log(`✅ Найдено проектов: ${projects.length}`);

      for (const p of projects) {
        try {
          const existing = await prisma.protokolsProject.findUnique({
            where: { twitterId: p.twitter_profile.id },
          });

          let project;
          if (!existing) {
            project = await prisma.protokolsProject.create({
              data: {
                name: p.coin.name,
                symbol: p.coin.symbol,
                slug: p.coin.symbol?.toLowerCase(),
                avatarUrl: p.twitter_profile.avatar_url,
                bannerUrl: p.twitter_profile.banner_url || null,
                description: p.twitter_profile.description,
                twitterUsername: p.twitter_profile.username,
                twitterId: p.twitter_profile.id,
                isVerified: p.twitter_profile.is_verified,
                followersCount: p.twitter_profile.followers_count,
                followingCount: p.twitter_profile.following_count,
                twitterCreatedAt: new Date(
                  p.twitter_profile.profile_created_at
                ),
                coingeckoImageUrl: p.coin.image_url,
                marketCap: p.coin.market_cap,
                price: p.coin.price,
                contractAddress: p.coin.contract_address,
                totalViews: p.total_views,
                totalPosts: p.total_posts,
                mindsharePercent: 0, // переопределим позже
                mindshareChange24h: p.mindshare.change_24h,
                mindshareChange7d: p.mindshare.change_7d,
                mindshareChange30d: p.mindshare.change_30d,
                mindshareChange90d: p.mindshare.change_90d,
              },
            });
            console.log(`➕ Добавлен проект: ${project.name}`);
          } else {
            project = existing;
            console.log(`↪️ Уже есть проект: ${project.name}`);
          }

          const existingLink =
            await prisma.narrativeToProtokolsProject.findFirst({
              where: {
                narrativeId: narrative.id,
                protokolsProjectId: project.id,
              },
            });

          if (!existingLink) {
            await prisma.narrativeToProtokolsProject.create({
              data: {
                narrativeId: narrative.id,
                protokolsProjectId: project.id,
                projectMindsharePercent: p.mindshare.mindshare_percent,
              },
            });
            console.log(
              `🔗 Связь добавлена: ${narrative.slug} ↔ ${project.name}`
            );
          } else {
            await prisma.narrativeToProtokolsProject.update({
              where: { id: existingLink.id },
              data: {
                projectMindsharePercent: p.mindshare.mindshare_percent,
              },
            });
            console.log(
              `✅ Связь обновлена: ${narrative.slug} ↔ ${project.name}`
            );
          }
        } catch (err) {
          console.error(`⚠️ Ошибка при обработке проекта ${p.coin.name}:`, err);
        }

        await sleep(100);
      }
    } catch (err) {
      console.error(
        `💥 Ошибка при обработке нарратива ${narrative.slug}:`,
        err
      );
    }

    await sleep(300);
  }

  console.log("\n🎉 Синхронизация завершена");

  // 🔄 Обновление mindshare всех проектов на основе нарративов
  const projects = await prisma.protokolsProject.findMany();
  for (const project of projects) {
    const links = await prisma.narrativeToProtokolsProject.findMany({
      where: { protokolsProjectId: project.id },
      include: {
        narrative: true,
      },
    });

    const totalMindshare = links.reduce((sum, link) => {
      const narrativeShare = link.narrative.mindsharePercent / 100;
      const projectShare = link.projectMindsharePercent / 100;
      return sum + narrativeShare * projectShare;
    }, 0);

    await prisma.protokolsProject.update({
      where: { id: project.id },
      data: {
        mindsharePercent: +(totalMindshare * 100).toFixed(4),
      },
    });

    console.log(
      `📊 Пересчитан общий mindshare: ${project.name} — ${(
        totalMindshare * 100
      ).toFixed(4)}%`
    );
  }
};

syncNarrativeProjects()
  .then(() => {
    console.log("🎉 Sync projects done");
    return prisma.$disconnect();
  })
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
