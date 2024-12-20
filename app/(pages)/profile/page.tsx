"use client";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useAuth } from "@/app/hooks/UseAuth";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import OutputOutlinedIcon from "@mui/icons-material/OutputOutlined";
const Profile: React.FC = () => {
  const navigation = useRouter();
  const auth = useAuth();
  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth/login");
    }
  }, [auth.auth.isAuthenticated, navigation]);

  if (!auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }
  return (
    <div className=" w-full flex flex-col items-center gap-10 pb-10">
      <Grid sx={{ width: "100%" }} display="flex" alignItems="center" gap={2}>
        <Avatar
          sx={{ bgcolor: "#001740", color: "#ffffff", width: 50, height: 50 }}
        >
          RA
        </Avatar>
        <Grid display="flex" flexDirection="column">
          <Typography variant="body1" fontWeight={700}>
            Rafli Afriza Nugraha
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            ID : 123456789
          </Typography>
        </Grid>
      </Grid>
      <div className="w-full flex flex-col gap-5">
        <Link href={"#"} className="w-full">
          <Grid
            display="flex"
            alignItems="center"
            p={2}
            sx={{ boxShadow: "2px 4px 7px grey", borderRadius: "7px" }}
            justifyContent="start"
            width="100%"
            gap={1}
          >
            <div className="w-7 h-7 flex justify-center items-center">
              <PersonOutlineOutlinedIcon sx={{ fontSize: "30px" }} />
            </div>
            <Typography variant="body1" fontWeight={600}>
              Pengaturan akun
            </Typography>
          </Grid>
        </Link>
        <Link href={"#"} className="w-full">
          <Grid
            display="flex"
            alignItems="center"
            p={2}
            sx={{ boxShadow: "2px 4px 7px grey", borderRadius: "7px" }}
            justifyContent="start"
            width="100%"
            gap={1}
          >
            <div className="w-7 h-7 flex justify-center items-center">
              <VpnKeyOutlinedIcon sx={{ fontSize: "25px" }} />
            </div>
            <Typography variant="body1" fontWeight={600}>
              Ubah password
            </Typography>
          </Grid>
        </Link>
        <Link href={"#"} className="w-full">
          <Grid
            display="flex"
            alignItems="center"
            p={2}
            sx={{ boxShadow: "2px 4px 7px grey", borderRadius: "7px" }}
            justifyContent="start"
            width="100%"
            gap={1}
          >
            <div className="w-7 h-7 flex justify-center items-center">
              <HelpOutlineOutlinedIcon sx={{ fontSize: "25px" }} />
            </div>
            <Typography variant="body1" fontWeight={600}>
              F.A.Q
            </Typography>
          </Grid>
        </Link>
        <button onClick={() => auth.logout()} className="w-full">
          <Grid
            display="flex"
            alignItems="center"
            p={2}
            sx={{ boxShadow: "2px 4px 3px grey", borderRadius: "7px" }}
            justifyContent="start"
            width="100%"
            gap={1}
          >
            <div className="w-7 h-7 flex justify-center items-center">
              <OutputOutlinedIcon sx={{ fontSize: "30px" }} />
            </div>
            <Typography variant="body1" fontWeight={600}>
              Keluar
            </Typography>
          </Grid>
        </button>
      </div>
    </div>
  );
};

export default Profile;
