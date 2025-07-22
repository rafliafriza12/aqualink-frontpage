"use client";
import { useAuth } from "../hooks/UseAuth";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const navigation = useRouter();
  const clientId: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  if (auth.auth.isAuthenticated) {
    navigation.replace("/home");
    return null;
  }

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
    </>
  );
};

export default AuthProvider;
