import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../components/ProtectedRoute";
import UsersTable from "./components/ClientsTable";
import KOLsTable from "./components/KOLsTable";
import Navbar from "./components/Navbar";
import ProjectsTable from "./components/ProjectsTable";
import RewardPoolTable from "./components/RewardPoolTable";
import RewardSubmissions from "./components/RewardSubmissions";

function App() {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  const isAdmin = user.role === "admin";
  const isProject = user.role === "PROJECT";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Routes>
          {isAdmin && (
            <>
              <Route path="/" element={<Navigate to="/admin/projects" />} />
              <Route path="/projects" element={<ProjectsTable />} />
              <Route path="/kols" element={<KOLsTable />} />
              <Route path="/users" element={<UsersTable />} />
              <Route path="/reward-pools" element={<RewardPoolTable />} />
              <Route
                path="/reward-submissions"
                element={<RewardSubmissions />}
              />
            </>
          )}

          {isProject && (
            <>
              <Route path="/" element={<Navigate to="/admin/projects" />} />
              <Route
                path="/projects"
                element={<ProjectsTable projectId={user.projectId} />}
              />
              <Route path="/reward-pools" element={<RewardPoolTable />} />
              <Route
                path="/reward-submissions"
                element={<RewardSubmissions />}
              />
              {/* Add more project-only routes here */}
            </>
          )}

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
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
