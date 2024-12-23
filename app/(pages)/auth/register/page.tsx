"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/UseAuth";
import { Grid, Typography } from "@mui/material";
import Logo from "@/app/components/logo/Logo";
import { useState } from "react";
import Button from "@mui/material/Button";
import Google from "@/app/components/logo/Google";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Link from "next/link";
import { IsDesktop } from "@/app/hooks";
const Register: React.FC = () => {
  const isDesktop = IsDesktop();
  const navigation = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const Auth = useAuth();

  const onLogin = () => {
    setIsLoading(!isLoading);
    const data: any = {
      data: {
        user: {
          id: "123456",
          name: "Rafli Afriza Nugraha",
          email: "rafli@gmail.com",
        },
        token: "Bearer alkjbdyaewbr98y4rqalisudgv9q4bf",
      },
    };
    Auth.login(data);

    navigation.replace("/");
  };

  if (Auth.auth.isAuthenticated) {
    navigation.replace("/");
    return null;
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center">
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        overflow="hidden"
      >
        <div
          className={`${
            isDesktop ? "" : "h-[40vh]"
          }  w-full flex justify-center items-center`}
        >
          <Logo />
        </div>
        <div
          className={`${
            isDesktop
              ? " mt-4 w-[50%] rounded-xl px-[10%]"
              : "h-[60vh] w-full rounded-t-3xl"
          }  bg-[#3D6DCC]  flex flex-col items-center p-6 gap-14 overflow-hidden`}
        >
          <Typography variant="h5" fontWeight={600} sx={{ color: "white" }}>
            Selamat Datang
          </Typography>
          <div className=" flex flex-col w-full gap-6">
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white", // Latar belakang putih
                width: "100%",
                textTransform: "none",
                display: "flex",
                color: "black", // Teks hitam
                borderColor: "black", // Warna border hitam
                "&:hover": {
                  backgroundColor: "#f5f5f5", // Efek hover latar belakang abu-abu muda
                },
              }}
            >
              <div className=" w-9 h-9">
                <Google />
              </div>
              Daftar dengan Google
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white", // Latar belakang putih
                width: "100%",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                color: "black", // Teks hitam
                borderColor: "black", // Warna border hitam
                "&:hover": {
                  backgroundColor: "#f5f5f5", // Efek hover latar belakang abu-abu muda
                },
              }}
            >
              <div className=" h-9 w-9 flex justify-center items-center">
                <EmailOutlinedIcon sx={{ fontSize: "27px" }} />
              </div>
              Daftar dengan Email dan No Telepon
            </Button>
          </div>
          <Typography variant="body2" fontWeight={500} sx={{ color: "white" }}>
            Sudah memiliki akun ?{" "}
            <Link href={"/auth/login"} className=" underline">
              Masuk
            </Link>
          </Typography>
        </div>
      </Grid>
    </div>
  );
};

export default Register;
