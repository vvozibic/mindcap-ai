import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import Navbar from "../components/Navbar";
import ForBusinessPage from "../pages/ForBusinessPage";
import HomePage from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import SocialCardPage from "../pages/SocialCardPage";
import { User } from "../types";

function ClientLayout() {
  const isLocalAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    isAuthenticated: isLocalAuthenticated,
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) return setUser({ isAuthenticated: false });

    fetch(`/api/auth/me?user=${user}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setUser({ ...data.user, isAuthenticated: true });
      })
      .catch(() => setUser({ isAuthenticated: false }));
  }, []);

  const handleLogin = (user: User) => {
    setUser({ ...user, isAuthenticated: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({ isAuthenticated: false });
  };

  return (
    <div className="min-h-screen bg-primary-900 text-gray-100">
      <Navbar
        user={user}
        onLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects"
            element={
              <ProjectsPage
                isAuthenticated={!!user.isAuthenticated}
                onLogin={() => setIsLoginModalOpen(true)}
              />
            }
          />
          <Route
            path="/social-card"
            element={
              <SocialCardPage
                user={user}
                onLogin={() => setIsLoginModalOpen(true)}
              />
            }
          />{" "}
          <Route path="/for-business" element={<ForBusinessPage />} />
        </Routes>
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default ClientLayout;
