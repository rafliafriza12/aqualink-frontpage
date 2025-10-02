"use client";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CircularProgress from "@mui/material/CircularProgress";
import { formatToIDR } from "@/app/utils/helper";
import Image from "next/image";
import API from "@/app/utils/API";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/UseAuth";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useGetUnpaidBilling } from "@/app/services/billing/billing.mutation";
import { UnpaidBill } from "@/app/services/billing/billing.type";
import { BillingService } from "@/app/services/billing/billing.service";
import { useMidtrans } from "@/app/hooks/useMidtrans";

const PembayaranPage: React.FC = () => {
  const [isLoadingPayment, setIsLoadingPayment] = useState<boolean>(false);
  const [isLoadingWalletPayment, setIsLoadingWalletPayment] =
    useState<boolean>(false);
  const [isLoadingPayAllPayment, setIsLoadingPayAllPayment] =
    useState<boolean>(false);
  const [isLoadingWalletPayAll, setIsLoadingWalletPayAll] =
    useState<boolean>(false);
  const [isLoadingPDF, setIsLoadingPDF] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [unpaidBills, setUnpaidBills] = useState<UnpaidBill[]>([]);
  const [selectedBill, setSelectedBill] = useState<UnpaidBill | null>(null);
  const navigation = useRouter();
  const auth = useAuth();
  const unpaidBillingMutation = useGetUnpaidBilling();
  const { isSnapLoaded, openSnap } = useMidtrans();

  useEffect(() => {
    fetchUnpaidBills();
  }, []);

  const fetchUnpaidBills = async () => {
    setIsLoadingData(true);
    try {
      const result = await unpaidBillingMutation.mutateAsync();
      if (result?.data?.bills && result.data.bills.length > 0) {
        setUnpaidBills(result.data.bills);
        // Set tagihan pertama sebagai default
        setSelectedBill(result.data.bills[0]);
      }
    } catch (error) {
      console.error("Error fetching unpaid bills:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (bill: UnpaidBill) => {
    if (bill.isPaid) {
      return {
        text: "Lunas",
        color: "from-[#0EC585]",
        borderColor: "border-[#0EC585]",
        textColor: "text-[#0EC585]",
      };
    } else if (bill.isOverdue) {
      return {
        text: `Terlambat ${bill.daysLate} hari`,
        color: "from-[#F14141]",
        borderColor: "border-[#F14141]",
        textColor: "text-[#F14141]",
      };
    } else {
      return {
        text: "Belum Lunas",
        color: "from-[#FFA500]",
        borderColor: "border-[#FFA500]",
        textColor: "text-[#FFA500]",
      };
    }
  };

  // ============== NEW PAYMENT FUNCTIONS ==============

  /**
   * Pay single bill via Midtrans
   */
  const handlePaySingleBill = async (billingId: string) => {
    if (!auth.auth.token) {
      toast.error("Anda harus login terlebih dahulu", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (!isSnapLoaded) {
      toast.error("Sistem pembayaran sedang dimuat, mohon tunggu...", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      setIsLoadingPayment(true);

      // Create payment via Midtrans
      const response = await BillingService.createPayment(
        billingId,
        auth.auth.token
      );

      const { token: snapToken, data } = response;

      // Show Midtrans Snap popup
      openSnap(snapToken, {
        onSuccess: (result) => {
          console.log("Payment success:", result);
          toast.success("Pembayaran berhasil!", {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
          });
          // Redirect to history page
          setTimeout(() => {
            navigation.push("/riwayat-tagihan");
          }, 1500);
        },
        onPending: (result) => {
          console.log("Payment pending:", result);
          toast.info("Pembayaran sedang diproses...", {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
          });
          setIsLoadingPayment(false);
        },
        onError: (result) => {
          console.error("Payment error:", result);
          toast.error("Pembayaran gagal, silakan coba lagi", {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
          });
          setIsLoadingPayment(false);
        },
        onClose: () => {
          console.log("Payment popup closed");
          setIsLoadingPayment(false);
        },
      });
    } catch (error: any) {
      console.error("Error creating payment:", error);
      toast.error(error.response?.data?.message || "Gagal membuat pembayaran", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      setIsLoadingPayment(false);
    }
  };

  /**
   * Pay single bill via Wallet
   */
  const handlePayWithWallet = async (billingId: string) => {
    if (!auth.auth.token) {
      toast.error("Anda harus login terlebih dahulu", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      setIsLoadingWalletPayment(true);

      await BillingService.paySingleBill(billingId, auth.auth.token);

      toast.success("Pembayaran dengan wallet berhasil!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      // Refresh unpaid bills
      await fetchUnpaidBills();
    } catch (error: any) {
      console.error("Error paying with wallet:", error);
      toast.error(
        error.response?.data?.message || "Pembayaran gagal, saldo tidak cukup?",
        {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        }
      );
    } finally {
      setIsLoadingWalletPayment(false);
    }
  };

  /**
   * Pay ALL unpaid bills via Midtrans
   */
  const handlePayAllBills = async () => {
    if (!auth.auth.token) {
      toast.error("Anda harus login terlebih dahulu", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (!isSnapLoaded) {
      toast.error("Sistem pembayaran sedang dimuat, mohon tunggu...", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (unpaidBills.length === 0) {
      toast.info("Tidak ada tagihan yang perlu dibayar", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      setIsLoadingPayAllPayment(true);

      // Create payment for all bills
      const response = await BillingService.createPaymentForAllBills(
        auth.auth.token
      );

      const { token: snapToken, data } = response;
      const summary = data.summary;

      console.log(
        `Membayar ${summary.totalBills} tagihan, total: Rp${summary.totalAmount}`
      );

      // Show Midtrans Snap popup
      openSnap(snapToken, {
        onSuccess: (result) => {
          console.log("Payment success:", result);
          toast.success(`Pembayaran ${summary.totalBills} tagihan berhasil!`, {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
          });
          // Redirect to history page
          setTimeout(() => {
            navigation.push("/riwayat-tagihan");
          }, 1500);
        },
        onPending: (result) => {
          console.log("Payment pending:", result);
          toast.info("Pembayaran sedang diproses...", {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
          });
          setIsLoadingPayAllPayment(false);
        },
        onError: (result) => {
          console.error("Payment error:", result);
          toast.error("Pembayaran gagal, silakan coba lagi", {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
          });
          setIsLoadingPayAllPayment(false);
        },
        onClose: () => {
          console.log("Payment popup closed");
          setIsLoadingPayAllPayment(false);
        },
      });
    } catch (error: any) {
      console.error("Error creating payment:", error);
      toast.error(error.response?.data?.message || "Gagal membuat pembayaran", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      setIsLoadingPayAllPayment(false);
    }
  };

  /**
   * Pay ALL unpaid bills via Wallet
   */
  const handlePayAllWithWallet = async () => {
    if (!auth.auth.token) {
      toast.error("Anda harus login terlebih dahulu", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (unpaidBills.length === 0) {
      toast.info("Tidak ada tagihan yang perlu dibayar", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      setIsLoadingWalletPayAll(true);

      const result = await BillingService.payAllBills(auth.auth.token);

      toast.success(
        `Berhasil membayar ${result.data.paidCount} tagihan dengan wallet!`,
        {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        }
      );

      // Refresh unpaid bills
      await fetchUnpaidBills();
    } catch (error: any) {
      console.error("Error paying all with wallet:", error);
      toast.error(
        error.response?.data?.message || "Pembayaran gagal, saldo tidak cukup?",
        {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        }
      );
    } finally {
      setIsLoadingWalletPayAll(false);
    }
  };

  // ============== OLD FUNCTION (Keep for wallet top-up) ==============

  const onCreateTopUp = () => {
    setIsLoadingPayment(true);
    API.post(
      `/midtrans/topup/${auth.auth.user?.id}`,
      {
        customerDetails: {
          userId: auth.auth.user?.id,
          firstName: auth.auth.user?.fullName.split(" ")[0],
          lastName: auth.auth.user?.fullName
            .split(" ")
            .slice(1, auth.auth.user.fullName.split(" ").length - 1)
            .join(" "),
          email: auth.auth.user?.email,
          phone: auth.auth.user?.phone,
        },
        paymentMethod: "QRIS",
        amount: 5000000,
      },
      { headers: { Authorization: auth.auth.token } }
    )
      .then((res) => {
        toast.success(`${res.data.message}`, {
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
        setIsLoadingPayment(false);
        if (res.data.redirectUrl) {
          navigation.push(res.data.redirectUrl);
        }
      })
      .catch((err) => {
        setIsLoadingPayment(false);
        toast.error(`${err.response.data.message}`, {
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
      });
  };

  const onDownloadPDF = () => {
    setIsLoadingPDF(true);
    // Simulasi download PDF - ganti dengan API call yang sebenarnya
    setTimeout(() => {
      // Contoh download PDF
      const link = document.createElement("a");
      link.href = "/path/to/invoice.pdf"; // Ganti dengan URL PDF yang sebenarnya
      link.download = "INV-2024-08-001.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsLoadingPDF(false);
      toast.success("PDF berhasil diunduh", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }, 2000);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 lg:gap-10 font-poppins relative z-0 ">
      {isLoadingData ? (
        <div className="w-full h-[400px] flex items-center justify-center bg-[#252525] rounded-[30px]">
          <div className="text-white/60 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl">Memuat data tagihan...</p>
          </div>
        </div>
      ) : unpaidBills.length === 0 ? (
        <div className="w-full h-[400px] flex items-center justify-center bg-[#252525] rounded-[30px]">
          <div className="text-white/60 text-center p-12">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-2xl mb-4 text-white font-semibold">
              Tidak Ada Tagihan
            </p>
            <p className="text-base mb-2">
              Anda tidak memiliki tagihan yang harus dibayar saat ini
            </p>
            <p className="text-sm">
              Tagihan akan muncul ketika sudah memasuki periode pembayaran atau
              ada tunggakan
            </p>
          </div>
        </div>
      ) : selectedBill ? (
        <>
          {/* bagian I */}
          <div className="w-full relative flex flex-col gap-5 md:gap-10 z-0 bg-[#252525] rounded-[30px] overflow-hidden shadow-[0px_16px_10px_rgba(0,0,0,0.25)]">
            {/* background bagian I*/}
            <div className="block w-full h-[40vh] md:h-[80vw] rounded-full bg-[#4952FE] blur-[150px] md:blur-[300px] absolute z-[-4] top-[70%] md:top-[90%] "></div>
            {/* background bagian I*/}
            <div className=" w-full flex justify-start">
              {/* logo */}
              <div className=" flex items-center gap-5 p-4 md:p-5 lg:p-7 bg-[#C6C9F4] rounded-tl-[30px] rounded-br-2xl shadow-[inset_14px_14px_8px_rgba(0,0,0,0.25)]">
                <div className="w-[60px] md:w-[120px] lg:w-[150px] relative">
                  <Image
                    src={"/assets/logo/tirtadaroy.png"}
                    alt="Tirta Daroy"
                    width={140}
                    height={0} // height bisa diabaikan, Next.js akan hitung otomatis
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex items-center ">
                  <div className="w-[30px] md:w-[50px] lg:w-[70px] relative">
                    <Image
                      src={"/assets/logo/Aqualink_2.png"}
                      alt="Tirta Daroy"
                      width={140}
                      height={0} // height bisa diabaikan, Next.js akan hitung otomatis
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className=" flex flex-col items-start text-[#1A1D6D] ">
                    <h1 className="font-nasalization font-bold text-[8px] md:text-sm lg:text-base">
                      FLOWIN
                    </h1>
                    <h1 className="font-montserrat font-normal text-[6px] md:text-[10px] lg:text-xs -mt-1">
                      Water Management
                    </h1>
                  </div>
                </div>
              </div>
              {/* logo */}
            </div>
            <div className=" w-full flex flex-col gap-10 p-5 md:p-7 lg:pt-0">
              {/* Header */}
              <div className="w-full flex justify-between items-start">
                <div className=" flex flex-col items-start gap-1 md:gap-2">
                  <h1 className=" text-white font-montserrat font-bold text-lg md:text-3xl lg:text-4xl">
                    {selectedBill._id.slice(0, 15).toUpperCase()}
                  </h1>
                  <h1 className=" text-white/50 font-montserrat font-medium text-xs md:text-base lg:text-lg">
                    PERUMDAM Tirta Daroy
                  </h1>
                  <h1 className=" text-white/50 font-montserrat font-medium text-xs md:text-base lg:text-lg -mt-2">
                    tirtadaroy@gmail.com
                  </h1>
                </div>
                <div className=" flex flex-col items-end gap-3">
                  <h1
                    className={`font-montserrat text-[10px] md:text-sm font-medium py-1 px-4 md:px-7 bg-gradient-to-l ${
                      getStatusBadge(selectedBill).color
                    } via-transparent to-transparent ${
                      getStatusBadge(selectedBill).textColor
                    } rounded-full border ${
                      getStatusBadge(selectedBill).borderColor
                    }`}
                  >
                    {getStatusBadge(selectedBill).text}
                  </h1>
                  <h1 className=" text-white font-montserrat font-bold text-lg md:text-3xl lg:text-4xl">
                    {formatToIDR(
                      selectedBill.isOverdue
                        ? selectedBill.totalWithDenda
                        : selectedBill.totalTagihan
                    )}
                  </h1>
                  {selectedBill.isOverdue && selectedBill.denda > 0 && (
                    <p className="text-[#F14141] text-xs md:text-sm font-medium">
                      Termasuk denda: {formatToIDR(selectedBill.denda)}
                    </p>
                  )}
                </div>
              </div>
              {/* Header */}

              {/* tgl, tempo, metode pembayaran */}
              <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 font-montserrat">
                <div className="w-full flex flex-col items-center md:flex-row md:items-start lg:items-center justify-start gap-2 md:gap-3 lg:gap-5">
                  <CalendarMonthIcon sx={{ color: "white" }} />
                  <div className="flex flex-col">
                    <h1 className="text-xs md:text-base text-[#C7C7C7] font-medium text-center md:text-left">
                      Tanggal Tagihan
                    </h1>
                    <h1 className="text-sm md:text-lg lg:text-xl text-white font-semibold text-center md:text-left">
                      {formatDate(selectedBill.createdAt)}
                    </h1>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center md:flex-row md:items-start lg:items-center justify-start gap-2 md:gap-3 lg:gap-5">
                  <AccessTimeIcon sx={{ color: "white" }} />
                  <div className="flex flex-col">
                    <h1 className="text-xs md:text-base text-[#C7C7C7] font-medium text-center md:text-left">
                      Jatuh Tempo
                    </h1>
                    <h1 className="text-sm md:text-lg lg:text-xl text-white font-semibold text-center md:text-left">
                      {formatDate(selectedBill.dueDate)}
                    </h1>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center md:flex-row md:items-start lg:items-center justify-start gap-2 md:gap-3 lg:gap-5">
                  <CreditCardIcon sx={{ color: "white" }} />
                  <div className="flex flex-col">
                    <h1 className="text-xs md:text-base text-[#C7C7C7] font-medium text-center md:text-left">
                      Metode Pembayaran
                    </h1>
                    <h1 className="text-sm md:text-lg lg:text-xl text-white font-semibold text-center md:text-left">
                      {selectedBill.paymentMethod || "Belum Memilih"}
                    </h1>
                  </div>
                </div>
              </div>
              {/* tgl, tempo, metode pembayaran */}

              {/* Call To Action */}
              <div className=" flex flex-col md:flex-row items-center justify-between md:justify-start gap-3 md:gap-5 font-montserrat">
                <button
                  onClick={onDownloadPDF}
                  disabled={
                    isLoadingPDF ||
                    isLoadingPayment ||
                    isLoadingWalletPayment ||
                    selectedBill.isPaid
                  }
                  className={`justify-center w-full md:w-auto py-2 md:py-3 lg:py-4 md:px-5 rounded-lg border border-white flex items-center gap-2 duration-300 bg-gradient-to-r from-[#F14141] to-transparent ${
                    isLoadingPDF ||
                    isLoadingPayment ||
                    isLoadingWalletPayment ||
                    selectedBill.isPaid
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:-translate-y-1"
                  }`}
                >
                  {isLoadingPDF ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    <FileDownloadOutlinedIcon sx={{ color: "white" }} />
                  )}
                  <h1 className=" text-white font-bold text-sm md:text-base">
                    {isLoadingPDF ? "Mengunduh..." : "Unduh PDF"}
                  </h1>
                </button>

                <button
                  onClick={() => handlePaySingleBill(selectedBill._id)}
                  disabled={
                    isLoadingPayment ||
                    isLoadingPDF ||
                    isLoadingWalletPayment ||
                    selectedBill.isPaid ||
                    !isSnapLoaded
                  }
                  className={`w-full justify-center md:w-auto py-2 md:py-3 lg:py-4 md:px-10 rounded-lg border border-white flex items-center gap-2 duration-300 bg-gradient-to-r from-[#414BF1] to-transparent ${
                    isLoadingPayment ||
                    isLoadingPDF ||
                    isLoadingWalletPayment ||
                    selectedBill.isPaid ||
                    !isSnapLoaded
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:-translate-y-1"
                  }`}
                >
                  {isLoadingPayment ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    <CreditCardIcon sx={{ color: "white" }} />
                  )}
                  <h1 className=" text-white font-bold text-sm md:text-base">
                    {isLoadingPayment
                      ? "Memproses..."
                      : selectedBill.isPaid
                      ? "Sudah Lunas"
                      : !isSnapLoaded
                      ? "Loading..."
                      : "Bayar via Midtrans"}
                  </h1>
                </button>

                <button
                  onClick={() => handlePayWithWallet(selectedBill._id)}
                  disabled={
                    isLoadingWalletPayment ||
                    isLoadingPDF ||
                    isLoadingPayment ||
                    selectedBill.isPaid
                  }
                  className={`w-full justify-center md:w-auto py-2 md:py-3 lg:py-4 md:px-10 rounded-lg border border-white flex items-center gap-2 duration-300 bg-gradient-to-r from-[#0EC585] to-transparent ${
                    isLoadingWalletPayment ||
                    isLoadingPDF ||
                    isLoadingPayment ||
                    selectedBill.isPaid
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:-translate-y-1"
                  }`}
                >
                  {isLoadingWalletPayment ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    <AccountBalanceWalletIcon sx={{ color: "white" }} />
                  )}
                  <h1 className=" text-white font-bold text-sm md:text-base">
                    {isLoadingWalletPayment
                      ? "Memproses..."
                      : selectedBill.isPaid
                      ? "Sudah Lunas"
                      : "Bayar dengan Wallet"}
                  </h1>
                </button>
              </div>
              {/* Call To Action */}

              {/* Pay All Bills Section */}
              {unpaidBills.length > 1 && (
                <div className="w-full flex flex-col gap-3 p-4 bg-white/5 rounded-lg border border-white/20">
                  <h2 className="text-white font-bold text-base md:text-lg">
                    Bayar Semua Tagihan ({unpaidBills.length} tagihan)
                  </h2>
                  <div className="flex flex-col md:flex-row gap-3">
                    <button
                      onClick={handlePayAllBills}
                      disabled={isLoadingPayAllPayment || !isSnapLoaded}
                      className={`w-full justify-center py-2 md:py-3 px-6 rounded-lg border border-white flex items-center gap-2 duration-300 bg-gradient-to-r from-[#414BF1] to-transparent ${
                        isLoadingPayAllPayment || !isSnapLoaded
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:-translate-y-1"
                      }`}
                    >
                      {isLoadingPayAllPayment ? (
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      ) : (
                        <CreditCardIcon sx={{ color: "white" }} />
                      )}
                      <h1 className="text-white font-bold text-sm md:text-base">
                        {isLoadingPayAllPayment
                          ? "Memproses..."
                          : !isSnapLoaded
                          ? "Loading..."
                          : "Bayar Semua via Midtrans"}
                      </h1>
                    </button>
                    <button
                      onClick={handlePayAllWithWallet}
                      disabled={isLoadingWalletPayAll}
                      className={`w-full justify-center py-2 md:py-3 px-6 rounded-lg border border-white flex items-center gap-2 duration-300 bg-gradient-to-r from-[#0EC585] to-transparent ${
                        isLoadingWalletPayAll
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:-translate-y-1"
                      }`}
                    >
                      {isLoadingWalletPayAll ? (
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      ) : (
                        <AccountBalanceWalletIcon sx={{ color: "white" }} />
                      )}
                      <h1 className="text-white font-bold text-sm md:text-base">
                        {isLoadingWalletPayAll
                          ? "Memproses..."
                          : "Bayar Semua dengan Wallet"}
                      </h1>
                    </button>
                  </div>
                </div>
              )}
              {/* Pay All Bills Section */}
            </div>
          </div>
          {/* bagian I */}
          {/* Bagian II */}
          <div className="w-full h-auto lg:h-[600px] rounded-[30px] relative z-0 flex flex-col justify-between items-center bg-[#212347] text-white font-montserrat overflow-hidden gap-10 shadow-[0px_16px_10px_rgba(0,0,0,0.25)]">
            <div className="block w-full h-[40vh] md:h-[80vw] rounded-full bg-gradient-to-b from-[#494C7E] via-[#494C7E] to-[#242987] blur-[150px] md:blur-[300px] absolute z-[-5] top-[60%] md:top-[80%] "></div>
            {/* background */}
            <div className="absolute z-[-2] w-full h-[54%] lg:h-[60%] rounded-[30px] bg-gradient-to-r from-[#DAD3D3] to-[#12175D] shadow-[0px_15px_10px_rgba(0,0,0,0.25)]"></div>
            {/* background */}
            {/* bagian atas */}
            <div className="w-full rounded-[30px] h-auto lg:h-[55%] bg-[#252525] relative z-0 p-5 py-8 lg:py-0 lg:px-10 overflow-hidden shadow-[0px_15px_10px_rgba(0,0,0,0.25)]">
              <div className="block w-full h-[40vh] md:h-[80vw] rounded-full bg-[#4952FE] blur-[150px] md:blur-[300px] absolute z-[-1] lg:z-[1] bottom-[60%] md:bottom-[80%] "></div>
              <h1 className=" font-bold text-xl text-center lg:text-left lg:text-3xl lg:absolute z-[2] top-[9%] mb-5 lg:mb-0 lg:pl-4 text-white drop-shadow-[0px_0px_15px_rgba(255,255,255,0.8)]">
                Rincian tagihan
              </h1>
              <div className=" w-full h-full grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-10">
                <div className="w-full h-full lg:bg-gradient-to-t from-[#414BF1]/40 to-transparent flex flex-col justify-start lg:justify-center items-center gap-1 lg:gap-8">
                  <h1 className=" lg:py-1 lg:px-6 rounded-full lg:border border-[#9899AF] text-base lg:text-xl font-bold">
                    Penggunaan
                  </h1>
                  <h1 className="  text-sm lg:text-xl font-medium text-center">
                    {selectedBill.totalPemakaian.toFixed(2)} Liter
                  </h1>
                </div>
                <div className="w-full h-full lg:bg-gradient-to-t from-[#414BF1]/40 to-transparent flex flex-col justify-start lg:justify-center items-center gap-1 lg:gap-8">
                  <h1 className=" lg:py-1 lg:px-6 rounded-full lg:border border-[#9899AF] text-base lg:text-xl font-bold">
                    Periode
                  </h1>
                  <h1 className="  text-sm lg:text-xl font-medium text-center">
                    {selectedBill.periode}
                  </h1>
                </div>
                <div className="w-full h-full lg:bg-gradient-to-t from-[#414BF1]/40 to-transparent flex flex-col justify-start lg:justify-center items-center gap-1 lg:gap-8">
                  <h1 className=" lg:py-1 lg:px-6 rounded-full lg:border border-[#9899AF] text-base lg:text-xl font-bold">
                    Biaya
                  </h1>
                  <h1 className="  text-sm lg:text-xl font-medium text-center">
                    Air: {formatToIDR(selectedBill.biayaAir)}
                    <br />
                    Beban: {formatToIDR(selectedBill.biayaBeban)}
                  </h1>
                </div>
                <div className="w-full h-full lg:bg-gradient-to-t from-[#414BF1]/40 to-transparent flex flex-col justify-start lg:justify-center items-center gap-1 lg:gap-8">
                  <h1 className=" lg:py-1 lg:px-6 rounded-full lg:border border-[#9899AF] text-base lg:text-xl font-bold">
                    Total Tagihan
                  </h1>
                  <h1 className="  text-sm lg:text-xl font-medium text-center">
                    {formatToIDR(
                      selectedBill.isOverdue
                        ? selectedBill.totalWithDenda
                        : selectedBill.totalTagihan
                    )}
                  </h1>
                </div>
              </div>
            </div>
            {/* bagian atas */}
            {/* bagian bawah */}
            <div className="w-full p-5 lg:p-10 relative z-0 flex flex-col gap-3 md:gap-0 md:flex-row items-start md:items-end md:justify-between">
              <div className=" flex flex-col items-start gap-3 lg:gap-5">
                <h1 className="font-bold text-xl md:whitespace-nowrap text-center w-full md:w-auto md:text-left lg:text-3xl  text-white drop-shadow-[0px_0px_15px_rgba(255,255,255,0.8)]">
                  Informasi Tambahan
                </h1>
                <h1 className="font-semibold text-lg lg:text-2xl top-[9%]  text-white ">
                  Alamat Penagihan
                </h1>
                <p className="-mt-2 lg:-mt-4 text-xs lg:text-base text-white/60  font-medium text-left md:max-w-xs lg:max-w-lg">
                  Kota Baru, Kec. Kuta Alam, Kota Banda Aceh, Aceh
                </p>
              </div>
              <p className="text-[10px] md:text-sm lg:text-base md:max-w-xs lg:max-w-lg text-left md:text-right text-white/60 font-medium">
                Terima kasih atas kepercayaan Anda menggunakan layanan kami.
                Untuk pertanyaan terkait tagihan ini, silakan hubungi tim
                support kami.
              </p>
            </div>
            {/* bagian bawah */}
          </div>
          {/* Bagian II */}
        </>
      ) : null}
    </div>
  );
};

export default PembayaranPage;
