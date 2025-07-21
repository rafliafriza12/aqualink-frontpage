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
    getAllWaterCredits();
  }, []);

  const swiperStyleMarketPlace: CustomCSSProperties = {
    "--swiper-pagination-color": "#5961FF",
    "--swiper-pagination-bullet-inactive-color": "#999999",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-horizontal-gap": "6px",
  };

  return isDesktop ? null : (
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins">
      <HeaderMobile mode="dark" />
      <div className="w-full h-[190px] bg-gradient-to-br from-[#171717] to-[#2a2a2a] rounded-[18px] relative z-0 overflow-hidden">
        {isLoading ? (
          <Skeleton
            variant="rounded"
            height="100%"
            width="100%"
            sx={{ bgcolor: "#d1d5db", borderRadius: "18px" }}
          />
        ) : (
          <>
            <div className="absolute inset-0">
              {/* Animated background elements */}
              <div className="absolute w-[500px] h-[500px] -top-[250px] -right-[250px] bg-blue-500/20 rounded-full animate-pulse"></div>
              <div className="absolute w-[300px] h-[300px] -bottom-[150px] -left-[150px] bg-purple-500/20 rounded-full animate-pulse delay-1000"></div>

              {/* Floating particles */}
              <div className="absolute w-2 h-2 bg-white/30 rounded-full top-1/4 left-1/4 animate-float"></div>
              <div className="absolute w-3 h-3 bg-white/20 rounded-full top-1/3 right-1/3 animate-float-delayed"></div>
              <div className="absolute w-2 h-2 bg-white/30 rounded-full bottom-1/4 right-1/4 animate-float"></div>
            </div>

            <div className="absolute inset-0 p-6 text-white flex flex-col justify-center z-10">
              <h2 className="text-2xl font-bold mb-2 font-montserrat bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent animate-gradient">
                Hemat Air Sekarang!
              </h2>
              <p className="text-sm mb-4 text-gray-200 leading-relaxed max-w-[80%] animate-fade-in">
                Dapatkan token konservasi sebagai insentif untuk pembayaran
                kredit air Anda
              </p>
              <div className="relative w-32 h-32">
                {/* Animated water drop */}
                <div className="absolute w-16 h-16 left-1/2 -translate-x-1/2">
                  <div className="absolute w-full h-full bg-blue-400/30 rounded-full animate-ping"></div>
                  <div className="absolute w-full h-full bg-blue-500/50 rounded-full scale-75 animate-pulse"></div>
                  <svg
                    className="absolute w-full h-full animate-bounce-slow"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 21.5C16.1421 21.5 19.5 18.1421 19.5 14C19.5 10.5 17.5 7 12 2.5C6.5 7 4.5 10.5 4.5 14C4.5 18.1421 7.85786 21.5 12 21.5Z"
                      fill="rgba(255,255,255,0.9)"
                    />
                  </svg>
                </div>

                {/* Ripple effects */}
                <div className="absolute w-full h-full">
                  <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ripple"></div>
                  <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ripple delay-1000"></div>
                </div>

                {/* Floating particles */}
                <div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full top-1/4 left-1/4 animate-float-particle"></div>
                <div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full bottom-1/4 right-1/4 animate-float-particle delay-500"></div>
              </div>
            </div>

            {/* Animated wave background */}
            <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30">
              <div className="absolute bottom-0 left-0 right-0 h-24 animate-wave">
                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  className="absolute bottom-0 w-full h-full"
                >
                  <path
                    d="M0,0 C300,30 600,60 1200,0 L1200,120 L0,120 Z"
                    className="fill-white/20"
                  ></path>
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 animate-wave-slow">
                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  className="absolute bottom-0 w-full h-full"
                >
                  <path
                    d="M0,30 C300,60 600,90 1200,30 L1200,120 L0,120 Z"
                    className="fill-white/10"
                  ></path>
                </svg>
              </div>
            </div>

            <Link
              href="/marketplace/langganan"
              className="absolute bg-white z-[10] pt-2 pl-2 rounded-tl-[18px] w-[168px] h-[57px] -bottom-0 -right-0 
                hover:scale-105 transition-transform duration-300"
            >
              <div
                className="w-full h-full bg-gradient-to-br from-[#5961FF] to-[#7C83FF] rounded-[18px] shadow-lg 
                flex items-center justify-center hover:shadow-[0_0_15px_rgba(89,97,255,0.3)]"
              >
                <span className="text-white font-medium text-sm">
                  Lihat Langganan
                </span>
              </div>
            </Link>
          </>
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
        <div className="w-full h-[96px] bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl mb-4 p-4 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] animate-spin-slow opacity-20">
              <div className="absolute inset-0 bg-white rounded-full blur-xl transform rotate-45"></div>
              <div className="absolute inset-0 bg-white rounded-full blur-xl transform -rotate-45"></div>
            </div>
            <svg
              className="absolute bottom-0 left-0 w-full animate-pulse"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C300,30 600,60 1200,0 L1200,120 L0,120 Z"
                className="fill-white/20 animate-[wave_3s_ease-in-out_infinite]"
              >
                <animate
                  attributeName="d"
                  dur="4s"
                  repeatCount="indefinite"
                  values="M0,0 C300,30 600,60 1200,0 L1200,120 L0,120 Z;
                          M0,30 C300,0 600,30 1200,60 L1200,120 L0,120 Z;
                          M0,0 C300,30 600,60 1200,0 L1200,120 L0,120 Z"
                />
              </path>
              <path
                d="M0,30 C300,60 600,90 1200,30 L1200,120 L0,120 Z"
                className="fill-white/10 animate-[wave_5s_ease-in-out_infinite]"
              >
                <animate
                  attributeName="d"
                  dur="6s"
                  repeatCount="indefinite"
                  values="M0,30 C300,60 600,90 1200,30 L1200,120 L0,120 Z;
                          M0,60 C300,30 600,60 1200,90 L1200,120 L0,120 Z;
                          M0,30 C300,60 600,90 1200,30 L1200,120 L0,120 Z"
                />
              </path>
            </svg>
          </div>
          <div className="relative z-10">
            <div className="text-white">
              <h3 className="font-semibold text-lg">
                Hemat Air, Dapat Hadiah!
              </h3>
              <p className="text-sm text-white">
                Pantau penggunaan air & klaim token rewards
              </p>
            </div>
          </div>
        </div>
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
