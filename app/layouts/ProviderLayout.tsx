"use client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../hooks/UseAuth";
import { store } from "../store";
import { ProviderLayoutProps } from "../types";
import AppLayout from "./AppLayout";
import NextTopLoader from "nextjs-toploader";
import { QueryProvider } from "../core/query-client/QeuryProvider";
const ProviderLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  return (
    <>
      <NextTopLoader color="#3640F0" showSpinner={false} />
      <QueryProvider>
        <Provider store={store}>
          <AuthProvider>
            <AppLayout>{children}</AppLayout>
          </AuthProvider>
        </Provider>
      </QueryProvider>
      <ToastContainer />
    </>
  );
};

export default ProviderLayout;
