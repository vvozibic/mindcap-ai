export interface Project {
  id: string; // cuid (Prisma)
  name: string;
  slug: string; // уникальный идентификатор (равен id в Coingecko)
  avatarUrl?: string | null;
  category?: string | null;
  categories?: string[] | null;
  website?: string | null;
  description?: string | null;
  marketCap?: string | null;
  launchDate?: string | null; // DateTime → string
  twitter?: string | null;
  telegram?: string | null;
  discord?: string | null;
  rawData?: any | null;

  featured: boolean | string;

  // Поля анализа
  mindshare?: string | null;
  kolAttention?: string | null;
  engagement?: string | null;
  trustScore?: string | null;
  rewardPoolUsd?: string | null;
  rewardRank?: string | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface Influencer {
  id: string; // cuid (Prisma)
  rank?: string; // ранг в списке
  name: string;
  username: string; // уникальный
  avatarUrl?: string | null;
  badges?: string | null;
  bio?: string | null;
  platform?: string | null; // "twitter" и т.п.
  businessAccount?: boolean;
  followers?: string | null;
  followings?: string | null;
  expertise?: string | null;
  profileUrl?: string | null;
  twitterScoutJsonRaw?: any | null;

  followingsNumeric: number;
  followersCountNumeric: number;
  tweetsCountNumeric: number;
  avgLikes: number;
  avgViews: number;
  engagementRate: number;
  kolScore: number;
  totalPosts: number;
  totalLikes: number;
  totalViews: number;
  totalReplies: number;
  totalComments: number;
  totalRetweets: number;
  twitterRegisterDate: string;

  mindshare?: string | null;
  pow?: string | null;
  poi?: string | null;
  poe?: string | null;
  smartFollowers?: string | null;
  followersCount?: string | null;

  moneyScore?: string | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id?: string;
  username?: string;
  email?: string;
  role?: "admin" | "user";
  twitterHandle?: string;
  avatarUrl?: string;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
  isAuthenticated?: boolean;
}

export type Narrative = {
  projectMindsharePercent: number;
  narrative: {
    id: string;
    name: string;
    slug: string;
    mindsharePercent: number;
    marketCapUsd: number;
    totalViews: number;
  };
};

export type RewardPoolStatus = "active" | "upcoming" | "closed";

export interface RewardPool {
  id: string;
  title: string;
  description: string;
  deadline: string; // ISO string
  status: RewardPoolStatus;
  platforms: string[];

  reward: string; // "$2/1K views"
  rewardRate: number; // 2
  rewardUnit: string; // "1K views"

  totalAmountUsd: number;
  paidOutUsd: number;
  campaignTargetViews: number;

  participantsCount: number;
  completedCount: number;

  requirements: string[]; // ["Minimum 5 minutes video length", ...]

  project: ProtokolsProject;
  projectId: string;
}

export interface ProtokolsProject {
  id: string;
  name: string;
  symbol: string;
  featured: boolean;
  hidden: boolean;
  slug?: string;
  stage?: string;
  website?: string;
  avatarUrl?: string;
  description?: string;
  twitterUsername: string;
  twitterId: string;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  twitterCreatedAt: string;
  coingeckoImageUrl?: string;
  marketCap?: number;
  price?: number;
  contractAddress?: string;
  totalViews: number;
  totalPosts: number;
  mindsharePercent: number;
  mindshareChange24h: number;
  mindshareChange7d: number;
  mindshareChange30d: number;
  mindshareChange90d: number;
  createdAt: string;
  updatedAt: string;
  rewardPools: RewardPool[];
  narrativeLinks?: Narrative[]; // Новое поле
}
