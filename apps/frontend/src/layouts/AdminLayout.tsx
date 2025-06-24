import { Route, Routes } from "react-router-dom";
import App from "../admin/App";
import ProtectedRoute from "../components/ProtectedRoute";

function AdminLayout() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <section className="flex-1">
          <Routes>
            <Route path="" element={<App />} />
          </Routes>
        </section>
      </div>
    </ProtectedRoute>
  );
}

export default AdminLayout;
