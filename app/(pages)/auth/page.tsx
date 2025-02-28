"use client";
import { IsDesktop } from "@/app/hooks";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import Google from "@/app/components/logo/Google";
import Image from "next/image";
import Logo from "@/app/components/logo/Logo";
import Aqualink from "../../../public/assets/logo/Aqualink.png";
const AuthCover: React.FC = () => {
  const isDesktop = IsDesktop();
  const Auth = useAuth();
  const navigation = useRouter();

  useEffect(() => {
    if (Auth.auth.isAuthenticated) {
      navigation.replace("/");
    }
  }, [Auth.auth.isAuthenticated, navigation]);

  if (Auth.auth.isAuthenticated) {
    navigation.replace("/");
    return null; // Hindari rendering konten saat redirect
  }

  return isDesktop ? //       <h1 className=" text-[#202226] font-semibold text-5xl">Welcome</h1> //     <div className=" flex flex-col items-center gap-3"> //     <Image src={Aqualink} alt="auth-cover" width={500} height={500} /> //   <div className="h-full w-[50%] flex flex-col justify-center items-center gap-5 border-r-[1px] border-gray-400 shadow-[3px_0px_15px_gray]"> // <div className="w-screen h-screen flex items-center justify-between overflow-hidden">
  //       <h6 className=" text-center text-[#838383] text-xl">
  //         Welcome back! Please enter your details.
  //       </h6>
  //     </div>
  //   </div>
  //   <div className="h-full w-[50%] flex flex-col justify-center items-center px-56">
  //     <div className=" w-full flex flex-col gap-8 items-center">
  //       <Link
  //         href={"/auth/login"}
  //         className="w-full bg-[#039FE1] text-center text-white font-semibold text-base rounded-xl py-3"
  //       >
  //         Sign in
  //       </Link>
  //       <Link
  //         href={"/auth/register"}
  //         className="w-full bg-white text-center text-[#4999F1] font-semibold text-base rounded-xl py-3 border-[2px] border-[#EDEDED]"
  //       >
  //         Sign up
  //       </Link>

  //       <div className="inline-flex items-center justify-center w-full">
  //         <hr className="w-full h-px my-5 bg-[#D9D9D9] border-0 relative z-0" />
  //         <span className="absolute px-3 text-[#838383] bg-white font-inter">
  //           Or
  //         </span>
  //       </div>
  //       <Link
  //         href={"#"}
  //         className="w-full bg-white flex justify-center items-center text-[#4999F1] font-semibold text-base rounded-xl py-2 border-[2px] border-[#EDEDED] gap-1"
  //       >
  //         <div className=" w-8 h-8">
  //           <Google />
  //         </div>
  //         <h1 className=" font-semibold text-[#1E1E1E] text-base">
  //           Continue with Google
  //         </h1>
  //       </Link>
  //     </div>
  //   </div>
  // </div>
  null : (
    <div className=" w-screen h-screen flex flex-col justify-center items-center p-7 gap-10 font-poppins">
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

        {/* <div className="inline-flex items-center justify-center w-full">
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
        </Link> */}
      </div>
    </div>
  );
};

export default AuthCover;
