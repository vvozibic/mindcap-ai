import { Zap } from "lucide-react";

export default function HoloButton({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="holo-btn flex items-center justify-center mx-auto px-6 py-2 rounded-[8px] gap-2 text-lg font-semibold text-white"
    >
      <Zap className="w-5 h-5 text-emerald-400" />
      <span>
        <span className="text-emerald-400">Mindo</span> Early Believer
      </span>
    </div>
  );
}
