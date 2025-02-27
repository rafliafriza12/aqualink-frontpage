"use client";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter, usePathname } from "next/navigation";
import { IsDesktop } from "@/app/hooks";
import { useEffect, useState } from "react";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import WaterCredit from "@/app/components/card/WaterCredit";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { formatToIDR } from "@/app/utils/helper";
import API from "@/app/utils/API";
import Skeleton from "@mui/material/Skeleton";
import { toast, Bounce, ToastContainer } from "react-toastify";

const WaterCreditDetail: React.FC = () => {
  const navigation = useRouter();
  const auth = useAuth();
  const isDesktop = IsDesktop();
  const pathName: any = usePathname().split("/");
  const [waterCreditId, setWaterCreditId] = useState<any>(() => {
    return pathName[pathName.length - 1]
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });
  const [waterCredit, setWaterCredit] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState<boolean>(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] =
    useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const getSubscriptions = async () => {
    try {
      const response = await API.get(
        `/subscribe/getSubscribeByUserId/${auth.auth.user?.id}`,
        {
          headers: {
            Authorization: auth.auth.token,
          },
        }
      );
      const subs = response.data.data.subscriptions;
      setSubscriptions(subs);

      // Check if current water credit is in user's subscriptions
      const isCurrentWaterCreditSubscribed = subs.some(
        (sub: any) =>
          sub.waterCredit._id === waterCreditId &&
          sub.subscriptionDetails.subscribeStatus === true
      );

      setIsSubscribed(isCurrentWaterCreditSubscribed);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const getWaterCreditById = () => {
    API.get(`/waterCredit/getWaterCreditById/${waterCreditId}`, {
      headers: { Authorization: auth.auth.token },
    })
      .then((res) => {
        setIsLoading(false);
        setWaterCredit(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleSubscribe = async () => {
    try {
      setIsLoadingAction(true);
      const response = await API.post(
        `/subscribe/subscribeWaterCredit`,
        {
          customerDetail: {
            id: auth.auth.user?.id,
            fullName: auth.auth.user?.fullName,
            email: auth.auth.user?.email,
            phone: auth.auth.user?.phone,
          },
          waterCreditId: waterCredit._id,
        },
        {
          headers: {
            Authorization: auth.auth.token,
          },
        }
      );

      if (response.status === 201) {
        setShowSubscribeModal(false);
        toast.success("Berhasil berlangganan!", {
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
        getWaterCreditById();
        getSubscriptions();
        setShowSubscribeModal(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal berlangganan. Silakan coba lagi.", {
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
      setIsLoadingAction(false);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      setIsLoadingAction(true);
      const response = await API.put(
        `/subscribe/unsubscribe/${auth.auth.user?.id}/${waterCredit._id}`,
        {},
        {
          headers: {
            Authorization: auth.auth.token,
          },
        }
      );

      if (response.status === 200) {
        setShowUnsubscribeModal(false);
        toast.success("Berhasil berhenti berlangganan!", {
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
        getWaterCreditById();
        getSubscriptions();
        setShowUnsubscribeModal(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal berhenti berlangganan. Silakan coba lagi.", {
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
      setIsLoadingAction(false);
    }
  };

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth");
    }

    getWaterCreditById();
    getSubscriptions();
  }, [
    auth.auth.isAuthenticated,
    navigation,
    showSubscribeModal,
    showUnsubscribeModal,
  ]);

  if (!auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }
  return isDesktop ? null : (
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins pb-16">
      <HeaderMobile mode="dark" />
      {isLoading ? (
        <Skeleton
          variant="rounded"
          height="180px"
          width="100%"
          sx={{ bgcolor: "#d1d5db", borderRadius: "18px" }}
        />
      ) : (
        <WaterCredit waterCredit={waterCredit} />
      )}
      <div className=" w-full flex flex-col gap-3">
        {isLoading ? (
          <Skeleton
            variant="text"
            width={150}
            sx={{ bgcolor: "#d1d5db", fontSize: "24px" }}
          />
        ) : (
          <h1 className=" font-montserrat font-bold text-[24px]">Air Bersih</h1>
        )}
        <div className=" w-full flex flex-col gap-1">
          <div className=" flex items-center gap-3">
            <PersonOutlineOutlinedIcon />
            {isLoading ? (
              <Skeleton
                variant="text"
                width={150}
                sx={{ bgcolor: "#d1d5db", fontSize: "16px" }}
              />
            ) : (
              <h1 className=" font-poppins font-semibold text-base text-[#202226]">
                {waterCredit?.owner?.fullName}
              </h1>
            )}
          </div>
          <div className=" flex items-center gap-2">
            <LocationOnOutlinedIcon />
            {isLoading ? (
              <Skeleton
                variant="text"
                width={250}
                sx={{ bgcolor: "#d1d5db", fontSize: "14px" }}
              />
            ) : (
              <h1 className=" font-poppins text-[14px] text-[#202226]/50">
                {waterCredit?.location?.address}
              </h1>
            )}
          </div>
        </div>
        {isLoading ? (
          <>
            <Skeleton
              variant="text"
              width={320}
              sx={{ bgcolor: "#d1d5db", fontSize: "12px" }}
            />
            <Skeleton
              variant="text"
              width={320}
              sx={{ bgcolor: "#d1d5db", fontSize: "12px" }}
            />
            <Skeleton
              variant="text"
              width={320}
              sx={{ bgcolor: "#d1d5db", fontSize: "12px" }}
            />
            <Skeleton
              variant="text"
              width={320}
              sx={{ bgcolor: "#d1d5db", fontSize: "12px" }}
            />
          </>
        ) : (
          <p className="w-full text-left font-montserrat font-medium text-[12px] text-[#9D9B9B]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae soluta eligendi culpa, optio vitae asperiores architecto
            officiis accusantium, magnam minima ipsam quia cum? Itaque
            voluptatum aliquam officia consequuntur animi natus.
          </p>
        )}
      </div>
      <div className=" w-full">
        <table>
          <tbody>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Harga</td>
              <td>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width={150}
                    sx={{ bgcolor: "#d1d5db", fontSize: "14px" }}
                  />
                ) : (
                  <>
                    {formatToIDR(waterCredit?.cost ?? 0)}{" "}
                    <span className="text-[10px]">
                      / {waterCredit?.perLiter} L
                    </span>
                  </>
                )}
              </td>
            </tr>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Tempo Pembayaran</td>
              <td>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width={150}
                    sx={{ bgcolor: "#d1d5db", fontSize: "14px" }}
                  />
                ) : (
                  waterCredit?.billingTime
                )}
              </td>
            </tr>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Token Konservasi</td>
              <td>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width={150}
                    sx={{ bgcolor: "#d1d5db", fontSize: "14px" }}
                  />
                ) : (
                  <>
                    {waterCredit?.conservationToken?.rewardToken}{" "}
                    <span className="text-[9px] text-red-400">
                      *Maks. {waterCredit?.conservationToken?.maxWaterUse} L{" "}
                      {waterCredit?.conservationToken?.tokenRewardTempo}
                    </span>
                  </>
                )}
              </td>
            </tr>
            <tr className="font-montserrat font-bold text-[14px] h-12">
              <td className="w-[180px] text-[#888888]">Kualitas Air</td>
              <td>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width={150}
                    sx={{ bgcolor: "#d1d5db", fontSize: "14px" }}
                  />
                ) : (
                  waterCredit?.waterQuality
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h1 className=" w-full font-montserrat font-bold text-[20px]">
        {isLoading ? (
          <Skeleton
            variant="text"
            width={150}
            sx={{ bgcolor: "#d1d5db", fontSize: "20px" }}
          />
        ) : (
          formatToIDR(waterCredit?.cost ?? 0)
        )}
      </h1>
      <div className=" w-full flex justify-center">
        <button
          disabled={isLoading || isLoadingAction}
          onClick={() =>
            isSubscribed
              ? setShowUnsubscribeModal(true)
              : setShowSubscribeModal(true)
          }
          className={`py-3 px-8 text-white rounded-[15px] ${
            isSubscribed ? "bg-red-500" : "bg-[#484FCA]"
          } ${
            (isLoading || isLoadingAction) && "opacity-50 cursor-not-allowed"
          }`}
        >
          <h1 className=" font-montserrat font-bold">
            {isLoadingAction
              ? "Loading..."
              : isSubscribed
              ? "Berhenti Berlangganan"
              : "Berlangganan Sekarang"}
          </h1>
        </button>
      </div>

      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 font-montserrat">
              Konfirmasi Berlangganan
            </h2>
            <p className="text-gray-600 mb-6 font-montserrat">
              Apakah Anda yakin ingin berlangganan kredit air ini?
            </p>
            <div className="flex flex-col gap-3">
              <button
                disabled={isLoadingAction}
                onClick={handleSubscribe}
                className={`w-full bg-[#484FCA] text-white py-2 rounded-xl font-montserrat font-bold ${
                  isLoadingAction && "opacity-50 cursor-not-allowed"
                }`}
              >
                {isLoadingAction ? "Loading..." : "Ya, Berlangganan"}
              </button>
              <button
                disabled={isLoadingAction}
                onClick={() => setShowSubscribeModal(false)}
                className={`w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-montserrat font-bold ${
                  isLoadingAction && "opacity-50 cursor-not-allowed"
                }`}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unsubscribe Modal */}
      {showUnsubscribeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 font-montserrat">
              Konfirmasi Berhenti Berlangganan
            </h2>
            <p className="text-gray-600 mb-6 font-montserrat">
              Apakah Anda yakin ingin berhenti berlangganan kredit air ini?
            </p>
            <div className="flex flex-col gap-3">
              <button
                disabled={isLoadingAction}
                onClick={handleUnsubscribe}
                className={`w-full bg-red-500 text-white py-2 rounded-xl font-montserrat font-bold ${
                  isLoadingAction && "opacity-50 cursor-not-allowed"
                }`}
              >
                {isLoadingAction ? "Loading..." : "Ya, Berhenti Berlangganan"}
              </button>
              <button
                disabled={isLoadingAction}
                onClick={() => setShowUnsubscribeModal(false)}
                className={`w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-montserrat font-bold ${
                  isLoadingAction && "opacity-50 cursor-not-allowed"
                }`}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default WaterCreditDetail;
