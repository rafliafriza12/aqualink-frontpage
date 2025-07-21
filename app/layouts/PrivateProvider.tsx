"use client";
import { useAuth } from "../hooks/UseAuth";
import { useRouter } from "next/navigation";
const PrivateProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const navigation = useRouter();

  if (!auth.auth.isAuthenticated) {
    navigation.replace("/auth");
    return null;
  }

  return <>{children}</>;
};

export default PrivateProvider;
