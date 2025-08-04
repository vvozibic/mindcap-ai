import { Zap } from "lucide-react";
import { KOL, User } from "../types";

export default function UserSocialCard({
  user,
  kol,
}: {
  user: User | null;
  kol: KOL | null;
}) {
  return (
    <div
      className="w-[320px] rounded-2xl pt-8 pb-12 px-8 text-white bg-mindo-gradient
      border border-[#16653480] text-center text-white shadow-lg"
    >
      {/* Top link */}
      <p className="text-xs text-gray-400 mb-12">
        Social Card on <span className="text-green-400">mindoshare.ai</span>
      </p>

      {/* Avatar */}
      <img
        src={user?.avatarUrl}
        alt="avatar"
        className="w-20 h-20 rounded-full mx-auto mb-3 border border-gray-700"
      />

      {/* Name */}
      <h2 className="text-xl font-bold">{kol?.twitterDisplayName}</h2>
      <p className="text-gray-400 text-sm mb-8">@{kol?.twitterUsername}</p>

      {/* Badge */}
      <button className="bg-accent-500 mx-auto mt-2 hover:bg-accent-600 text-primary-900 px-4 py-2 rounded-md text-sm font-medium flex gap-2 items-center">
        <Zap className="w-4 h-4" />
        Mindo Early Believer
      </button>
      {/* <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-500/90 text-black font-semibold text-sm mt-4">
        
      </div> */}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-y-4 mt-6 max-w-[70%] mx-auto">
        <div>
          <p className="text-2xl font-bold">{kol?.twitterFollowersCount}</p>
          <p className="text-gray-400 text-xs">Followers</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{kol?.kolScore}</p>
          <p className="text-gray-400 text-xs">KOL Score</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{kol?.totalAccountPosts}</p>
          <p className="text-gray-400 text-xs">Impressions</p>
        </div>
        <div>
          <p className="text-2xl font-bold">
            {kol?.engagementRate ? `${kol.engagementRate.toFixed(2)}%` : "-"}
          </p>
          <p className="text-gray-400 text-xs">Engagement</p>
        </div>
      </div>
    </div>
  );
}
