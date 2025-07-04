import { useState } from "react";
import UsersTable from "./components/ClientsTable";
import KOLsTable from "./components/KOLsTable";
import Navbar from "./components/Navbar";
import ProjectsTable from "./components/ProjectsTable";
import RewardPoolTable from "./components/RewardPoolTable";

function App() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {activeTab === "projects" && "Crypto Projects Management"}
            {activeTab === "kols" && "Influencers Management"}
            {activeTab === "users" && "Users"}
            {activeTab === "reward-pools" && "Reward Pools"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {activeTab === "projects" &&
              "Manage your crypto projects database with detailed information."}

            {activeTab === "kols" &&
              "Track and manage key opinion leaders in the crypto space."}
          </p>
        </div>

        {activeTab === "projects" && <ProjectsTable />}
        {activeTab === "kols" && <KOLsTable />}
        {activeTab === "users" && <UsersTable />}
        {activeTab === "reward-pools" && <RewardPoolTable />}
      </main>

      <footer className="bg-white border-t mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Crypto Admin Panel © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
