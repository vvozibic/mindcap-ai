import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
// import { parseLinks, serializeLinks } from "../utils/links";

const prisma = new PrismaClient();

export const getAllProjects = async (_: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    where: {
      featured: false,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      avatarUrl: true,
      category: true,
      categories: true,
      website: true,
      description: true,
      marketCap: true,
      launchDate: true,
      mindshare: true,
      kolAttention: true,
      engagement: true,
      trustScore: true,
      rewardPoolUsd: true,
      rewardRank: true,
      twitter: true,
      createdAt: true,
      updatedAt: true,
      featured: true,
    },
    orderBy: [{ marketCap: "desc" }],
  });

  res.json(projects);
};

export const getFeaturedProjects = async (_: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    where: {
      featured: true,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      avatarUrl: true,
      category: true,
      categories: true,
      website: true,
      description: true,
      marketCap: true,
      launchDate: true,
      mindshare: true,
      kolAttention: true,
      engagement: true,
      trustScore: true,
      rewardPoolUsd: true,
      rewardRank: true,
      twitter: true,
      createdAt: true,
      updatedAt: true,
      featured: true,
    },
    orderBy: [{ marketCap: "desc" }],
  });

  res.json(projects);
};

// export const getAllProjects = async (req: Request, res: Response) => {
//   const { limit, offset } = getPaginationParams(req);

//   const [items, total] = await prisma.$transaction([
//     prisma.project.findMany({
//       skip: offset,
//       take: limit,
//       orderBy: { marketCap: "desc" },
//     }),
//     prisma.project.count(),
//   ]);

//   res.json({
//     items,
//     meta: buildPaginationMeta(total, limit, offset),
//   });
// };

export const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const proj = await prisma.project.findUnique({ where: { id } });
  if (!proj) return res.status(404).json({ error: "Not found" });
  res.json(proj);
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({ data: req.body });
    res.status(201).json(project);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.update({
      where: { id },
      data: req.body,
    });
    res.json(project);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.mention.deleteMany({
    where: { projectId: id },
  });

  await prisma.project.delete({
    where: { id },
  });

  res.status(200).json({ message: "Project and related mentions deleted" });
};

// Narratives from protokols
export const getAllProtokolsProjects = async (_: Request, res: Response) => {
  const projects = await prisma.protokolsProject.findMany({
    orderBy: { marketCap: "desc" },
    include: {
      narrativeLinks: {
        select: {
          projectMindsharePercent: true,
          narrative: {
            select: {
              id: true,
              name: true,
              slug: true,
              mindsharePercent: true,
              marketCapUsd: true,
              totalViews: true,
            },
          },
        },
      },
    },
  });

  res.json(projects);
};

export const getFeaturedProtokolsProjects = async (
  _: Request,
  res: Response
) => {
  const projects = await prisma.protokolsProject.findMany({
    where: {
      featured: true,
    },
    include: {
      narrativeLinks: {
        select: {
          projectMindsharePercent: true,
          narrative: {
            select: {
              id: true,
              name: true,
              slug: true,
              mindsharePercent: true,
              marketCapUsd: true,
              totalViews: true,
            },
          },
        },
      },
      rewardPools: true,
    },
    orderBy: [{ marketCap: "desc" }],
  });

  res.json(projects);
};
export const getPaginatedProtokolsProjects = async (
  req: Request,
  res: Response
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const sortField = (req.query.sortField as string) || "marketCap";
  const sortDirection =
    (req.query.sortDirection as string) === "asc" ? "asc" : "desc";
  const skip = (page - 1) * limit;

  // Валидация допустимых полей сортировки
  const allowedSortFields = [
    "marketCap",
    "price",
    "mindsharePercent",
    "followersCount",
    "totalViews",
  ];

  const safeSortField = allowedSortFields.includes(sortField as any)
    ? (sortField as (typeof allowedSortFields)[number])
    : "mindsharePercent";

  const [total, projects] = await Promise.all([
    prisma.protokolsProject.count(),
    prisma.protokolsProject.findMany({
      skip,
      take: limit,
      orderBy: {
        [safeSortField]: sortDirection,
      },
      include: {
        narrativeLinks: {
          select: {
            projectMindsharePercent: true,
            narrative: {
              select: {
                id: true,
                name: true,
                slug: true,
                mindsharePercent: true,
                marketCapUsd: true,
                totalViews: true,
              },
            },
          },
        },
        rewardPools: true,
      },
    }),
  ]);

  res.json({
    data: projects,
    total,
    page,
    limit,
  });
};

export const getProtokolsProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await prisma.protokolsProject.findUnique({
    where: { id },
    include: {
      narrativeLinks: {
        select: {
          projectMindsharePercent: true,
          narrative: {
            select: {
              id: true,
              name: true,
              slug: true,
              mindsharePercent: true,
              marketCapUsd: true,
              totalViews: true,
            },
          },
        },
      },
      rewardPools: true,
    },
  });

  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project);
};

export const getInfluencersByProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ error: "Missing projectId in params" });
  }

  try {
    const influencers = await prisma.influencer.findMany({
      where: {
        projects: {
          some: {
            projectId,
          },
        },
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatarUrl: true,
        followersCountNumeric: true,
        kolScore: true,
        engagementRate: true,
        tweetsCountNumeric: true,
        smartFollowers: true,
        smartFollowersPercent: true,
        twitterRegisterDate: true,
      },
      orderBy: {
        kolScore: "desc", // сортировка по весу, если нужно
      },
    });

    res.json(influencers);
  } catch (err) {
    console.error("Failed to fetch influencers for project:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProtokolsProject = async (req: Request, res: Response) => {
  try {
    const project = await prisma.protokolsProject.create({ data: req.body });
    res.status(201).json(project);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateProtokolsProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.protokolsProject.update({
      where: { id },
      data: req.body,
      include: {
        rewardPools: true,
      },
    });
    res.json(project);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteProtokolsProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.narrativeToProtokolsProject.deleteMany({
    where: { protokolsProjectId: id },
  });

  await prisma.rewardPool.deleteMany({
    where: { projectId: id },
  });

  await prisma.protokolsProject.delete({
    where: { id },
  });

  res.status(200).json({ message: "Project and related links deleted" });
};
