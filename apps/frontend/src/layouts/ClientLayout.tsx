import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import Navbar from "../components/Navbar";
import { useAnalytics } from "../hooks/useAnalytics";
import { useReferralTracker } from "../hooks/useReferral";
import ForBusinessPage from "../pages/ForBusinessPage";
import HomePage from "../pages/HomePage";
import ProjectPage from "../pages/ProjectPage";
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
  const analytics = useAnalytics(user.id);

  useEffect(() => {
    fetch(`/api/auth/me`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setUser({ ...data.user, isAuthenticated: true });
        analytics.identify({
          userId: data.user.id,
          username: data.user.username,
        }); // обновит Mixpanel People
        analytics.track("user_logged_in", { method: user.platform });
      })
      .catch(() => setUser({ isAuthenticated: false }));
  }, []);

  useReferralTracker();

  const handleLogin = (user: User) => {
    setUser({ ...user, isAuthenticated: true });
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser({ isAuthenticated: false });
  };

  return (
    <div className="min-h-screen bg-primary-900 text-gray-100 relative">
      <div className="fixed top-[-100px] z-[0] h-[150vh] w-screen bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,#00ff9936,transparent)]" />
      <Navbar
        user={user}
        onLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route
            path="/social-card"
            element={
              <SocialCardPage
                user={user}
                onLogin={() => setIsLoginModalOpen(true)}
              />
            }
          />
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
