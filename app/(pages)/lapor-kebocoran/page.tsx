"use client";
import API from "@/app/utils/API";
import { useAuth } from "@/app/hooks/UseAuth";
import { IsDesktop } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import WomenIllustrator from "@/app/components/svg/WomenIllustrator";
import ReportIllustrator from "@/app/components/svg/ReportIllustrator";
import BackgroundGradReport from "@/app/components/svg/BackgroundGradReport";
import Link from "next/link";
const ChangePassword: React.FC = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const isDesktop = IsDesktop();

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth");
    }
  }, [auth.auth.isAuthenticated, navigation]);

  if (!auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }

  return isDesktop ? null : (
    <div className=" w-screen flex flex-col font-inter relative z-0 h-[100dvh] overflow-hidden -top-5 -left-[16px] -mb-24 ">
      <div className=" absolute z-[-2] bottom-0">
        <BackgroundGradReport />
      </div>

      <div className=" w-full flex flex-col gap-6 py-[18.4px] px-4 items-center">
        <HeaderMobile mode="dark" />
        <p className=" w-[80%] text-center font-inter font-medium text-[10px] text-[#060620]/50">
          Silakan laporkan kebocoran atau permasalahan melalui sistem ini.
          Laporan Anda membantu kami mengambil tindakan demi keamanan dan
          kenyamanan bersama.
        </p>

        <Link
          href={"/lapor-kebocoran/lapor"}
          className=" w-full h-[122px] rounded-[15px] bg-gradient-to-b from-[#343FFB] via-[#6C72C8] to-[#7A7FC5]/90 relative z-0 overflow-hidden flex items-center pl-6 shadow-[0px_4px_4px_grey]"
        >
          <div className=" flex flex-col">
            <div className="flex items-center gap-2 ">
              <h1 className=" font-montserrat font-medium text-white text-[20px]">
                Tambah
              </h1>
              <hr className="w-[30px] h-px mt-1 bg-[#ffffff] border-0" />
            </div>
            <h1 className=" font-montserrat font-bold text-white text-[40px] -mt-3">
              Laporan
            </h1>
          </div>
          <div className=" absolute z-[-1] right-0">
            <WomenIllustrator />
          </div>
        </Link>
        <div className=" w-full h-[122px] rounded-[15px] bg-gradient-to-b from-[#343FFB] via-[#6C72C8] to-[#7A7FC5]/90 relative z-0 overflow-hidden flex items-center justify-end pr-5 shadow-[0px_4px_4px_grey]">
          <div className=" flex flex-col">
            <div className="flex items-center gap-2 ">
              <h1 className=" font-montserrat font-medium text-white text-[20px]">
                Lihat
              </h1>
              <hr className="w-[30px] h-px mt-1 bg-[#ffffff] border-0" />
            </div>
            <h1 className=" font-montserrat font-bold text-white text-[28px] -mt-3">
              Status Laporan
            </h1>
          </div>
          <div className=" absolute z-[-1] -left-2">
            <ReportIllustrator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
