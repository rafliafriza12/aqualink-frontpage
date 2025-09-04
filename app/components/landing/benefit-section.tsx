import Image from "next/image";
import BenefitCard from "../card/BenefitCard";
import Link from "next/link";
import { benefits } from "@/app/data/benefit";
import { IBenefit } from "@/app/types/benefit-card.types";
const BenefitSection: React.FC = () => {
  return (
    <div
      id="benefit"
      className="w-full min-h-screen py-14 px-5 lg:py-24 md:py-20 md:px-10 lg:px-[6vw] flex flex-col justify-center md:justify-start items-center md:items-start gap-5 md:gap-7 lg:gap-10 text-white p-5 md:p-10 bg-gradient-to-br from-[#1f2375] to-[#4b54fb] md:bg-none md:bg-[#1f2375] relative z-0 overflow-hidden"
    >
      {/* Background */}
      <div className="hidden md:block w-[60vw] h-[60vw] rounded-full bg-[#4b54fb] blur-[200px] absolute z-[-4] top-[50%] left-[50%] translate-x-[-50%]"></div>
      <div className="w-full h-full absolute z-[-5]">
        <Image
          src={"/assets/images/grid.png"}
          alt="Flowin"
          fill
          className=" w-full h-full object-cover relative"
        />
      </div>
      {/* Background */}

      <h1 className="text-center md:text-left w-[70%] md:w-[60%] bg-gradient-to-r from-white  to-[#414BF1] bg-clip-text text-transparent font-nasalization font-semibold text-[25px] md:text-[35px] lg:text-[90px] ">
        Manfaat
      </h1>
      <h1 className="text-center md:text-left w-[70%] md:w-[60%] bg-gradient-to-r from-white  to-[#414BF1] bg-clip-text text-transparent font-nasalization font-semibold text-[20px] md:text-[30px] lg:text-[80px] -mt-5 md:-mt-9 lg:-mt-14">
        Untuk Semua
      </h1>
      <p className="w-full text-center md:text-left md:w-[70%] lg:w-[50%] text-white/60 text-sm md:text-lg lg:text-[20px] mb-10 md:mb-0  md:-mt-5 lg:-mt-0">
        Solusi win-win yang memberikan keuntungan maksimal bagi PDAM dalam
        efisiensi operasional dan bagi masyarakat dalam kemudahan Layanan
      </p>

      {/* {benefits.map((benefit: IBenefit, i: number) => {
        return (
          <div className="w-[130%]  md:hidden">
            <BenefitCard data={benefit} key={i} />
          </div>
        );
      })} */}

      <div className=" relative flex items-center flex-col gap-10 md:block  w-full lg:h-[900px]">
        {benefits.map((benefit: IBenefit, i: number) => {
          return (
            <div
              style={{ perspective: "1000px" }}
              className={`w-[120%] md:w-[70%] lg:w-[50%] group md:absolute ${
                i === 0
                  ? "top-[200px] -left-[10%] lg:left-[7%] lg:top-[15%]"
                  : "-right-[10%] lg:right-[7%]"
              }`}
            >
              <div
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s ease",
                }}
                className={benefit.style}
              >
                <div className="bg-transparent">
                  <BenefitCard data={benefit} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BenefitSection;
