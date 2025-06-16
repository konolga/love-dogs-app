// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode, use, useEffect } from 'react';
import { authService } from "../services/authService";
import { UserInfo } from "@/types/types";
import { useSessionStorage } from "../hooks/useSessionStorage";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  userInfo: UserInfo;
  login: (params: UserInfo) => Promise<void>;
  logout: (params: UserInfo) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "" });
  const [setSessionFlag, removeSessionFlag, verifySessionFlag] =
    useSessionStorage();

  useEffect(() => {
    const alreadyLoggedIn = verifySessionFlag();
    if (alreadyLoggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (params: UserInfo) => {
    setIsLoading(true);
    try {
      const success = await authService.login(params);
      if (success) {
        setIsAuthenticated(true);
        setUserInfo(params);
        setError(null);
        setSessionFlag();
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      setError("Invalid credentials");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout(userInfo);
      setIsAuthenticated(false);
      removeSessionFlag();
    } catch (err) {
      setError("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, error, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
