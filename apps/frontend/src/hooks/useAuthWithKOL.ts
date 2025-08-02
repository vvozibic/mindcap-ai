import { useCallback, useEffect, useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics"; // твой хук аналитики
import { KOL, User } from "../types";

interface UseAuthWithKOLResult {
  user: User | null;
  kol: KOL | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  handleLogin: (user: User) => void;
  handleLogout: () => Promise<void>;
}

export function useAuthWithKOL(): UseAuthWithKOLResult {
  const analytics = useAnalytics();

  const [user, setUser] = useState<User | null>(null);
  const [kol, setKol] = useState<KOL | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setUser(null);
    setKol(null);

    try {
      // 1. Проверяем авторизацию
      const authRes = await fetch("/api/auth/me");
      if (!authRes.ok) throw new Error("Not authenticated");

      const { user } = await authRes.json();
      const authenticatedUser: User = { ...user, isAuthenticated: true };
      setUser(authenticatedUser);

      // 🔥 Аналитика
      analytics.setUser(user.id);
      analytics.identify({ userId: user.id, username: user.username });
      analytics.track?.("Auth Success");

      // 2. Загружаем KOL
      if (user.username) {
        const kolRes = await fetch(`/api/influencers/user/${user.username}`);
        if (!kolRes.ok) throw new Error("Failed to fetch KOL");

        const kolData = await kolRes.json();
        setKol(kolData);
        analytics.track?.("KOL Fetched", { username: user.username });
      }
    } catch (err: any) {
      setError(err.message);
      setUser({ id: "", username: "", email: "", isAuthenticated: false });
      analytics.track?.("Auth Error", { message: err.message });
    } finally {
      setLoading(false);
    }
  }, [analytics]);

  // 🚀 Функция логина
  const handleLogin = useCallback(
    (newUser: User) => {
      localStorage.setItem("isAuthenticated", "true");
      setUser({ ...newUser, isAuthenticated: true });
      analytics.setUser(newUser.id || "");
      analytics.identify({ userId: newUser.id, username: newUser.username });
      analytics.track?.("Manual Login");
    },
    [analytics]
  );

  // 🚀 Функция логаута
  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("isAuthenticated");
    setUser({ id: "", username: "", email: "", isAuthenticated: false });
    setKol(null);
    analytics.track?.("Logout");
  }, [analytics]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    user,
    kol,
    loading,
    error,
    refetch: fetchData,
    handleLogin,
    handleLogout,
  };
}
