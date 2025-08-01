import { ArrowLeft, ArrowRight, Wallet } from "lucide-react";
import { User } from "../../../types";
import { WalletButton } from "../../WalletManager";

export default function WalletStep({
  onNext,
  onBack,
  user,
}: {
  onNext: () => void;
  onBack: () => void;
  user: User | null;
}) {
  const handleConnectClick = () => {
    console.log("Open wallet modal...");
    // здесь будет вызов открытия модалки (если нужно)
    onNext();
  };

  return (
    <div className="animate-slide text-center  space-y-6 md:space-y-8">
      {/* Назад */}
      <button onClick={onBack} className="onboarding-back">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Иконка */}
      <div className="hidden md:flex w-20 h-20 mx-auto bg-black/30 border border-primary-700/30 rounded-2xl flex items-center justify-center">
        <Wallet className="w-10 h-10 text-white" />
      </div>

      {/* Заголовок */}
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        Connect Wallet
      </h1>
      <p className="text-l md:text-xl text-gray-400">
        Link your wallet to unlock exclusive rewards
      </p>

      {/* Карточка */}
      <div className="onboarding-card space-y-4">
        <p className="text-gray-300 text-lg">
          Connecting your wallet gives you access to additional features and
          reward tracking. This step is optional — you can skip it for now.
        </p>
      </div>

      {/* Кнопка подключения */}
      {user ? (
        <WalletButton user={user} afterConnectCallback={onNext} />
      ) : (
        <button onClick={onNext} className="onboarding-primary w-full">
          <Wallet className="w-6 h-6" /> Connect Wallet{" "}
          <ArrowRight className="w-5 h-5" />
        </button>
      )}

      {/* Кнопка пропуска */}
      <button
        onClick={onNext}
        className="text-gray-400 hover:text-white font-semibold flex items-center gap-1 mx-auto transition-colors"
      >
        Skip for now <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-sm text-gray-500">
        You can always connect your wallet later on the profile page.
      </p>
    </div>
  );
}
