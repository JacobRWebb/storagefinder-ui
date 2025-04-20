import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserInfo } from "../types/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  token: string | null;
  setAuth: (user: UserInfo, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      setAuth: (user, token) => set({ isAuthenticated: true, user, token }),
      clearAuth: () => set({ isAuthenticated: false, user: null, token: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
