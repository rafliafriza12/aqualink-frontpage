"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import CircleBackground from "@/app/components/svg/CircleBackground";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import {
  useGetMyRAB,
  useCreateRABPayment,
} from "@/app/services/rab/rab.mutation";
import {
  ArrowBack,
  Description,
  AttachMoney,
  CheckCircle,
  Schedule,
  Payment,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { toast, Bounce } from "react-toastify";

const RABPaymentPage = () => {
  const router = useRouter();
  const myRABMutation = useGetMyRAB();
  const createPaymentMutation = useCreateRABPayment();

  const [rabData, setRabData] = useState<any>(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState<boolean>(false);

  useEffect(() => {
    fetchRABData();
  }, []);

  const fetchRABData = async () => {
    try {
      const result = await myRABMutation.mutateAsync();
      console.log("RAB Data fetched:", result);
      if (result?.data) {
        console.log("Setting RAB data:", result.data);
        setRabData(result.data);
      }
    } catch (error: any) {
      console.error("Error fetching RAB:", error);
      if (error?.response?.status === 404) {
        Swal.fire({
          title: "RAB Belum Dibuat",
          text: "Teknisi belum membuat RAB untuk koneksi Anda. Silakan hubungi customer service.",
          icon: "info",
          confirmButtonColor: "#2835FF",
        }).then(() => {
          router.push("/profile");
        });
      }
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePayment = async () => {
    console.log("💳 Payment button clicked");
    console.log("rabData:", rabData);
    console.log("totalBiaya:", rabData?.totalBiaya);

    const result = await Swal.fire({
      title: "Konfirmasi Pembayaran RAB",
      html: `
        <div class="text-left">
          <p class="mb-2">Rincian Pembayaran:</p>
          <div class="bg-gray-100 rounded-lg p-4 mb-3">
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Total Biaya:</span>
              <span class="font-bold text-blue-600">${formatCurrency(
                rabData.totalBiaya
              )}</span>
            </div>
          </div>
          <p class="text-sm text-gray-600">Anda akan diarahkan ke halaman pembayaran Midtrans untuk menyelesaikan transaksi.</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2835FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Bayar Sekarang",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        setIsLoadingPayment(true);

        // Create Midtrans payment via backend
        const response = await createPaymentMutation.mutateAsync(rabData._id);

        console.log("Full API Response:", response);
        console.log("Payment Data:", response.data);

        const { redirectUrl, orderId, grossAmount, token } = response.data;

        console.log("RAB Payment created:", {
          orderId: orderId,
          amount: grossAmount,
          token: token,
          redirectUrl: redirectUrl,
        });

        // Redirect to Midtrans payment page
        if (redirectUrl) {
          console.log("✅ Redirecting to Midtrans:", redirectUrl);
          window.location.href = redirectUrl;
        } else {
          console.error("❌ No redirectUrl found in response");
          toast.error("Payment URL tidak tersedia", {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
          });
          setIsLoadingPayment(false);
        }
      } catch (error: any) {
        console.error("Payment error:", error);
        toast.error(
          error?.response?.data?.message || "Gagal membuat pembayaran",
          {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
          }
        );
        setIsLoadingPayment(false);
      }
    }
  };

  const handleDownloadRAB = () => {
    console.log("🔍 Download RAB clicked");
    console.log("RAB Data:", rabData);
    console.log("rabUrl:", rabData?.rabUrl);

    if (rabData?.rabUrl) {
      console.log("✅ Opening RAB URL:", rabData.rabUrl);
      window.open(rabData.rabUrl, "_blank");
    } else {
      console.error("❌ RAB URL not found");
      toast.error("Dokumen RAB tidak tersedia", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
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

          {myRABMutation.isPending ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : rabData ? (
            <>
              {/* Status Card */}
              <div
                className={`rounded-3xl p-6 mb-6 ${
                  rabData.isPaid
                    ? "bg-gradient-to-br from-green-500 to-green-600"
                    : "bg-gradient-to-br from-[#2835FF] to-[#5F68FE]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h1 className="text-white font-bold text-2xl mb-1">
                      {rabData.isPaid
                        ? "RAB Sudah Dibayar"
                        : "RAB Menunggu Pembayaran"}
                    </h1>
                    <p className="text-white/80 text-sm">
                      Rencana Anggaran Biaya Pemasangan
                    </p>
                  </div>
                  {rabData.isPaid ? (
                    <CheckCircle className="text-white" fontSize="large" />
                  ) : (
                    <Schedule className="text-white" fontSize="large" />
                  )}
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Total Biaya</span>
                    <span className="text-white font-bold text-2xl">
                      {formatCurrency(rabData.totalBiaya)}
                    </span>
                  </div>
                </div>
              </div>

              {/* RAB Document */}
              <div className="bg-[#202226] rounded-3xl p-6 mb-6">
                <h2 className="text-white font-semibold text-xl mb-4">
                  Dokumen RAB
                </h2>

                <div className="bg-[#2A2D31] rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Description className="text-red-500" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          Dokumen RAB.pdf
                        </p>
                        <p className="text-gray-400 text-xs">
                          Rincian biaya pemasangan
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleDownloadRAB}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
                    >
                      Lihat
                    </button>
                  </div>
                </div>

                {rabData.isPaid && rabData.paidAt && (
                  <div className="bg-green-500/10 border border-green-500 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-green-500 mb-2">
                      <CheckCircle fontSize="small" />
                      <span className="font-semibold">Sudah Dibayar</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Dibayar pada: {formatDate(rabData.paidAt)}
                    </p>
                  </div>
                )}
              </div>

              {/* Info Card */}
              <div className="bg-[#202226] rounded-3xl p-6 mb-6">
                <h2 className="text-white font-semibold text-xl mb-4">
                  Informasi
                </h2>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-500 font-bold text-xs">1</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Teknisi telah membuat RAB (Rencana Anggaran Biaya) untuk
                      pemasangan koneksi air Anda.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-500 font-bold text-xs">2</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Silakan unduh dan periksa dokumen RAB untuk melihat
                      rincian biaya.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-500 font-bold text-xs">3</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {rabData.isPaid
                        ? "Teknisi akan segera melanjutkan proses pemasangan sesuai jadwal."
                        : "Setelah pembayaran dikonfirmasi, proses pemasangan akan dilanjutkan."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              {!rabData.isPaid && (
                <button
                  onClick={handlePayment}
                  disabled={isLoadingPayment}
                  className="w-full bg-gradient-to-r from-[#5F68FE] to-[#2835FF] text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Payment />
                  {isLoadingPayment
                    ? "Memproses..."
                    : `Bayar ${formatCurrency(rabData.totalBiaya)}`}
                </button>
              )}

              {rabData.isPaid && (
                <div className="bg-green-500/10 border-2 border-green-500 rounded-xl p-4 text-center">
                  <CheckCircle
                    className="text-green-500 mx-auto mb-2"
                    fontSize="large"
                  />
                  <h3 className="text-green-500 font-bold text-lg mb-1">
                    Pembayaran Selesai
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Terima kasih! Teknisi kami akan segera menghubungi Anda
                    untuk jadwal pemasangan.
                  </p>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RABPaymentPage;
