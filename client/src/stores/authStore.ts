import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type { LoginTypes, RegisterType } from "../schemas/users";

// ---------- Types ----------
type TokenPayload = {
  userId: string;
  role: string;
  exp: number;
  iat: number;
};

type AuthStore = {
  token: string | null;
  user: TokenPayload | null;
  error: string | null;
  login: (userData: LoginTypes) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  isTokenExpired: () => boolean;
  isTokenExpiringSoon: () => boolean;
  register: (userData: RegisterType) => Promise<void>;
};

//axios api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  withCredentials: true,
});

//zustand
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      error: null,

      login: async (userData: LoginTypes) => {
        try {
          const res = await api.post("/auth/login", userData);
          const token = res.data.accessToken;
          const user = jwtDecode<TokenPayload>(token);
          set({ token, user, error: null });
        } catch (err: any) {
          set({ error: err.response?.data?.message || err.message });
          throw err;
        }
      },

      register: async (userData: RegisterType) => {
        try {
          const formData = new FormData();
          formData.append("name", userData.name);
          formData.append("email", userData.email);
          formData.append("password", userData.password);
          // Corrected: Use 'avatar' to match the form and Zod schema
          if (userData.avatar) formData.append("avatar", userData.avatar[0]);

          await api.post("/auth/register", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          set({ error: null });
        } catch (err: any) {
          set({ error: err.response?.data?.message || err.message });
          throw err;
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout");
        } catch (err) {
          console.warn("Logout request failed:", err);
        }
        set({ token: null, user: null, error: null });
      },

      refresh: async () => {
        try {
          const res = await api.post("/auth/refresh");
          const token = res.data.accessToken;
          const user = jwtDecode<TokenPayload>(token);
          set({ token, user });
          return token;
        } catch (err) {
          console.error("Refresh failed:", err);
          set({ token: null, user: null });
          return null;
        }
      },

      isTokenExpired: () => {
        const { user } = get();
        if (!user?.exp) return true;
        return Date.now() >= user.exp * 1000;
      },

      isTokenExpiringSoon: () => {
        const { user } = get();
        if (!user?.exp) return true;
        return Date.now() >= user.exp * 1000 - 30_000;
      },
    }),
    { name: "auth-storage" }
  )
);

// Request interceptor
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await useAuthStore.getState().refresh();
        const newToken = useAuthStore.getState().token;
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
