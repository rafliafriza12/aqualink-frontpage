"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/UseAuth";
import Logo from "@/app/components/logo/Logo";
import Google from "@/app/components/logo/Google";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import { IsDesktop } from "@/app/hooks";
import Aqualink from "../../../../../public/assets/logo/Aqualink.png";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { LoginCredentials } from "@/app/services/auth/auth.type";
import { useLogin } from "@/app/services/auth/auth.mutation";

const Login: React.FC = () => {
  const navigation = useRouter();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loginMutation = useLogin();

  const onLogin = () => {
    loginMutation.mutate(credentials);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-7 gap-10 font-poppins">
      <div data-aos={"fade-up"} data-aos-duration={"1000"} className="">
        <Image src={Aqualink} alt="auth-cover" width={130} height={130} />
      </div>

      <div className="flex flex-col gap-2 items-center">
        <h1
          data-aos={"fade-up"}
          data-aos-duration={"1000"}
          className=" text-[#202226] font-semibold text-2xl"
        >
          Please login to continue
        </h1>
        <h6 className=" text-center text-[#838383] text-sm">
          Welcome back! Please enter your details.
        </h6>
      </div>
      <div className=" w-full flex flex-col gap-5 items-center">
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={credentials.email}
          type="email"
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black", // Warna teks input
              "& fieldset": {
                borderColor: "#EDEDED", // Warna outline default
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED", // Warna outline saat hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED", // Warna outline saat fokus
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Warna label default
              "&.Mui-focused": {
                color: "black", // Warna label saat fokus
              },
            },
          }}
        />
        <TextField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"} // Toggle tipe input
          variant="outlined"
          value={credentials.password}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, password: e.target.value }))
          }
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black", // Warna teks input
              "& fieldset": {
                borderColor: "#EDEDED", // Warna outline default
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED", // Warna outline saat hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED", // Warna outline saat fokus
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Warna label default
              "&.Mui-focused": {
                color: "black", // Warna label saat fokus
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  style={{ color: "gray" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          loading={loginMutation.isPending}
          variant="outlined"
          onClick={() => onLogin()}
          sx={{
            backgroundColor: "#039FE1",
            width: "100%",
            height: "48px",
            color: "#ffffff",
            borderColor: "#039FE1",
            "&:hover": {
              backgroundColor: "#039FE1", // Warna saat hover
              borderColor: "#039FE1",
            },
            "& .MuiLoadingButton-loadingIndicator": {
              color: "#ffffff", // Warna indikator loading
            },
          }}
        >
          {!loginMutation.isPending ? (
            <h1 className="text-white font-semibold text-base">Sign in</h1>
          ) : null}
        </LoadingButton>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-5 bg-[#D9D9D9] border-0" />
          <span className="absolute px-3 text-[#838383] -translate-x-1/2 bg-white left-1/2 font-inter">
            Or
          </span>
        </div>
        <Link
          href={"#"}
          className="w-full bg-white flex justify-center items-center text-[#4999F1] font-semibold text-base rounded-xl py-2 border-[2px] border-[#EDEDED] gap-1"
        >
          <div className=" w-8 h-8">
            <Google />
          </div>
          <h1 className=" font-semibold text-[#1E1E1E] text-base">
            Continue with Google
          </h1>
        </Link>
        <h1 className="text-[#838383]">
          Dont’t have an account ?{" "}
          <Link
            className="text-[#202226] font-semibold"
            href={"/auth/register"}
          >
            Sign up
          </Link>
        </h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
