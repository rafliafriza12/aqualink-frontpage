"use client";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CircularProgress from "@mui/material/CircularProgress";
import { formatToIDR } from "@/app/utils/helper";
import Image from "next/image";
import API from "@/app/utils/API";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/UseAuth";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const PembayaranPage: React.FC = () => {
  const [isLoadingPayment, setIsLoadingPayment] = useState<boolean>(false);
  const [isLoadingPDF, setIsLoadingPDF] = useState<boolean>(false);
  const navigation = useRouter();
  const auth = useAuth();
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
                INV-2024-08-001
              </h1>
              <h1 className=" text-white/50 font-montserrat font-medium text-xs md:text-base lg:text-lg">
                PERUMDAM Tirta Daroy
              </h1>
              <h1 className=" text-white/50 font-montserrat font-medium text-xs md:text-base lg:text-lg -mt-2">
                tirtadaroy@gmail.com
              </h1>
            </div>
            <div className=" flex flex-col items-end gap-3">
              <h1 className="  font-montserrat text-[10px] md:text-sm font-medium py-1 px-4 md:px-7 bg-gradient-to-l from-[#0EC585] via-transparent to-transparent text-[#0EC585] rounded-full border border-[#0EC585]">
                Lunas
              </h1>
              <h1 className=" text-white font-montserrat font-bold text-lg md:text-3xl lg:text-4xl">
                {formatToIDR(126000)}
              </h1>
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
                  1 September 2025
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
                  3 September 2025
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
                  Belum Memilih
                </h1>
              </div>
            </div>
          </div>
          {/* tgl, tempo, metode pembayaran */}

          {/* Call To Action */}
          <div className=" flex items-center justify-between md:justify-start gap-5 font-montserrat">
            <button
              onClick={onDownloadPDF}
              disabled={isLoadingPDF || isLoadingPayment}
              className={`justify-center w-[48%] md:w-auto py-2 md:py-3 lg:py-4 md:px-5 rounded-lg border border-white flex items-center gap-2 duration-300 bg-gradient-to-r from-[#F14141] to-transparent ${
                isLoadingPDF || isLoadingPayment
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
              onClick={() => onCreateTopUp()}
              disabled={isLoadingPayment || isLoadingPDF}
              className={`w-[48%] justify-center md:w-auto py-2 md:py-3 lg:py-4 md:px-10 rounded-lg border border-white flex items-center gap-2 duration-300 bg-gradient-to-r from-[#414BF1] to-transparent ${
                isLoadingPayment || isLoadingPDF
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
                {isLoadingPayment ? "Memproses..." : "Bayar"}
              </h1>
            </button>
          </div>
          {/* Call To Action */}
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
                10.400 Liter
              </h1>
            </div>
            <div className="w-full h-full lg:bg-gradient-to-t from-[#414BF1]/40 to-transparent flex flex-col justify-start lg:justify-center items-center gap-1 lg:gap-8">
              <h1 className=" lg:py-1 lg:px-6 rounded-full lg:border border-[#9899AF] text-base lg:text-xl font-bold">
                Peroide
              </h1>
              <h1 className="  text-sm lg:text-xl font-medium text-center">
                2 Sep - 2 Okt 2025
              </h1>
            </div>
            <div className="w-full h-full lg:bg-gradient-to-t from-[#414BF1]/40 to-transparent flex flex-col justify-start lg:justify-center items-center gap-1 lg:gap-8">
              <h1 className=" lg:py-1 lg:px-6 rounded-full lg:border border-[#9899AF] text-base lg:text-xl font-bold">
                Harga
              </h1>
              <h1 className="  text-sm lg:text-xl font-medium text-center">
                5.500 / 1000 Liter
              </h1>
            </div>
            <div className="w-full h-full lg:bg-gradient-to-t from-[#414BF1]/40 to-transparent flex flex-col justify-start lg:justify-center items-center gap-1 lg:gap-8">
              <h1 className=" lg:py-1 lg:px-6 rounded-full lg:border border-[#9899AF] text-base lg:text-xl font-bold">
                Total Tagihan
              </h1>
              <h1 className="  text-sm lg:text-xl font-medium text-center">
                {formatToIDR(53600)}
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
            Terima kasih atas kepercayaan Anda menggunakan layanan kami. Untuk
            pertanyaan terkait tagihan ini, silakan hubungi tim support kami.
          </p>
        </div>
        {/* bagian bawah */}
      </div>
      {/* Bagian II */}
    </div>
  );
};

export default PembayaranPage;
