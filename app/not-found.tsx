"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import LogoWhite from "./components/svg/LogoWhite";
import DiagonalOneHero from "./components/landing/svg/DiagonalOneHero";
import DiagonalTwoHero from "./components/landing/svg/DiagonalTwoHero";
import LogoHeroAbsolute from "./components/landing/svg/LogoHeroAbsolute";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-white p-5 md:p-10 bg-gradient-to-br from-[#1f2375] to-[#4952FE] md:bg-none md:bg-[#1f2375] relative z-0 overflow-hidden">
      {/* Background elements matching landing page */}
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
      <div className="w-[35vw] md:w-[28vw] lg:w-[15vw] absolute z-[-3] bottom-0 left-0 rotate-[180deg]">
        <LogoHeroAbsolute />
      </div>
      <div className="absolute z-[-1] w-[30px] md:w-[40px] bottom-[3%] left-[50%] translate-x-[-50%]">
        <LogoWhite className="animate-bounce" />
      </div>

      {/* Main content */}
      <main className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="font-nasalization text-[80px] md:text-[120px] lg:text-[150px] bg-gradient-to-t from-[#000000]/30 to-white bg-clip-text text-white text-stroke-mobile md:text-stroke drop-shadow-[0px_0px_23px_rgba(0,0,0,0.3)]">
            404
          </h1>
          <div className="p-[1px] rounded-full bg-gradient-to-tr from-white via-[#3d45d8] to-white">
            <h2 className="text-sm md:text-lg lg:text-xl font-montserrat font-medium bg-[#3d45d8] rounded-full py-2 px-5 md:py-3 md:px-8 lg:py-4 lg:px-10 text-center">
              Halaman Tidak Ditemukan
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 text-center"
        >
          <p className="text-white/80 text-base md:text-lg font-montserrat max-w-lg">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman
            telah dipindahkan atau URL yang Anda masukkan salah.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <Link
            href="/"
            className="group px-8 py-3 bg-gradient-to-r from-[#191B4D] to-[#383DD3] text-white font-montserrat font-semibold rounded-lg hover:from-[#383DD3] hover:to-[#191B4D] transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Kembali ke Beranda</span>
          </Link>

          <Link
            href="/auth/login"
            className="group px-8 py-3 border-2 border-white/30 text-white font-montserrat font-semibold rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="relative">Masuk ke Akun</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="pt-8"
        >
          <p className="text-white/60 text-sm font-montserrat mt-2">
            Wujudkan Masa Depan Air yang Berkelanjutan
          </p>
        </motion.div>
      </main>
    </div>
  );
}
