import { create } from "zustand";
import { KOL, User } from "../types";

interface GlobalState {
  user: User | null;
  kol: KOL | null;
  loading: boolean;
  error: string | null;
  walletUpdating: boolean;

  fetchUserAndKol: (silent?: boolean) => Promise<void>;
  setWalletUpdating: (flag: boolean) => void;
  setUser: (u: User | null) => void;
  setKol: (k: KOL | null) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  user: null,
  kol: null,
  loading: false,
  error: null,
  walletUpdating: false,

  setWalletUpdating: (flag: boolean) => set({ walletUpdating: flag }),

  fetchUserAndKol: async (silent = false) => {
    if (!silent) set({ loading: true, error: null });
    try {
      const res = await fetch("/api/auth/me");

      if (!res.ok) throw new Error("Failed to fetch user & kol");

      const data = await res.json();

      set({
        user: data.user || null,
        kol: data.user.kol || null,
        loading: false,
      });
    } catch (err: any) {
      console.error("❌ fetchUserAndKol error:", err);
      set({ loading: false, error: err.message, user: null, kol: null });
    }
  },

  setUser: (user) => set({ user }),
  setKol: (kol) => set({ kol }),
}));
