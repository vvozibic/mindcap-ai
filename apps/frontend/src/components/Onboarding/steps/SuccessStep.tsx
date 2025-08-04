import { CheckIcon, Copy, Share, TrendingUp, Trophy } from "lucide-react";
import { useState } from "react";
import { KOL, User } from "../../../types";
import HolographicCard from "../../HolographicCard";
import XLogo from "../../XLogo";

export default function SuccessStep({
  user,
  kol,
}: {
  user: User | null;
  kol: KOL | null;
}) {
  const [copied, setCopied] = useState(false);

  const referralLink = `${window.location.origin}?ref=${user?.referralCode}`;
  const tweetText = `gm%0A%0Aexploring new InfoFi meta for creators on @MindoAI%0A%0A(probably nothing)%0A%0A${referralLink}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fadeIn text-center space-y-6 md:space-y-8">
      <Trophy className="hidden md:block w-16 h-16 mx-auto text-yellow-400" />
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        Congratulations! 🎉
      </h1>
      <p className="text-l md:text-xl text-gray-400">
        You’ve earned your Mindo AI Badge
      </p>

      <div className="onboarding-card">
        <h3 className="text-2xl font-bold">Early n-Badge</h3>
        <p className="text-lg text-gray-300">Successfully Claimed</p>

        <div className="flex justify-center max-w-[380px] mx-auto pt-6">
          <HolographicCard>
            <div className="flex h-[400px] justify-center flex-col items-center text-center text-white">
              {/* Аватар */}
              <img
                src={kol?.twitterAvatarUrl || ""}
                alt="avatar"
                className="w-20 h-20 rounded-full border-2 border-white/20 shadow-lg"
              />

              {/* Имя и ник */}
              <div className="mt-2 mb-12">
                <h2 className="text-2xl font-bold">
                  {kol?.twitterDisplayName}
                </h2>
                <p className="text-gray-300">@{kol?.twitterUsername}</p>
              </div>

              {/* Метрики */}
              <div className="grid grid-cols-2 gap-6 mt-4 text-sm font-medium">
                <div>
                  <p className="text-green-300 text-xl font-semibold">
                    {kol?.twitterFollowersCount}
                  </p>
                  <span className="text-gray-300">Followers</span>
                </div>
                <div>
                  <p className="text-blue-400 text-xl font-semibold">
                    {kol?.engagementRate
                      ? `${kol.engagementRate.toFixed(2)}%`
                      : "-"}
                  </p>
                  <span className="text-gray-300">Engagement</span>
                </div>
                <div>
                  <p className="text-purple-400 text-xl font-semibold">
                    {kol?.totalAccountPosts}
                  </p>
                  <span className="text-gray-300">Impressions</span>
                </div>
                <div>
                  <p className="text-cyan-400 text-xl font-semibold">
                    {kol?.totalAccountViews}
                  </p>
                  <span className="text-gray-300">Views</span>
                </div>
              </div>
            </div>
          </HolographicCard>
        </div>
      </div>

      {/* <button className="onboarding-secondary w-full">
        <Copy className="w-4 h-4" /> Copy Badge
      </button> */}

      <a
        href={`https://twitter.com/intent/tweet?text=${tweetText}`}
        target="_blank"
        className="block"
      >
        <button className="onboarding-primary w-full">
          <XLogo className="w-6 h-6" /> Share on X <Share className="w-5 h-5" />
        </button>
      </a>

      <button className="onboarding-secondary w-full" onClick={handleCopyLink}>
        {copied ? (
          <CheckIcon className="h-5 w-5" />
        ) : (
          <Copy className="w-5 h-5" />
        )}
        Copy Referral Link
      </button>

      <a className="block" href="/social-card">
        <button className="onboarding-additional w-full">
          <TrendingUp className="w-5 h-5" /> View Dashboard
        </button>
      </a>

      <p className="text-gray-400">
        Your referral code:{" "}
        <span className="font-mono font-semibold">{user?.referralCode}</span>
      </p>
    </div>
  );
}
