import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Типы
interface User {
  id: number;
  username: string;
  role: "admin" | "PROJECT";
  projectId?: string | null;
}

interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Контекст
const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/admin/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUser(data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Checking auth...</p>;
  if (!user) return <Navigate to="/admin/login" />;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ProtectedRoute;
