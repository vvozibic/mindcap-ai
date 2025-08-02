import React, { useState } from "react";
import LoginModal from "../components/LoginModal";
import SocialCard from "../components/SocialCard";
import { useReferralTracker } from "../hooks/useReferral";
import { KOL, User } from "../types";

interface SocialCardPageProps {
  user: User | null;
  kol: KOL | null;
  loading: boolean;
  handleLogin: (user: User) => void;
}

const SocialCardPage: React.FC<SocialCardPageProps> = ({
  user,
  kol,
  loading,
  handleLogin,
}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useReferralTracker();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  relative z-10">
      {user?.username && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-100 sm:text-4xl">
            My Social Card
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-400 sm:mt-4">
            Your personalized attention metrics and achievements
          </p>
        </div>
      )}

      <SocialCard
        user={user}
        kol={kol}
        loading={loading}
        onLogin={() => setIsLoginModalOpen(true)}
      />

      <div className="mt-12 bg-primary-800 rounded-lg shadow-lg p-6 border border-primary-700">
        <h2 className="text-xl font-bold text-gray-100 mb-4">For KOLs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-700 p-4 rounded-lg">
            <h3 className="font-medium text-gray-200">
              Earn from Project Pools
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Receive rewards from project airdrops based on your attention
              metrics and engagement.
            </p>
          </div>

          <div className="bg-primary-700 p-4 rounded-lg">
            <h3 className="font-medium text-gray-200">Platform Drops</h3>
            <p className="mt-2 text-sm text-gray-400">
              Qualify for exclusive platform rewards as you climb the
              leaderboard rankings.
            </p>
          </div>

          <div className="bg-primary-700 p-4 rounded-lg">
            <h3 className="font-medium text-gray-200">Boost Your Reputation</h3>
            <p className="mt-2 text-sm text-gray-400">
              Build your personal brand and increase your value in the Web3
              ecosystem.
            </p>
          </div>

          <div className="bg-primary-700 p-4 rounded-lg">
            <h3 className="font-medium text-gray-200">Gamified Experience</h3>
            <p className="mt-2 text-sm text-gray-400">
              Earn badges, achievements, and NFTs as you engage with the
              platform and community.
            </p>
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default SocialCardPage;
