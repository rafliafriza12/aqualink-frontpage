"use client";
import API from "@/app/utils/API";
import CloseSVG from "../svg/Close";
import StarSVG from "../svg/Star";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import ChevronRight from "@mui/icons-material/ChevronRight";
// import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
// import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
// import GopaySVG from "../svg/Gopay";
// import QrisSVG from "../svg/Qris";
// import ShopeepaySVG from "../svg/ShopeePay";
// import IndomaretSVG from "../svg/Indomaret";
// import AlfamartSVG from "../svg/Alfamart";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";
import { toast, Bounce, ToastContainer } from "react-toastify";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useAuth();
  const navigation = useRouter();

  const onCreateTopUp = () => {
    setIsLoading(true);
    API.post(
      `/midtrans/topup/${auth.auth.user?.id}`,
      {
        customerDetails: {
          userId: auth.auth.user?.id,
          firstName: auth.auth.user?.fullName.split(" ")[0],
          lastName: auth.auth.user?.fullName
            .split(" ")
            .slice(1, auth.auth.user.fullName.split(" ").length - 1)
            .join(" "),
          email: auth.auth.user?.email,
          phone: auth.auth.user?.phone,
        },
        paymentMethod: paymentMethod,
        amount: amount,
      },
      { headers: { Authorization: auth.auth.token } }
    )
      .then((res) => {
        setIsLoading(false);
        toast.success(`${res.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        if (res.data.redirectUrl) {
          navigation.push(res.data.redirectUrl);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(`${err.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };
  return (
    <div
      className={`h-screen w-full ${
        showTopUpModal ? "fixed" : "hidden"
      }  bg-[#000000]/50 z-[2] top-0 flex justify-center items-center px-7 backdrop-blur-[2px]`}
    >
      <div className="w-full h-[540px] bg-white rounded-[30px] shadow-lg -mt-[6vh] p-4 relative z-0">
        <button
          onClick={() => setShowTopUpModal(!showTopUpModal)}
          className="absolute z-[5] -right-[3.8%] -top-[3.5%] p-2 bg-transparent hover:bg-gray-200 rounded-full transition duration-200"
        >
          <CloseSVG />
        </button>
        <div className="w-full h-full rounded-[25px] bg-gradient-to-br from-[#3640F0] via-transparent to-[#3640F0] p-[2px]">
          <div className="w-full h-full rounded-[21px] bg-gradient-to-tr from-[#6A5AE0]/60 via-white to-white py-5 px-4 flex flex-col justify-between items-center">
            <div className="w-full h-[12%] flex flex-col items-center">
              <h1 className="font-montserrat font-bold text-[28px] text-[#202226]">
                Top Up Saldo
              </h1>
              <hr className="w-[70%] h-[2px] bg-gradient-to-r from-white via-[#333338] to-white border-0" />
            </div>

            <div className="w-full h-[85%] flex flex-col gap-6">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                color="#3640F0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="8" />
              </svg>
              <TextField
                id="amount"
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
                    color: "black",
                    "& fieldset": {
                      borderColor: "#7179FB",
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#7179FB",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7179FB",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
              />

              <div className="w-full flex justify-center items-center mt-5">
                <h1 className="font-montserrat font-semibold text-[16px] text-[#202226] text-center">
                  Pemilihan metode pembayaran akan dilakukan setelah ini.
                </h1>
              </div>

              <button
                onClick={() => onCreateTopUp()}
                className="w-full h-[48px] rounded-[24px] bg-[#7179FB] shadow-md p-2 relative z-0 flex items-center justify-center transition duration-200 hover:bg-[#5a6bbf]"
              >
                <div className="h-[39px] w-[39px] rounded-full bg-white flex items-center justify-center absolute z-[-1] right-[6px]">
                  <ChevronRight sx={{ color: "#375B1A" }} />
                </div>
                {isLoading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-200 animate-spin fill-white"
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
                  <h1 className="font-montserrat font-semibold text-sm text-white">
                    Top Up
                  </h1>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TopUpModal;
