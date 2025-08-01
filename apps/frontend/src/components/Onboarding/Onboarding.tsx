import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAnalytics } from "../../hooks/useAnalytics";
import { useReferralTracker } from "../../hooks/useReferral";
import { User } from "../../types";
import ConnectStep from "./steps/ConnectStep";
import HomeStep from "./steps/HomeStep";
import SuccessStep from "./steps/SuccessStep";
import WalletStep from "./steps/WalletStep";

// export type Step = "home" | "connect" | "telegram" | "success";

// const Onboarding: React.FC = () => {
//   const [step, setStep] = useState<Step>("home");

//   const next = (to?: Step) => setStep(to || getNextStep(step));
//   const back = () => setStep(getPrevStep(step));

//   const getNextStep = (s: Step): Step =>
//     s === "home" ? "connect" : s === "connect" ? "telegram" : "success";

//   const getPrevStep = (s: Step): Step =>
//     s === "connect" ? "home" : s === "telegram" ? "connect" : "telegram";

//   const steps: Record<Step, JSX.Element> = {
//     home: <HomeStep onNext={() => next()} />,
//     connect: <ConnectStep onNext={() => next()} onBack={back} />,
//     telegram: <TelegramStep onNext={() => next()} onBack={back} />,
//     success: <SuccessStep />,
//   };

export type Step = "home" | "connect" | "wallet" | "success";

const Onboarding: React.FC = () => {
  const [params] = useSearchParams();

  const [step, setStep] = useState<Step>(
    (params.get("step") as Step) || "home"
  );

  const next = (to?: Step) => setStep(to || getNextStep(step));
  const back = () => setStep(getPrevStep(step));

  const getNextStep = (s: Step): Step =>
    s === "home" ? "connect" : s === "connect" ? "wallet" : "success";

  const getPrevStep = (s: Step): Step =>
    s === "connect" ? "home" : s === "wallet" ? "connect" : "wallet";

  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const analytics = useAnalytics();

  useEffect(() => {
    fetch(`/api/auth/me`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setUser({ ...data.user, isAuthenticated: true });
        analytics.setUser(`${data.user.id}`);
        analytics.identify({
          userId: data.user.id,
          username: data.user.username,
        });
      })
      .catch(() => setUser({ isAuthenticated: false }));
  }, []);

  useReferralTracker();

  if (user.username && step === "home") window.location.replace("/social-card");

  const steps: Record<Step, JSX.Element> = {
    home: (
      <HomeStep onNext={() => next()} onStep={(step: Step) => setStep(step)} />
    ),
    connect: <ConnectStep onNext={() => next("wallet")} onBack={back} />,
    wallet: (
      <WalletStep user={user} onNext={() => next("success")} onBack={back} />
    ),
    success: <SuccessStep user={user} />,
  };
  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="fixed top-[-100px] z-[0] h-[150vh] w-screen bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,#00ff9936,transparent)]" />
      <div
        className="bg-black/40 backdrop-blur-sm border border-primary-700/30 rounded-lg px-4 py-8 md:p-8 w-full max-w-2xl shadow-xl"
        style={{ borderColor: "#16653480" }}
      >
        {steps[step]}
      </div>
    </div>
  );
};

export default Onboarding;
