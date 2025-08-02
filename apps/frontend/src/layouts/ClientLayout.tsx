import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnalyticsTracker } from "../components/AnalyticsTracker";
import LoginModal from "../components/LoginModal";
import Navbar from "../components/Navbar";
import { useReferralTracker } from "../hooks/useReferral";
import ForBusinessPage from "../pages/ForBusinessPage";
import HomePage from "../pages/HomePage";
import ProjectPage from "../pages/ProjectPage";
import ProjectsPage from "../pages/ProjectsPage";
import SocialCardPage from "../pages/SocialCardPage";
import { KOL, User } from "../types";

interface ClientLayoutProps {
  user: User | null;
  kol: KOL | null;
  loading: boolean;
  handleLogin: (user: User) => void;
  handleLogout: () => void;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({
  user,
  kol,
  loading,
  handleLogin,
  handleLogout,
}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  useReferralTracker();

  return (
    <div className="min-h-screen bg-primary-900 text-gray-100 relative">
      <AnalyticsTracker />
      <div className="fixed top-[-100px] z-[0] h-[150vh] w-screen bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,#00ff9936,transparent)]" />
      <Navbar
        user={user}
        userLoading={loading}
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
                kol={kol}
                loading={loading}
                handleLogin={handleLogin}
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
};

export default ClientLayout;
