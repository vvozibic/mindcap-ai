import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();
const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = process.env.COINGECKO_API_KEY;

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log("🔑 Using", API_KEY);
async function fetchWithRetry<T>(
  url: string,
  params: Record<string, any>,
  retries = 5
): Promise<T> {
  const query = {
    ...params,
    x_cg_demo_api_key: API_KEY,
  };

  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.get<T>(url, { params: query });
      return res.data;
    } catch (err: any) {
      console.warn(
        `Retry ${i + 1}/${retries}: ${url}`,
        err.code,
        err.message,
        err.response?.headers
      );
      await delay(3000);
    }
  }

  throw new Error(`Failed to fetch after ${retries} retries: ${url}`);
}

async function getTopProjects(count = 100) {
  const url = `${BASE_URL}/coins/markets`;
  return fetchWithRetry<any[]>(url, {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: count,
    page: 1,
  });
}

async function getProjectDetails(id: string) {
  const url = `${BASE_URL}/coins/${id}`;
  return fetchWithRetry<any>(url, {});
}

async function saveProject(data: any) {
  const twitter = data.links.twitter_screen_name
    ? `https://twitter.com/${data.links.twitter_screen_name}`
    : null;

  await prisma.project.upsert({
    where: { slug: data.id },
    update: {
      name: data.name,
      description: data.description?.en || null,
      website: data.links.homepage?.[0] || null,
      twitter,
      category: data.categories?.[0] || null,
      marketCap: data.market_data?.market_cap?.usd?.toString() || null,
      avatarUrl: data.image?.large || null,
      launchDate: data.genesis_date ? new Date(data.genesis_date) : null,
      rawData: data, // Сохраняем весь респонс как JSON
      updatedAt: new Date(),
    },
    create: {
      id: data.id,
      slug: data.id,
      name: data.name,
      description: data.description?.en || null,
      website: data.links.homepage?.[0] || null,
      twitter,
      category: data.categories?.[0] || null,
      marketCap: data.market_data?.market_cap?.usd?.toString() || null,
      avatarUrl: data.image?.large || null,
      launchDate: data.genesis_date ? new Date(data.genesis_date) : null,
      rawData: data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export default async function run() {
  console.log("🌐 Fetching top projects...");
  const topProjects = await getTopProjects();

  const existing = await prisma.project.findMany({
    select: { slug: true },
  });

  const existingSlugs = new Set(existing.map((p) => p.slug));

  const projectsToSave = topProjects.filter((p) => !existingSlugs.has(p.id));

  console.log(
    `🧠 Already have ${existing.length} projects, need to fetch ${projectsToSave.length} more`
  );

  for (const [i, project] of projectsToSave.entries()) {
    console.log(
      `(${i + 1}/${projectsToSave.length}) 🚀 Saving ${project.id}...`
    );
    const details = await getProjectDetails(project.id);
    await saveProject(details);
    await delay(3000); // to avoid rate limit
  }

  console.log("✅ All new projects saved");
  await prisma.$disconnect();
}

// If run directly
if (require.main === module) {
  run().catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
}
