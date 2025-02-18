"use client";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter, usePathname } from "next/navigation";
import { IsDesktop } from "@/app/hooks";
import { useEffect, useState } from "react";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import WaterCredit from "@/app/components/card/WaterCredit";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { formatToIDR } from "@/app/utils/helper";
import API from "@/app/utils/API";
import Skeleton from "@mui/material/Skeleton";
const WaterCreditDetail: React.FC = () => {
  const navigation = useRouter();
  const auth = useAuth();
  const isDesktop = IsDesktop();
  const pathName: any = usePathname().split("/");
  const [waterCreditId, setWaterCreditId] = useState<any>(() => {
    return pathName[pathName.length - 1]
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });
  const [waterCredit, setWaterCredit] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getWaterCreditById = () => {
    API.get(`/waterCredit/getWaterCreditById/${waterCreditId}`, {
      headers: { Authorization: auth.auth.token },
    })
      .then((res) => {
        setIsLoading(false);
        setWaterCredit(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth");
    }

    getWaterCreditById();
  }, [auth.auth.isAuthenticated, navigation]);

  if (!auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }
  return isDesktop ? null : (
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins pb-16">
      <HeaderMobile mode="dark" />
      {isLoading ? (
        <Skeleton
          variant="rounded"
          height="180px"
          width="100%"
          sx={{ bgcolor: "#d1d5db", borderRadius: "18px" }}
        />
      ) : (
        <WaterCredit waterCredit={waterCredit} />
      )}
      <div className=" w-full flex flex-col gap-3">
        {isLoading ? (
          <Skeleton
            variant="text"
            width={150}
            sx={{ bgcolor: "#d1d5db", fontSize: "24px" }}
          />
        ) : (
          <h1 className=" font-montserrat font-bold text-[24px]">Air Bersih</h1>
        )}
        <div className=" w-full flex flex-col gap-1">
          <div className=" flex items-center gap-3">
            <PersonOutlineOutlinedIcon />
            {isLoading ? (
              <Skeleton
                variant="text"
                width={150}
                sx={{ bgcolor: "#d1d5db", fontSize: "16px" }}
              />
            ) : (
              <h1 className=" font-poppins font-semibold text-base text-[#202226]">
                {waterCredit?.owner?.fullName}
              </h1>
            )}
          </div>
          <div className=" flex items-center gap-2">
            <LocationOnOutlinedIcon />
            {isLoading ? (
              <Skeleton
                variant="text"
                width={250}
                sx={{ bgcolor: "#d1d5db", fontSize: "14px" }}
              />
            ) : (
              <h1 className=" font-poppins text-[14px] text-[#202226]/50">
                {waterCredit?.location?.address}
              </h1>
            )}
          </div>
        </div>
        {isLoading ? (
          <>
            <Skeleton
              variant="text"
              width={320}
              sx={{ bgcolor: "#d1d5db", fontSize: "12px" }}
            />
            <Skeleton
              variant="text"
              width={320}
              sx={{ bgcolor: "#d1d5db", fontSize: "12px" }}
            />
            <Skeleton
              variant="text"
              width={320}
              sx={{ bgcolor: "#d1d5db", fontSize: "12px" }}
            />
            <Skeleton
              variant="text"
              width={320}
              sx={{ bgcolor: "#d1d5db", fontSize: "12px" }}
            />
          </>
        ) : (
          <p className="w-full text-left font-montserrat font-medium text-[12px] text-[#9D9B9B]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae soluta eligendi culpa, optio vitae asperiores architecto
            officiis accusantium, magnam minima ipsam quia cum? Itaque
            voluptatum aliquam officia consequuntur animi natus.
          </p>
        )}
      </div>
      <div className=" w-full">
        <table>
          <tbody>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Harga</td>
              <td>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width={150}
                    sx={{ bgcolor: "#d1d5db", fontSize: "14px" }}
                  />
                ) : (
                  <>
                    {formatToIDR(waterCredit?.cost ?? 0)}{" "}
                    <span className="text-[10px]">
                      / {waterCredit?.perLiter} L
                    </span>
                  </>
                )}
              </td>
            </tr>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Tempo Pembayaran</td>
              <td>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width={150}
                    sx={{ bgcolor: "#d1d5db", fontSize: "14px" }}
                  />
                ) : (
                  waterCredit?.billingTime
                )}
              </td>
            </tr>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Token Konservasi</td>
              <td>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width={150}
                    sx={{ bgcolor: "#d1d5db", fontSize: "14px" }}
                  />
                ) : (
                  <>
                    {waterCredit?.conservationToken?.rewardToken}{" "}
                    <span className="text-[9px] text-red-400">
                      *Maks. {waterCredit?.conservationToken?.maxWaterUse} L{" "}
                      {waterCredit?.conservationToken?.tokenRewardTempo}
                    </span>
                  </>
                )}
              </td>
            </tr>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Kualitas Air</td>
              <td>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width={150}
                    sx={{ bgcolor: "#d1d5db", fontSize: "14px" }}
                  />
                ) : (
                  waterCredit?.waterQuality
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h1 className=" w-full font-montserrat font-bold text-[20px]">
        {isLoading ? (
          <Skeleton
            variant="text"
            width={150}
            sx={{ bgcolor: "#d1d5db", fontSize: "20px" }}
          />
        ) : (
          formatToIDR(waterCredit?.cost ?? 0)
        )}
      </h1>
      <div className=" w-full flex justify-center">
        <button
          disabled={isLoading}
          className="py-3 px-8 text-white rounded-[15px] bg-[#484FCA]"
        >
          <h1 className=" font-montserrat font-bold">Berlangganan Sekarang</h1>
        </button>
      </div>
    </div>
  );
};

export default WaterCreditDetail;
