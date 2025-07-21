"use client";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import API from "@/app/utils/API";
import Skeleton from "@mui/material/Skeleton";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import OpacityIcon from "@mui/icons-material/Opacity";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { formatToIDR } from "@/app/utils/helper";
import { toast, Bounce, ToastContainer } from "react-toastify";

const ServiceDetailPage: React.FC = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const { id } = useParams();
  const [serviceDetail, setServiceDetail] = useState<any>(null);
  const [waterCredit, setWaterCredit] = useState<any>(null);
  const [waterUsageData, setWaterUsageData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState<boolean>(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] =
    useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const fetchData = async () => {
    if (!auth.auth.token) return;

    try {
      const headers = { Authorization: auth.auth.token };

      // Fetch service data first
      const serviceResponse = await API.get(
        `/subscribe/getSubscribeById/${id}`,
        { headers }
      ).catch((err) => {
        if (err.response?.status === 404) {
          return { data: { data: null } };
        }
        throw err;
      });

      // Set service data
      const serviceData = serviceResponse.data.data;
      setServiceDetail(serviceData);
      setIsSubscribed(serviceData?.subscribeStatus);

      // Only proceed if we have service data
      if (serviceData) {
        // Get water credit data
        const waterCreditRes = await API.get(
          `/waterCredit/getWaterCreditById/${serviceData.waterCreditId}`,
          { headers }
        ).catch((err) => {
          if (err.response?.status === 404) {
            return { data: { data: null } };
          }
          throw err;
        });
        setWaterCredit(waterCreditRes.data.data);

        // Get usage history with waterCreditId
        const usageResponse = await API.get(
          `/history/getHistory/${auth.auth.user?.id}/${serviceData.waterCreditId}?filter=minggu`,
          { headers }
        ).catch((err) => {
          if (err.response?.status === 404) {
            return { data: { data: [] } };
          }
          throw err;
        });
        setWaterUsageData(usageResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
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

      if (response.status === 200) {
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
        fetchData();
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
        fetchData();
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
    fetchData();
  }, [id]);

  const renderTableRow = (label: string, value: React.ReactNode) => (
    <tr className="font-montserrat font-bold text-[14px] h-12">
      <td className="w-[180px] text-[#888888]">{label}</td>
      <td>
        {isLoading ? (
          <Skeleton variant="text" width={120} sx={{ bgcolor: "#d1d5db" }} />
        ) : (
          value
        )}
      </td>
    </tr>
  );

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins pb-16">
      <HeaderMobile mode="dark" />

      <div className="w-full h-[251px] rounded-[26px] bg-[#202226] relative z-0 overflow-hidden p-5 flex flex-col justify-between">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1">
              <Skeleton
                variant="circular"
                width={24}
                height={24}
                sx={{ bgcolor: "#d1d5db" }}
              />
              <Skeleton
                variant="text"
                width={120}
                height={24}
                sx={{ bgcolor: "#d1d5db" }}
              />
            </div>
            <div className="flex items-end gap-1 ml-2">
              <Skeleton
                variant="text"
                width={80}
                height={50}
                sx={{ bgcolor: "#d1d5db" }}
              />
            </div>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="60%"
              sx={{ bgcolor: "#d1d5db" }}
            />
          </div>
        ) : !waterUsageData ||
          waterUsageData.length === 0 ||
          serviceDetail?.totalUsedWater === 0 ? (
          <div className="h-full w-full flex flex-col items-center justify-center gap-4">
            <OpacityIcon sx={{ color: "#93B6E8", fontSize: 48 }} />
            <div className="text-center">
              <h2 className="font-montserrat font-bold text-xl text-white mb-2">
                Belum Ada Data Penggunaan Air
              </h2>
              <p className="font-inter text-[#8C8C8C] text-sm">
                Data penggunaan air akan muncul setelah Anda mulai menggunakan
                layanan.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <OpacityIcon sx={{ color: "#93B6E8" }} />
                <h1 className="font-montserrat font-bold text-[18px] text-white">
                  Penggunaan Air
                </h1>
              </div>
              <div className="flex items-end gap-1 ml-2">
                <h1 className="font-montserrat font-extrabold text-[35px] text-white">
                  {serviceDetail?.totalUsedWater?.toFixed(2) || "0.00"}
                </h1>
                <h6 className="font-inter text-[#8C8C8C] text-sm">Liter</h6>
              </div>
            </div>
            <div className="w-full h-[60%]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={waterUsageData}>
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2983FF" stopOpacity={1} />
                      <stop offset="100%" stopColor="#6FC3FF" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="totalUsedWater"
                    stroke="url(#gradient)"
                    strokeWidth={2}
                  />
                  <Tooltip />
                  <XAxis dataKey="_id.day" tick={{ fontSize: 10 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      <div className="w-full flex flex-col gap-3">
        {isLoading ? (
          <Skeleton
            variant="text"
            width={200}
            height={40}
            sx={{ bgcolor: "#d1d5db" }}
          />
        ) : (
          <h1 className="font-montserrat font-bold text-[24px]">Air Bersih</h1>
        )}
        <div className="w-full flex flex-col gap-1">
          <div className="flex items-center gap-3">
            {isLoading ? (
              <Skeleton
                variant="circular"
                width={24}
                height={24}
                sx={{ bgcolor: "#d1d5db" }}
              />
            ) : (
              <PersonOutlineOutlinedIcon />
            )}
            {isLoading ? (
              <Skeleton
                variant="text"
                width={200}
                sx={{ bgcolor: "#d1d5db" }}
              />
            ) : (
              <h1 className="font-poppins font-semibold text-base text-[#202226]">
                {waterCredit?.owner?.fullName}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isLoading ? (
              <Skeleton
                variant="circular"
                width={24}
                height={24}
                sx={{ bgcolor: "#d1d5db" }}
              />
            ) : (
              <LocationOnOutlinedIcon />
            )}
            {isLoading ? (
              <Skeleton
                variant="text"
                width={250}
                sx={{ bgcolor: "#d1d5db" }}
              />
            ) : (
              <h1 className="font-poppins text-[14px] text-[#202226]/50">
                {waterCredit?.location?.address}
              </h1>
            )}
          </div>
        </div>
        {isLoading ? (
          <Skeleton
            variant="text"
            width="100%"
            height={80}
            sx={{ bgcolor: "#d1d5db" }}
          />
        ) : (
          <p className="w-full text-left font-montserrat font-medium text-[12px] text-[#9D9B9B]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae soluta eligendi culpa, optio vitae asperiores architecto
            officiis accusantium, magnam minima ipsam quia cum? Itaque
            voluptatum aliquam officia consequuntur animi natus.
          </p>
        )}
      </div>

      <div className="w-full">
        <table>
          <tbody>
            {renderTableRow(
              "Harga",
              <>
                {formatToIDR(waterCredit?.cost ?? 0)}{" "}
                <span className="text-[10px]">/ {waterCredit?.perLiter} L</span>
              </>
            )}
            {renderTableRow("Tempo Pembayaran", waterCredit?.billingTime)}
            {renderTableRow(
              "Token Konservasi",
              <>
                {waterCredit?.conservationToken?.rewardToken}{" "}
                <span className="text-[9px] text-red-400">
                  *Maks. {waterCredit?.conservationToken?.maxWaterUse} L{" "}
                  {waterCredit?.conservationToken?.tokenRewardTempo}
                </span>
              </>
            )}
            {renderTableRow("Kualitas Air", waterCredit?.waterQuality)}
          </tbody>
        </table>
      </div>

      {isLoading ? (
        <Skeleton
          variant="text"
          width={200}
          height={32}
          sx={{ bgcolor: "#d1d5db" }}
        />
      ) : (
        <h1 className="w-full font-montserrat font-bold text-[20px]">
          {formatToIDR(waterCredit?.cost ?? 0)}
        </h1>
      )}

      <div className="w-full flex justify-center">
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
          <h1 className="font-montserrat font-bold">
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

export default ServiceDetailPage;
