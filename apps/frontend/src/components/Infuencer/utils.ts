import { Influencer } from "../../types";
import { daysBetween } from "../../utils/daysBetween";

export interface InfluencerDetailData {
  biography: string;
  followers: number;
  following: number;
  isBusinessAccount: boolean;
  accountStatus: "Active" | "Inactive" | "Suspended";
  syncStatus: "Idle" | "Syncing" | "Failed";
  lastSync: string | null;
  nextSync: string | null;
  lastUpdated: string;
  totalPosts: number;
  engagement: number;
  engagementTrend: "up" | "down" | "neutral";
  averageLikes: number;
  averageLikesTrend: "up" | "down" | "neutral";
  postingFrequency: string;
  likes: number;
  views: number;
  comments: number;
  retwets: number;
  profileUrl: string;
  twitterRegisterDate: string;
  aiGeneratedContent: number;
  avgCommentsPerPost: string;
  avgRetweetsPerPost: string;
  avgEngagementPerPost: string;
  engagementRate: number;
}

export const getInfluencerDetailData = (
  kol: Influencer | null
): InfluencerDetailData | null => {
  if (!kol) return null;

  return {
    biography: kol?.bio || "No biography available",
    followers: Number(kol?.followersCountNumeric || 1000),
    following: Number(kol?.followingsNumeric || 100),
    isBusinessAccount: kol?.businessAccount || false,
    accountStatus: "Active",
    syncStatus: "Idle",
    lastSync: kol?.updatedAt ? new Date(kol?.updatedAt).toLocaleString() : "",
    nextSync: "",
    lastUpdated: kol?.updatedAt
      ? new Date(kol?.updatedAt).toLocaleString()
      : "",
    totalPosts: kol?.tweetsCountNumeric || 1000,
    engagement: kol?.engagementRate,
    engagementTrend: kol?.engagementRate > 0 ? "up" : "down",
    averageLikes: kol?.avgLikes,
    averageLikesTrend: "up",
    postingFrequency: `~${Number(
      kol?.tweetsCountNumeric / daysBetween(kol.twitterRegisterDate, new Date())
    )?.toFixed(0)}/day`,
    likes: kol?.totalLikes,
    views: kol?.totalViews,
    comments: kol?.totalComments,
    retwets: kol?.totalRetweets,
    aiGeneratedContent: 0,
    avgCommentsPerPost: Number(
      kol?.totalComments / kol?.tweetsCountNumeric || 0
    )?.toFixed(4),
    avgRetweetsPerPost: Number(
      kol?.totalRetweets / kol?.tweetsCountNumeric || 0
    )?.toFixed(4),
    avgEngagementPerPost: Number(
      kol?.engagementRate / kol?.tweetsCountNumeric || 0
    )?.toFixed(4),
    engagementRate: kol?.engagementRate,
    twitterRegisterDate: new Date(kol.twitterRegisterDate).toLocaleDateString(),
    profileUrl: kol?.profileUrl || "",
  };
};
