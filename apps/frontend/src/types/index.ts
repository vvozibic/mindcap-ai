export interface Project {
  id: string;
  stage?: string;

  featured: boolean;
  hidden: boolean;

  mindshare: number;

  twitterId: string;
  twitterUsername: string;
  twitterDisplayName: string;
  twitterAvatarUrl: string;
  twitterDescription: string;
  twitterDescriptionLink?: string;
  twitterFollowersCount: number;
  twitterFollowingCount: number;
  twitterIsVerified: boolean;
  twitterGoldBadge?: boolean;
  twitterLang: string;
  twitterCreatedAt: string;

  coinSymbol: string;
  coinMarketCap: number;
  coinPrice: number;
  coinContractAddress?: string;
  coinName: string;
  coinImageUrl?: string;

  createdAt: string;
  updatedAt: string;
  fetchedAt: string;

  narrativeLinks: Narrative[];
}

export interface Kol {
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

  postingFrequency?: string;

  mindshareNum: number;
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

  project: Project;
  projectId: string;
}
