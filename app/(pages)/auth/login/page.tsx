"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "@/app/hooks/UseAuth";
import { Grid, Typography } from "@mui/material";
import Logo from "@/app/components/logo/Logo";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

const Login: React.FC = () => {
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

  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center">
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        overflow="hidden"
      >
        <div className="h-[40vh] w-full flex justify-center items-center">
          <Logo />
        </div>
        <div className="h-[60vh] w-full bg-[#3D6DCC] rounded-t-3xl flex flex-col items-center p-6 gap-14 overflow-hidden">
          <Typography variant="h4" fontWeight={600} sx={{ color: "white" }}>
            Masuk
          </Typography>
          <Grid
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={4}
          >
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  color: "white", // Warna teks input
                  "& fieldset": {
                    borderColor: "white", // Warna outline default
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Warna outline saat hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Warna outline saat fokus
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Warna label default
                  "&.Mui-focused": {
                    color: "white", // Warna label saat fokus
                  },
                },
              }}
            />
            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"} // Toggle tipe input
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      style={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <LoadingButton
            loading={isLoading}
            variant="outlined"
            onClick={() => onLogin()}
            sx={{
              backgroundColor: "white",
              width: "100%",
              color: "#000000",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "#f0f0f0", // Warna saat hover
                borderColor: "#f0f0f0",
              },
              "& .MuiLoadingButton-loadingIndicator": {
                color: "#001740", // Warna indikator loading
              },
            }}
          >
            <Typography variant="body1" fontWeight={700}>
              Lanjut
            </Typography>
          </LoadingButton>
        </div>
      </Grid>
    </div>
  );
};

export default Login;
