import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import SocialCardPage from "../pages/SocialCardPage";

function ClientLayout() {
  const isLocalAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";
  const [user, setUser] = useState({ isAuthenticated: isLocalAuthenticated });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = () => {
    setUser({ ...user, isAuthenticated: true });
    localStorage.setItem("isAuthenticated", "true");
  };

  return (
    <div className="min-h-screen bg-primary-900 text-gray-100">
      <Navbar user={user} onLogin={() => setIsLoginModalOpen(true)} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects"
            element={
              <ProjectsPage
                isAuthenticated={user.isAuthenticated}
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
          />
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
