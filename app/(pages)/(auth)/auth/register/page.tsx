"use client";
import { useRouter } from "next/navigation";
import Logo from "@/app/components/logo/Logo";
import { useState, useEffect } from "react";
import Google from "@/app/components/logo/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import API from "@/app/utils/API";
import { IsDesktop } from "@/app/hooks";
import { toast, Bounce, ToastContainer } from "react-toastify";
import Aqualink from "../../../../../public/assets/logo/Aqualink.png";
import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import { RegisterCredentials } from "@/app/services/auth/auth.type";
import {
  useRegister,
  useRegisterByGoogle,
} from "@/app/services/auth/auth.mutation";
import { useGoogleLogin } from "@react-oauth/google";
const Register: React.FC = () => {
  const TOAST_CONFIG = {
    position: "top-center" as const,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light" as const,
    transition: Bounce,
  };
  const handleErrorGoogle = () => {
    toast.error("Terjadi Kesalahan, Login Gagal.", TOAST_CONFIG);
  };
  const registerByGoogle = useRegisterByGoogle();
  const googleRegister = useGoogleLogin({
    onSuccess: async (response: any) => await registerByGoogle(response),
    onError: handleErrorGoogle,
    scope:
      "openid email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  });
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    email: "",
    phone: "",
    fullName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  useState<boolean>(false);

  const registerMutation = useRegister();

  const onRegister = () => {
    registerMutation.mutate(credentials);
  };

  const onRegisterGoogle = () => {
    googleRegister();
  };

  return (
    <div className="w-screen flex flex-col justify-center items-center p-7 gap-10 font-poppins">
      <div data-aos={"fade-up"} data-aos-duration={"1000"} className="">
        <Image src={Aqualink} alt="auth-cover" width={130} height={130} />
      </div>

      <div className="flex flex-col gap-2 items-center">
        <h1
          data-aos={"fade-up"}
          data-aos-duration={"1000"}
          className=" text-[#202226] font-semibold text-2xl"
        >
          Register a new account
        </h1>
        <h6 className=" text-center text-[#838383] text-sm">
          Hi new user! Please enter your details.
        </h6>
      </div>
      <div className=" w-full flex flex-col gap-5 items-center">
        <TextField
          id="fullname"
          label="Nama Lengkap"
          variant="outlined"
          value={credentials.fullName}
          type="text"
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, fullName: e.target.value }))
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
          id="phone"
          label="No. HP"
          variant="outlined"
          value={credentials.phone}
          type="number"
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, phone: e.target.value }))
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
          loading={registerMutation.isPending}
          variant="outlined"
          onClick={() => onRegister()}
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
          {!registerMutation.isPending ? (
            <h1 className="text-white font-semibold text-base">Sign up</h1>
          ) : null}
        </LoadingButton>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-5 bg-[#D9D9D9] border-0" />
          <span className="absolute px-3 text-[#838383] -translate-x-1/2 bg-white left-1/2 font-inter">
            Or
          </span>
        </div>
        <LoadingButton
          loading={registerMutation.isPending}
          variant="outlined"
          onClick={() => onRegisterGoogle()}
          sx={{
            backgroundColor: "#ffffff",
            width: "100%",
            height: "48px",
            color: "#ffffff",
            borderColor: "#838383",
            "&:hover": {
              backgroundColor: "#ffffff", // Warna saat hover
              borderColor: "#838383",
            },
            "& .MuiLoadingButton-loadingIndicator": {
              color: "#039FE1", // Warna indikator loading
            },
          }}
        >
          {!registerMutation.isPending ? (
            <>
              <div className=" w-8 h-8">
                <Google />
              </div>
              <h1 className=" font-semibold text-[#1E1E1E] text-base">
                Continue with Google
              </h1>
            </>
          ) : null}
        </LoadingButton>
        <h1 className="text-[#838383]">
          Have an account ?{" "}
          <Link className="text-[#202226] font-semibold" href={"/auth/login"}>
            Sign in
          </Link>
        </h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
