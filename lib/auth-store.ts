import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  userId: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (data: {
    access_token: string;
    refresh_token: string;
    user_id: string;
    email: string;
  }) => void;
  logout: () => void;
  updateAccessToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (data) =>
        set({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          user: {
            userId: data.user_id,
            email: data.email,
          },
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),

      updateAccessToken: (token) =>
        set({
          accessToken: token,
        }),

      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
      onRehydrateStorage: () => (state) => {
        // Set loading to false after rehydration is complete
        state?.setLoading(false);
      },
    }
  )
);
