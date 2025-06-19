export interface KOL {
  id: string;
  rank: number;
  name: string;
  handle: string;
  avatar: string;
  mindshare: number;
  proofOfWork: number;
  proofOfInsight: number;
  proofOfExchange: number;
  smartFollowers: number;
  followers: number;
  moneyScore: number;
  badges: string[];
}

export interface Project {
  id: string;
  rank: number;
  name: string;
  logo: string;
  description: string;
  mindshare: number;
  engagementRate: number;
  kolAttention: number;
  trustScore: number;
  rewardPool: number;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isAuthenticated: boolean;
  mindshare: number;
  rank: number;
  percentile: string;
  rewards: number;
  referrals: number;
  badges: string[];
}
