import { useState } from "react";
import { useAuth } from "../components/ProtectedRoute";
import UsersTable from "./components/ClientsTable";
import KOLsTable from "./components/KOLsTable";
import Navbar from "./components/Navbar";
import ProjectsTable from "./components/ProjectsTable";
import RewardPoolTable from "./components/RewardPoolTable";

function App() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");

  if (!user) return <div>Loading...</div>;

  const isAdmin = user.role === "admin";
  const isProject = user.role === "PROJECT";

  const handleLogout = () => {
    localStorage.removeItem("token");
    location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isAdmin && (
        <>
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
        </>
      )}

      {isProject && (
        <>
          <nav className="bg-white shadow p-4 flex justify-end gap-6 max-w-[1280px] mx-auto">
            {/* <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
            <button onClick={() => setActiveTab("reward-pools")}>
              Reward Pools
            </button>
            <button onClick={() => setActiveTab("submissions")}>
              Submissions
            </button> */}
            <button className="text-black" onClick={handleLogout}>
              Log out
            </button>
          </nav>

          <main className="max-w-5xl mx-auto py-6 px-4">
            {/* {activeTab === "dashboard" && <ProjectDashboard />} */}
            {activeTab === "projects" && (
              <ProjectsTable projectId={user?.projectId} />
            )}
            {activeTab === "reward-pools" && <RewardPoolTable />}
            {/* {activeTab === "submissions" && <Submissions />} */}
          </main>
        </>
      )}

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
