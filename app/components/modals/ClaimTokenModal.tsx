"use client";
import API from "@/app/utils/API";
import CloseSVG from "../svg/Close";
import StarSVG from "../svg/Star";
import { useState } from "react";
interface ClaimTokenModalProps {
  setShowClaimTokenModal: (condition: boolean) => void;
  showClaimTokenModal: boolean;
}

const ClaimTokenModal: React.FC<ClaimTokenModalProps> = ({
  setShowClaimTokenModal,
  showClaimTokenModal,
}) => {
  const [indexClaimedToken, setIndexClaimedToken] = useState<any>([]);
  return (
    <div
      className={`h-screen w-full ${
        showClaimTokenModal ? "fixed" : "hidden"
      }  bg-[#000000]/50 z-[2] top-0 flex justify-center items-center px-7 backdrop-blur-[2px]`}
    >
      <div className=" w-full h-[540px] bg-white rounded-[30px] -mt-[6vh] p-2 relative z-0">
        <button
          onClick={() => setShowClaimTokenModal(!showClaimTokenModal)}
          className="absolute z-[5] -right-[3.8%] -top-[3.5%]"
        >
          <CloseSVG />
        </button>
        <div className=" w-full h-full rounded-[25px] bg-gradient-to-br from-[#3640F0] via-transparent to-[#3640F0] p-[2px]">
          <div className="w-full h-full rounded-[21px] bg-gradient-to-tr from-[#6A5AE0]/60 via-white to-white py-5 px-3 flex flex-col justify-between items-center">
            <div className="w-full h-[12%] flex flex-col items-center">
              <h1 className=" font-montserrat font-bold text-[25px] text-[#202226]">
                Klaim Token
              </h1>
              <hr className="w-[60%] h-[2px] bg-gradient-to-r from-white via-[#333338] to-white border-0 " />
            </div>

            <div className=" w-full h-[85%] overflow-x-hidden flex flex-col gap-5">
              {/*  */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="w-[70%] flex items-center gap-2">
                      <StarSVG />
                      <div className="w-[85%] flex flex-col font-montserrat">
                        <h1 className="w-full text-left font-bold text-xs text-[#202226]">
                          Rafli Afrza Nugraha
                        </h1>
                        <h1 className="w-full text-left font-medium text-xs text-[#5B5E65]">
                          ID : 123456789
                        </h1>
                      </div>
                    </div>

                    <div className=" w-[28%] h-6 flex justify-between items-center relative z-0 rounded-[5px] border-[1px] border-[#414BF1]">
                      <button
                        disabled={indexClaimedToken.includes(i)}
                        onClick={() =>
                          setIndexClaimedToken((prev: any) => {
                            const copyArray = [...prev];
                            const newArr = [...copyArray, i];
                            return newArr;
                          })
                        }
                        className={`h-[102%] w-[55%] rounded-[4px]  absolute z-[2] flex justify-center items-center  ${
                          indexClaimedToken.includes(i)
                            ? "right-0 bg-[#313680] duration-300"
                            : "left-0 bg-[#414BF1] duration-300"
                        }`}
                      >
                        <h1
                          className={` text-[#E1E2FB] font-montserrat font-bold  ${
                            indexClaimedToken.includes(i)
                              ? "text-[8px]"
                              : "text-[10px]"
                          }`}
                        >
                          {indexClaimedToken.includes(i) ? "Diklaim" : "Klaim"}
                        </h1>
                      </button>
                      <div className=" w-[50%] h-full flex items-center justify-center">
                        <h1 className=" font-montserrat font-bold text-[8px] text-[#38393D]">
                          +100
                        </h1>
                      </div>
                      <div className=" w-[50%] h-full flex items-center justify-center">
                        <h1 className="font-montserrat font-bold text-[8px] text-[#38393D]">
                          +100
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimTokenModal;
