import AuthProvider from "@/app/layouts/AuthProvider";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthLayout;
