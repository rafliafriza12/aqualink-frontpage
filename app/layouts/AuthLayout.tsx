// // AuthLayout.tsx
// "use client";
// import { CssBaseline, Box, Container } from "@mui/material";
// import { useAppSelector } from "../store/hooks";
// import { useRouter } from "next/navigation";
// import { AuthLayoutProps } from "../types";

// const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
//   const router = useRouter();
//   const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

//   if (isAuthenticated) {
//     router.replace("/");
//     return null;
//   }

//   return (
// <>
//   <CssBaseline />
//   {children}
// </>
//   );
// };

// export default AuthLayout;
