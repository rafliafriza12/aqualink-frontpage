"use client";
import { ProviderLayoutProps } from "../types";
import { useAppSelector } from "../store/hooks";
import AuthLayout from "./AuthLayout";
import UserLayout from "./UserLayout";

const AppLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? (
    <UserLayout>{children}</UserLayout>
  ) : (
    <AuthLayout>{children}</AuthLayout>
  );
};

export default AppLayout;
