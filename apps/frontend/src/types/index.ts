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

  rewardPools: RewardPool[];

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
export interface KOL {
  id: string;

  twitterId: string;
  twitterUsername: string;
  twitterDisplayName: string;
  twitterAvatarUrl: string | null;
  twitterDescription: string | null;
  twitterFollowersCount: number;
  twitterFollowingCount: number;
  twitterIsVerified: boolean;
  twitterLang: string;
  twitterGoldBadge: boolean | null;
  twitterCreatedAt: string; // ISO string

  // Frontend specific
  kolScorePercentFromTotal?: number;
  postingFrequency?: string;

  kolScore: number | null;
  smartFollowersCount: number | null;
  followersChange: number | null;
  smartEngagement: number | null;
  smartEngagementChange: number | null;
  engagementRate: number | null;
  avgViews: number | null;
  avgLikes: number | null;
  threadsCount: number | null;
  totalPosts: number | null;
  totalViews: number | null;
  totalInteractions: number | null;
  totalOrganicPosts: number | null;
  totalOrganicViews: number | null;
  totalOrganicInteractions: number | null;
  totalAccountPosts: number | null;
  totalAccountViews: number | null;
  totalAccountInteractions: number | null;
  totalAccountComments: number | null;
  totalAccountLikes: number | null;
  totalAccountRetweets: number | null;
  totalAccountReplies: number | null;
  totalPostsChange: number | null;
  totalViewsChange: number | null;
  totalInteractionsChange: number | null;

  mindoMetric: number;
  proofOfWork: number;
  qualityScore: number;

  projects: any;

  fetchedAt: string; // ISO string
  createdAt: string;
  updatedAt: string;
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
  referralCode?: string;
  referrals?: User[];
  onboardingStep?: number;
  completedTasks?: number;
  primaryWallet?: Wallet;
  wallets: Array<{
    rubyWalletScore: number;
    nomisWalletScore: number;
    address: string;
  }>;
  platform?: "twitter";
  baseMultiplier: number;
  earnedPoints?: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  badge: {
    slug: string;
    label: string;
    description: string;
    iconUrl: string;
    defaultPriority: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Wallet {
  address: string;
  chain: string;
  createdAt: string;
  explorer: string;
  id: number;
  label: string;
  symbol: string;
  userId: number;
  rubyWalletScore: number;
  verified: Boolean;
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

export interface RewardSubmission {
  id: string;
  kol: KOL;
  contentUrl: string;
  notes: string;
  status: RewardSubmissionStatus;
  rewardPool: RewardPool;
}
export type RewardSubmissionStatus = "pending" | "approved" | "rejected";
