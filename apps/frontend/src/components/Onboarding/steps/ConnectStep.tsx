import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getReferralCode } from "../../../hooks/useReferral";
import XLogo from "../../XLogo";

export default function ConnectStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const ref = getReferralCode();
  const linkToConnect = ref
    ? `/api/auth/twitter?redirectAfterCallback=/?step=wallet&ref=${ref}`
    : "/api/auth/twitter?redirectAfterCallback=/?step=wallet";

  return (
    <div className="animate-slide text-center space-y-6 md:space-y-8">
      <button onClick={onBack} className="onboarding-back">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="hidden md:block w-10 h-10 mx-auto bg-black/30 border border-primary-700/30 rounded-2xl flex items-center justify-center">
        <XLogo className="w-10 h-10 text-white" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-white">
        Connect X (Twitter)
      </h1>
      <p className="text-l md:text-xl  text-gray-400">
        Follow @MindoAI and connect your account
      </p>

      <div className="onboarding-card text-left">
        <h2 className="text-xl md:text-2xl font-semibold text-accent-500">
          Quick Steps:
        </h2>
        <ul className="space-y-3 mt-4 text-gray-300 text-l md:text-lg">
          <li>1. Click the button below to connect</li>
          <li>2. Authorize access to your X account</li>
          <li>3. Ensure you follow @MindoAI</li>
        </ul>
      </div>

      <a href={linkToConnect}>
        <button className="onboarding-primary w-full">
          <XLogo className="w-6 h-6" /> Connect X Account{" "}
          <ArrowRight className="w-5 h-5" />
        </button>
      </a>

      <a
        href="https://twitter.com/MindoAI"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-500 hover:text-accent-400 inline-flex items-center gap-1 font-semibold"
      >
        Follow @MindoAI <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
