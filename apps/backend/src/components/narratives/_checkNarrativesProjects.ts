import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();
const API_KEY = process.env.PROTOKOLS_API_KEY;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const checkNarrativeProjectsAll = async () => {
  const narratives = await prisma.narrative.findMany();
  console.log(`🔍 Найдено нарративов: ${narratives.length}`);

  let grandTotal = 0;
  const uniqueProjects = new Set<string>();
  const table: { slug: string; count: number }[] = [];

  for (const narrative of narratives) {
    let cursor: string | null = null;
    let prevCursor: string | null = null;
    let total = 0;
    let page = 1;

    console.log(`\n🌐 Нарратив: ${narrative.slug}`);

    do {
      const url = new URL(
        `https://public-api.protokols.io/api/v1/narratives/${narrative.slug}/projects`
      );
      if (cursor) url.searchParams.set("cursor", cursor);

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        console.error(
          `❌ Ошибка запроса (${narrative.slug}): ${response.statusText}`
        );
        break;
      }

      const result = await response.json();
      const projects = result.data || [];

      // Защита от бесконечного цикла
      if (cursor && cursor === prevCursor) {
        console.warn(
          `⚠️ Курсор не меняется. Останавливаем пагинацию на странице ${page}`
        );
        break;
      }

      // Защита от пустой страницы
      if (projects.length === 0) {
        console.warn(`⚠️ Пустая страница ${page}. Останавливаем`);
        break;
      }

      console.log(`📄 Страница ${page}: ${projects.length} проектов`);
      total += projects.length;
      grandTotal += projects.length;

      for (const p of projects) {
        if (p.twitter_profile?.id) {
          uniqueProjects.add(p.twitter_profile.id);
        }
      }

      prevCursor = cursor;
      cursor = result.pagination?.cursor ?? null;
      page++;

      await sleep(100);
    } while (cursor && page <= 100);

    console.log(`✅ Всего проектов в ${narrative.slug}: ${total}`);
    table.push({ slug: narrative.slug, count: total });

    await sleep(100);
  }

  console.log(`\n📊 Таблица проектов по нарративам:\n`);
  table.forEach(({ slug, count }) => {
    console.log(`${slug.padEnd(25)} — ${count}`);
  });

  console.log(`\n🎯 Всего нарративных привязок: ${grandTotal}`);
  console.log(
    `🧠 Уникальных проектов (по twitter_profile.id): ${uniqueProjects.size}`
  );
};

checkNarrativeProjectsAll()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
