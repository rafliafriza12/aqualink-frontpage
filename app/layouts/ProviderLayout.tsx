"use client";
import { Provider } from "react-redux";
import { AuthProvider } from "../hooks/UseAuth";
import { store } from "../store";
import { ProviderLayoutProps } from "../types";

const ProviderLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children} {/* Menyertakan children agar layout bekerja dengan baik */}
      </AuthProvider>
    </Provider>
  );
};

export default ProviderLayout;
