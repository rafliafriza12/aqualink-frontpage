"use client";
// UserLayout.tsx
import React from "react";
import { CssBaseline, Box, Container, Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { UserLayoutProps } from "../types";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Index";
import { IsDesktop } from "../hooks";
import DesktopNotSupported from "../components/not-support-desktop/NotSupportDesktop";
import { useEffect } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const navigation = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const isDesktop = IsDesktop();

  if (isDesktop) {
    return <DesktopNotSupported />;
  }

  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
};

export default UserLayout;
