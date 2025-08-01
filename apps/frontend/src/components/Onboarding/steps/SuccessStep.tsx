import { CheckIcon, Copy, Share, TrendingUp, Trophy } from "lucide-react";
import { useState } from "react";
import { User } from "../../../types";
import HolographicCard from "../../HolographicCard";
import XLogo from "../../XLogo";

export default function SuccessStep({ user }: { user: User }) {
  const [copied, setCopied] = useState(false);

  const referralLink = `${window.location.origin}?ref=${user.referralCode}`;
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

        <div className="flex justify-center items-center my-6">
          <HolographicCard badge>
            <img
              src={user.avatarUrl}
              className="relative w-10 h-10 rounded-full"
            />
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
        <span className="font-mono font-semibold">{user.referralCode}</span>
      </p>
    </div>
  );
}
