"use client";
import Link from "next/link";
import Google from "@/app/components/logo/Google";
import Image from "next/image";
import Aqualink from "../../../../public/assets/logo/Aqualink.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useLoginByGoogle } from "@/app/services/auth/auth.mutation";
import { Bounce, toast } from "react-toastify";
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
    <div className=" w-screen min-h-screen flex flex-col justify-center items-center px-7 py-10 gap-10 font-poppins">
      <div className="relative">
        <Image src={Aqualink} alt="auth-cover" width={200} height={200} />
      </div>

      <div className="flex flex-col gap-2 items-center">
        <h1 className=" text-[#202226] font-semibold text-2xl">Welcome</h1>
        <h6 className=" text-center text-[#838383] text-sm">
          Welcome back! Please enter your details.
        </h6>
      </div>

      <div className=" w-full flex flex-col gap-5 items-center">
        <Link
          href={"/auth/login"}
          className="w-full bg-[#039FE1] text-center text-white font-semibold text-base rounded-xl py-3"
        >
          Sign in
        </Link>
        <Link
          href={"/auth/register"}
          className="w-full bg-white text-center text-[#4999F1] font-semibold text-base rounded-xl py-3 border-[2px] border-[#EDEDED]"
        >
          Sign up
        </Link>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-5 bg-[#D9D9D9] border-0" />
          <span className="absolute px-3 text-[#838383] -translate-x-1/2 bg-white left-1/2 font-inter">
            Or
          </span>
        </div>
        <button
          onClick={() => onLoginGoogle()}
          className="w-full bg-white flex justify-center items-center text-[#4999F1] font-semibold text-base rounded-xl py-2 border-[2px] border-[#EDEDED] gap-1"
        >
          <div className=" w-8 h-8">
            <Google />
          </div>
          <h1 className=" font-semibold text-[#1E1E1E] text-base">
            Continue with Google
          </h1>
        </button>
      </div>
    </div>
  );
};

export default AuthCover;
