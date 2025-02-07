"use client";
import { useAuth } from "@/app/hooks/UseAuth";
import { IsDesktop } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import NotificationCard from "@/app/components/card/NotificationCard";
const Notifikasi: React.FC = () => {
  const auth = useAuth();
  const isDesktop = IsDesktop();
  const navigation = useRouter();
  const [indexTabActive, setIndexTabActive] = useState<number>(1);
  const notifications: any = [
    {
      title: "Transaksi Berhasil",
      description:
        "Anda telah Berhasil Melakukan Tranfer kepada Agus Setia Budi Marzuki, dengan keterang saldo sekian sekian sekian",
      category: "transaction",
      status: "success",
      createdAt: "12 Januari 2025",
    },
    {
      title: "Transaksi Gagal",
      description:
        "Gagal Melakukan Tranfer kepada Agus Setia Budi Marzuki, dengan keterang saldo sekian sekian sekian",
      category: "transaction",
      status: "failed",
      createdAt: "13 Januari 2025",
    },
    {
      title: "Pemakaian Air",
      description: "Pemakaian air anda telah mencapai sekian liter",
      category: "information",
      createdAt: "12 Januari 2025",
    },
    {
      title: "Pemakaian Air",
      description: "Pemakaian air anda telah mencapai sekian liter",
      category: "information",
      createdAt: "12 Januari 2025",
    },
  ];

  const [filteredNotifications, setFilteredNotifications] = useState<any>([]);

  const filterNotifications = () => {
    if (indexTabActive === 1) {
      setFilteredNotifications(() => {
        const copyArray = [...notifications];
        return copyArray;
      });
    } else if (indexTabActive === 2) {
      setFilteredNotifications(() => {
        const copyArray = [...notifications];
        const newArr = copyArray
          .filter(
            (notification: any) => notification.category === "transaction"
          )
          .map((data: any) => data);
        return newArr;
      });
    } else {
      setFilteredNotifications(() => {
        const copyArray = [...notifications];
        const newArr = copyArray
          .filter(
            (notification: any) => notification.category === "information"
          )
          .map((data: any) => data);
        return newArr;
      });
    }
  };

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth");
    }
    filterNotifications();
    // console.log(filteredNotifications);
  }, [auth.auth.isAuthenticated, navigation, indexTabActive]);

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
      {filteredNotifications.map((notification: any, i: number) => {
        return <NotificationCard notification={notification} key={i} />;
      })}
    </div>
  );
};

export default Notifikasi;
