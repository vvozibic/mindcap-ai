import { Award, Gift, Share2, TrendingUp, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Influencer, User } from "../types";
import InfluencerDetails from "./Infuencer/InfluencerDetails";
import { getInfluencerDetailData } from "./Infuencer/utils";
import { Skeleton } from "./Skeleton";

interface SocialCardProps {
  user: User;
  onLogin: () => void;
}

async function fetchInfluencerByUsername(
  username: string
): Promise<Influencer | null> {
  try {
    const response = await fetch(`/api/influencers/user/${username}`);
    if (!response.ok) throw new Error("Failed to fetch influencer");
    const data: Influencer = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching influencer:", error);
    return null;
  }
}

const SocialCard: React.FC<SocialCardProps> = ({ user, onLogin }) => {
  const [influencer, setInfuencer] = useState<Influencer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.username) {
        const influencer = await fetchInfluencerByUsername(user?.username);
        if (influencer) setInfuencer(influencer);
      } else {
        setFormData({
          id: crypto.randomUUID(),
          name: "",
          username: "",
          avatarUrl: "",
          platform: "",
          followers: "",
          badges: "",
          expertise: "",
          bio: "",
          profileUrl: "",
          mindshare: "",
          pow: "",
          poi: "",
          poe: "",
          smartFollowers: "",
          followersCount: "",
          moneyScore: "",
        });
      }
    };
    fetchData();
  }, [user]);
  const detailData = getInfluencerDetailData(influencer);

  if (!influencer || !detailData || !user) return <Skeleton />;

  if (!user.isAuthenticated) {
    return (
      <div className="bg-primary-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center border border-primary-700">
        <div className="mb-6">
          <Award className="h-16 w-16 text-accent-500 mx-auto" />
          <h2 className="text-2xl font-bold mt-4 text-white">
            Your Social Card
          </h2>
          <p className="text-gray-400 mt-2">
            Sign in to view your personalized attention metrics and rewards
          </p>
        </div>
        <button
          onClick={onLogin}
          className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-6 py-3 rounded-md text-sm font-medium"
        >
          Sign In to View Your Card
        </button>
      </div>
    );
  }

  return influencer && detailData ? (
    <>
      <InfluencerDetails influencer={influencer} />
      <div className="mt-8 border-t border-primary-600 pt-6">
        <h3 className="text-lg font-medium text-gray-200">
          Improve Your Score
        </h3>
        <ul className="mt-3 space-y-3">
          <li className="flex items-start">
            <div className="flex-shrink-0">
              <Users className="h-5 w-5 text-accent-500" />
            </div>
            <p className="ml-3 text-sm text-gray-400">
              Engage with high-quality accounts to boost your Proof-of-Exchange
              score
            </p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0">
              <TrendingUp className="h-5 w-5 text-accent-500" />
            </div>
            <p className="ml-3 text-sm text-gray-400">
              Create original, insightful content to increase your
              Proof-of-Insight metric
            </p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0">
              <Share2 className="h-5 w-5 text-accent-500" />
            </div>
            <p className="ml-3 text-sm text-gray-400">
              Refer other influencers to earn additional rewards and boost your
              ranking
            </p>
          </li>
        </ul>
      </div>
    </>
  ) : (
    <div className="bg-primary-800 rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto border border-primary-700">
      <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-600">
        <div className="flex items-center">
          {/* <img 
            src={user.avatar} 
            alt={user.name} 
            className="h-16 w-16 rounded-full border-2 border-primary-900"
          /> */}
          <div className="ml-4">
            <h2 className="text-xl font-bold text-white">
              {user.email || user.username}
            </h2>
            <p className="text-gray-300">{user.email || user.username}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-700 p-4 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-accent-500" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">
                  Mindshare Score
                </h3>
                {/* <p className="text-2xl font-bold text-gray-200">{user.mindshare}</p> */}
              </div>
            </div>
          </div>

          <div className="bg-primary-700 p-4 rounded-lg">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-accent-500" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">Rank</h3>
                {/* <p className="text-2xl font-bold text-gray-200">#{user.rank} <span className="text-sm font-normal text-gray-400">({user.percentile})</span></p> */}
              </div>
            </div>
          </div>

          <div className="bg-primary-700 p-4 rounded-lg">
            <div className="flex items-center">
              <Gift className="h-8 w-8 text-accent-500" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">
                  Rewards Earned
                </h3>
                {/* <p className="text-2xl font-bold text-gray-200">${user.rewards.toLocaleString()}</p> */}
              </div>
            </div>
          </div>

          <div className="bg-primary-700 p-4 rounded-lg">
            <div className="flex items-center">
              <Share2 className="h-8 w-8 text-accent-500" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">Referrals</h3>
                {/* <p className="text-2xl font-bold text-gray-200">{user.referrals}</p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-200">Achievements</h3>
          {/* <div className="flex flex-wrap gap-2 mt-2">
            {user.badges.map((badge, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-accent-500"
              >
                {badge}
              </span>
            ))}
          </div> */}
        </div>

        <div className="mt-8 border-t border-primary-600 pt-6">
          <h3 className="text-lg font-medium text-gray-200">
            Improve Your Score
          </h3>
          <ul className="mt-3 space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <Users className="h-5 w-5 text-accent-500" />
              </div>
              <p className="ml-3 text-sm text-gray-400">
                Engage with high-quality accounts to boost your
                Proof-of-Exchange score
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-accent-500" />
              </div>
              <p className="ml-3 text-sm text-gray-400">
                Create original, insightful content to increase your
                Proof-of-Insight metric
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <Share2 className="h-5 w-5 text-accent-500" />
              </div>
              <p className="ml-3 text-sm text-gray-400">
                Refer other influencers to earn additional rewards and boost
                your ranking
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
