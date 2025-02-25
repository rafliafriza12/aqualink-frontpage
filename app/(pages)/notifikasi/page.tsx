"use client";
import { useAuth } from "@/app/hooks/UseAuth";
import { IsDesktop } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import NotificationCard from "@/app/components/card/NotificationCard";
import Skeleton from "@mui/material/Skeleton";
import API from "@/app/utils/API";
const Notifikasi: React.FC = () => {
  const auth = useAuth();
  const isDesktop = IsDesktop();
  const navigation = useRouter();
  const [indexTabActive, setIndexTabActive] = useState<number>(1);
  const [notifications, setNotifications] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [filteredNotifications, setFilteredNotifications] = useState<any>([]);

  const filterNotifications = () => {
    if (indexTabActive === 1) {
      setFilteredNotifications([...notifications]);
    } else {
      const category = indexTabActive === 2 ? "TRANSAKSI" : "INFORMASI";
      setFilteredNotifications(
        notifications.filter(
          (notification: any) => notification.category === category
        )
      );
    }
  };

  const getNotifications = async () => {
    try {
      const response = await API.get(
        `/notification/getNotificationByUserId/${auth.auth.user?.id}`,
        {
          headers: {
            Authorization: auth.auth.token,
          },
        }
      );
      setNotifications(response.data.data);
      setFilteredNotifications(response.data.data); // Set initial filtered notifications
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect for authentication check
  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth");
    }
  }, [auth.auth.isAuthenticated, navigation]);

  // Effect for fetching notifications
  useEffect(() => {
    if (auth.auth.isAuthenticated) {
      getNotifications();
    }
  }, [auth.auth.isAuthenticated]);

  // Effect for filtering notifications when tab changes
  useEffect(() => {
    filterNotifications();
  }, [indexTabActive, notifications]);

  if (!auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }
  return isDesktop ? null : (
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins">
      <HeaderMobile mode="dark" />
      <div className=" w-full flex items-center justify-between">
        <button
          onClick={() => setIndexTabActive(1)}
          className={` w-[32%] py-3 ${
            indexTabActive === 1
              ? "bg-white text-[#414BF1] border-[1px] border-[#414BF1]"
              : "bg-[#414BF1] text-white"
          } rounded-[7px] flex justify-center items-center`}
        >
          <h1 className=" font-montserrat font-bold text-[15px]">Semua</h1>
        </button>
        <button
          onClick={() => setIndexTabActive(2)}
          className={` w-[32%] py-3 ${
            indexTabActive === 2
              ? "bg-white text-[#414BF1] border-[1px] border-[#414BF1]"
              : "bg-[#414BF1] text-white"
          } rounded-[7px] flex justify-center items-center`}
        >
          <h1 className=" font-montserrat font-bold text-[15px]">Transaksi</h1>
        </button>
        <button
          onClick={() => setIndexTabActive(3)}
          className={` w-[32%] py-3 ${
            indexTabActive === 3
              ? "bg-white text-[#414BF1] border-[1px] border-[#414BF1]"
              : "bg-[#414BF1] text-white"
          } rounded-[7px] flex justify-center items-center`}
        >
          <h1 className=" font-montserrat font-bold text-[15px]">Informasi</h1>
        </button>
      </div>
      {isLoading ? (
        <Skeleton
          variant="rounded"
          height="80vh"
          width="100%"
          sx={{ bgcolor: "#d1d5db", borderRadius: "15px" }}
        />
      ) : (
        filteredNotifications.map((notification: any, i: number) => {
          return <NotificationCard notification={notification} key={i} />;
        })
      )}
    </div>
  );
};

export default Notifikasi;
