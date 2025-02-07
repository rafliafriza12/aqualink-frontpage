"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  login as loginAction,
  logout as logoutAction,
} from "../store/slices/authSlice";

// Definisi tipe untuk AuthContext
interface AuthContextType {
  auth: {
    isAuthenticated: boolean;
    user: {
      id: string;
      fullName: string;
      phone: string;
      email: string;
    } | null;
    token: string | null;
  };
  login: (data: {
    user: { id: string; fullName: string; phone: string; email: string };
    token: string;
  }) => void;
  logout: () => void;
}

// Inisialisasi Context dengan nilai default null
export const AuthContext = React.createContext<AuthContextType | null>(null);

// AuthProvider untuk membungkus aplikasi
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, token } = useAppSelector(
    (state) => state.auth
  );

  const handleLogin = (data: {
    user: { id: string; fullName: string; phone: string; email: string };
    token: string;
  }) => {
    dispatch(
      loginAction({
        user: data.user,
        token: data.token,
      })
    );
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const auth = { isAuthenticated, user, token };

  return (
    <AuthContext.Provider
      value={{ auth, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook untuk mengakses Context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
