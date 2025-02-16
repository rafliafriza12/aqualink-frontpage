"use client";
import { useState, useEffect } from "react";
import { IsDesktop } from "@/app/hooks";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/modals/Modal";
import StepOneSVG from "@/app/components/svg/StepOne";
import StepTwoSVG from "@/app/components/svg/StepTwo";
import StepThreeSVG from "@/app/components/svg/StepThree";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CheckList from "@/app/components/svg/Checklist";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import { animateScroll as scroll } from "react-scroll";
import dynamic from "next/dynamic";

// Interfaces
interface Coordinates {
  lat: number;
  lng: number;
}

// Separate Map Component
const MapComponent = dynamic(
  () => import("../../../components/map/MapComponent"),
  { ssr: false }
);

const ReportFormMobile: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [problem, setProblem] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const isDesktop = IsDesktop();
  const navigation = useRouter();
  const auth = useAuth();
  const [position, setPosition] = useState<Coordinates | null>(null);
  const [showMap, setShowMap] = useState<boolean>(false);

  const handleMapClick = (coords: Coordinates) => {
    setPosition(coords);
  };

  const scrollToTop = () => {
    if (step >= 0) {
      scroll.scrollToTop({
        duration: 500,
        smooth: "easeInOutQuart",
      });
    }
  };

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth/login");
    }
  }, [auth.auth.isAuthenticated, navigation]);

  if (!auth.auth.isAuthenticated) {
    return null;
  }
  return isDesktop ? null : (
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins">
      <HeaderMobile mode="dark" />
      <div className=" w-full flex items-center justify-between px-[10%] mt-20 relative z-0">
        <div
          className={` absolute z-[-2] ${
            step === 0 ? "-top-16 left-[5%]" : "-top-12 left-[7.5%]"
          }  duration-300`}
        >
          <StepOneSVG
            size={step === 0 ? 52 : 35}
            color={step === 0 ? "#2F3AF2" : "#BABDEF"}
          />
        </div>
        <div
          className={` absolute z-[-2] ${
            step === 1 ? "-top-16" : "-top-12"
          }  left-[50%] -translate-x-[50%] duration-300`}
        >
          <StepTwoSVG
            size={step === 1 ? 52 : 35}
            color={step === 1 ? "#2F3AF2" : "#BABDEF"}
          />
        </div>
        <div
          className={` absolute z-[-2] ${
            step === 2 ? "-top-16 right-[5%]" : "-top-12 right-[7.5%]"
          } duration-300`}
        >
          <StepThreeSVG
            size={step === 2 ? 52 : 35}
            color={step === 2 ? "#2F3AF2" : "#BABDEF"}
          />
        </div>

        <hr className="w-[80%] h-[1px] my-5 bg-[#2F3AF2] border-0 absolute z-[-1]" />
        <div
          className={`w-4 h-4 rounded-full ${
            step === 0 ? "bg-[#2F3AF2]" : "bg-[#BABDEF]"
          }`}
        ></div>
        <div
          className={`w-4 h-4 rounded-full ${
            step === 1 ? "bg-[#2F3AF2]" : "bg-[#BABDEF]"
          }`}
        ></div>
        <div
          className={`w-4 h-4 rounded-full ${
            step === 2 ? "bg-[#2F3AF2]" : "bg-[#BABDEF]"
          }`}
        ></div>
      </div>
      {step !== 2 ? (
        <div className="w-full rounded-[30px] p-2 shadow-[0px_7px_10px_rgba(0,0,0,0.25)]">
          <div className="w-full rounded-[25px] border-[1px] border-[#3640F0] px-5 py-4 flex flex-col items-center gap-6">
            <div className="px-12 py-3 rounded-[24px] bg-gradient-to-t from-[#7A81FC] to-[#3640F0] text-center">
              <h1 className=" font-poppins font-semibold text-white">
                {step === 0 ? "Formulir Laporan" : "Preview Laporan Anda"}
              </h1>
            </div>

            <div className=" w-full flex flex-col gap-2">
              <label htmlFor="name" className=" w-full flex items-center gap-2">
                <div className=" w-7 h-7 flex justify-center items-center rounded-full bg-[#3640F0]">
                  <h1 className=" font-montserrat font-semibold text-[10px] text-white">
                    1
                  </h1>
                </div>

                <h1 className="text-[#757BE2] font-montserrat font-semibold text-sm">
                  Nama Pelapor
                </h1>
              </label>
              <input
                disabled={step > 0}
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[37px] border-[1px] border-[#51537C] rounded-[5px] focus:outline-none px-2 font-montserrat font-semibold text-sm text-[#2C2A2A]"
              />
            </div>
            <div className=" w-full flex flex-col gap-2">
              <label
                htmlFor="problem"
                className=" w-full flex items-center gap-2"
              >
                <div className=" w-7 h-7 flex justify-center items-center rounded-full bg-[#3640F0]">
                  <h1 className=" font-montserrat font-semibold text-[10px] text-white">
                    2
                  </h1>
                </div>

                <h1 className="text-[#757BE2] font-montserrat font-semibold text-sm">
                  Spesifikasi Masalah
                </h1>
              </label>
              <textarea
                required
                disabled={step > 0}
                name="problem"
                id="problem"
                rows={10}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full text-[#2C2A2A] border-[1px] border-[#51537C] rounded-[5px] focus:outline-none px-2 py-1 font-montserrat font-semibold text-sm"
              ></textarea>
            </div>
            <div className=" w-full flex flex-col gap-2 relative z-0">
              <label
                htmlFor="address"
                className=" w-full flex items-center gap-2"
              >
                <div className=" w-7 h-7 flex justify-center items-center rounded-full bg-[#3640F0]">
                  <h1 className=" font-montserrat font-semibold text-[10px] text-white">
                    3
                  </h1>
                </div>

                <h1 className="text-[#757BE2] font-montserrat font-semibold text-sm">
                  Alamat Lengkap
                </h1>
              </label>
              <textarea
                required
                disabled={step > 0}
                name="address"
                id="address"
                rows={10}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-[#2C2A2A] border-[1px] border-[#51537C] rounded-[5px] focus:outline-none px-2 py-1 font-montserrat font-semibold text-sm"
              ></textarea>
              <div className="w-full pl-[2.2%] -mt-[2.6%]">
                {showMap && (
                  <MapComponent
                    position={position}
                    step={step}
                    handleMapClick={handleMapClick}
                  />
                )}
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="w-[98%] h-[27px] rounded-b-[10px] bg-gradient-to-t from-[#7A81FC] to-[#3640F0] flex justify-between px-2 items-center"
                >
                  <h1 className=" font-montserrat font-semibold text-xs text-white">
                    {!showMap ? "Cari Menggunakan Peta" : "Tutup Peta"}
                  </h1>
                  {!showMap ? (
                    <ExpandMoreIcon sx={{ color: "white" }} />
                  ) : (
                    <ExpandLessOutlinedIcon sx={{ color: "white" }} />
                  )}
                </button>
              </div>
            </div>

            <div className="w-full flex items-center justify-between">
              <div>
                {step === 1 && (
                  <button
                    disabled={isLoading}
                    onClick={() => setStep(step - 1)}
                    className=" flex items-center gap-1"
                  >
                    <ChevronLeft sx={{ color: "#7179FB" }} />
                    {isLoading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-200 animate-spin fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      <h1 className=" font-montserrat font-semibold text-[12px] text-[#7179FB]">
                        Kembali
                      </h1>
                    )}
                  </button>
                )}
              </div>
              <div>
                {step < 2 && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={() => (setStep(step + 1), scrollToTop())}
                    className=" flex items-center gap-1"
                  >
                    {isLoading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-200 animate-spin fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      <h1 className=" font-montserrat font-semibold text-[12px] text-[#7179FB]">
                        Lanjut
                      </h1>
                    )}
                    <ChevronRight sx={{ color: "#7179FB" }} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full flex flex-col gap-5 items-center">
          <div className=" w-full h-[435px] bg-gradient-to-b from-[#7A81FC] to-[#3640F0] rounded-[30px] p-2">
            <div className=" w-full h-full rounded-[25px] border-[2px] border-white flex flex-col items-center justify-center gap-6">
              <div>
                <CheckList />
              </div>
              <div className=" w-full flex flex-col gap-3 items-center">
                <h1 className=" font-montserrat text-white font-bold text-[18px]">
                  Pelaporan Berhasil
                </h1>
                <p className="w-[80%] text-center text-white font-montserrat text-xs">
                  Laporan anda sudah dikonfirmasi dan akan segera diproses,
                  untuk status pelaporan dapat di akses pada menu{" "}
                  <span className="font-bold">notifikasi</span>
                </p>
              </div>
            </div>
          </div>
          <Link
            href={"/"}
            className=" w-[85%] h-[48px] rounded-[24px] bg-[#7179FB] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-2 relative z-0 flex items-center justify-center"
          >
            <div className=" h-[39px] w-[39px] rounded-full bg-white flex items-center justify-center absolute z-[-1] right-[6px]">
              <ChevronRight sx={{ color: "#375B1A" }} />
            </div>
            <h1 className="font-montserrat font-semibold text-sm text-white">
              Kembali Ke Beranda
            </h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReportFormMobile;
