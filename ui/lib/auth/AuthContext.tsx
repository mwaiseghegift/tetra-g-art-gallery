"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getCurrentUser, obtainTokens, refreshToken as refreshTokenRequest } from "@/lib/api/auth";
import { setAuthInterceptor, clearAuthInterceptor } from "@/lib/api/interceptor";
import type { User } from "@/lib/api/types";

const ACCESS_TOKEN_KEY = "tetra_access_token";
const REFRESH_TOKEN_KEY = "tetra_refresh_token";

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Setup interceptor for token expiration
  const setupInterceptor = useCallback((access: string, refresh: string) => {
    setAuthInterceptor(
      () => {
        // Logout callback
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setAccessToken(null);
        setUser(null);
        clearAuthInterceptor();
      },
      refreshTokenRequest,
      refresh
    );
  }, []);

  useEffect(() => {
    async function restoreSession() {
      const storedAccess = localStorage.getItem(ACCESS_TOKEN_KEY);
      const storedRefresh = localStorage.getItem(REFRESH_TOKEN_KEY);

      if (!storedAccess) {
        return;
      }

      try {
        const currentUser = await getCurrentUser(storedAccess);
        setAccessToken(storedAccess);
        setUser(currentUser);
        if (storedRefresh) {
          setupInterceptor(storedAccess, storedRefresh);
        }
      } catch {
        if (!storedRefresh) {
          return;
        }
        try {
          const { access } = await refreshTokenRequest(storedRefresh);
          const currentUser = await getCurrentUser(access);
          localStorage.setItem(ACCESS_TOKEN_KEY, access);
          setAccessToken(access);
          setUser(currentUser);
          setupInterceptor(access, storedRefresh);
        } catch {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          clearAuthInterceptor();
        }
      }
    }

    restoreSession().finally(() => setIsLoading(false));
  }, [setupInterceptor]);

  const login = useCallback(async (username: string, password: string) => {
    const tokens = await obtainTokens(username, password);
    const currentUser = await getCurrentUser(tokens.access);
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
    setAccessToken(tokens.access);
    setUser(currentUser);
    setupInterceptor(tokens.access, tokens.refresh);
    return currentUser;
  }, [setupInterceptor]);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setAccessToken(null);
    setUser(null);
    clearAuthInterceptor();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
