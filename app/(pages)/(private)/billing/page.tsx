"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import CircleBackground from "@/app/components/svg/CircleBackground";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import {
  useGetMyBilling,
  useGetUnpaidBilling,
  usePayBilling,
} from "@/app/services/billing/billing.mutation";
import {
  ArrowBack,
  Receipt,
  CheckCircle,
  Warning,
  Payment,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const BillingPage = () => {
  const router = useRouter();
  const myBillingMutation = useGetMyBilling();
  const unpaidBillingMutation = useGetUnpaidBilling();
  const payBillingMutation = usePayBilling();

  const [allBilling, setAllBilling] = useState<any[]>([]);
  const [unpaidBilling, setUnpaidBilling] = useState<any[]>([]);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [activeTab, setActiveTab] = useState<"all" | "unpaid">("unpaid");

  useEffect(() => {
    fetchBilling();
  }, []);

  const fetchBilling = async () => {
    try {
      const [myBillingResult, unpaidResult] = await Promise.all([
        myBillingMutation.mutateAsync(),
        unpaidBillingMutation.mutateAsync(),
      ]);

      if (myBillingResult?.data) {
        setAllBilling(myBillingResult.data);
      }

      if (unpaidResult?.data) {
        setUnpaidBilling(unpaidResult.data.bills);
        setTotalUnpaid(unpaidResult.data.totalUnpaid);
      }
    } catch (error) {
      console.error("Error fetching billing:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handlePayment = async (billingId: string, totalAmount: number) => {
    const result = await Swal.fire({
      title: "Konfirmasi Pembayaran",
      html: `
        <p>Total yang harus dibayar:</p>
        <h3 class="text-2xl font-bold text-blue-600">${formatCurrency(
          totalAmount
        )}</h3>
        <p class="text-sm text-gray-600 mt-2">Pilih metode pembayaran:</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2835FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Transfer",
      cancelButtonText: "Batal",
      showDenyButton: true,
      denyButtonText: "E-Wallet",
      denyButtonColor: "#5F68FE",
    });

    if (result.isConfirmed || result.isDenied) {
      const paymentMethod = result.isConfirmed ? "TRANSFER" : "EWALLET";

      try {
        await payBillingMutation.mutateAsync({ billingId, paymentMethod });
        Swal.fire({
          title: "Berhasil!",
          text: "Pembayaran berhasil diproses",
          icon: "success",
          confirmButtonColor: "#2835FF",
        });
        fetchBilling(); // Refresh data
      } catch (error) {
        console.error("Payment error:", error);
      }
    }
  };

  const BillingCard = ({ billing, isUnpaid = false }: any) => {
    const totalAmount = isUnpaid
      ? billing.totalWithDenda
      : billing.totalTagihan;
    const isPaid = billing.isPaid;
    const isOverdue = billing.isOverdue;

    return (
      <div className="bg-[#2A2D31] rounded-xl p-4 mb-3">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-white font-semibold text-lg">
              Periode {billing.periode}
            </h3>
            <p className="text-gray-400 text-sm">
              Pemakaian: {billing.totalPemakaian} m³
            </p>
          </div>
          <div>
            {isPaid ? (
              <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full">
                <CheckCircle className="text-green-500" fontSize="small" />
                <span className="text-green-500 text-xs font-medium">
                  Lunas
                </span>
              </div>
            ) : isOverdue ? (
              <div className="flex items-center gap-1 bg-red-500/20 px-3 py-1 rounded-full">
                <Warning className="text-red-500" fontSize="small" />
                <span className="text-red-500 text-xs font-medium">
                  Terlambat
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
                <Warning className="text-yellow-500" fontSize="small" />
                <span className="text-yellow-500 text-xs font-medium">
                  Belum Lunas
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Biaya Air</span>
            <span className="text-white">
              {formatCurrency(billing.biayaAir)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Biaya Beban</span>
            <span className="text-white">
              {formatCurrency(billing.biayaBeban)}
            </span>
          </div>
          {isUnpaid && billing.denda > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-red-400">
                Denda ({billing.daysLate} hari)
              </span>
              <span className="text-red-400">
                {formatCurrency(billing.denda)}
              </span>
            </div>
          )}
          <div className="border-t border-gray-600 pt-2 flex justify-between font-semibold">
            <span className="text-white">Total</span>
            <span className="text-blue-500 text-lg">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
          <span>Jatuh Tempo: {formatDate(billing.dueDate)}</span>
          {isPaid && billing.paidAt && (
            <span>Dibayar: {formatDate(billing.paidAt)}</span>
          )}
        </div>

        {!isPaid && (
          <button
            onClick={() => handlePayment(billing._id, totalAmount)}
            disabled={payBillingMutation.isPending}
            className="w-full bg-gradient-to-r from-[#5F68FE] to-[#2835FF] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Payment fontSize="small" />
            {payBillingMutation.isPending ? "Memproses..." : "Bayar Sekarang"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col font-inter relative z-0 min-h-screen overflow-hidden">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] fixed z-[-10] top-0 hidden lg:block"
        )}
        width={80}
        height={80}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
      <div className="w-full fixed z-[-10] lg:hidden inset-0">
        <CircleBackground />
      </div>

      <div className="w-full flex flex-col gap-6 py-[18.4px]">
        <HeaderMobile mode="normal" />

        <div className="px-5">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white mb-4"
          >
            <ArrowBack />
            <span>Kembali</span>
          </button>

          {/* Summary Card */}
          {unpaidBilling.length > 0 && (
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Receipt className="text-white" fontSize="large" />
                <div>
                  <p className="text-white/80 text-sm">Total Belum Dibayar</p>
                  <h2 className="text-white font-bold text-2xl">
                    {formatCurrency(totalUnpaid)}
                  </h2>
                </div>
              </div>
              <p className="text-white/80 text-sm">
                {unpaidBilling.length} tagihan menunggu pembayaran
              </p>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("unpaid")}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                activeTab === "unpaid"
                  ? "bg-[#2835FF] text-white"
                  : "bg-[#202226] text-gray-400"
              }`}
            >
              Belum Dibayar ({unpaidBilling.length})
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                activeTab === "all"
                  ? "bg-[#2835FF] text-white"
                  : "bg-[#202226] text-gray-400"
              }`}
            >
              Semua ({allBilling.length})
            </button>
          </div>

          {/* Billing List */}
          {myBillingMutation.isPending || unpaidBillingMutation.isPending ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="bg-[#202226] rounded-3xl p-6">
              <h2 className="text-white font-semibold text-xl mb-4">
                {activeTab === "unpaid"
                  ? "Tagihan Belum Dibayar"
                  : "Semua Tagihan"}
              </h2>

              {activeTab === "unpaid" ? (
                unpaidBilling.length > 0 ? (
                  unpaidBilling.map((billing) => (
                    <BillingCard key={billing._id} billing={billing} isUnpaid />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle
                      className="text-green-500 mx-auto mb-3"
                      fontSize="large"
                    />
                    <p className="text-gray-400">
                      Semua tagihan sudah lunas! 🎉
                    </p>
                  </div>
                )
              ) : allBilling.length > 0 ? (
                allBilling.map((billing) => (
                  <BillingCard key={billing._id} billing={billing} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Receipt
                    className="text-gray-400 mx-auto mb-3"
                    fontSize="large"
                  />
                  <p className="text-gray-400">Belum ada tagihan</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
