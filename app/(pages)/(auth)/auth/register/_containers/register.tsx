"use client";
import { useState } from "react";
import Google from "@/app/components/logo/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { toast, Bounce, ToastContainer } from "react-toastify";
import flowin from "../../../../../../public/assets/logo/flowin-white.png";
import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import { RegisterCredentials } from "@/app/services/auth/auth.type";
import {
  useRegister,
  useRegisterByGoogle,
} from "@/app/services/auth/auth.mutation";
import { useGoogleLogin } from "@react-oauth/google";
import Aurora from "@/components/Aurora";
import LogoWhite from "@/app/components/svg/LogoWhite";
import { Ripple } from "@/components/magicui/ripple";
const RegisterPage: React.FC = () => {
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
            Mulai Bersama Kami
          </h1>
          <h1
            data-aos={"fade-up"}
            data-aos-duration={"1000"}
            className=" text-[#D9D9D9] font-semibold text-base font-montserrat text-center"
          >
            PEDULI PADA SETIAP TETES AIR YANG KITA GUNAKAN
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
            loading={registerMutation.isPending}
            variant="outlined"
            onClick={() => onRegisterGoogle()}
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
            {!registerMutation.isPending ? (
              <>
                <div className=" w-8 h-8">
                  <Google />
                </div>
                <h1 className=" font-semibold text-[#D9D9D9] text-base">
                  Daftar dengan Google
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
            id="fullname"
            label="Nama Lengkap"
            variant="outlined"
            value={credentials.fullName}
            type="text"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, fullName: e.target.value }))
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
            id="phone"
            label="No. HP"
            variant="outlined"
            value={credentials.phone}
            type="number"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, phone: e.target.value }))
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
            {!registerMutation.isPending ? (
              <h1 className="text-[#D9D9D9] font-semibold text-base">Daftar</h1>
            ) : null}
          </LoadingButton>

          <h1 className="text-[#D9D9D9] font-medium">
            Sudah punya akun ?{" "}
            <Link className="text-[#383DD3] font-semibold" href={"/auth/login"}>
              Masuk
            </Link>
          </h1>
        </div>
      </div>

      {/* Mobile & Tablet */}
      <div className="lg:hidden w-screen min-h-screen flex flex-col justify-center items-center p-7 gap-5 relative z-0 font-poppins overflow-hidden">
        {/* <div className="w-[80vw]  absolute z-[-3] bottom-[-8%] right-[-30%] opacity-[0.3]">
        <LogoWhite />
      </div> */}
        <div className="absolute z-[-2] w-[200%] h-[100px] bg-gradient-to-t from-[#828393] via-[#1F2374] to-[#121561] -bottom-[2%] left-1/2 -translate-x-1/2 blur-[90px]"></div>
        <div className="absolute w-full h-[200px] z-[-1] inset-0">
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
            Mulai Bersama Kami
          </h1>
          {/* <h6 className=" text-center text-[#D9D9D9] text-sm font-montserrat">
          Selesaikan langkah-langkah mudah ini untuk mendaftarkan akun Anda
        </h6> */}
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
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              "& .MuiOutlinedInput-root": {
                color: "white", // Warna teks input
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
                color: "white", // Warna label default
                "&.Mui-focused": {
                  color: "white", // Warna label saat fokus
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
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              "& .MuiOutlinedInput-root": {
                color: "white", // Warna teks input
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
                color: "white", // Warna label default
                "&.Mui-focused": {
                  color: "white", // Warna label saat fokus
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
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              "& .MuiOutlinedInput-root": {
                color: "white", // Warna teks input
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
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
            sx={{
              width: "100%",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              "& .MuiOutlinedInput-root": {
                color: "white", // Warna teks input
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
                color: "white", // Warna label default
                "&.Mui-focused": {
                  color: "white", // Warna label saat fokus
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
            {!registerMutation.isPending ? (
              <h1 className="text-[#D9D9D9] font-semibold text-base">Daftar</h1>
            ) : null}
          </LoadingButton>

          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-5 bg-[#D9D9D9] border-0" />
            <span className="absolute px-3 text-white -translate-x-1/2 bg-[#040404] left-1/2 font-inter">
              Atau
            </span>
          </div>
          <LoadingButton
            loading={registerMutation.isPending}
            variant="outlined"
            onClick={() => onRegisterGoogle()}
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
            {!registerMutation.isPending ? (
              <>
                <div className=" w-8 h-8">
                  <Google />
                </div>
                <h1 className=" font-semibold text-[#D9D9D9] text-base">
                  Daftar dengan Google
                </h1>
              </>
            ) : null}
          </LoadingButton>
          <h1 className="text-[#D9D9D9]">
            Sudah punya akun ?{" "}
            <Link className="text-[#383DD3] font-semibold" href={"/auth/login"}>
              Masuk
            </Link>
          </h1>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
