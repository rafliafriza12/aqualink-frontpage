"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import CircleBackground from "@/app/components/svg/CircleBackground";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Schedule,
  Error,
  Cancel,
  HourglassEmpty,
  Receipt,
  Refresh,
  Home,
  SupportAgent,
  ArrowBack,
} from "@mui/icons-material";

type PaymentStatus =
  | "settlement"
  | "capture"
  | "pending"
  | "deny"
  | "cancel"
  | "expire"
  | "failure"
  | "error"
  | "success";

interface StatusConfig {
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  title: string;
  message: string;
  statusColor: string;
  statusLabel: string;
  showRetryButton: boolean;
  showCheckStatusButton: boolean;
  infoBox: {
    bgColor: string;
    borderColor: string;
    textColor: string;
    content: React.ReactNode;
  };
}

const RABPaymentStatusPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [statusConfig, setStatusConfig] = useState<StatusConfig | null>(null);

  useEffect(() => {
    // Get payment info from URL params
    const orderId = searchParams.get("order_id");
    const statusCode = searchParams.get("status_code");
    const transactionStatus = searchParams.get(
      "transaction_status"
    ) as PaymentStatus;
    const action = searchParams.get("action"); // back, success, pending, error

    setPaymentInfo({
      orderId,
      statusCode,
      transactionStatus,
      action,
    });

    // Configure display based on transaction status
    const config = getStatusConfig(transactionStatus, action);
    setStatusConfig(config);

    console.log("Payment Status Info:", {
      orderId,
      statusCode,
      transactionStatus,
      action,
    });
  }, [searchParams]);

  const getStatusConfig = (
    status: PaymentStatus | null,
    action: string | null
  ): StatusConfig => {
    // Handle settlement/success
    if (
      status === "settlement" ||
      status === "success" ||
      status === "capture"
    ) {
      return {
        icon: <CheckCircle style={{ fontSize: 60 }} />,
        iconBgColor: "bg-green-500/20",
        iconColor: "text-green-500",
        title: "Pembayaran Berhasil!",
        message:
          "Pembayaran RAB Anda telah berhasil diproses. Proses pemasangan akan segera dilanjutkan oleh teknisi kami.",
        statusColor: "text-green-500",
        statusLabel: status?.toUpperCase() || "SUCCESS",
        showRetryButton: false,
        showCheckStatusButton: false,
        infoBox: {
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/30",
          textColor: "text-green-400",
          content: (
            <p className="text-sm">
              💡 <strong>Selanjutnya:</strong> Teknisi akan menghubungi Anda
              untuk menjadwalkan pemasangan meteran air.
            </p>
          ),
        },
      };
    }

    // Handle pending
    if (status === "pending") {
      return {
        icon: <Schedule style={{ fontSize: 60 }} />,
        iconBgColor: "bg-yellow-500/20",
        iconColor: "text-yellow-500",
        title: "Pembayaran Menunggu Konfirmasi",
        message:
          "Pembayaran Anda sedang diproses. Mohon tunggu konfirmasi dari sistem pembayaran atau selesaikan pembayaran Anda.",
        statusColor: "text-yellow-500",
        statusLabel: "PENDING",
        showRetryButton: false,
        showCheckStatusButton: true,
        infoBox: {
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/30",
          textColor: "text-yellow-400",
          content: (
            <div className="text-sm text-left">
              <strong>⏳ Catatan Penting:</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside text-xs">
                <li>
                  Untuk transfer bank, konfirmasi biasanya memakan waktu 1-2 jam
                </li>
                <li>Untuk e-wallet/virtual account, konfirmasi real-time</li>
                <li>Jika sudah membayar, halaman akan otomatis update</li>
              </ul>
            </div>
          ),
        },
      };
    }

    // Handle cancel
    if (status === "cancel" || action === "back") {
      return {
        icon: <Cancel style={{ fontSize: 60 }} />,
        iconBgColor: "bg-orange-500/20",
        iconColor: "text-orange-500",
        title: "Pembayaran Dibatalkan",
        message:
          "Pembayaran RAB Anda dibatalkan. Silakan coba lagi jika Anda ingin melanjutkan pembayaran.",
        statusColor: "text-orange-500",
        statusLabel: "CANCELLED",
        showRetryButton: true,
        showCheckStatusButton: false,
        infoBox: {
          bgColor: "bg-orange-500/10",
          borderColor: "border-orange-500/30",
          textColor: "text-orange-400",
          content: (
            <div className="flex items-start gap-3 text-left">
              <ArrowBack className="mt-1" fontSize="small" />
              <div>
                <p className="text-sm">
                  <strong>Pembayaran Belum Selesai</strong>
                </p>
                <p className="text-xs mt-1">
                  Anda menekan tombol kembali sebelum menyelesaikan pembayaran.
                  Silakan coba lagi untuk melanjutkan.
                </p>
              </div>
            </div>
          ),
        },
      };
    }

    // Handle expire
    if (status === "expire") {
      return {
        icon: <HourglassEmpty style={{ fontSize: 60 }} />,
        iconBgColor: "bg-red-500/20",
        iconColor: "text-red-500",
        title: "Pembayaran Kedaluwarsa",
        message: "Waktu pembayaran telah habis. Silakan buat pembayaran baru.",
        statusColor: "text-red-500",
        statusLabel: "EXPIRED",
        showRetryButton: true,
        showCheckStatusButton: false,
        infoBox: {
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          textColor: "text-red-400",
          content: (
            <p className="text-sm">
              ⏰ Transaksi pembayaran memiliki batas waktu. Silakan buat
              pembayaran baru dan selesaikan dalam waktu yang ditentukan.
            </p>
          ),
        },
      };
    }

    // Handle deny/failure/error (default error state)
    return {
      icon: <Error style={{ fontSize: 60 }} />,
      iconBgColor: "bg-red-500/20",
      iconColor: "text-red-500",
      title: "Pembayaran Gagal",
      message:
        status === "deny"
          ? "Pembayaran ditolak oleh bank atau penyedia pembayaran."
          : "Terjadi kesalahan saat memproses pembayaran Anda.",
      statusColor: "text-red-500",
      statusLabel: status?.toUpperCase() || "FAILED",
      showRetryButton: true,
      showCheckStatusButton: false,
      infoBox: {
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        textColor: "text-red-400",
        content: (
          <div>
            <div className="flex items-start gap-3 text-left mb-3">
              <SupportAgent className="mt-1" fontSize="small" />
              <div>
                <p className="text-sm">
                  <strong>Butuh Bantuan?</strong>
                </p>
                <p className="text-xs mt-1">
                  Jika masalah berlanjut, silakan hubungi customer service kami
                  untuk bantuan lebih lanjut.
                </p>
              </div>
            </div>
            <div className="bg-[#2A2D31] rounded-xl p-3 text-left">
              <p className="text-white/80 text-xs font-semibold mb-2">
                Kemungkinan Penyebab:
              </p>
              <ul className="text-white/60 text-xs space-y-1 list-disc list-inside">
                <li>Saldo tidak mencukupi</li>
                <li>Kartu/rekening diblokir</li>
                <li>Batas transaksi terlampaui</li>
                <li>Koneksi internet terputus</li>
              </ul>
            </div>
          </div>
        ),
      },
    };
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  if (!statusConfig) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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

        <div className="px-5 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="bg-[#202226] rounded-3xl p-8 max-w-md w-full text-center">
            {/* Status Icon */}
            <div className="flex justify-center mb-6">
              <div
                className={`w-24 h-24 ${statusConfig.iconBgColor} rounded-full flex items-center justify-center`}
              >
                <div className={statusConfig.iconColor}>
                  {statusConfig.icon}
                </div>
              </div>
            </div>

            {/* Status Message */}
            <h1 className="text-white font-bold text-2xl mb-3">
              {statusConfig.title}
            </h1>
            <p className="text-white/70 mb-6">{statusConfig.message}</p>

            {/* Payment Details */}
            {paymentInfo?.orderId && (
              <div className="bg-[#2A2D31] rounded-xl p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Receipt
                    className={statusConfig.iconColor}
                    fontSize="small"
                  />
                  <span className="text-white/80 text-sm font-semibold">
                    Detail Transaksi
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Order ID:</span>
                    <span className="text-white font-mono text-xs">
                      {paymentInfo.orderId}
                    </span>
                  </div>
                  {paymentInfo.transactionStatus && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Status:</span>
                      <span
                        className={`${statusConfig.statusColor} font-semibold`}
                      >
                        {statusConfig.statusLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {statusConfig.showCheckStatusButton && (
                <button
                  onClick={() => router.push("/profile/rab-payment")}
                  className="w-full bg-gradient-to-r from-[#2835FF] to-[#5F68FE] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Refresh fontSize="small" />
                  Cek Status Pembayaran
                </button>
              )}

              {statusConfig.showRetryButton && (
                <button
                  onClick={() => router.push("/profile/rab-payment")}
                  className="w-full bg-gradient-to-r from-[#2835FF] to-[#5F68FE] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Refresh fontSize="small" />
                  Coba Bayar Lagi
                </button>
              )}

              {!statusConfig.showRetryButton &&
                !statusConfig.showCheckStatusButton && (
                  <button
                    onClick={() => router.push("/profile/rab-payment")}
                    className="w-full bg-gradient-to-r from-[#2835FF] to-[#5F68FE] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    Lihat Detail RAB
                  </button>
                )}

              <button
                onClick={() => router.push("/profile")}
                className="w-full bg-[#2A2D31] text-white py-3 rounded-xl font-semibold hover:bg-[#33373c] transition-colors flex items-center justify-center gap-2"
              >
                <Home fontSize="small" />
                Kembali ke Profil
              </button>
            </div>

            {/* Info Box */}
            <div
              className={`mt-6 ${statusConfig.infoBox.bgColor} border ${statusConfig.infoBox.borderColor} rounded-xl p-4`}
            >
              <div className={statusConfig.infoBox.textColor}>
                {statusConfig.infoBox.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RABPaymentStatusPage;
