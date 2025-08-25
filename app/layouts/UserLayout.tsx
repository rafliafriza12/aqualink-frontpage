"use client";
// UserLayout.tsx
import React from "react";
import { CssBaseline, Box, Container, Typography } from "@mui/material";
import { UserLayoutProps } from "../types";
import { IsDesktop } from "../hooks";
import DesktopNotSupported from "../components/not-support-desktop/NotSupportDesktop";

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  // const isDesktop = IsDesktop();

  // if (isDesktop) {
  //   return <DesktopNotSupported />;
  // }

  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
};

export default UserLayout;
