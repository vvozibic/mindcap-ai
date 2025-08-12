import domtoimage from "dom-to-image";
import { useRef } from "react";
import { KOL, User } from "../types";
import HoloButton from "./HoloButton";

interface PointsBoostProps {
  multiplier?: number;
}

export function PointsBoost({ multiplier }: PointsBoostProps) {
  return (
    <div className=" top-[10px] right-[10px] flex flex-col items-center text-green-400">
      <div className="flex items-end gap-1 pt-6">
        {/* <Zap className="w-4 h-4 text-green-400" /> */}
        <span className="text-sm font-medium">Points Boost</span>
        <span className="text-md font-semibold">x{multiplier?.toFixed(1)}</span>
      </div>
    </div>
  );
}

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

    // ✅ Сохраняем оригинальные стили
    const originalBg = node.style.background;
    const originalClip = node.style.clipPath;
    const originalOverflow = node.style.overflow;
    const originalWhiteSpace = node.style.whiteSpace;

    // 🟢 Фиксы для dom-to-image
    node.style.background = `linear-gradient(
      153deg,
      #030b06 7%,
      #052010 24%,
      #071b10 31%,
      #06180f 44%,
      #05130c 54%,
      #072114 65%,
      #083018 86%,
      #051c0f 98%
    )`; // фон карточки
    node.style.overflow = "hidden"; // обрезка углов
    node.style.clipPath = "inset(0 round 16px)"; // гарантируем border-radius
    node.style.whiteSpace = "nowrap"; // предотвращаем перенос текста

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
        // 🔄 Восстанавливаем стили
        node.style.background = originalBg;
        node.style.overflow = originalOverflow;
        node.style.clipPath = originalClip;
        node.style.whiteSpace = originalWhiteSpace;

        // ✅ Скачивание файла
        const link = document.createElement("a");
        link.download = `${user?.username}-mindo-social-card.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("❌ Error saving social card:", err);
        // 🔄 Восстанавливаем стили даже в случае ошибки
        node.style.background = originalBg;
        node.style.overflow = originalOverflow;
        node.style.clipPath = originalClip;
        node.style.whiteSpace = originalWhiteSpace;
      });
  };

  const wallet = user?.wallets?.find(
    (w) => w.address === (user?.primaryWallet?.address || "")
  );
  const rubyWalletScore = wallet?.rubyWalletScore || 0;
  const nomisWalletScore = wallet?.nomisWalletScore || 0;
  const walletScore = Number(rubyWalletScore + nomisWalletScore * 100);

  return (
    <div className="flex flex-col">
      <div
        ref={cardRef}
        className="relative w-[320px] rounded-2xl pt-8 pb-6 px-8 text-white bg-mindo-gradient
      border border-[#16653480] text-center text-white shadow-lg"
      >
        <div className="absolute top-5 right-5 text-sm text-green-400">
          #{user?.id}
        </div>
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

        <HoloButton badge={user?.badges?.[0]} />

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
            <p className="text-2xl font-bold">
              {walletScore ? walletScore?.toFixed(2) : "–"}
            </p>
            <p className="text-gray-400 text-xs">Wallet Score</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              {kol?.engagementRate ? `${kol.engagementRate.toFixed(2)}%` : "-"}
            </p>
            <p className="text-gray-400 text-xs">Engagement</p>
          </div>
        </div>
        <PointsBoost multiplier={user?.baseMultiplier} />
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
