"use client";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import WomenIllustrator from "@/app/components/svg/WomenIllustrator";
import ReportIllustrator from "@/app/components/svg/ReportIllustrator";
import BackgroundGradReport from "@/app/components/svg/BackgroundGradReport";
import Link from "next/link";
const Lapor: React.FC = () => {
  return (
    <div className=" w-screen lg:w-full flex flex-col font-inter relative z-0 h-[100dvh] overflow-hidden -top-5 -left-[16px] lg:top-0 lg:left-0 -mb-24 ">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] fixed z-[-5] top-0 hidden lg:block"
        )}
        width={80}
        height={80}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
      <div className="w-full absolute z-[-2] bottom-0 block lg:hidden">
        <BackgroundGradReport />
      </div>

      <div className=" w-full flex flex-col gap-6 lg:gap-10 py-[18.4px] px-4 lg:px-0 items-center">
        <HeaderMobile mode="dark" />
        <p className=" w-[80%] text-center font-inter font-medium text-[10px] md:text-lg text-[#060620]/50">
          Silakan laporkan kebocoran atau permasalahan melalui sistem ini.
          Laporan Anda membantu kami mengambil tindakan demi keamanan dan
          kenyamanan bersama.
        </p>

        <Link
          href={"/lapor-kebocoran/lapor"}
          className=" w-full h-[122px] rounded-[15px] bg-gradient-to-b from-[#343FFB] via-[#6C72C8] to-[#7A7FC5]/90 relative z-0 overflow-hidden flex items-center pl-6 shadow-[0px_6px_5px_rgba(0,0,0,0.25)] lg:shadow-none  lg:hover:translate-y-[-10px] duration-300 lg:hover:shadow-[0px_10px_5px_rgba(0,0,0,0.25)]"
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
        <Link
          href={"/lapor-kebocoran/status-laporan"}
          className=" w-full h-[122px] rounded-[15px] bg-gradient-to-b from-[#343FFB] via-[#6C72C8] to-[#7A7FC5]/90 relative z-0 overflow-hidden flex items-center justify-end pr-5 shadow-[0px_6px_5px_rgba(0,0,0,0.25)] lg:shadow-none  lg:hover:translate-y-[-10px] duration-300 lg:hover:shadow-[0px_10px_5px_rgba(0,0,0,0.25)]"
        >
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
        </Link>
      </div>
    </div>
  );
};

export default Lapor;
