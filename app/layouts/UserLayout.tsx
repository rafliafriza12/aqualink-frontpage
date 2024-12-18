// UserLayout.tsx
import React from "react";
import { CssBaseline, Box, Container, Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { UserLayoutProps } from "../types";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Index";

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const navigation = useRouter();
  const auth = useAppSelector((state) => state.auth);

  if (!auth.isAuthenticated) {
    navigation.replace("/auth/login");
    return null;
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        {children}
        <Navbar />
      </Container>
    </>
  );
};

export default UserLayout;
