import { Zap } from "lucide-react";
import { FC } from "react";
import HolographicCard from "./HolographicCard";

interface HoloBadgeButtonProps {
  onClick?: () => void;
  label?: string;
  highlight?: string;
}

const HoloBadgeButton: FC<HoloBadgeButtonProps> = ({
  onClick,
  label = "Mindo Early Believer",
  highlight = "Mindo",
}) => {
  const [first, ...rest] = label.split(" ");

  return (
    <HolographicCard badge enableTilt={false} className="btn">
      <button
        onClick={onClick}
        className="flex items-center gap-2 text-base font-semibold text-white relative z-10"
      >
        <Zap className="w-4 h-4 text-green-400" strokeWidth={2.5} />
        <span className="text-green-400">{highlight || first}</span>
        <span>{rest.join(" ")}</span>
      </button>
    </HolographicCard>
  );
};

export default HoloBadgeButton;
