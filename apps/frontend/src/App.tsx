import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import SocialCardPage from './pages/SocialCardPage';
import LoginModal from './components/LoginModal';
import { mockKOLs, mockProjects, mockUser } from './data/mockData';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User>(mockUser);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = () => {
    setUser({
      ...user,
      isAuthenticated: true
    });
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-primary-900 text-gray-100">
        <Navbar user={user} onLogin={openLoginModal} />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage kols={mockKOLs} />} />
            <Route path="/projects" element={
              <ProjectsPage 
                projects={mockProjects} 
                isAuthenticated={user.isAuthenticated}
                onLogin={openLoginModal}
              />
            } />
            <Route path="/social-card" element={<SocialCardPage user={user} onLogin={openLoginModal} />} />
          </Routes>
        </main>
        
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={closeLoginModal} 
          onLogin={handleLogin} 
        />
      </div>
    </Router>
  );
}

export default App;
