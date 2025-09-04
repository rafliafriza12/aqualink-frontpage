"use client";
import { cn } from "@/lib/utils";
import { RetroGrid } from "@/components/magicui/retro-grid";
import Image from "next/image";
import { faqs } from "@/app/data/faq";
import { IFaq } from "@/app/types/faq.types";
import FAQLandingCard from "../card/FAQLandingCard";
const FAQLandingSection: React.FC = () => {
  return (
    <div
      id="faq"
      className="w-full min-h-screen py-14 px-5 lg:py-24 md:py-20 md:px-10 overflow-hidden  bg-[#1f2375] via-[#5b62b1] to-[#1f2375] relative z-0 flex flex-col justify-center items-center  gap-5 md:gap-7 lg:gap-10"
    >
      {/* background */}
      <RetroGrid className="absolute z-[-1] bg-[#1f2375]" />
      {/* <div className="w-full h-full absolute z-[-1] inset-0 lg:hidden">
        <Image
          src={"/assets/images/grid.png"}
          alt="Flowin"
          fill
          className="w-full h-full object-cover"
        />
      </div> */}
      {/* background */}

      <h1 className=" bg-gradient-to-r from-white  to-[#414BF1] bg-clip-text text-transparent font-nasalization text-2xl md:text-[4vw] lg:text-[3vw] bg-transparent py-2 px-5 md:py-4 md:px-10 lg:py-7 lg:px-20 border-[1px] rounded-full backdrop-blur-[4px]">
        PERTANYAAN UMUM
      </h1>

      <div className=" w-full flex flex-col gap-10 lg:px-32 mt-10">
        {faqs.map((faq: IFaq, i: number) => {
          return <FAQLandingCard data={faq} key={i} />;
        })}
      </div>
    </div>
  );
};

export default FAQLandingSection;
