"use client";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import { useAuth } from "@/app/hooks/UseAuth";
import Link from "next/link";
import CreditBill from "@/app/components/card/CreditBill";
import { IsDesktop } from "@/app/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Marketplace: React.FC = () => {
  const navigation = useRouter();
  const Auth = useAuth();
  const isDesktop = IsDesktop();

  useEffect(() => {
    if (!Auth.auth.isAuthenticated) {
      navigation.replace("/auth/login");
    }
  }, [Auth.auth.isAuthenticated, navigation]);

  if (!Auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }

  const waterCredits: any = [
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
  ];
  return (
    <div className=" w-full flex flex-col items-center gap-10 pb-10">
      <Grid
        sx={{ width: "100%" }}
        display="flex"
        justifyContent="space-between"
        alignContent="center"
      >
        <Grid>
          {" "}
          <Typography
            variant={isDesktop ? "h6" : "body1"}
            fontWeight={600}
            fontSize={isDesktop ? 20 : 14}
          >
            Tagihan Kredit Air
          </Typography>
          <Typography
            variant={isDesktop ? "body1" : "body2"}
            fontWeight={500}
            fontSize={isDesktop ? 16 : 12}
          >
            {/* {Auth.auth.user?.name} (ID : {Auth?.auth?.user?.id ?? "1111111111"}) */}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        sx={{ width: "100%" }}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <Grid container rowGap={4} columnGap={12} mt={4}>
          {waterCredits.map((waterCredit: any, i: number) => {
            return (
              <Grid lg={5.6} key={i}>
                <CreditBill />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default Marketplace;
