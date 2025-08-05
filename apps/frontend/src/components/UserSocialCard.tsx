import domtoimage from "dom-to-image";
import { useRef } from "react";
import { KOL, User } from "../types";
import HoloButton from "./HoloButton";

export default function UserSocialCard({
  user,
  kol,
}: {
  user: User | null;
  kol: KOL | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    const node = cardRef.current;
    if (!node) return;
    domtoimage
      .toPng(node, {
        width: node.offsetWidth * 2,
        height: node.offsetHeight * 2,
        style: {
          transform: "scale(2)",
          transformOrigin: "top left",
          width: node.offsetWidth + "px",
          height: node.offsetHeight + "px",
        },
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${user?.username}-mindo-social-card.png`;
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div className="flex flex-col">
      <div
        ref={cardRef}
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

        <HoloButton />

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
      <button
        onClick={handleSave}
        className="mt-4 bg-accent-500 mx-auto min-w-[100px] text-center hover:bg-accent-600 text-primary-900 px-4 py-2 rounded-md text-sm font-medium flex justify-center align-center items-center"
      >
        Save
      </button>
    </div>
  );
}
