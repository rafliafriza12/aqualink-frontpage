"use client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../hooks/UseAuth";
import { store } from "../store";
import { ProviderLayoutProps } from "../types";
import AppLayout from "./AppLayout";
import NextTopLoader from "nextjs-toploader";
import { QueryProvider } from "../core/query-client/QeuryProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useLenis } from "../hooks/useLenis";
const ProviderLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  const clientId: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  useLenis();
  return (
    <>
      <NextTopLoader color="#3640F0" showSpinner={false} />
      <QueryProvider>
        <Provider store={store}>
          <GoogleOAuthProvider clientId={clientId}>
            <AuthProvider>
              <AppLayout>{children}</AppLayout>
            </AuthProvider>
          </GoogleOAuthProvider>
        </Provider>
      </QueryProvider>
      <ToastContainer />
    </>
  );
};

export default ProviderLayout;
