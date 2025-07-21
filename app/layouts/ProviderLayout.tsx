"use client";
import { Provider } from "react-redux";
import { AuthProvider } from "../hooks/UseAuth";
import { store } from "../store";
import { ProviderLayoutProps } from "../types";
import AppLayout from "./AppLayout";
import NextTopLoader from "nextjs-toploader";
const ProviderLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  return (
    <>
      <NextTopLoader color="#3640F0" showSpinner={false} />
      <Provider store={store}>
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </Provider>
    </>
  );
};

export default ProviderLayout;
