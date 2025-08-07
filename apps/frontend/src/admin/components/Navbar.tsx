import { Layers } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/ProtectedRoute";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Лого */}
          <div className="flex items-center gap-2">
            <Layers className="h-7 w-7" />
            <span className="text-xl font-semibold tracking-tight">
              Crypto Admin Panel
            </span>
          </div>

          {/* Навигация */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/admin/projects"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive ? "bg-white text-indigo-700" : "hover:bg-indigo-600"
                }`
              }
            >
              Projects
            </NavLink>

            {user?.role === "admin" && (
              <NavLink
                to="/admin/kols"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-white text-indigo-700"
                      : "hover:bg-indigo-600"
                  }`
                }
              >
                KOLs
              </NavLink>
            )}

            <NavLink
              to="/admin/reward-pools"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive ? "bg-white text-indigo-700" : "hover:bg-indigo-600"
                }`
              }
            >
              Reward Pools
            </NavLink>

            <NavLink
              to="/admin/reward-submissions"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive ? "bg-white text-indigo-700" : "hover:bg-indigo-600"
                }`
              }
            >
              Reward Submissions
            </NavLink>

            {user?.role === "admin" && (
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-white text-indigo-700"
                      : "hover:bg-indigo-600"
                  }`
                }
              >
                Users
              </NavLink>
            )}

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:text-red-500 transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
