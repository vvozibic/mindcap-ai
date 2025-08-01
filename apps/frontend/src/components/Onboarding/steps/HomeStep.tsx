import { ArrowRight, User, Wallet } from "lucide-react";
import HolographicCard from "../../HolographicCard";
import XLogo from "../../XLogo";
import { Step } from "../Onboarding";

export default function HomeStep({
  onNext,
  onStep,
}: {
  onNext: () => void;
  onStep: (step: Step) => void;
}) {
  return (
    <div className="animate-fadeIn text-center space-y-8">
      <h1 className="text-2xl md:text-3xl mt-2 md:mt-6 font-bold text-white">
        Welcome to Mindo
      </h1>
      <p className="text-gray-400 text-lg">
        Your first step toward the identity layer.
      </p>

      <div className="flex justify-center items-center mb-16">
        <HolographicCard badge>
          <User
            className="relative w-10 h-10 text-green-400"
            strokeWidth={1.5}
          />
        </HolographicCard>
      </div>

      {/* <Badge large /> */}

      <p className="italic text-gray-400">
        The chain of identity starts with you.
      </p>

      <div className="space-y-4">
        <p className="text-gray-300">Verify using one of the options:</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="onboarding-btn" onClick={() => onStep("connect")}>
            <XLogo className="w-6 h-6 mb-1" /> X profile
          </button>
          <button className="onboarding-btn">
            <Wallet className="w-6 h-6 mb-1" /> Wallet
          </button>
        </div>
      </div>

      <button onClick={onNext} className="onboarding-primary mx-auto">
        Get Started <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
