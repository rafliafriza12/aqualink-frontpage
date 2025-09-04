"use client";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { formatToIDR } from "@/app/utils/helper";
import Image from "next/image";
import Link from "next/link";
const RiwaayatTagihanCard: React.FC = () => {
  return (
    <div className="w-full relative flex flex-col gap-5 md:gap-10 z-0 bg-[#252525] rounded-[30px] overflow-hidden shadow-[0px_16px_10px_rgba(0,0,0,0.25)]">
      {/* background bagian I*/}
      <div className="block w-full h-[40vh] md:h-[80vw] rounded-full bg-[#4952FE] blur-[150px] md:blur-[300px] absolute z-[-4] top-[70%] md:top-[90%] "></div>
      {/* background bagian I*/}
      <div className=" w-full flex flex-col gap-10 p-5 md:p-7 ">
        {/* Header */}
        <div className="w-full flex justify-between items-start">
          <div className=" flex flex-col items-start gap-1 md:gap-2">
            <h1 className=" text-white font-montserrat font-bold text-lg md:text-2xl lg:text-3xl">
              INV-2024-08-001
            </h1>
            <h1 className=" text-white/50 font-montserrat font-medium text-xs md:text-sm lg:text-sm">
              PERUMDAM Tirta Daroy
            </h1>
            <h1 className=" text-white/50 font-montserrat font-medium text-xs md:text-sm lg:text-sm -mt-2">
              tirtadaroy@gmail.com
            </h1>
          </div>
          <div className=" flex flex-col items-end gap-3">
            <h1 className="  font-montserrat text-[10px] md:text-xs font-medium py-1 px-4 md:px-7 bg-gradient-to-l from-[#0EC585] via-transparent to-transparent text-[#0EC585] rounded-full border border-[#0EC585]">
              Lunas
            </h1>
            <h1 className=" text-white font-montserrat font-bold text-lg md:text-2xl lg:text-3xl">
              {formatToIDR(126000)}
            </h1>
          </div>
        </div>
        {/* Header */}

        {/* tgl, tempo, metode pembayaran */}
        <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 font-montserrat">
          <div className="w-full flex flex-col items-center md:flex-row md:items-start lg:items-center justify-start gap-2 md:gap-3 lg:gap-5">
            <CalendarMonthIcon sx={{ color: "white" }} />
            <div className="flex flex-col">
              <h1 className="text-xs md:text-sm text-[#C7C7C7] font-medium text-center md:text-left">
                Tanggal Tagihan
              </h1>
              <h1 className="text-sm md:text-base lg:text-base text-white font-semibold text-center md:text-left">
                1 September 2025
              </h1>
            </div>
          </div>
          <div className="w-full flex flex-col items-center md:flex-row md:items-start lg:items-center justify-start gap-2 md:gap-3 lg:gap-5">
            <AccessTimeIcon sx={{ color: "white" }} />
            <div className="flex flex-col">
              <h1 className="text-xs md:text-sm text-[#C7C7C7] font-medium text-center md:text-left">
                Jatuh Tempo
              </h1>
              <h1 className="text-sm md:text-base lg:text-base text-white font-semibold text-center md:text-left">
                3 September 2025
              </h1>
            </div>
          </div>
          <div className="w-full flex flex-col items-center md:flex-row md:items-start lg:items-center justify-start gap-2 md:gap-3 lg:gap-5">
            <CreditCardIcon sx={{ color: "white" }} />
            <div className="flex flex-col">
              <h1 className="text-xs md:text-sm text-[#C7C7C7] font-medium text-center md:text-left">
                Metode Pembayaran
              </h1>
              <h1 className="text-sm md:text-base lg:text-base text-white font-semibold text-center md:text-left">
                Belum Memilih
              </h1>
            </div>
          </div>
        </div>

        <div className=" w-full flex gap-2 flex-wrap font-montserrat">
          <h1 className="px-2 py-1 border border-white/60 rounded-full font-medium text-white/60 text-xs md:text-sm lg:text-sm">
            Penggunaan : <span className="font-bold">5880 Liter</span>
          </h1>
          <h1 className="px-2 py-1 border border-white/60 rounded-full font-medium text-white/60 text-xs md:text-sm lg:text-sm">
            Jatuh Tempo : <span className="font-bold">4 September 2025</span>
          </h1>
          <h1 className="px-2 py-1 border border-white/60 rounded-full font-medium text-white/60 text-xs md:text-sm lg:text-sm">
            Dibayar : <span className="font-bold">3 September 2025</span>
          </h1>
        </div>
        {/* tgl, tempo, metode pembayaran */}

        {/* Call To Action */}
        <div className=" flex items-center justify-between md:justify-start gap-5 font-montserrat">
          <button className=" justify-center w-[48%] md:w-auto py-2 md:py-3 lg:py-3 md:px-4 rounded-lg border border-white flex items-center gap-2 hover:-translate-y-1 duration-300 bg-gradient-to-r from-[#F14141] to-transparent">
            <FileDownloadOutlinedIcon sx={{ color: "white" }} />
            <h1 className=" text-white font-bold text-xs md:text-sm">
              Unduh PDF
            </h1>
          </button>
          <Link
            href={"/pembayaran"}
            className="w-[48%] justify-center md:w-auto py-2 md:py-3 lg:py-3 md:px-8 rounded-lg border border-white flex items-center gap-2 hover:-translate-y-1 duration-300 bg-gradient-to-r from-[#414BF1] to-transparent"
          >
            <CreditCardIcon sx={{ color: "white" }} />
            <h1 className=" text-white font-bold text-xs md:text-sm">
              Lihat Detail
            </h1>
          </Link>
        </div>
        {/* Call To Action */}
      </div>
    </div>
  );
};

export default RiwaayatTagihanCard;
