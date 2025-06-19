import React from 'react';
import KOLLeaderboard from '../components/KOLLeaderboard';
import { KOL } from '../types';

interface HomePageProps {
  kols: KOL[];
}

const HomePage: React.FC<HomePageProps> = ({ kols }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-100 sm:text-4xl">
          Web3 Attention Economy
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-400 sm:mt-4">
          Measuring influence through the lens of attention as the new currency
        </p>
      </div>
      
      <KOLLeaderboard kols={kols} />
      
      <div className="mt-12 bg-primary-800 rounded-lg shadow-lg p-6 border border-primary-700">
        <h2 className="text-xl font-bold text-gray-100 mb-4">About the Attention Economy</h2>
        <div className="prose max-w-none text-gray-300">
          <p>
            The Web3 Attention Economy establishes "attention" as the core value metric within the blockchain ecosystem. 
            Our platform measures and applies "Attention Cap" for projects, creating a new paradigm for valuing influence.
          </p>
          <p className="mt-4">
            This initiative falls under the "Initial Attention Offering (IAO)," "InfoFi," and "Internet Capital Markets (ICM)" narratives, 
            pioneering a new way to quantify and reward meaningful engagement in the Web3 space.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
