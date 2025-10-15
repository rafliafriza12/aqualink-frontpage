"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import CircleBackground from "@/app/components/svg/CircleBackground";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { useGetUserProfile } from "@/app/services/user/user.mutation";
import { useAuth } from "@/app/hooks/UseAuth";
import {
  ArrowBack,
  WaterDrop,
  CheckCircle,
  Info,
  Speed,
  CalendarToday,
  BluetoothConnected,
  BluetoothDisabled,
  LinkOff,
  ContentCopy,
} from "@mui/icons-material";

const IotConnectionPage = () => {
  const router = useRouter();
  const auth = useAuth();
  const profileMutation = useGetUserProfile();
  const [meteranData, setMeteranData] = useState<any>(null);
  const [iotConnection, setIotConnection] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [meteranId, setMeteranId] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch user profile for meteran data
      const result = await profileMutation.mutateAsync();
      console.log(result);
      if (result?.data?.user?.meteranId) {
        setMeteranData(result.data.user.meteranId);
        setMeteranId(
          result.data.user.meteranId._id || result.data.user.meteranId
        );
      }

      if (result?.data?.user?._id) {
        setUserId(result.data.user._id);
      }

      // Fetch IoT connection status
      const token = auth.auth.token;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/iot/connection-status`,
        {
          headers: {
            Authorization: token || "",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          setIsConnected(data.data.isConnected);
          setIotConnection(data.data.connection);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} berhasil dicopy!`);
  };

  const handleDisconnect = async () => {
    if (
      !confirm("Apakah Anda yakin ingin memutus koneksi dengan device IoT?")
    ) {
      return;
    }

    setIsDisconnecting(true);

    try {
      const token = auth.auth.token;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/iot/disconnect`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token || "",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Device IoT berhasil diputus koneksinya");
        fetchData(); // Refresh data
      } else {
        alert(data.message || "Gagal memutus koneksi");
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
      alert("Terjadi kesalahan saat memutus koneksi");
    } finally {
      setIsDisconnecting(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
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

          {profileMutation.isPending ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : meteranData ? (
            <>
              {/* IoT Connection Status Card */}
              <div
                className={`${
                  isConnected
                    ? "bg-gradient-to-br from-[#2835FF] to-[#5F68FE]"
                    : "bg-[#202226] border border-gray-700"
                } rounded-3xl p-6 mb-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-white font-bold text-2xl">
                    Status Koneksi IoT
                  </h1>
                  {isConnected ? (
                    <BluetoothConnected
                      className="text-green-400"
                      fontSize="large"
                    />
                  ) : (
                    <BluetoothDisabled
                      className="text-gray-400"
                      fontSize="large"
                    />
                  )}
                </div>

                {isConnected && iotConnection ? (
                  <>
                    <p className="text-white/80 text-sm mb-4">
                      Device IoT Anda telah terhubung dan aktif
                    </p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-sm">
                            Device ID
                          </span>
                          <span className="text-white font-bold text-sm">
                            {iotConnection.deviceId || "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-sm">Status</span>
                          <span className="text-green-400 font-bold text-sm">
                            {iotConnection.status === "connected"
                              ? "Terhubung"
                              : iotConnection.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-sm">
                            Terakhir Sync
                          </span>
                          <span className="text-white font-bold text-sm">
                            {iotConnection.lastSync
                              ? new Date(iotConnection.lastSync).toLocaleString(
                                  "id-ID"
                                )
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleDisconnect}
                      disabled={isDisconnecting}
                      className="w-full bg-red-500/20 border border-red-500 text-red-400 py-3 rounded-xl font-semibold hover:bg-red-500/30 transition flex items-center justify-center gap-2"
                    >
                      <LinkOff />
                      {isDisconnecting ? "Memutus Koneksi..." : "Putus Koneksi"}
                    </button>
                  </>
                ) : (
                  <>
                    {/* ⚠️ HARDCODED CONFIGURATION MODE */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
                      <div className="flex gap-3">
                        <Info className="text-yellow-400 flex-shrink-0" />
                        <div className="text-sm text-yellow-300">
                          <p className="font-semibold mb-2">
                            🔧 Mode Konfigurasi Hardcode
                          </p>
                          <p>
                            IoT device menggunakan konfigurasi hardcode. Device
                            harus di-flash dengan User ID dan Meteran ID Anda
                            oleh teknisi.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Configuration Data for Technician */}
                    <div className="bg-[#2A2D31] rounded-xl p-5 space-y-4">
                      <h3 className="text-white font-semibold text-lg mb-3">
                        📋 Data Konfigurasi IoT Device
                      </h3>

                      <p className="text-gray-400 text-sm mb-4">
                        Berikan data berikut ke teknisi untuk konfigurasi device
                        IoT:
                      </p>

                      {/* User ID */}
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">
                          User ID
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={userId}
                            readOnly
                            className="flex-1 bg-[#1a1d21] text-gray-300 px-4 py-3 rounded-xl border border-gray-600 cursor-not-allowed font-mono text-sm"
                          />
                          <button
                            onClick={() => copyToClipboard(userId, "User ID")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition"
                          >
                            <ContentCopy style={{ fontSize: 20 }} />
                          </button>
                        </div>
                      </div>

                      {/* Meteran ID */}
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">
                          Meteran ID
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={meteranId}
                            readOnly
                            className="flex-1 bg-[#1a1d21] text-gray-300 px-4 py-3 rounded-xl border border-gray-600 cursor-not-allowed font-mono text-sm"
                          />
                          <button
                            onClick={() =>
                              copyToClipboard(meteranId, "Meteran ID")
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition"
                          >
                            <ContentCopy style={{ fontSize: 20 }} />
                          </button>
                        </div>
                      </div>

                      {/* Nomor Meteran */}
                      {meteranData && (
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">
                            Nomor Meteran
                          </label>
                          <input
                            type="text"
                            value={meteranData.noMeteran}
                            readOnly
                            className="w-full bg-[#1a1d21] text-gray-300 px-4 py-3 rounded-xl border border-gray-600 cursor-not-allowed"
                          />
                        </div>
                      )}

                      {/* Instructions */}
                      <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                        <div className="flex gap-3">
                          <Info className="text-blue-400 flex-shrink-0" />
                          <div className="text-sm text-blue-300">
                            <p className="font-semibold mb-2">
                              📝 Instruksi untuk Teknisi:
                            </p>
                            <ol className="list-decimal list-inside space-y-1">
                              <li>Copy User ID dan Meteran ID di atas</li>
                              <li>Edit file ESP32: AquaLink_IoT_Simple.ino</li>
                              <li>Ganti line 37-38 dengan ID yang benar</li>
                              <li>Upload code ke ESP32</li>
                              <li>
                                Device akan otomatis connect dan kirim data
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Status Card - Meteran Info */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-white font-bold text-2xl">
                    Meteran Air Anda
                  </h1>
                  <CheckCircle className="text-white/80" fontSize="large" />
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Meteran air Anda telah aktif
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Nomor Meteran</span>
                    <span className="text-white font-bold text-lg">
                      {meteranData.noMeteran}
                    </span>
                  </div>
                </div>
              </div>

              {/* Meteran Info */}
              <div className="bg-[#202226] rounded-3xl p-6 mb-6">
                <h2 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
                  <Info className="text-blue-500" />
                  Informasi Meteran
                </h2>

                <div className="space-y-4">
                  {/* Total Pemakaian */}
                  <div className="bg-[#2A2D31] rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <WaterDrop className="text-blue-500" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">
                            Total Pemakaian
                          </p>
                          <p className="text-white font-bold text-lg">
                            {meteranData.totalPemakaian.toFixed(2)} m³
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pemakaian Belum Terbayar */}
                  <div className="bg-[#2A2D31] rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                          <Speed className="text-orange-500" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">
                            Belum Terbayar
                          </p>
                          <p className="text-white font-bold text-lg">
                            {meteranData.pemakaianBelumTerbayar.toFixed(2)} m³
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Jatuh Tempo */}
                  {meteranData.jatuhTempo && (
                    <div className="bg-[#2A2D31] rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                            <CalendarToday className="text-red-500" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Jatuh Tempo</p>
                            <p className="text-white font-bold text-lg">
                              {formatDate(meteranData.jatuhTempo)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Kelompok Pelanggan Info */}
              {meteranData.kelompokPelangganId && (
                <div className="bg-[#202226] rounded-3xl p-6">
                  <h2 className="text-white font-semibold text-xl mb-4">
                    Kategori Pelanggan
                  </h2>

                  <div className="bg-[#2A2D31] rounded-xl p-4 mb-3">
                    <p className="text-gray-400 text-sm mb-1">Kategori</p>
                    <p className="text-white font-bold text-lg">
                      {meteranData.kelompokPelangganId.namaKelompok}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-[#2A2D31] rounded-lg p-3">
                      <span className="text-gray-400 text-sm">
                        Tarif 0-10 m³
                      </span>
                      <span className="text-white font-semibold">
                        {formatCurrency(
                          meteranData.kelompokPelangganId
                            .hargaPenggunaanDibawah10
                        )}
                        /m³
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-[#2A2D31] rounded-lg p-3">
                      <span className="text-gray-400 text-sm">
                        Tarif {">"}10 m³
                      </span>
                      <span className="text-white font-semibold">
                        {formatCurrency(
                          meteranData.kelompokPelangganId
                            .hargaPenggunaanDiatas10
                        )}
                        /m³
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-[#2A2D31] rounded-lg p-3">
                      <span className="text-gray-400 text-sm">Biaya Beban</span>
                      <span className="text-white font-semibold">
                        {formatCurrency(
                          meteranData.kelompokPelangganId.biayaBeban
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={() => router.push("/billing")}
                  className="bg-[#2835FF] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  Lihat Tagihan
                </button>
                <button
                  onClick={() => router.push("/usage")}
                  className="bg-[#5F68FE] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  Riwayat Pemakaian
                </button>
              </div>
            </>
          ) : (
            <div className="bg-[#202226] rounded-3xl p-6 text-center">
              <Info className="text-gray-400 mx-auto mb-4" fontSize="large" />
              <h2 className="text-white font-semibold text-xl mb-2">
                Meteran Belum Aktif
              </h2>
              <p className="text-gray-400 text-sm">
                Meteran air Anda belum diaktifkan. Silakan hubungi admin untuk
                informasi lebih lanjut.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IotConnectionPage;
