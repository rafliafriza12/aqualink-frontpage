import { Card, CardContent, Grid, Typography } from "@mui/material";
import { formatToIDR } from "@/app/utils/helper";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { IsDesktop } from "@/app/hooks";
import TokenSVG from "../svg/Token";

interface WaterCreditType {
  _id: string;
  owner: {
    id: string;
    fullName: string;
    phone: string;
    email: string;
  };
  cost: number;
  perLiter: number;
  billingTime: string;
  conservationToken: {
    rewardToken: number;
    maxWaterUser: number;
    tokenRewardTempo: string;
  };
  waterQuality: string;
  income: number;
  totalIncome: number;
  withdrawl: number;
  totalUser: number;
  location: {
    address: string;
    coordinates: {
      lang: number;
      lat: number;
    };
  };
}

interface WaterCreditCardProps {
  isInSwiper?: boolean;
  waterCredit: WaterCreditType;
  link?: string;
}

const WaterCredit: React.FC<WaterCreditCardProps> = ({
  isInSwiper = false,
  waterCredit,
  link,
}) => {
  const isDesktop = IsDesktop();
  return (
    <Link
      href={link ? `${link}` : `/marketplace/${waterCredit?._id}`}
      className={`${
        isInSwiper ? "w-[85%]" : "w-full"
      }  flex justify-between items-center rounded-[15px] bg-[#D9D9D9] p-3 h-[180px]`}
    >
      <div
        className={`w-[63%] ${
          isInSwiper ? "h-[88%]" : "h-full"
        } p-3 bg-white rounded-[12px] flex flex-col justify-between`}
      >
        <div className=" w-full flex flex-col gap-1">
          <h1 className=" text-left font-poppins font-semibold text-base">
            {waterCredit?.owner?.fullName}
          </h1>
          <div className="w-full flex items-center gap-2">
            <div className="w-[18px] h-[18px] flex justify-center items-center rounded-full bg-[#E5E7EB]">
              <h1 className="font-poppins text-[10px] text-gray-400">ID</h1>
            </div>
            <h1 className=" font-poppins text-[9px] text-gray-400 ">
              Kredit : {waterCredit?._id}
            </h1>
          </div>
        </div>

        <div className=" w-full flex flex-col gap-1 font-poppins ">
          <h1 className="text-[#838383] text-[10px]">Harga</h1>
          <h1 className=" font-montserrat font-bold text-[#202226] text-[20px]">
            {formatToIDR(waterCredit?.cost)}{" "}
            <span className="text-[14px]">/ {waterCredit?.perLiter} L</span>
          </h1>
        </div>
      </div>
      <div className=" w-[25%] h-full  bg-[#484FCA] rounded-[12px] relative z-0 overflow-hidden">
        <div className="font-montserrat  font-bold h-[78px] bg-white w-full rounded-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center">
          <h1 className=" text-[19px] text-[#202226]">Token</h1>
          <h1 className="text-[11px] text-#767D8C]">Konservasi</h1>
        </div>
        <div className=" absolute z-[-2] opacity-[0.04] -right-4 -bottom-3">
          <TokenSVG size={75} color="#ffffff" />
        </div>
        <div className="flex flex-col font-montserrat font-bold text-white pt-3 pl-4">
          <h1 className="text-[19px]">
            {waterCredit?.conservationToken?.rewardToken}
          </h1>
          <h1 className="text-[12px] -mt-2">Token</h1>
        </div>
      </div>
    </Link>
  );
};

export default WaterCredit;
