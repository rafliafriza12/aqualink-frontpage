"use client";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { formatToIDR } from "@/app/utils/helper";
import { IsDesktop } from "@/app/hooks";
import API from "@/app/utils/API";
import Link from "next/link";
const Wallet: React.FC = () => {
  const isDesktop = IsDesktop();
  const ABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_unlockTime",
          type: "uint256",
        },
      ],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "when",
          type: "uint256",
        },
      ],
      name: "Withdrawal",
      type: "event",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "unlockTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  //   const getWallet = () => {
  //     API
  //   }

  return (
    <div className={` w-full flex flex-col text-green`}>
      <Grid
        width="100%"
        display="flex"
        flexDirection={isDesktop ? "row" : "column"}
        gap={3}
      >
        <Card
          sx={{
            borderRadius: "14px",
            boxShadow: "0px 4px 7px grey",
            width: isDesktop ? "70%" : "100%",
          }}
        >
          <CardContent>
            <Grid display="flex" flexDirection="column" gap={1}>
              <Grid display="flex" gap={1}>
                <AccountBalanceWalletOutlinedIcon sx={{ color: "#1E62EB" }} />
                <Typography variant="body1" fontWeight={600}>
                  Saldo
                </Typography>
              </Grid>

              <Typography variant="h6" fontWeight={600}>
                {formatToIDR(1000000)}
              </Typography>

              <Grid
                width="100%"
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                mt={2}
              >
                <Link href={"#"}>
                  <Grid
                    display="inline-flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={0.5}
                  >
                    <div className=" rounded-full p-2 bg-[#ea580c]/15">
                      <AddCardOutlinedIcon sx={{ color: "#ea580c" }} />
                    </div>
                    <Typography variant="caption">Top Up</Typography>
                  </Grid>
                </Link>
                <Link href={"#"}>
                  <Grid
                    display="inline-flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={0.5}
                  >
                    <div className=" rounded-full p-2 bg-[#16a34a]/15">
                      <PaidOutlinedIcon sx={{ color: "#16a34a" }} />
                    </div>
                    <Typography variant="caption">Klaim Token</Typography>
                  </Grid>
                </Link>
                <Link href={"#"}>
                  <Grid
                    display="inline-flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={0.5}
                  >
                    <div className=" rounded-full p-2 bg-[#9333ea]/15">
                      <CurrencyExchangeOutlinedIcon sx={{ color: "#9333ea" }} />
                    </div>
                    <Typography variant="caption">Tukar Token</Typography>
                  </Grid>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid
          width={isDesktop ? "28%" : "100%"}
          display="flex"
          flexDirection={isDesktop ? "column" : "row"}
          justifyContent="space-between"
          gap={1}
        >
          <Card
            sx={{
              width: `${isDesktop ? "100%" : "48%"}`,
              boxShadow: "0px 4px 7px grey",
              borderRadius: "10px",
            }}
          >
            <CardContent>
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={0.4}
              >
                <Grid display="flex" gap={1} alignItems="center">
                  <ArrowDownwardOutlinedIcon sx={{ color: "#4ade80" }} />
                  <Typography variant="body2">Uang Masuk</Typography>
                </Grid>
                <Typography variant="body1" fontWeight={600}>
                  {formatToIDR(100000)}
                </Typography>
                <Typography variant="caption">Bulan ini</Typography>
              </Grid>
            </CardContent>
          </Card>

          <Card
            sx={{
              width: `${isDesktop ? "100%" : "48%"}`,
              boxShadow: "0px 4px 7px grey",
              borderRadius: "10px",
            }}
          >
            <CardContent>
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={0.4}
              >
                <Grid display="flex" gap={1} alignItems="center">
                  <ArrowUpwardOutlinedIcon sx={{ color: "#f87171" }} />
                  <Typography variant="body2">Uang Keluar</Typography>
                </Grid>
                <Typography variant="body1" fontWeight={600}>
                  {formatToIDR(650000)}
                </Typography>
                <Typography variant="caption">Bulan ini</Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Wallet;
