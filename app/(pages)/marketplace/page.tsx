"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAuth } from "@/app/hooks/UseAuth";
import Link from "next/link";
import { IsDesktop } from "@/app/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WaterCredit from "@/app/components/card/WaterCredit";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import { CustomCSSProperties } from "@/app/types/CustomCssProperties";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

const Marketplace: React.FC = () => {
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
  const waterCredits: any = [
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
    {
      field: "1",
    },
  ];

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
        <div className=" absolute bg-white z-[1] pt-2 pl-2 rounded-tl-[18px] w-[168px] h-[57px] -bottom-0 -right-0">
          <div className=" w-full h-full bg-[#5961FF] rounded-[18px]"></div>
        </div>
      </div>

      <div className="w-screen mt-4">
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
            return (
              <SwiperSlide key={i} className=" mb-8">
                <div className=" w-screen flex justify-center">
                  <WaterCredit isInSwiper={true} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="w-full h-[96px] bg-[#121212] rounded-xl mb-4"></div>

      {waterCredits.map((waterCredit: any, i: number) => {
        return <WaterCredit />;
      })}
    </div>
  );
};

export default Marketplace;
