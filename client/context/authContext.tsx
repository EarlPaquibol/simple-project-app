"use client";

import { createContext, useContext, useState } from "react";
import * as authService from "../services/authService.js";
import { clearAccessToken } from "@/lib/tokenStore.js";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);

    setUser(res);
  };

  const logout = () => {
    clearAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
