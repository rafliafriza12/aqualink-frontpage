"use client";

import RiwaayatTagihanCard from "@/app/components/card/riwayat-tagihan-card";
import { useGetMyBilling } from "@/app/services/billing/billing.mutation";
import { Billing } from "@/app/services/billing/billing.type";
import { useState, useEffect } from "react";

const RiwayatTagihan: React.FC = () => {
  const [billings, setBillings] = useState<Billing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const myBillingMutation = useGetMyBilling();

  useEffect(() => {
    fetchBillingHistory();
  }, []);

  const fetchBillingHistory = async () => {
    setIsLoading(true);
    try {
      const result = await myBillingMutation.mutateAsync();
      if (result?.data) {
        setBillings(result.data);
      }
    } catch (error) {
      console.error("Error fetching billing history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 lg:gap-10 font-poppins relative z-0 ">
      {isLoading ? (
        <div className="w-full h-[400px] flex items-center justify-center bg-[#252525] rounded-[30px]">
          <div className="text-white/60 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl">Memuat riwayat tagihan...</p>
          </div>
        </div>
      ) : billings.length === 0 ? (
        <div className="w-full h-[400px] flex items-center justify-center bg-[#252525] rounded-[30px]">
          <div className="text-white/60 text-center p-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-2xl mb-4 text-white font-semibold">
              Belum Ada Riwayat Tagihan
            </p>
            <p className="text-base mb-2">
              Anda belum memiliki riwayat tagihan
            </p>
            <p className="text-sm">
              Riwayat tagihan akan muncul setelah ada transaksi pembayaran
            </p>
          </div>
        </div>
      ) : (
        <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
          {billings.map((billing) => (
            <RiwaayatTagihanCard key={billing._id} billing={billing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RiwayatTagihan;
