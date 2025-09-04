// import GradientBlinds from "@/components/GradientBlinds/GradientBlinds";
// import { Ripple } from "@/components/magicui/ripple";
import Particles from "@/components/Particles/Particles";
import Orb from "@/components/Orb/Orb";
import Image from "next/image";
import Link from "next/link";
const CTA: React.FC = () => {
  return (
    <div
      id="mulai"
      className="w-full min-h-screen bg-gradient-to-b from-[#1f2475] via-[#5b62b1] to-[#1f2475]  relative z-0 overflow-hidden flex flex-col justify-center items-center gap-20"
    >
      <Orb
        hoverIntensity={0.4}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />

      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      <div className=" text-center w-full md:px-10 lg:px-[6vw]">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-nasalization font-semibold bg-gradient-to-r from-white  to-[#414BF1] bg-clip-text text-transparent">
          Peduli setiap tetes air
        </h1>
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-nasalization font-semibold bg-gradient-to-r from-white  to-[#414BF1] bg-clip-text text-transparent">
          peduli pada bumi yang kita tinggali
        </h1>
      </div>

      <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-5 md:gap-10 px-5">
        <Link
          href={"/auth"}
          className="hover:-translate-y-2 duration-300 font-montserrat w-full md:w-auto text-center rounded-lg whitespace-nowrap px-6 py-4 md:px-10 md:py-4 md:rounded-full bg-[#2E35B1] font-semibold text-white text-sm md:text-base"
        >
          Mulai Sekarang
        </Link>
        <Link
          href={""}
          className="hover:-translate-y-2 duration-300 font-montserrat w-full md:w-auto text-center rounded-lg whitespace-nowrap px-6 py-4 md:px-10 md:py-4 md:rounded-full bg-transparent font-semibold text-white text-sm md:text-base border border-gray-400 backdrop-blur-[5px]"
        >
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
};

export default CTA;
