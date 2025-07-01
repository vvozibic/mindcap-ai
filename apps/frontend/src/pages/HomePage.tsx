import React from "react";
import { ForBusinessCard } from "../components/ForBusinessCard";
import KOLLeaderboard from "../components/KOLLeaderboard";
import NarrativesTreemap from "../components/Narratives";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <>
      <ForBusinessCard
        title="Welcome to Our Platform"
        subtitle={{
          regular: "Beyond Attention: ",
          gradient: "Harness the Power of Purpose-Driven KOLs",
        }}
        description="Forget fleeting trends. Our platform is designed to connect your projects with Key Opinion Leaders who generate lasting utility and results."
        ctaText="Get Started"
        ctaHref="/#leaderboard"
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      />
      <div className="max-w-7xl mx-auto px-1 sm:px-4 lg:px-8 py-8">
        <NarrativesTreemap />

        <KOLLeaderboard />

        <div className="mt-12 bg-primary-800 rounded-lg shadow-lg p-6 border border-primary-700">
          <h2 className="text-xl font-bold text-gray-100 mb-4">
            About the Attention Economy
          </h2>
          <div className="prose max-w-none text-gray-300">
            <p>
              The Web3 Attention Economy establishes "attention" as the core
              value metric within the blockchain ecosystem. Our platform
              measures and applies "Attention Cap" for projects, creating a new
              paradigm for valuing influence.
            </p>
            <p className="mt-4">
              This initiative falls under the "Initial Attention Offering
              (IAO)," "InfoFi," and "Internet Capital Markets (ICM)" narratives,
              pioneering a new way to quantify and reward meaningful engagement
              in the Web3 space.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
