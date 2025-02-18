"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAuth } from "@/app/hooks/UseAuth";
import Link from "next/link";
import { IsDesktop } from "@/app/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WaterCredit from "@/app/components/card/WaterCredit";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import { CustomCSSProperties } from "@/app/types/CustomCssProperties";
import { Pagination } from "swiper/modules";
import API from "@/app/utils/API";
import Skeleton from "@mui/material/Skeleton";
import "swiper/css/pagination";

const Marketplace: React.FC = () => {
  const navigation = useRouter();
  const auth = useAuth();
  const isDesktop = IsDesktop();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [waterCredits, setWaterCredits] = useState<any>([]);

  const getAllWaterCredits = () => {
    API.get("/waterCredit/getAllWaterCredit", {
      headers: { Authorization: auth.auth.token },
    })
      .then((res) => {
        setIsLoading(false);
        setWaterCredits(res.data.data);
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

    getAllWaterCredits();
  }, [auth.auth.isAuthenticated, navigation]);

  if (!auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }

  const swiperStyleMarketPlace: CustomCSSProperties = {
    "--swiper-pagination-color": "#5961FF",
    "--swiper-pagination-bullet-inactive-color": "#999999",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-horizontal-gap": "6px",
  };

  return isDesktop ? null : (
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins">
      <HeaderMobile mode="dark" />
      <div className=" w-full h-[190px] bg-[#171717] rounded-[18px] relative z-0">
        {isLoading ? (
          <Skeleton
            variant="rounded"
            height="100%"
            width="100%"
            sx={{ bgcolor: "#d1d5db", borderRadius: "18px" }}
          />
        ) : (
          <div className=" absolute bg-white z-[1] pt-2 pl-2 rounded-tl-[18px] w-[168px] h-[57px] -bottom-0 -right-0">
            <div className=" w-full h-full bg-[#5961FF] rounded-[18px]"></div>
          </div>
        )}
      </div>

      <div className="w-screen mt-4">
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Skeleton
              variant="rounded"
              height="180px"
              width="91%"
              sx={{ bgcolor: "#d1d5db", borderRadius: "15px" }}
            />
          </div>
        ) : (
          <Swiper
            className="w-full flex justify-center"
            spaceBetween={0}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            style={swiperStyleMarketPlace}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {waterCredits.map((waterCredit: any, i: number) => {
              if (i < 5)
                return (
                  <SwiperSlide key={i} className=" mb-8">
                    <div className=" w-screen flex justify-center">
                      <WaterCredit
                        isInSwiper={true}
                        waterCredit={waterCredit}
                      />
                    </div>
                  </SwiperSlide>
                );
            })}
          </Swiper>
        )}
      </div>

      {isLoading ? (
        <Skeleton
          variant="rounded"
          height="96px"
          width="100%"
          sx={{ bgcolor: "#d1d5db", borderRadius: "12px" }}
        />
      ) : (
        <div className="w-full h-[96px] bg-[#121212] rounded-xl mb-4"></div>
      )}

      {isLoading ? (
        <Skeleton
          variant="rounded"
          height="180px"
          width="100%"
          sx={{ bgcolor: "#d1d5db", borderRadius: "18px" }}
        />
      ) : (
        waterCredits.map((waterCredit: any, i: number) => {
          return <WaterCredit waterCredit={waterCredit} />;
        })
      )}
    </div>
  );
};

export default Marketplace;
