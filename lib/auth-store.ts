import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  userId: string;
  email: string;
}

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  country_id?: string;
  country?: string;
  ethnicity?: string;
  experience_level?: string;
  phone_number?: string;
  role?: string;
  account_status?: string;
  registration_date?: string;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
  referred_by_code?: string;
  referral_code?: string;
  registration_ip?: string;
  registration_user_agent?: string;
  registration_device_type?: string;
  registration_browser?: string;
  registration_os?: string;
  last_login_ip?: string;
  last_login_user_agent?: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (data: {
    access_token: string;
    refresh_token: string;
    user_id: string;
    email: string;
  }) => void;
  setProfile: (profile: UserProfile) => void;
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
      profile: null,
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

      setProfile: (profile) =>
        set({
          profile,
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          profile: null,
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
