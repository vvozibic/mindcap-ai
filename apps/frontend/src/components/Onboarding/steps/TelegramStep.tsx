import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";

export default function TelegramStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 animate-slide">
      <button onClick={onBack} className="onboarding-back">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="w-20 h-20 mx-auto bg-gray-800 rounded-2xl flex items-center justify-center">
        <MessageCircle className="w-10 h-10 text-white" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold">Join Telegram</h1>
      <p className="text-xl text-gray-400">Join our channel to continue</p>

      <div className="onboarding-card text-left">
        <h2 className="text-2xl text-white text-center">What happens next?</h2>
        <ul className="mt-4 space-y-3 text-gray-300 text-lg">
          <li>• Click the button to open our bot</li>
          <li>• Start it and follow instructions</li>
          <li>• We’ll verify automatically</li>
        </ul>
      </div>

      <button onClick={onNext} className="onboarding-primary w-full">
        <MessageCircle className="w-6 h-6" /> Open Telegram Bot
        <ArrowRight className="w-5 h-5" />
      </button>

      <button className="onboarding-secondary w-full">Check Status</button>
      <button className="text-gray-400 hover:text-white font-semibold flex items-center gap-1 mx-auto">
        Skip for now <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
