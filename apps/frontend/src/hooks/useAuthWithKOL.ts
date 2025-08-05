import { useEffect } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { useGlobalStore } from "../store/useGlobalStore";
import { User } from "../types";

export function useAuthWithKOL() {
  const analytics = useAnalytics();
  const { user, kol, loading, error, fetchUserAndKol, setUser, setKol } =
    useGlobalStore();

  // 🚀 загружаем данные один раз
  useEffect(() => {
    fetchUserAndKol().then(() => {
      if (user?.id) {
        analytics.setUser(user.id);
        analytics.identify({ userId: user.id, username: user.username });
      }
    });
  }, [fetchUserAndKol]);

  // 🚀 ручной логин
  const handleLogin = async (newUser: User) => {
    localStorage.setItem("isAuthenticated", "true");
    setUser({ ...newUser, isAuthenticated: true } as User);
    analytics.setUser(newUser.id || "");
    analytics.identify({ userId: newUser.id, username: newUser.username });
    analytics.track?.("Manual Login");
  };

  // 🚀 ручной логаут
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("isAuthenticated");
    setUser(null);
    setKol(null);
    analytics.track?.("Logout");
  };

  return {
    user,
    kol,
    loading,
    error,
    refetch: fetchUserAndKol,
    handleLogin,
    handleLogout,
  };
}
