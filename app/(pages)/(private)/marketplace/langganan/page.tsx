"use client";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import API from "@/app/utils/API";
import Skeleton from "@mui/material/Skeleton";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import WaterCredit from "@/app/components/card/WaterCredit";

const LanggananPage: React.FC = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSubscriptions, setActiveSubscriptions] = useState<any[]>([]);
  const [inactiveSubscriptions, setInactiveSubscriptions] = useState<any[]>([]);

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
      setSubscriptions(response.data.data.subscriptions);
      setActiveSubscriptions(
        response.data.data.subscriptions.filter(
          (subscription: any) =>
            subscription.subscriptionDetails.subscribeStatus === true
        )
      );
      setInactiveSubscriptions(
        response.data.data.subscriptions.filter(
          (subscription: any) =>
            subscription.subscriptionDetails.subscribeStatus === false
        )
      );
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <HeaderMobile mode="dark" />

      <div className=" py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-montserrat text-gray-800">
            Langganan Aktif
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola langganan kredit air Anda
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={180}
                width="100%"
                sx={{ bgcolor: "#d1d5db", borderRadius: "15px" }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {activeSubscriptions.length > 0 ? (
              activeSubscriptions.map((subscription, index) => (
                <WaterCredit
                  key={index}
                  waterCredit={subscription.waterCredit}
                  isInSwiper={false}
                  link={`/marketplace/langganan/${subscription.subscriptionDetails._id}`}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Belum ada langganan
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Mulai berlangganan untuk menghemat air.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => navigation.push("/marketplace")}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Lihat Paket
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className=" py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-montserrat text-gray-800">
            Langganan Non-Aktif
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola langganan kredit air Anda
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={180}
                width="100%"
                sx={{ bgcolor: "#d1d5db", borderRadius: "15px" }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {inactiveSubscriptions.length > 0 ? (
              inactiveSubscriptions.map((subscription, index) => (
                <WaterCredit
                  key={index}
                  waterCredit={subscription.waterCredit}
                  isInSwiper={false}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Tidak ada langganan yang Non-Aktif
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Tetaplah berlangganan untuk menghemat air.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanggananPage;
