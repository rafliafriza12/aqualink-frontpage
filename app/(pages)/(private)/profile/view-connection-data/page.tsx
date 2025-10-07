"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import CircleBackground from "@/app/components/svg/CircleBackground";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { useGetMyConnectionData } from "@/app/services/connectionData/connectionData.mutation";
import { useAuth } from "@/app/hooks/UseAuth";
import {
  ArrowBack,
  CheckCircle,
  HourglassEmpty,
  Description,
  Home,
  LocationOn,
  Article,
  SquareFoot,
  Close,
  ZoomIn,
  ZoomOut,
  ZoomOutMap,
} from "@mui/icons-material";
import { Modal, Fade } from "@mui/material";

interface ConnectionData {
  _id: string;
  userId: any;
  nik: string;
  nikUrl: string;
  noKK: string;
  kkUrl: string;
  alamat: string;
  kecamatan: string;
  kelurahan: string;
  noImb: string;
  imbUrl: string;
  luasBangunan: number;
  isVerifiedByData: boolean;
  isVerifiedByTechnician: boolean;
  surveiId: any;
  rabConnectionId: any;
  isAllProcedureDone: boolean;
  createdAt: string;
  updatedAt: string;
}

const ViewConnectionDataPage = () => {
  const router = useRouter();
  const auth = useAuth();
  const getConnectionMutation = useGetMyConnectionData();
  const [connectionData, setConnectionData] = useState<ConnectionData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [openPdfModal, setOpenPdfModal] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");
  const [currentPdfTitle, setCurrentPdfTitle] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getConnectionMutation.mutateAsync();
        if (result?.data) {
          setConnectionData(result.data);
        }
      } catch (error: any) {
        console.error("Error fetching connection data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getVerificationStatus = () => {
    if (!connectionData) return null;

    if (connectionData.isAllProcedureDone) {
      return {
        text: "Semua Proses Selesai",
        color: "text-green-500",
        bgColor: "bg-green-500/20",
        borderColor: "border-green-500",
        icon: <CheckCircle sx={{ color: "#10b981" }} />,
      };
    }

    if (connectionData.isVerifiedByTechnician) {
      return {
        text: "Terverifikasi oleh Teknisi",
        color: "text-blue-500",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500",
        icon: <CheckCircle sx={{ color: "#3b82f6" }} />,
      };
    }

    if (connectionData.isVerifiedByData) {
      return {
        text: "Terverifikasi oleh Admin",
        color: "text-blue-500",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500",
        icon: <CheckCircle sx={{ color: "#3b82f6" }} />,
      };
    }

    return {
      text: "Menunggu Verifikasi",
      color: "text-orange-500",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500",
      icon: <HourglassEmpty sx={{ color: "#f97316" }} />,
    };
  };

  const handleOpenDocument = async (url: string, title: string) => {
    setPdfLoading(true);
    setPdfError("");
    setCurrentPdfTitle(title);
    setOpenPdfModal(true);

    try {
      // Fetch the image directly (all files are now converted to images)
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to load document: ${response.statusText}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setCurrentPdfUrl(blobUrl);
    } catch (error: any) {
      console.error("Error loading document:", error);
      setPdfError(error.message || "Gagal memuat dokumen");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleClosePdfModal = () => {
    setOpenPdfModal(false);
    // Revoke the blob URL to free memory
    if (currentPdfUrl) {
      URL.revokeObjectURL(currentPdfUrl);
    }
    setCurrentPdfUrl("");
    setCurrentPdfTitle("");
    setPdfError("");
    setZoomLevel(100); // Reset zoom level
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 300)); // Max 300%
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50)); // Min 50%
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        // Scroll up = zoom in
        setZoomLevel((prev) => Math.min(prev + 10, 300));
      } else {
        // Scroll down = zoom out
        setZoomLevel((prev) => Math.max(prev - 10, 50));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center ">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#2835FF] border-t-transparent rounded-full animate-spin" />
          <p className="text-white font-poppins">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!connectionData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center ">
        <div className="flex flex-col items-center gap-4 px-6">
          <Description sx={{ fontSize: 64, color: "#6b7280" }} />
          <p className="text-gray-400 font-poppins text-center">
            Data aktivasi koneksi tidak ditemukan
          </p>
          <button
            onClick={() => router.push("/profile")}
            className="mt-4 px-6 py-2 bg-[#2835FF] text-white rounded-lg font-poppins"
          >
            Kembali ke Profile
          </button>
        </div>
      </div>
    );
  }

  const verificationStatus = getVerificationStatus();

  return (
    <div className="w-full flex flex-col font-inter relative z-0 min-h-screen overflow-hidden ">
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

      <div className="w-full flex flex-col gap-6 py-[18.4px] px-5">
        {/* Header */}
        <HeaderMobile mode="normal" />

        {/* Page Title */}
        <div className=" items-center gap-3 hidden lg:flex">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full bg-[#202226] hover:bg-[#2a2d33] transition-colors"
          >
            <ArrowBack sx={{ color: "white" }} />
          </button>
          <h1 className="font-poppins font-bold text-2xl text-[#202226]">
            Detail Data Aktivasi
          </h1>
        </div>

        {/* Verification Status Card */}
        {verificationStatus && (
          <div
            className={`w-full rounded-[24px] ${verificationStatus.bgColor} border-2 ${verificationStatus.borderColor} flex items-center gap-3 px-4 py-3`}
          >
            {verificationStatus.icon}
            <div className="flex flex-col flex-1">
              <h2
                className={`font-poppins font-semibold text-sm ${verificationStatus.color}`}
              >
                {verificationStatus.text}
              </h2>
              <p className={`text-xs ${verificationStatus.color}/70 mt-1`}>
                Dikirim pada {formatDate(connectionData.createdAt)}
              </p>
            </div>
          </div>
        )}

        {/* Data Section */}
        <div className="w-full flex flex-col gap-4">
          {/* NIK */}
          <div className="w-full bg-[#202226] rounded-[20px] p-4">
            <div className="flex items-start gap-3">
              <Article sx={{ color: "#5F68FE", fontSize: 28 }} />
              <div className="flex-1">
                <h3 className="font-poppins font-semibold text-sm text-white/70 mb-1">
                  NIK
                </h3>
                <p className="font-poppins font-bold text-lg text-white mb-2">
                  {connectionData.nik}
                </p>
                <button
                  onClick={() =>
                    handleOpenDocument(connectionData.nikUrl, "Dokumen NIK")
                  }
                  className="text-[#5F68FE] text-sm font-poppins underline hover:text-[#4a52d9] transition-colors"
                >
                  Lihat Dokumen →
                </button>
              </div>
            </div>
          </div>

          {/* No KK */}
          <div className="w-full bg-[#202226] rounded-[20px] p-4">
            <div className="flex items-start gap-3">
              <Home sx={{ color: "#5F68FE", fontSize: 28 }} />
              <div className="flex-1">
                <h3 className="font-poppins font-semibold text-sm text-white/70 mb-1">
                  Nomor Kartu Keluarga
                </h3>
                <p className="font-poppins font-bold text-lg text-white mb-2">
                  {connectionData.noKK}
                </p>
                <button
                  onClick={() =>
                    handleOpenDocument(
                      connectionData.kkUrl,
                      "Dokumen Kartu Keluarga"
                    )
                  }
                  className="text-[#5F68FE] text-sm font-poppins underline hover:text-[#4a52d9] transition-colors"
                >
                  Lihat Dokumen →
                </button>
              </div>
            </div>
          </div>

          {/* Alamat */}
          <div className="w-full bg-[#202226] rounded-[20px] p-4">
            <div className="flex items-start gap-3">
              <LocationOn sx={{ color: "#5F68FE", fontSize: 28 }} />
              <div className="flex-1">
                <h3 className="font-poppins font-semibold text-sm text-white/70 mb-1">
                  Alamat Lengkap
                </h3>
                <p className="font-poppins text-base text-white leading-relaxed">
                  {connectionData.alamat}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#2835FF]/20 text-[#5F68FE] text-xs rounded-full font-poppins">
                    Kelurahan: {connectionData.kelurahan}
                  </span>
                  <span className="px-3 py-1 bg-[#2835FF]/20 text-[#5F68FE] text-xs rounded-full font-poppins">
                    Kecamatan: {connectionData.kecamatan}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* No IMB */}
          <div className="w-full bg-[#202226] rounded-[20px] p-4">
            <div className="flex items-start gap-3">
              <Description sx={{ color: "#5F68FE", fontSize: 28 }} />
              <div className="flex-1">
                <h3 className="font-poppins font-semibold text-sm text-white/70 mb-1">
                  Nomor IMB
                </h3>
                <p className="font-poppins font-bold text-lg text-white mb-2">
                  {connectionData.noImb}
                </p>
                <button
                  onClick={() =>
                    handleOpenDocument(connectionData.imbUrl, "Dokumen IMB")
                  }
                  className="text-[#5F68FE] text-sm font-poppins underline hover:text-[#4a52d9] transition-colors"
                >
                  Lihat Dokumen →
                </button>
              </div>
            </div>
          </div>

          {/* Luas Bangunan */}
          <div className="w-full bg-[#202226] rounded-[20px] p-4">
            <div className="flex items-start gap-3">
              <SquareFoot sx={{ color: "#5F68FE", fontSize: 28 }} />
              <div className="flex-1">
                <h3 className="font-poppins font-semibold text-sm text-white/70 mb-1">
                  Luas Bangunan
                </h3>
                <p className="font-poppins font-bold text-lg text-white">
                  {connectionData.luasBangunan} m²
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Progress */}
        <div className="w-full bg-[#202226] rounded-[20px] p-4">
          <h3 className="font-poppins font-semibold text-base text-white mb-4">
            Status Verifikasi
          </h3>
          <div className="flex flex-col gap-3">
            {/* Admin Verification */}
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  connectionData.isVerifiedByData
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              >
                {connectionData.isVerifiedByData && (
                  <CheckCircle sx={{ fontSize: 16, color: "white" }} />
                )}
              </div>
              <span
                className={`font-poppins text-sm ${
                  connectionData.isVerifiedByData
                    ? "text-white"
                    : "text-gray-400"
                }`}
              >
                Verifikasi Data oleh Admin
              </span>
            </div>

            {/* Technician Verification */}
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  connectionData.isVerifiedByTechnician
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              >
                {connectionData.isVerifiedByTechnician && (
                  <CheckCircle sx={{ fontSize: 16, color: "white" }} />
                )}
              </div>
              <span
                className={`font-poppins text-sm ${
                  connectionData.isVerifiedByTechnician
                    ? "text-white"
                    : "text-gray-400"
                }`}
              >
                Verifikasi oleh Teknisi
              </span>
            </div>

            {/* All Procedure Done */}
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  connectionData.isAllProcedureDone
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              >
                {connectionData.isAllProcedureDone && (
                  <CheckCircle sx={{ fontSize: 16, color: "white" }} />
                )}
              </div>
              <span
                className={`font-poppins text-sm ${
                  connectionData.isAllProcedureDone
                    ? "text-white"
                    : "text-gray-400"
                }`}
              >
                Semua Prosedur Selesai
              </span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/profile")}
          className="w-full h-[54px] rounded-[24px] bg-[#202226] border-2 border-[#2835FF] flex items-center justify-center font-poppins font-semibold text-white hover:bg-[#2a2d33] transition-colors"
        >
          Kembali ke Profile
        </button>
      </div>

      {/* PDF Viewer Modal */}
      <Modal
        open={openPdfModal}
        onClose={handleClosePdfModal}
        closeAfterTransition
        aria-labelledby="pdf-viewer-modal"
      >
        <Fade in={openPdfModal}>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div
              className="absolute inset-0 bg-black/80"
              onClick={handleClosePdfModal}
            />
            <div className="relative bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#202226] border-b border-gray-700">
                <h2 className="font-poppins font-semibold text-lg text-white">
                  {currentPdfTitle}
                </h2>
                <div className="flex items-center gap-2">
                  {/* Zoom Controls */}
                  {!pdfLoading && !pdfError && currentPdfUrl && (
                    <div className="flex items-center gap-2 mr-4 bg-[#2A2D31] rounded-lg px-3 py-1">
                      <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 50}
                        className="p-1 rounded hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Zoom Out"
                      >
                        <ZoomOut sx={{ color: "white", fontSize: 20 }} />
                      </button>
                      <span className="text-white text-sm font-mono min-w-[50px] text-center">
                        {zoomLevel}%
                      </span>
                      <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 300}
                        className="p-1 rounded hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Zoom In"
                      >
                        <ZoomIn sx={{ color: "white", fontSize: 20 }} />
                      </button>
                      <div className="w-px h-5 bg-gray-600 mx-1" />
                      <button
                        onClick={handleResetZoom}
                        className="p-1 rounded hover:bg-gray-700 transition-colors"
                        title="Reset Zoom"
                      >
                        <ZoomOutMap sx={{ color: "white", fontSize: 20 }} />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={handleClosePdfModal}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <Close sx={{ color: "white" }} />
                  </button>
                </div>
              </div>

              {/* Document Viewer */}
              <div
                className="flex-1 overflow-auto bg-gray-900"
                onWheel={handleWheel}
                style={{ cursor: zoomLevel > 100 ? "grab" : "default" }}
              >
                {pdfLoading && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-[#2835FF] border-t-transparent rounded-full animate-spin" />
                      <p className="text-white font-poppins">
                        Memuat dokumen...
                      </p>
                    </div>
                  </div>
                )}
                {pdfError && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 px-6">
                      <Description sx={{ fontSize: 64, color: "#ef4444" }} />
                      <p className="text-red-500 font-poppins text-center">
                        {pdfError}
                      </p>
                      <button
                        onClick={handleClosePdfModal}
                        className="px-6 py-2 bg-[#2835FF] text-white rounded-lg font-poppins"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                )}
                {!pdfLoading && !pdfError && currentPdfUrl && (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={currentPdfUrl}
                      alt={currentPdfTitle}
                      style={{
                        width: `${zoomLevel}%`,
                        height: "auto",
                        transition: "width 0.2s ease-in-out",
                      }}
                      className="object-contain select-none"
                      draggable={false}
                    />
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#202226] border-t border-gray-700">
                {!pdfLoading && !pdfError && currentPdfUrl ? (
                  <div className="flex flex-col gap-1">
                    <a
                      href={currentPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5F68FE] text-sm font-poppins hover:text-[#4a52d9] transition-colors"
                    >
                      Buka di Tab Baru →
                    </a>
                    <p className="text-gray-400 text-xs">
                      💡 Tips: Gunakan Ctrl + Scroll untuk zoom
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
                <button
                  onClick={handleClosePdfModal}
                  className="px-6 py-2 bg-[#5F68FE] text-white rounded-lg font-poppins hover:bg-[#4a52d9] transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ViewConnectionDataPage;
