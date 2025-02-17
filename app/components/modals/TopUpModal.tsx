"use client";
import API from "@/app/utils/API";
import CloseSVG from "../svg/Close";
import StarSVG from "../svg/Star";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import ChevronRight from "@mui/icons-material/ChevronRight";
interface TopUpModalProps {
  setShowTopUpModal: (condition: boolean) => void;
  showTopUpModal: boolean;
}

const TopUpModal: React.FC<TopUpModalProps> = ({
  setShowTopUpModal,
  showTopUpModal,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  return (
    <div
      className={`h-screen w-full ${
        showTopUpModal ? "fixed" : "hidden"
      }  bg-[#000000]/50 z-[2] top-0 flex justify-center items-center px-7 backdrop-blur-[2px]`}
    >
      <div className=" w-full h-[540px] bg-white rounded-[30px] -mt-[6vh] p-2 relative z-0">
        <button
          onClick={() => setShowTopUpModal(!showTopUpModal)}
          className="absolute z-[5] -right-[3.8%] -top-[3.5%]"
        >
          <CloseSVG />
        </button>
        <div className=" w-full h-full rounded-[25px] bg-gradient-to-br from-[#3640F0] via-transparent to-[#3640F0] p-[2px]">
          <div className="w-full h-full rounded-[21px] bg-gradient-to-tr from-[#6A5AE0]/60 via-white to-white py-5 px-3 flex flex-col justify-between items-center">
            <div className="w-full h-[12%] flex flex-col items-center">
              <h1 className=" font-montserrat font-bold text-[25px] text-[#202226]">
                Top Up Saldo
              </h1>
              <hr className="w-[70%] h-[2px] bg-gradient-to-r from-white via-[#333338] to-white border-0 " />
            </div>

            <div className=" w-full h-[85%] flex flex-col gap-5">
              <TextField
                id="email"
                label="Nominal"
                variant="outlined"
                type="number"
                value={amount === 0 ? "" : amount}
                onChange={(e) => {
                  const inputValue: any = e.target.value;
                  const validate: any = inputValue.replace(/[^0-9.]/g, "");
                  setAmount(+validate);
                }}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    color: "black", // Warna teks input
                    "& fieldset": {
                      borderColor: "#7179FB", // Warna outline default
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#7179FB", // Warna outline saat hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7179FB", // Warna outline saat fokus
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black", // Warna label default
                    "&.Mui-focused": {
                      color: "black", // Warna label saat fokus
                    },
                  },
                }}
              />

              <div className="w-full flex justify-between items-center mt-5">
                <button
                  onClick={() => setPaymentMethod("bank_transfer")}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={` w-[60px] h-[60px] rounded-[15px] shadow-[0px_4px_6px_rgba(0,0,0,0.25)] bg-white ${
                      paymentMethod === "bank_transfer"
                        ? "border-[2px] border-[#3640F0]"
                        : ""
                    }`}
                  ></div>
                  <h1 className="font-montserrat font-bold text-[9px] text-[#202226] text-center h-8">
                    Bank Transfer
                  </h1>
                </button>
                <button
                  onClick={() => setPaymentMethod("credit_card")}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={` w-[60px] h-[60px] rounded-[15px] shadow-[0px_4px_6px_rgba(0,0,0,0.25)] bg-white ${
                      paymentMethod === "credit_card"
                        ? "border-[2px] border-[#3640F0]"
                        : ""
                    }`}
                  ></div>
                  <h1 className="font-montserrat font-bold text-[9px] text-[#202226] text-center h-8">
                    Kartu Kredit
                  </h1>
                </button>
                <button
                  onClick={() => setPaymentMethod("gopay")}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={` w-[60px] h-[60px] rounded-[15px] shadow-[0px_4px_6px_rgba(0,0,0,0.25)] bg-white ${
                      paymentMethod === "gopay"
                        ? "border-[2px] border-[#3640F0]"
                        : ""
                    }`}
                  ></div>
                  <h1 className="font-montserrat font-bold text-[9px] text-[#202226] text-center h-8">
                    Gopay
                  </h1>
                </button>
                <button
                  onClick={() => setPaymentMethod("qris")}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={` w-[60px] h-[60px] rounded-[15px] shadow-[0px_4px_6px_rgba(0,0,0,0.25)] bg-white ${
                      paymentMethod === "qris"
                        ? "border-[2px] border-[#3640F0]"
                        : ""
                    }`}
                  ></div>
                  <h1 className="font-montserrat font-bold text-[9px] text-[#202226] text-center h-8">
                    QRIS
                  </h1>
                </button>
              </div>
              <div className="w-full flex justify-evenly items-center">
                <button
                  onClick={() => setPaymentMethod("shopeepay")}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={` w-[60px] h-[60px] rounded-[15px] shadow-[0px_4px_6px_rgba(0,0,0,0.25)] bg-white ${
                      paymentMethod === "shopeepay"
                        ? "border-[2px] border-[#3640F0]"
                        : ""
                    }`}
                  ></div>
                  <h1 className="font-montserrat font-bold text-[9px] text-[#202226] text-center h-8">
                    Shopeepay
                  </h1>
                </button>
                <button
                  onClick={() => setPaymentMethod("indomaret")}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={` w-[60px] h-[60px] rounded-[15px] shadow-[0px_4px_6px_rgba(0,0,0,0.25)] bg-white ${
                      paymentMethod === "indomaret"
                        ? "border-[2px] border-[#3640F0]"
                        : ""
                    }`}
                  ></div>
                  <h1 className="font-montserrat font-bold text-[9px] text-[#202226] text-center h-8">
                    Indomaret
                  </h1>
                </button>
                <button
                  onClick={() => setPaymentMethod("alfamart")}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={` w-[60px] h-[60px] rounded-[15px] shadow-[0px_4px_6px_rgba(0,0,0,0.25)] bg-white ${
                      paymentMethod === "alfamart"
                        ? "border-[2px] border-[#3640F0]"
                        : ""
                    }`}
                  ></div>
                  <h1 className="font-montserrat font-bold text-[9px] text-[#202226] text-center h-8">
                    Alfamart
                  </h1>
                </button>
              </div>

              <button className=" w-full h-[48px] rounded-[24px] bg-[#7179FB] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-2 relative z-0 flex items-center justify-center">
                <div className=" h-[39px] w-[39px] rounded-full bg-white flex items-center justify-center absolute z-[-1] right-[6px]">
                  <ChevronRight sx={{ color: "#375B1A" }} />
                </div>
                <h1 className="font-montserrat font-semibold text-sm text-white">
                  Top Up
                </h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUpModal;
