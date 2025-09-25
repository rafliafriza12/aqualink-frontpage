import AuthProvider from "@/app/layouts/AuthProvider";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="w-full bg-[#040404] overflow-hidden min-h-screen">
        {children}
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
