import { Layers } from "lucide-react";
import React from "react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Layers className="h-8 w-8" />
            </div>
            <div className="ml-4 text-xl font-bold">Crypto Admin Panel</div>
          </div>
          <div className="flex">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 mx-1 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
                activeTab === "projects"
                  ? "bg-white text-indigo-600"
                  : "text-white hover:bg-indigo-500"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("kols")}
              className={`px-4 py-2 mx-1 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
                activeTab === "kols"
                  ? "bg-white text-indigo-600"
                  : "text-white hover:bg-indigo-500"
              }`}
            >
              KOLs
            </button>
            <button
              onClick={() => setActiveTab("reward-pools")}
              className={`px-4 py-2 mx-1 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
                activeTab === "reward-pools"
                  ? "bg-white text-indigo-600"
                  : "text-white hover:bg-indigo-500"
              }`}
            >
              Reward Pools
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 mx-1 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
                activeTab === "users"
                  ? "bg-white text-indigo-600"
                  : "text-white hover:bg-indigo-500"
              }`}
            >
              Users
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
