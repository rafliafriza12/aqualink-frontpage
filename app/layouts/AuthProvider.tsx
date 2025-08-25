"use client";
import { useAuth } from "../hooks/UseAuth";
import { useRouter } from "next/navigation";
import LoadingComponent from "../components/loading";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (auth.auth.isAuthenticated) {
      router.replace("/beranda");
    } else {
      setChecking(false);
    }
  }, [auth.auth.isAuthenticated, router]);

  if (checking) {
    return <LoadingComponent />; // bisa ganti spinner dsb
  }

  return <>{children}</>;
};

export default AuthProvider;
