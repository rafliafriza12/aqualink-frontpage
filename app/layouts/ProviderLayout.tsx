"use client";
import { Provider } from "react-redux";
import { AuthProvider } from "../hooks/UseAuth";
import { store } from "../store";
import { ProviderLayoutProps } from "../types";
import AppLayout from "./AppLayout";
const ProviderLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppLayout>{children}</AppLayout>
      </AuthProvider>
    </Provider>
  );
};

export default ProviderLayout;
