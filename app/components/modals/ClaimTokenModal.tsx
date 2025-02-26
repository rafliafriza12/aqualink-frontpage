"use client";
import API from "@/app/utils/API";
import CloseSVG from "../svg/Close";
import StarSVG from "../svg/Star";
import { useState } from "react";
import { formatToIDR } from "@/app/utils/helper";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useAuth } from "@/app/hooks/UseAuth";

interface ClaimTokenModalProps {
  setShowClaimTokenModal: (condition: boolean) => void;
  showClaimTokenModal: boolean;
  wallet: any;
}

const ClaimTokenModal: React.FC<ClaimTokenModalProps> = ({
  setShowClaimTokenModal,
  showClaimTokenModal,
  wallet,
}) => {
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useAuth();

  const handleExchangeToken = async () => {
    try {
      setIsLoading(true);

      if (tokenAmount <= 0) {
        toast.error(`Jumlah token harus lebih dari 0`, {
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
        return;
      }

      if (tokenAmount > wallet.conservationToken) {
        toast.error(`Token tidak mencukupi`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      const response = await API.post(
        `/wallet/convertConservasionToken/${auth.auth.user?.id}`,
        {
          token: tokenAmount,
        },
        {
          headers: {
            Authorization: `${auth.auth.token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Token berhasil ditukar", {
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
        // setShowClaimTokenModal(false);
        wallet.conservationToken -= tokenAmount;
        setTokenAmount(0);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal menukar token", {
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
    } finally {
      setIsLoading(false);
    }
  };

  const calculateRupiah = (tokens: number) => {
    // Assuming 1 token = Rp 1000
    return tokens * 90;
  };

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
                Tukar Token
              </h1>
              <hr className="w-[60%] h-[2px] bg-gradient-to-r from-white via-[#333338] to-white border-0 " />
            </div>

            <div className=" w-full h-[85%] overflow-x-hidden flex flex-col gap-5">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-[#F5F6FA] p-4 rounded-xl">
                  <h2 className="font-montserrat font-semibold text-lg">
                    Jumlah Token Anda
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <StarSVG />
                    <span className="font-montserrat font-bold text-2xl">
                      {wallet?.conservationToken ?? 0}
                    </span>
                  </div>
                </div>

                <div className="w-full">
                  <label className="font-montserrat text-sm mb-1 block">
                    Jumlah Token yang Ingin Ditukar
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-lg font-montserrat"
                    placeholder="Masukkan jumlah token"
                    value={tokenAmount || ""}
                    onChange={(e) => setTokenAmount(Number(e.target.value))}
                    min={0}
                    max={wallet?.conservationToken ?? 0}
                  />
                </div>

                <div className="w-full">
                  <label className="font-montserrat text-sm mb-1 block">
                    Rupiah yang Akan Diterima
                  </label>
                  <div className="p-3 bg-gray-100 rounded-lg font-montserrat">
                    {formatToIDR(calculateRupiah(tokenAmount))}
                  </div>
                </div>

                <button
                  className={`w-full ${
                    isLoading ? "bg-gray-400" : "bg-[#3640F0]"
                  } text-white py-3 rounded-lg font-montserrat font-semibold mt-4`}
                  onClick={handleExchangeToken}
                  disabled={isLoading}
                >
                  {isLoading ? "Memproses..." : "Tukar Token"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ClaimTokenModal;
