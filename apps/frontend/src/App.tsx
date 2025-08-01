import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Onboarding from "./components/Onboarding/Onboarding";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
import LoginPage from "./pages/LoginPage";
import SocialCardPage from "./pages/SocialCardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route
          path="/social-card"
          element={
            <div className="relative">
              <div className="fixed top-[-100px] z-[0] h-[150vh] w-screen bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,#00ff9936,transparent)]" />

              <SocialCardPage standalone={true} onLogin={() => {}} />
            </div>
          }
        />
        <Route path="/beta/*" element={<ClientLayout />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
