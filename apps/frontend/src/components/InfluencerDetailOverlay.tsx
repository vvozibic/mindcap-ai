import { Dialog, Transition } from "@headlessui/react";
import {
  AlertCircle,
  Bot,
  Calendar,
  CheckCircle,
  FileText,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  User,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import React, { Fragment } from "react";
import { Influencer } from "../types";

interface InfluencerDetailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  influencer: Influencer | null;
  allInfluencers: Influencer[];
}

interface InfluencerDetailData {
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
  comments: number;
  retwets: number;
  aiGeneratedContent: number;
  avgCommentsPerPost: string;
  avgRetweetsPerPost: string;
  avgEngagementPerPost: string;
  engagementRate: number;
}

// This would normally come from your API or data source
// Here we're creating mock data based on the KOL
const getInfluencerDetailData = (
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
    postingFrequency: "0.6/day",
    likes: kol?.totalLikes,
    comments: kol?.totalComments,
    retwets: kol?.totalRetweets,
    aiGeneratedContent: 0,
    avgCommentsPerPost: Number(
      kol?.totalComments / kol?.tweetsCountNumeric || 0
    ).toFixed(4),
    avgRetweetsPerPost: Number(
      kol?.totalRetweets / kol?.tweetsCountNumeric || 0
    ).toFixed(4),
    avgEngagementPerPost: Number(
      kol?.engagementRate / kol?.tweetsCountNumeric || 0
    ).toFixed(4),
    engagementRate: kol?.engagementRate,
  };
};

const InfluencerDetailOverlay: React.FC<InfluencerDetailOverlayProps> = ({
  isOpen,
  onClose,
  influencer,
}) => {
  const detailData = getInfluencerDetailData(influencer);

  if (!influencer || !detailData) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-primary-800 p-6 text-left align-middle shadow-xl transition-all border border-primary-700">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-300"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center mb-6 pb-4 border-b border-primary-700">
                  <img
                    src={influencer?.avatarUrl || "/default-avatar.png"}
                    alt={influencer.name}
                    className="h-16 w-16 rounded-full border-2 border-accent-500"
                  />
                  <div className="ml-4">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-white"
                    >
                      {influencer.name}
                    </Dialog.Title>
                    <p className="text-gray-300">{influencer.username}</p>
                    <div className="flex mt-1 space-x-1">
                      {influencer.badges?.split(",").map((badge, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-600 text-accent-500"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column - Account Information */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-200 mb-4">
                      Account Information
                    </h4>

                    <div className="mb-6">
                      <div className="flex items-start mb-2">
                        <User className="h-5 w-5 text-accent-500 mt-0.5" />
                        <div className="ml-3">
                          <h5 className="text-sm font-medium text-gray-300">
                            Biography
                          </h5>
                          <p className="text-gray-400">
                            {detailData.biography}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h5 className="text-md font-medium text-gray-300 mb-3">
                      Social Statistics
                    </h5>
                    <div className="bg-primary-700 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-accent-500" />
                          <div className="ml-3">
                            <h6 className="text-xs font-medium text-gray-400">
                              Followers
                            </h6>
                            <p className="text-lg font-bold text-gray-200">
                              {detailData.followers}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <UserCheck className="h-5 w-5 text-accent-500" />
                          <div className="ml-3">
                            <h6 className="text-xs font-medium text-gray-400">
                              Following
                            </h6>
                            <p className="text-lg font-bold text-gray-200">
                              {detailData?.following || "0"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="h-5 w-5 flex items-center justify-center text-accent-500">
                            <span className="text-xs font-bold">B</span>
                          </div>
                          <div className="ml-3">
                            <h6 className="text-xs font-medium text-gray-400">
                              Business Account
                            </h6>
                            <p className="text-gray-200">
                              {detailData.isBusinessAccount ? "Yes" : "No"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          {detailData.accountStatus === "Active" ? (
                            <CheckCircle className="h-5 w-5 text-status-green" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-status-yellow" />
                          )}
                          <div className="ml-3">
                            <h6 className="text-xs font-medium text-gray-400">
                              Account Status
                            </h6>
                            <p className="text-gray-200">
                              {detailData.accountStatus}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h5 className="text-md font-medium text-gray-300 mb-3">
                      Sync Status
                    </h5>
                    <div className="bg-primary-700 rounded-lg p-4 mb-6">
                      <div className="flex items-center mb-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <p className="text-gray-300">{detailData.syncStatus}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h6 className="text-xs font-medium text-gray-400 mb-1">
                            Last Sync
                          </h6>
                          <p className="text-gray-300">
                            {detailData.lastSync || "Soon"}
                          </p>
                        </div>

                        <div>
                          <h6 className="text-xs font-medium text-gray-400 mb-1">
                            Next Sync
                          </h6>
                          <p className="text-gray-300">
                            {detailData.nextSync || "Soon"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mt-6">
                      <Calendar className="h-5 w-5 text-accent-500" />
                      <div className="ml-3">
                        <h6 className="text-xs font-medium text-gray-400">
                          Last Updated
                        </h6>
                        <p className="text-gray-300">
                          {detailData.lastUpdated}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Analytics */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-200 mb-4">
                      Analytics
                    </h4>

                    <div className="flex items-center mb-4">
                      <FileText className="h-5 w-5 text-accent-500" />
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-gray-300">
                          Total Posts
                        </h5>
                        <div className="flex items-baseline">
                          <p className="text-xl font-bold text-gray-200">
                            {detailData.totalPosts}
                          </p>
                          <span className="ml-2 text-xs text-gray-400">
                            Lifetime
                          </span>
                        </div>
                      </div>
                    </div>

                    <h5 className="text-md font-medium text-gray-300 mb-3">
                      Key Metrics
                    </h5>
                    <div className="bg-primary-700 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h6 className="text-xs font-medium text-gray-400 mb-1">
                            Engagement
                          </h6>
                          <div className="flex items-center">
                            <p className="text-lg font-bold text-gray-200">
                              {detailData.engagement.toFixed(2)}%
                            </p>
                            {detailData.engagementTrend === "up" && (
                              <TrendingUp className="h-4 w-4 ml-1 text-status-green" />
                            )}
                          </div>
                        </div>

                        <div>
                          <h6 className="text-xs font-medium text-gray-400 mb-1">
                            Average Likes
                          </h6>
                          <div className="flex items-center">
                            <p className="text-lg font-bold text-gray-200">
                              {detailData.averageLikes.toLocaleString()}
                            </p>
                            {detailData.averageLikesTrend === "up" && (
                              <TrendingUp className="h-4 w-4 ml-1 text-status-green" />
                            )}
                          </div>
                        </div>

                        <div>
                          <h6 className="text-xs font-medium text-gray-400 mb-1">
                            Posting Frequency
                          </h6>
                          <p className="text-lg font-bold text-gray-200">
                            {detailData.postingFrequency}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h5 className="text-md font-medium text-gray-300 mb-3">
                      Total Engagement
                    </h5>
                    <div className="bg-primary-700 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center">
                          <Heart className="h-5 w-5 text-red-500 mb-1" />
                          <p className="text-xs font-medium text-gray-400">
                            Likes
                          </p>
                          <p className="text-lg font-bold text-gray-200">
                            {detailData.likes}
                          </p>
                        </div>

                        <div className="flex flex-col items-center">
                          <MessageCircle className="h-5 w-5 text-blue-500 mb-1" />
                          <p className="text-xs font-medium text-gray-400">
                            Comments
                          </p>
                          <p className="text-lg font-bold text-gray-200">
                            {detailData.comments}
                          </p>
                        </div>

                        <div className="flex flex-col items-center">
                          <Share2 className="h-5 w-5 text-green-500 mb-1" />
                          <p className="text-xs font-medium text-gray-400">
                            Retweets
                          </p>
                          <p className="text-lg font-bold text-gray-200">
                            {detailData.retwets}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-primary-600">
                        <div className="flex items-center">
                          <Bot className="h-5 w-5 text-accent-500" />
                          <div className="ml-3">
                            <h6 className="text-xs font-medium text-gray-400">
                              AI Generated Content
                            </h6>
                            <p className="text-gray-200">
                              {detailData.aiGeneratedContent}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h5 className="text-md font-medium text-gray-300 mb-3">
                      Engagement Analytics
                    </h5>
                    <div className="bg-primary-700 rounded-lg p-4">
                      <h6 className="text-xs font-medium text-gray-400 mb-3">
                        Per-Post Performance
                      </h6>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400">
                            Avg. Comments/Post
                          </p>
                          <p className="text-gray-200 font-medium">
                            {detailData.avgCommentsPerPost}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">
                            Avg. Retweets/Post
                          </p>
                          <p className="text-gray-200 font-medium">
                            {detailData.avgRetweetsPerPost}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">
                            Avg. Engagement/Post
                          </p>
                          <p className="text-gray-200 font-medium">
                            {detailData.avgEngagementPerPost}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">
                            Engagement Rate
                          </p>
                          <p className="text-gray-200 font-medium">
                            {detailData.engagementRate.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InfluencerDetailOverlay;
