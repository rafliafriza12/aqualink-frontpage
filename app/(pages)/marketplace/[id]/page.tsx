"use client";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";
import { IsDesktop } from "@/app/hooks";
import { useEffect } from "react";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import WaterCredit from "@/app/components/card/WaterCredit";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { formatToIDR } from "@/app/utils/helper";
const WaterCreditDetail: React.FC = () => {
  const navigation = useRouter();
  const auth = useAuth();
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
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins pb-16">
      <HeaderMobile mode="dark" />
      <WaterCredit />
      <div className=" w-full flex flex-col gap-3">
        <h1 className=" font-montserrat font-bold text-[24px]">Air Bersih</h1>
        <div className=" w-full flex flex-col gap-1">
          <div className=" flex items-center gap-3">
            <PersonOutlineOutlinedIcon />
            <h1 className=" font-poppins font-semibold text-base text-[#202226]">
              Rafli Afriza Nugraha
            </h1>
          </div>
          <div className=" flex items-center gap-2">
            <LocationOnOutlinedIcon />
            <h1 className=" font-poppins text-[14px] text-[#202226]/50">
              Gampong Jawa, Kec. Kuta Alam, Kota Banda Aceh
            </h1>
          </div>
        </div>
        <p className="w-full text-left font-montserrat font-medium text-[12px] text-[#9D9B9B]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
          soluta eligendi culpa, optio vitae asperiores architecto officiis
          accusantium, magnam minima ipsam quia cum? Itaque voluptatum aliquam
          officia consequuntur animi natus.
        </p>
      </div>
      <div className=" w-full">
        <table>
          <tbody>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Harga</td>
              <td>
                {formatToIDR(3400)}{" "}
                <span className="text-[10px]">/ 1000 L</span>
              </td>
            </tr>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Tempo Pembayaran</td>
              <td>Perbulan</td>
            </tr>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Token Konservasi</td>
              <td>
                100{" "}
                <span className="text-[9px] text-red-400">
                  *Maks. 9000 L / bulan
                </span>
              </td>
            </tr>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Kualitas Air</td>
              <td>Bersih</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h1 className=" w-full font-montserrat font-bold text-[20px]">
        {formatToIDR(3400)}
      </h1>
      <div className=" w-full flex justify-center">
        <button className="py-3 px-8 text-white rounded-[15px] bg-[#484FCA]">
          <h1 className=" font-montserrat font-bold">Berlangganan Sekarang</h1>
        </button>
      </div>
    </div>
  );
};

export default WaterCreditDetail;
