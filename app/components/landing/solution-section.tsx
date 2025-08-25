"use client";
import { useState } from "react";
import SolutionCard from "../card/SolutionCard";
import LogoColor from "../svg/LogoColor";
import { solutions } from "@/app/data/solution";
import { ISolution } from "@/app/types/solution-card.types";
const SolutionSection: React.FC = () => {
  const [indexActive, setIndexActive] = useState<number>(-1);
  const [absoluteIndex, setAbsoluteIndex] = useState<number>(-1);

  const handleClick = (index: number) => {
    if (index === indexActive) {
      // kalau klik yang sama → reset
      setIndexActive(-1);
      setAbsoluteIndex(-1);
      return;
    }

    setIndexActive(index);

    // kasih delay untuk masukin absolute
    setTimeout(() => {
      setAbsoluteIndex(index);
    }, 500);
  };
  return (
    <div className=" w-full min-h-screen py-14 px-5 lg:py-24 md:py-20 md:px-10 overflow-hidden relative z-1 flex flex-col justify-center items-center md:items-start gap-5 md:gap-7 lg:gap-10">
      {/* background */}
      <div className="w-full h-full absolute z-[-4] bg-[#919ae8]"></div>
      <div className=" w-full h-full absolute z-[-3] bg-gradient-to-b from-[#1f2375] via-[#5b62b1] to-[#1f2375]  inset-0"></div>

      <div className="w-[200px] md:w-[500px] absolute z-[-2] opacity-[0.2] -right-[18%] md:-right-[20%] lg:-right-[8%]">
        <LogoColor />
      </div>
      {/* background */}
      <h1 className="text-center md:text-left w-[70%] md:w-[60%] bg-gradient-to-r from-white  to-[#414BF1] bg-clip-text text-transparent font-nasalization font-semibold text-[25px] md:text-[35px] lg:text-[90px] leading-[25px] md:leading-[40px] lg:leading-[90px]">
        SATU PLATFORM SEMUA SOLUSI
      </h1>
      <p className="w-full text-center md:text-left md:w-[70%] lg:w-[50%] text-white/60 text-sm md:text-lg lg:text-[20px]  md:-mt-5 lg:-mt-0">
        Kami mengembangkan solusi berbasis user-centered design yang
        mengutamakan kemudahan penggunaan baik untuk PDAM maupun masyarakat
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:hidden flex-col gap-10 mt-10">
        {solutions.map((solutions: ISolution, i: number) => {
          return (
            <div className="w-full">
              <SolutionCard data={solutions} key={i} />
            </div>
          );
        })}
      </div>

      <div
        className={`w-full ${
          indexActive > -1
            ? "md:h-[550px] lg:h-[1150px]"
            : "md:h-[200px] lg:h-[500px]"
        }  relative z-0 hidden lg:flex gap-10 justify-evenly items-end  duration-500`}
      >
        {solutions.map((solution: ISolution, i: number) => {
          return (
            <div
              key={i}
              className={`cursor-pointer transition-all duration-500 ${
                i === indexActive
                  ? "md:flex-[1.8] lg:flex-[1] z-10" + solution.style
                  : "flex-[0.5]"
              }`}
              onClick={() => handleClick(i)}
            >
              <SolutionCard data={solution} isActive={i === indexActive} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SolutionSection;
