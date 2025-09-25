"use client";
import Link from "next/link";
import Image from "next/image";
import flowin from "../../../../public/assets/logo/flowin-white.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useLoginByGoogle } from "@/app/services/auth/auth.mutation";
import { Bounce, toast } from "react-toastify";
import Aurora from "@/components/Aurora";
const AuthCover: React.FC = () => {
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
  const loginByGoogle = useLoginByGoogle();
  const googleLogin = useGoogleLogin({
    onSuccess: async (response: any) => await loginByGoogle(response),
    onError: handleErrorGoogle,
    scope:
      "openid email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  });

  const onLoginGoogle = () => {
    googleLogin();
  };

  return (
    <div className="w-full ">
      <div className=" w-full min-h-screen flex flex-col justify-center items-center gap-5 md:gap-10 font-montserrat relative z-0">
        <div className="absolute z-[-2] w-[200%] h-[100px] bg-gradient-to-t from-[#828393] via-[#1F2374] to-[#121561] -bottom-[2%] left-1/2 -translate-x-1/2 blur-[90px]"></div>
        <div className="absolute w-full h-[200px] md:h-[400px] lg:h-[600px] z-[-1] inset-0">
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
          <Image src={flowin} alt="auth-cover" width={40} className="h-auto" />
          <h1 className="font-nasalization text-[#D9D9D9] md:text-2xl">
            FLOWIN
          </h1>
        </div>
        <h1
          data-aos={"fade-up"}
          data-aos-duration={"1000"}
          className=" text-[#D9D9D9] font-semibold text-2xl md:text-4xl font-montserrat px-5 md:px-5 text-center"
        >
          Mulai Bersama Kami
        </h1>
        <h1
          data-aos={"fade-up"}
          data-aos-duration={"1000"}
          className=" text-[#D9D9D9] font-semibold text-xs md:text-base font-montserrat text-center px-5 md:px-0"
        >
          PEDULI PADA SETIAP TETES AIR YANG KITA GUNAKAN
        </h1>
        <div className="flex flex-col items-center gap-5 mt-5 md:mt-10 w-full px-5">
          <Link
            href={"/auth/login"}
            className="group text-white py-3 w-full md:w-[460px] rounded-[10px] bg-gradient-to-r from-[#191B4D] to-[#383DD3] flex items-center justify-center font-montserrat font-extrabold gap-3 relative z-0"
          >
            <div className="absolute z-[-1] w-full h-full rounded-[10px] bg-gradient-to-r from-[#191B4D] to-[#383DD3] opacity-[0.4] group-hover:-translate-y-4 duration-300"></div>
            <div className="absolute z-[-1] w-full h-full rounded-[10px] bg-gradient-to-r from-[#191B4D] to-[#383DD3] opacity-[0.2] group-hover:-translate-y-7 duration-500"></div>
            <h1>MASUK</h1>
          </Link>
          <Link
            href={"/auth/register"}
            className=" text-[#1C2066] py-3 w-full md:w-[460px] rounded-[10px] bg-[#9CA0FF] flex items-center justify-center font-montserrat font-extrabold gap-3 group relative z-0"
          >
            <div className="absolute z-[-1] w-full h-full rounded-[10px] bg-[#9CA0FF] opacity-[0.4] group-hover:translate-y-4 duration-300"></div>
            <div className="absolute z-[-1] w-full h-full rounded-[10px] bg-[#9CA0FF] opacity-[0.2] group-hover:translate-y-7 duration-500"></div>
            <h1>DAFTAR</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthCover;
