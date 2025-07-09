import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ExternalLink,
  Eye,
  FileText,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  User,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import React from "react";
import { Influencer } from "../../types";
import { getInfluencerDetailData } from "./utils";

interface InfluencerDetailOverlayProps {
  influencer: Influencer | null;
}

const InfluencerDetails: React.FC<InfluencerDetailOverlayProps> = ({
  influencer,
}) => {
  const detailData = getInfluencerDetailData(influencer);

  if (!influencer || !detailData) return null;

  return (
    <div className="w-full transform overflow-hidden rounded-2xl bg-primary-800 p-6 text-left align-middle shadow-xl transition-all border border-primary-700">
      <div className="flex items-center mb-6 pb-4 border-b border-primary-700">
        <img
          src={influencer?.avatarUrl || "/default-avatar.png"}
          alt={influencer.name}
          className="h-16 w-16 rounded-full border-2 border-accent-500"
        />
        <div className="ml-4">
          <div className="text-xl font-bold text-white">{influencer.name}</div>
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
        <div>
          <h4 className="text-lg font-medium text-gray-200 mb-4">
            Account Information
          </h4>

          <div className="mb-6">
            <div className="flex items-start mb-2">
              <User className="h-5 w-5 text-accent-500 mt-0.5" />
              <div className="ml-3">
                <h5 className="text-sm font-medium text-gray-300">Biography</h5>
                <p className="text-gray-400">{detailData?.biography}</p>
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
                    {detailData?.followers}
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
                <UserPlus className="h-5 w-5 text-accent-500" />
                <div className="ml-3">
                  <h6 className="text-xs font-medium text-gray-400">
                    Smart Followers
                  </h6>
                  <p className="text-lg font-bold text-gray-200">
                    {detailData?.smartFollowers || "0"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <UserCog className="h-5 w-5 text-accent-500" />
                <div className="ml-3">
                  <h6 className="text-xs font-medium text-gray-400">
                    Smart Followers Percent
                  </h6>
                  <p className="text-lg font-bold text-gray-200">
                    {detailData?.smartFollowersPercent || "0"}%
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
                    {detailData?.isBusinessAccount ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                {detailData?.accountStatus === "Active" ? (
                  <CheckCircle className="h-5 w-5 text-status-green" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-status-yellow" />
                )}
                <div className="ml-3">
                  <h6 className="text-xs font-medium text-gray-400">
                    Account Status
                  </h6>
                  <p className="text-gray-200">{detailData?.accountStatus}</p>
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
              <p className="text-gray-300">{detailData?.syncStatus}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h6 className="text-xs font-medium text-gray-400 mb-1">
                  Last Sync
                </h6>
                <p className="text-gray-300">
                  {detailData?.lastSync || "Soon"}
                </p>
              </div>

              <div>
                <h6 className="text-xs font-medium text-gray-400 mb-1">
                  Next Sync
                </h6>
                <p className="text-gray-300">
                  {detailData?.nextSync || "Soon"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-6">
            <Calendar className="h-5 w-5 text-accent-500" />
            <div className="ml-3">
              <h6 className="text-xs font-medium text-gray-400">Registered</h6>
              <p className="text-gray-300">{detailData?.twitterRegisterDate}</p>
            </div>
          </div>

          <h5 className="text-md font-medium text-gray-300 mb-3">
            Social Channels
          </h5>
          <div className="bg-primary-700 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <a
                href={detailData?.profileUrl || "/"}
                target="_blank"
                className="flex items-center text-gray-300 hover:text-accent-500"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Profile X
              </a>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-200 mb-4">Analytics</h4>

          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-accent-500" />
            <div className="ml-3">
              <h5 className="text-sm font-medium text-gray-300">Total Posts</h5>
              <div className="flex items-baseline">
                <p className="text-xl font-bold text-gray-200">
                  {detailData?.totalPosts}
                </p>
                <span className="ml-2 text-xs text-gray-400">Lifetime</span>
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
                    {detailData?.engagement?.toFixed(2)}%
                  </p>
                  {detailData?.engagementTrend === "up" && (
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
                    {detailData?.averageLikes?.toLocaleString()}
                  </p>
                  {detailData?.averageLikesTrend === "up" && (
                    <TrendingUp className="h-4 w-4 ml-1 text-status-green" />
                  )}
                </div>
              </div>

              <div>
                <h6 className="text-xs font-medium text-gray-400 mb-1">
                  Posting Frequency
                </h6>
                <p className="text-lg font-bold text-gray-200">
                  {detailData?.postingFrequency}
                </p>
              </div>
            </div>
          </div>

          <h5 className="text-md font-medium text-gray-300 mb-3">
            Total Engagement
          </h5>
          <div className="bg-primary-700 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <Eye className="h-5 w-5 text-white-500 mb-1" />
                <p className="text-xs font-medium text-gray-400">Views</p>
                <p className="text-lg font-bold text-gray-200">
                  {detailData?.views}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Heart className="h-5 w-5 text-red-500 mb-1" />
                <p className="text-xs font-medium text-gray-400">Likes</p>
                <p className="text-lg font-bold text-gray-200">
                  {detailData?.likes}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <MessageCircle className="h-5 w-5 text-blue-500 mb-1" />
                <p className="text-xs font-medium text-gray-400">Comments</p>
                <p className="text-lg font-bold text-gray-200">
                  {detailData?.comments}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Share2 className="h-5 w-5 text-green-500 mb-1" />
                <p className="text-xs font-medium text-gray-400">Retweets</p>
                <p className="text-lg font-bold text-gray-200">
                  {detailData?.retwets}
                </p>
              </div>
            </div>

            {/* <div className="mt-4 pt-4 border-t border-primary-700">
              <div className="flex items-center">
                <Bot className="h-5 w-5 text-accent-500" />
                <div className="ml-3">
                  <h6 className="text-xs font-medium text-gray-400">
                    AI Generated Content
                  </h6>
                  <p className="text-gray-200">
                    {detailData?.aiGeneratedContent}%
                  </p>
                </div>
              </div>
            </div> */}
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
                <p className="text-xs text-gray-400">Avg. Comments/Post</p>
                <p className="text-gray-200 font-medium">
                  {detailData?.avgCommentsPerPost}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Avg. Retweets/Post</p>
                <p className="text-gray-200 font-medium">
                  {detailData?.avgRetweetsPerPost}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Avg. Engagement/Post</p>
                <p className="text-gray-200 font-medium">
                  {detailData?.avgEngagementPerPost}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Engagement Rate</p>
                <p className="text-gray-200 font-medium">
                  {detailData?.engagementRate?.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDetails;
