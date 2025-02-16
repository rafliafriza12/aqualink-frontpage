"use client";
// UserLayout.tsx
import React from "react";
import { CssBaseline, Box, Container, Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { UserLayoutProps } from "../types";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Index";
import { CardHeader } from "@mui/material";
import Image from "next/image";
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
      <Container maxWidth="xl" sx={{ py: isDesktop ? 15 : 2.3 }}>
        {/* {!isDesktop && (
          <CardHeader
            sx={{ pl: 0, py: 4 }}
            title={
              <Typography variant={`${isDesktop ? "body1" : "body2"}`}>
                23°C Banda Aceh
              </Typography>
            }
            action={
              <Image
                src={"/assets/logo/logo-aqualink.png"}
                alt="AquaLink"
                width={isDesktop ? 55 : 35}
                height={isDesktop ? 55 : 35}
              />
            }
          />
        )} */}
        {children}
        <Navbar />
      </Container>
    </>
  ) : (
    <>
      <CssBaseline />
      {children}
    </>
  );
};

export default UserLayout;
