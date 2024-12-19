"use client";
import Box from "@mui/material/Box";
import { formatToIDR } from "@/app/utils/helper";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useAuth } from "@/app/hooks/UseAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { LineChart } from "@mui/x-charts/LineChart";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { IsDesktop } from "@/app/hooks";

const HomePage: React.FC = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const isDesktop = IsDesktop();

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth/login");
    }
  }, []);

  return isDesktop ? (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Grid width="48%">
        <Grid>
          <Card
            sx={{
              mb: 4,
              boxShadow: "0px 4px 7px grey",
              borderRadius: "16px",
              minHeight: "200px",
              maxHeight: "300px",
            }}
          >
            <CardContent>
              <Grid display="flex" flexDirection="column" gap={3}>
                <Grid container spacing={4} display="flex" alignItems="center">
                  <Grid item xs={8} display="flex" alignItems="center" gap={2}>
                    <AccountBalanceWalletOutlinedIcon
                      sx={{ color: "#1E62EB", fontSize: 35 }}
                    />
                    <Typography variant="h6" fontWeight={600}>
                      Saldo Tersedia
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ px: 0 }} textAlign="right">
                    <Link
                      href={"#"}
                      style={{
                        textDecoration: "underline",
                        fontSize: "14px",
                        color: "blue",
                        padding: "auto 0px",
                      }}
                    >
                      Lihat Detail
                    </Link>
                  </Grid>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="h4" fontWeight={600}>
                    {formatToIDR(1000000)}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="body1" fontWeight={500}>
                    Token Konservasi : 3786 token
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card
            sx={{ mb: 4, boxShadow: "0px 4px 5px grey", borderRadius: "16px" }}
          >
            <CardContent>
              <Grid display="flex" flexDirection="column" gap={1}>
                <Grid container spacing={4}>
                  <Grid item xs={8}>
                    <Typography variant="body1" fontWeight={600}>
                      Aktivitas Terbaru
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid display="flex" alignItems="center" mt={2} gap={2}>
                <AccessTimeOutlinedIcon sx={{ color: "#1E62EB" }} />
                <Grid container spacing={4}>
                  <Grid item xs={8} display="flex" flexDirection="column">
                    <Typography variant="body2" fontWeight={700} p={0}>
                      Transaksi terakhir
                    </Typography>
                    <Typography variant="caption" fontWeight={500} p={0}>
                      2 jam yang lalu
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid display="flex" alignItems="center" mt={2} gap={2}>
                <AccountBalanceWalletOutlinedIcon sx={{ color: "#16D529" }} />
                <Grid container spacing={4}>
                  <Grid item xs={8} display="flex" flexDirection="column">
                    <Typography variant="body2" fontWeight={700} p={0}>
                      Pembayaran diterima
                    </Typography>
                    <Typography variant="caption" fontWeight={500} p={0}>
                      Kemarin
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid display="flex" alignItems="center" mt={2} gap={2}>
                <PersonOutlineOutlinedIcon sx={{ color: "#f29650" }} />
                <Grid container spacing={4}>
                  <Grid item xs={8} display="flex" flexDirection="column">
                    <Typography variant="body2" fontWeight={700} p={0}>
                      Profil diperbarui
                    </Typography>
                    <Typography variant="caption" fontWeight={500} p={0}>
                      2 hari yang lalu
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid display="flex" alignItems="center" mt={2} gap={2}>
                <HomeOutlinedIcon sx={{ color: "#83288f" }} />
                <Grid container spacing={4}>
                  <Grid item xs={8} display="flex" flexDirection="column">
                    <Typography variant="body2" fontWeight={700} p={0}>
                      Login terbaru
                    </Typography>
                    <Typography variant="caption" fontWeight={500} p={0}>
                      1 menit yang lalu
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid width="50%">
        <Card
          sx={{
            mb: 4,
            boxShadow: "0px 4px 5px grey",
            borderRadius: "16px",
            minHeight: "500px",
          }}
        >
          <CardContent>
            <Grid display="flex" flexDirection="column" gap={1}>
              <Grid container spacing={4}>
                <Grid item xs={8}>
                  <Typography variant="body1" fontWeight={600}>
                    Statistik Penggunaan Air
                  </Typography>
                </Grid>
              </Grid>
              <LineChart
                sx={{ p: 0, m: 0 }}
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                width={720}
                height={450}
              />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  ) : (
    <>
      <Card sx={{ mb: 4, boxShadow: "0px 4px 7px grey", borderRadius: "16px" }}>
        <CardContent>
          <Grid display="flex" flexDirection="column" gap={1}>
            <Grid container spacing={4}>
              <Grid item xs={8} display="flex" gap={1}>
                <AccountBalanceWalletOutlinedIcon sx={{ color: "#1E62EB" }} />
                <Typography variant="body1" fontWeight={600}>
                  Saldo Tersedia
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ px: 0 }} textAlign="right">
                <Link
                  href={"#"}
                  style={{
                    textDecoration: "underline",
                    fontSize: "12px",
                    color: "blue",
                    padding: "auto 0px",
                  }}
                >
                  Lihat Detail
                </Link>
              </Grid>
            </Grid>
            <Grid xs={12}>
              <Typography variant="h6" fontWeight={600}>
                {formatToIDR(1000000)}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography variant="caption" fontWeight={500}>
                Token Konservasi : 3786 token
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mb: 4, boxShadow: "0px 4px 5px grey", borderRadius: "16px" }}>
        <CardContent>
          <Grid display="flex" flexDirection="column" gap={1}>
            <Grid container spacing={4}>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight={600}>
                  Statistik Penggunaan Air
                </Typography>
              </Grid>
            </Grid>
            <LineChart
              sx={{ p: 0, m: 0 }}
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={320}
              height={300}
            />
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mb: 4, boxShadow: "0px 4px 5px grey", borderRadius: "16px" }}>
        <CardContent>
          <Grid display="flex" flexDirection="column" gap={1}>
            <Grid container spacing={4}>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight={600}>
                  Aktivitas Terbaru
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid display="flex" alignItems="center" mt={2} gap={2}>
            <AccessTimeOutlinedIcon sx={{ color: "#1E62EB" }} />
            <Grid container spacing={4}>
              <Grid item xs={8} display="flex" flexDirection="column">
                <Typography variant="body2" fontWeight={700} p={0}>
                  Transaksi terakhir
                </Typography>
                <Typography variant="caption" fontWeight={500} p={0}>
                  2 jam yang lalu
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid display="flex" alignItems="center" mt={2} gap={2}>
            <AccountBalanceWalletOutlinedIcon sx={{ color: "#16D529" }} />
            <Grid container spacing={4}>
              <Grid item xs={8} display="flex" flexDirection="column">
                <Typography variant="body2" fontWeight={700} p={0}>
                  Pembayaran diterima
                </Typography>
                <Typography variant="caption" fontWeight={500} p={0}>
                  Kemarin
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid display="flex" alignItems="center" mt={2} gap={2}>
            <PersonOutlineOutlinedIcon sx={{ color: "#f29650" }} />
            <Grid container spacing={4}>
              <Grid item xs={8} display="flex" flexDirection="column">
                <Typography variant="body2" fontWeight={700} p={0}>
                  Profil diperbarui
                </Typography>
                <Typography variant="caption" fontWeight={500} p={0}>
                  2 hari yang lalu
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid display="flex" alignItems="center" mt={2} gap={2}>
            <HomeOutlinedIcon sx={{ color: "#83288f" }} />
            <Grid container spacing={4}>
              <Grid item xs={8} display="flex" flexDirection="column">
                <Typography variant="body2" fontWeight={700} p={0}>
                  Login terbaru
                </Typography>
                <Typography variant="caption" fontWeight={500} p={0}>
                  1 menit yang lalu
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default HomePage;
