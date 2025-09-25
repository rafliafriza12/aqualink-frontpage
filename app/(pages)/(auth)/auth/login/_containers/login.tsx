"use client";
import Google from "@/app/components/logo/Google";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import flowin from "../../../../../../public/assets/logo/flowin-white.png";
import Image from "next/image";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { LoginCredentials } from "@/app/services/auth/auth.type";
import { useLogin, useLoginByGoogle } from "@/app/services/auth/auth.mutation";
import { useGoogleLogin } from "@react-oauth/google";
import Aurora from "@/components/Aurora";
import { Ripple } from "@/components/magicui/ripple";
import LogoWhite from "@/app/components/svg/LogoWhite";

const LoginPage: React.FC = () => {
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
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const handleErrorGoogle = () => {
    toast.error("Terjadi Kesalahan, Login Gagal.", TOAST_CONFIG);
  };
  const loginByGoogle = useLoginByGoogle();
  const googleLogin = useGoogleLogin({
    onSuccess: async (response: any) => await loginByGoogle(response),
    onError: handleErrorGoogle,
    scope:
      "openid email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loginMutation = useLogin();

  const onLogin = () => {
    loginMutation.mutate(credentials);
  };

  const onLoginGoogle = () => {
    googleLogin();
  };

  return (
    <>
      {/* Desktop */}
      <div className="w-screen min-h-screen p-10  hidden relative z-0 lg:grid lg:grid-cols-2 font-montserrat overflow-hidden">
        <div className=" absolute z-[-1] w-[25vw] -bottom-[17%] -right-[5%] opacity-[0.2]">
          <LogoWhite />
        </div>
        <Ripple className="absolute z-[-2] translate-x-[45%] translate-y-[40%]" />
        <div className="w-full h-full relative z-0 rounded-xl overflow-hidden flex flex-col items-center justify-end gap-3 pb-32">
          {/*  */}
          <div className="absolute w-full h-[600px] z-[-1] inset-0">
            <Aurora
              colorStops={["#121562", "#282E81", "#4855B2"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
          {/*  */}
          <div
            data-aos={"fade-up"}
            data-aos-duration={"1000"}
            className="flex flex-col items-center"
          >
            <Image
              src={flowin}
              alt="auth-cover"
              width={40}
              className="h-auto"
            />
            <h1 className="font-nasalization text-[#D9D9D9] text-2xl">
              FLOWIN
            </h1>
          </div>
          <h1
            data-aos={"fade-up"}
            data-aos-duration={"1000"}
            className=" text-[#D9D9D9] font-semibold text-4xl font-montserrat"
          >
            Masuk Untuk Lanjut
          </h1>
          <h1
            data-aos={"fade-up"}
            data-aos-duration={"1000"}
            className=" text-[#D9D9D9] font-semibold text-base font-montserrat text-center"
          >
            WUJUDKAN MASA DEPAN AIR YANG BERKELANJUTAN
          </h1>
          <div className="flex flex-col gap-5 mt-10">
            <Link
              href={"/auth/login"}
              className="group text-white py-3 w-[460px] rounded-[10px] bg-gradient-to-r from-[#191B4D] to-[#383DD3] flex items-center justify-center font-montserrat font-extrabold gap-3 relative z-0"
            >
              <div className="absolute z-[-1] w-full h-full rounded-[10px] bg-gradient-to-r from-[#191B4D] to-[#383DD3] opacity-[0.4] group-hover:-translate-y-4 duration-300"></div>
              <div className="absolute z-[-1] w-full h-full rounded-[10px] bg-gradient-to-r from-[#191B4D] to-[#383DD3] opacity-[0.2] group-hover:-translate-y-7 duration-500"></div>
              <h1>MASUK</h1>
            </Link>
            <Link
              href={"/auth/register"}
              className=" text-[#1C2066] py-3 w-[460px] rounded-[10px] bg-[#9CA0FF] flex items-center justify-center font-montserrat font-extrabold gap-3 group relative z-0"
            >
              <div className="absolute z-[-1] w-full h-full rounded-[10px] bg-[#9CA0FF] opacity-[0.4] group-hover:translate-y-4 duration-300"></div>
              <div className="absolute z-[-1] w-full h-full rounded-[10px] bg-[#9CA0FF] opacity-[0.2] group-hover:translate-y-7 duration-500"></div>
              <h1>DAFTAR</h1>
            </Link>
          </div>
        </div>
        <div className="w-full h-full rounded-xl flex flex-col items-center justify-center gap-10 py-10 px-36 translate-x-8">
          <LoadingButton
            loading={loginMutation.isPending}
            variant="outlined"
            onClick={() => onLoginGoogle()}
            sx={{
              background: "transparent",
              minWidth: "460px",
              width: "100%",
              height: "48px",
              color: "#ffffff",
              borderColor: "#676565",
              "&:hover": {
                // background: "linear-gradient(90deg, #191B4D 0%, #383DD3 100%)",
                borderColor: "#ffffff",
              },
              "& .MuiLoadingButton-loadingIndicator": {
                color: "#ffffff",
              },
            }}
          >
            {!loginMutation.isPending ? (
              <>
                <div className=" w-8 h-8">
                  <Google />
                </div>
                <h1 className=" font-semibold text-[#D9D9D9] text-base">
                  Masuk dengan Google
                </h1>
              </>
            ) : null}
          </LoadingButton>

          <div className="inline-flex items-center justify-center w-full relative z-0">
            <hr className="w-full h-px my-5 bg-[#676565] border-0" />
            <span className="absolute px-3 text-[#ffffff] -translate-x-1/2 bg-[#040404] left-1/2 font-inter">
              atau
            </span>
          </div>

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
              minWidth: "460px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                color: "white", // Warna teks input
                "& fieldset": {
                  borderColor: "#676565", // Warna outline default
                },
                "&:hover fieldset": {
                  borderColor: "#676565", // Warna outline saat hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff", // Warna outline saat fokus
                },
                // Menghilangkan background autocomplete browser
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px black inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "black !important",
                },
                "& input:-webkit-autofill:hover": {
                  WebkitBoxShadow: "0 0 0 1000px black inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "black !important",
                },
                "& input:-webkit-autofill:focus": {
                  WebkitBoxShadow: "0 0 0 1000px black inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "black !important",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#676565", // Warna label default
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
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
            sx={{
              width: "100%",
              minWidth: "460px",
              "& .MuiOutlinedInput-root": {
                color: "white", // Warna teks input
                "& fieldset": {
                  borderColor: "#676565", // Warna outline default
                },
                "&:hover fieldset": {
                  borderColor: "#676565", // Warna outline saat hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff", // Warna outline saat fokus
                },
                // Menghilangkan background autocomplete browser
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "transparent !important",
                },
                "& input:-webkit-autofill:hover": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "transparent !important",
                },
                "& input:-webkit-autofill:focus": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "transparent !important",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#676565", // Warna label default
                "&.Mui-focused": {
                  color: "white", // Warna label saat fokus
                },
              },
            }}
            slotProps={{
              input: {
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
              },
            }}
          />

          <LoadingButton
            loading={loginMutation.isPending}
            variant="outlined"
            onClick={() => onLogin()}
            sx={{
              background: "linear-gradient(90deg, #191B4D 0%, #383DD3 100%)",
              width: "100%",
              minWidth: "460px",
              height: "48px",
              color: "#ffffff",
              borderColor: "#191B4D",
              "&:hover": {
                background: "linear-gradient(90deg, #191B4D 0%, #383DD3 100%)",
                borderColor: "#191B4D",
              },
              "& .MuiLoadingButton-loadingIndicator": {
                color: "#ffffff",
              },
            }}
          >
            {!loginMutation.isPending ? (
              <h1 className="text-white font-semibold text-base">Masuk</h1>
            ) : null}
          </LoadingButton>
          <h1 className="text-[#D9D9D9] font-medium">
            Belum punya akun ?{" "}
            <Link
              className="text-[#383DD3] font-semibold"
              href={"/auth/register"}
            >
              Daftar
            </Link>
          </h1>
        </div>
      </div>

      {/* Mobile and Tablet */}
      <div className="lg:hidden w-screen min-h-screen flex flex-col justify-center items-center px-7 py-10 gap-10 font-poppins relative z-0 overflow-hidden">
        <div className="absolute z-[-2] w-[200%] h-[100px] bg-gradient-to-t from-[#828393] via-[#1F2374] to-[#121561] -bottom-[2%] left-1/2 -translate-x-1/2 blur-[90px]"></div>
        <div className="absolute w-full h-[200px] md:h-[400px] z-[-1] inset-0">
          <Aurora
            colorStops={["#121562", "#282E81", "#4855B2"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <div
          data-aos={"fade-up"}
          data-aos-duration={"1000"}
          className="flex flex-col items-center"
        >
          <Image src={flowin} alt="auth-cover" width={50} className="h-auto" />
          <h1 className="font-nasalization text-[#D9D9D9] text-2xl">FLOWIN</h1>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h1
            data-aos={"fade-up"}
            data-aos-duration={"1000"}
            className=" text-[#D9D9D9] font-semibold text-2xl font-montserrat"
          >
            Masuk Untuk Lanjut
          </h1>
        </div>
        <div className=" w-full flex flex-col gap-5 items-center -mt-4">
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
                color: "white", // Warna teks input
                "& fieldset": {
                  borderColor: "#676565", // Warna outline default
                },
                "&:hover fieldset": {
                  borderColor: "#676565", // Warna outline saat hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff", // Warna outline saat fokus
                },
                // Menghilangkan background autocomplete browser
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px black inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "black !important",
                },
                "& input:-webkit-autofill:hover": {
                  WebkitBoxShadow: "0 0 0 1000px black inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "black !important",
                },
                "& input:-webkit-autofill:focus": {
                  WebkitBoxShadow: "0 0 0 1000px black inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "black !important",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#676565", // Warna label default
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
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                color: "white", // Warna teks input
                "& fieldset": {
                  borderColor: "#676565", // Warna outline default
                },
                "&:hover fieldset": {
                  borderColor: "#676565", // Warna outline saat hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff", // Warna outline saat fokus
                },
                // Menghilangkan background autocomplete browser
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px black inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "black !important",
                },
                "& input:-webkit-autofill:hover": {
                  WebkitBoxShadow: "0 0 0 1000px black inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "black !important",
                },
                "& input:-webkit-autofill:focus": {
                  WebkitBoxShadow: "0 0 0 1000px black inset !important",
                  WebkitTextFillColor: "white !important",
                  backgroundColor: "black !important",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#676565", // Warna label default
                "&.Mui-focused": {
                  color: "white", // Warna label saat fokus
                },
              },
            }}
            slotProps={{
              input: {
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
              },
            }}
          />
          <LoadingButton
            loading={loginMutation.isPending}
            variant="outlined"
            onClick={() => onLogin()}
            sx={{
              background: "linear-gradient(90deg, #191B4D 0%, #383DD3 100%)",
              width: "100%",
              height: "48px",
              color: "#ffffff",
              borderColor: "#191B4D",
              "&:hover": {
                background: "linear-gradient(90deg, #191B4D 0%, #383DD3 100%)",
                borderColor: "#191B4D",
              },
              "& .MuiLoadingButton-loadingIndicator": {
                color: "#ffffff",
              },
            }}
          >
            {!loginMutation.isPending ? (
              <h1 className="text-white font-semibold text-base">Masuk</h1>
            ) : null}
          </LoadingButton>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-5 bg-[#D9D9D9] border-0" />
            <span className="absolute px-3 text-white -translate-x-1/2 bg-[#040404] left-1/2 font-inter">
              atau
            </span>
          </div>

          <LoadingButton
            loading={loginMutation.isPending}
            variant="outlined"
            onClick={() => onLoginGoogle()}
            sx={{
              background: "linear-gradient(90deg, #191B4D 0%, #383DD3 100%)",
              width: "100%",
              height: "48px",
              color: "#ffffff",
              borderColor: "#191B4D",
              "&:hover": {
                background: "linear-gradient(90deg, #191B4D 0%, #383DD3 100%)",
                borderColor: "#191B4D",
              },
              "& .MuiLoadingButton-loadingIndicator": {
                color: "#ffffff",
              },
            }}
          >
            {!loginMutation.isPending ? (
              <>
                <div className=" w-8 h-8">
                  <Google />
                </div>
                <h1 className=" font-semibold text-[#D9D9D9] text-base">
                  Masuk dengan Google
                </h1>
              </>
            ) : null}
          </LoadingButton>

          <h1 className="text-[#D9D9D9]">
            Belum punya akun ?{" "}
            <Link
              className="text-[#383DD3] font-semibold"
              href={"/auth/register"}
            >
              Daftar
            </Link>
          </h1>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
