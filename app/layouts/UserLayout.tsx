"use client";
// UserLayout.tsx
import React from "react";
import { CssBaseline, Box, Container, Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { UserLayoutProps } from "../types";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Index";
import { IsDesktop } from "../hooks";
import { useEffect } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const navigation = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const isDesktop = IsDesktop();

  useEffect(() => {
    auth.isAuthenticated
      ? navigation.replace("/")
      : navigation.replace("/auth");
  }, [auth.isAuthenticated]);

  return auth.isAuthenticated ? (
    <>
      <CssBaseline />
      {isDesktop ? (
        <div className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#8A2BE2] to-[#4B0082]">
          <svg
            className="animate-bounce w-28 h-28 mb-6 text-[#FFD700]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="8" />
          </svg>
          <Typography
            variant="h4"
            component="h1"
            className="text-white text-center font-bold text-2xl"
          >
            Saat ini hanya tersedia versi mobile
          </Typography>
          <Typography
            variant="body1"
            className="text-white text-center mt-2 text-lg"
          >
            Silakan gunakan perangkat mobile untuk pengalaman terbaik.
          </Typography>
        </div>
      ) : (
        <Container maxWidth="xl" sx={{ py: isDesktop ? 15 : 2.3 }}>
          {children}
          <Navbar />
        </Container>
      )}
    </>
  ) : (
    <>
      <CssBaseline />
      {children}
    </>
  );
};

export default UserLayout;
