import {
  Award,
  CheckCircle,
  ExternalLink,
  Gift,
  Share2,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { KOL, User } from "../types";
import InfluencerDetails from "./KOL/KOLDetails";
import { getKOLDetailData } from "./KOL/utils";
import { Skeleton } from "./Skeleton";
import XLogo from "./XLogo";

interface SocialCardProps {
  user: User;
  onLogin: () => void;
}

async function fetchInfluencerByUsername(
  username: string
): Promise<KOL | null> {
  try {
    const response = await fetch(`/api/influencers/user/${username}`);
    if (!response.ok) throw new Error("Failed to fetch influencer");
    const data: KOL = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching influencer:", error);
    return null;
  }
}

const SocialCard: React.FC<SocialCardProps> = ({ user, onLogin }) => {
  const [kol, setKol] = useState<KOL | null>(null);

  const [copied, setCopied] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const referralLink = "https://community.scade.xyz/?ref=oAxdQ5X";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };

  const handleCloseModal = () => {
    setShowWalletModal(false);
  };

  const handleWalletSelect = (walletName: string) => {
    console.log(`Connecting to ${walletName}`);
    // Handle wallet connection logic here
    setShowWalletModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user?.username) {
        const kol = await fetchInfluencerByUsername(user?.username);
        if (kol) setKol(kol);
      }
    };
    fetchData();
  }, [user]);
  const detailData = getKOLDetailData(kol);

  if (!user.isAuthenticated) {
    return (
      <div className="bg-primary-800/70 relative z-10 rounded-lg shadow-lg p-8 max-w-2xl mx-auto backdrop-blur-sm  text-center border border-primary-700/20">
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
          className="flex items-center mx-auto bg-accent-500 hover:bg-accent-600 text-primary-900 px-6 py-3 rounded-md text-sm font-medium"
        >
          Login with <XLogo className="h-4 w-4 ml-1 mr-1" /> to View Your Card
        </button>
      </div>
    );
  }

  if (!kol || !detailData || !user) return <Skeleton />;

  return kol && detailData ? (
    <>
      <div className="mx-auto space-y-8 mb-8">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
          {/* Referral Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Referrals Count */}
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-accent-500 mr-2" />
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  REFERRALS
                </span>
              </div>
              <p className="text-3xl font-bold text-white">0</p>
            </div>

            {/* Earned Points */}
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  EARNED
                </span>
              </div>
              <p className="text-3xl font-bold text-white">0 POINTS</p>
            </div>

            {/* X Score */}
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center mb-2">
                <XLogo className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-gray-400">
                  X score
                </span>
              </div>
              <p className="text-3xl font-bold text-white">
                {kol?.kolScore?.toLocaleString()}
              </p>
            </div>

            {/* Wallet Score */}
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center mb-2">
                <Wallet className="h-5 w-5 text-orange-400 mr-2" />
                <span className="text-sm font-medium text-gray-400">
                  Wallet score
                </span>
              </div>
              <p className="text-3xl font-bold text-white">0</p>
            </div>

            {/* Completed Tasks */}
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-accent-500 mr-2" />
                <span className="text-sm font-medium text-gray-400">
                  Completed tasks
                </span>
              </div>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
          </div>
        </div>

        {/* Tasks Block - 3 Columns with Equal Height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Mission */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-accent-500 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold text-sm mr-3">
                1
              </div>
              <h3 className="text-lg font-bold text-white">
                First mission: Follow us on X
              </h3>
            </div>

            <p className="text-gray-400 mb-6 flex-grow">
              Hit follow — and stay tuned for the next tasks and leaderboard
              drops.
            </p>

            <button className="w-full bg-accent-500 hover:bg-accent-600 text-black py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors mt-auto">
              <XLogo className="h-5 w-5 mr-2" />
              Follow us on X
            </button>
          </div>

          {/* Second Mission */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-accent-500 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold text-sm mr-3">
                2
              </div>
              <h3 className="text-lg font-bold text-white">
                Second mission: Add friend via your referral link
              </h3>
            </div>

            <div className="mb-4 flex-grow">
              <div className="flex items-center bg-black/30 rounded-lg p-3 border border-gray-700 mb-3">
                <span className="text-gray-300 font-mono text-sm flex-1 truncate">
                  mindo.ref.link
                </span>
                <button
                  onClick={handleCopyLink}
                  className="ml-2 p-2 bg-accent-500 hover:bg-accent-600 text-black rounded-lg transition-colors"
                  title="Copy link"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button className="w-full bg-accent-500 hover:bg-accent-600 text-black py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors mt-auto">
              <UserPlus className="h-5 w-5 mr-2" />
              Invite your friends
            </button>
          </div>

          {/* Third Mission - Connect Wallet */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-accent-500 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold text-sm mr-3">
                3
              </div>
              <h3 className="text-lg font-bold text-white">
                Third mission: Connect your wallet
              </h3>
            </div>

            <p className="text-gray-400 mb-6 flex-grow">
              Connect your wallet to unlock exclusive rewards and track your
              achievements.
            </p>

            <button
              onClick={handleConnectWallet}
              className="w-full bg-accent-500 hover:bg-accent-600 text-black py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors mt-auto"
            >
              <Wallet className="h-5 w-5 mr-2" />
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
      <InfluencerDetails kol={kol} />
      <div className="mt-8  pt-6">
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

        <div className="mt-8 pt-6">
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

      {showWalletModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Connect the wallet
              </h2>

              <div className="space-y-4">
                {/* Metamask */}
                <button
                  onClick={() => handleWalletSelect("Metamask")}
                  className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl p-4 flex items-center justify-between transition-colors"
                >
                  <span className="text-lg font-medium text-gray-700">
                    Metamask
                  </span>
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🦊</span>
                  </div>
                </button>

                {/* Coinbase Wallet */}
                <button
                  onClick={() => handleWalletSelect("Coinbase Wallet")}
                  className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl p-4 flex items-center justify-between transition-colors"
                >
                  <span className="text-lg font-medium text-gray-700">
                    Coinbase Wallet
                  </span>
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </button>

                {/* Portis */}
                <button
                  onClick={() => handleWalletSelect("Portis")}
                  className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl p-4 flex items-center justify-between transition-colors"
                >
                  <span className="text-lg font-medium text-gray-700">
                    Portis
                  </span>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-700 rounded transform rotate-45"></div>
                  </div>
                </button>

                {/* Wallet Connect */}
                <button
                  onClick={() => handleWalletSelect("Wallet Connect")}
                  className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl p-4 flex items-center justify-between transition-colors"
                >
                  <span className="text-lg font-medium text-gray-700">
                    Wallet Connect
                  </span>
                  <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Terms */}
              <p className="text-center text-gray-500 text-sm mt-8">
                By connecting a wallet, you agree to our Terms
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialCard;
