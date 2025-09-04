"use client";
import DiagonalOneHero from "./svg/DiagonalOneHero";
import DiagonalTwoHero from "./svg/DiagonalTwoHero";
import LogoHeroAbsolute from "./svg/LogoHeroAbsolute";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import LogoWhite from "../svg/LogoWhite";
import { motion } from "framer-motion";
import Image from "next/image";
const HeroSection: React.FC = () => {
  return (
    <div
      id="hero"
      className=" w-full min-h-screen flex flex-col items-center justify-center text-white p-5 md:p-10 bg-gradient-to-br from-[#1f2375] to-[#4952FE] md:bg-none md:bg-[#1f2375] relative z-0 overflow-hidden"
    >
      {/* bg shine */}
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] absolute z-[-5] hidden lg:block"
        )}
        width={80}
        height={80}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
      <div className="hidden md:block w-[150vw] h-[80vw] rounded-full bg-[#4952FE] blur-[300px] absolute z-[-4] top-[50%] -right-[50%]"></div>
      <div className="w-full h-full absolute z-[-5] block lg:hidden">
        <Image
          src={"/assets/images/grid.png"}
          alt="Flowin"
          fill
          className=" w-full h-full object-cover relative"
        />
      </div>
      <div className="w-[30vw] md:w-[30vw] lg:w-[23vw] absolute z-[-3] inset-0">
        <DiagonalOneHero />
      </div>
      <div className="w-[23vw] md:w-[27vw] lg:w-[20vw] absolute z-[-3] bottom-0 right-0">
        <DiagonalTwoHero />
      </div>
      <div className="w-[35vw] md:w-[28vw] lg:w-[15vw] absolute z-[-3] top-0 right-0">
        <LogoHeroAbsolute />
      </div>

      <div className="w-[35vw] md:w-[28vw] lg:w-[15vw]  absolute z-[-3] bottom-0 left-0 rotate-[180deg]">
        <LogoHeroAbsolute />
      </div>

      <div className="absolute z-[-1] w-[30px] md:w-[40px] bottom-[3%] left-[50%]  translate-x-[-50%]">
        <LogoWhite className="animate-bounce" />
      </div>
      {/* bg shine */}

      <main className=" flex flex-col items-center ">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 1 }}
          className="font-nasalization text-[70px] md:text-[150px] lg:text-[18vw] bg-gradient-to-t from-[#000000]/30  to-white bg-clip-text text-white text-stroke-mobile md:text-stroke drop-shadow-[0px_0px_23px_rgba(0,0,0,0.3)]"
        >
          FLOWIN
        </motion.h1>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 1 }}
          className="p-[1px] rounded-full bg-gradient-to-tr from-white via-[#3d45d8] to-white lg:-mt-20"
        >
          <h1 className=" text-xs md:text-lg lg:text-2xl font-montserrat font-medium bg-[#3d45d8] rounded-full py-2 px-5 md:py-3 md:px-8 lg:py-5 lg:px-12 text-center">
            Revolusi Digital untuk Pengelolaan Air Bersih
          </h1>
        </motion.div>
      </main>
    </div>
  );
};

export default HeroSection;
