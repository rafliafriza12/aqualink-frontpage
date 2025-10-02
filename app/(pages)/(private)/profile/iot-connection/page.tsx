"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import CircleBackground from "@/app/components/svg/CircleBackground";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { useGetUserProfile } from "@/app/services/user/user.mutation";
import {
  ArrowBack,
  WaterDrop,
  CheckCircle,
  Info,
  Speed,
  CalendarToday,
} from "@mui/icons-material";

const IotConnectionPage = () => {
  const router = useRouter();
  const profileMutation = useGetUserProfile();
  const [meteranData, setMeteranData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await profileMutation.mutateAsync();
        if (result?.data?.user?.meteranId) {
          setMeteranData(result.data.user.meteranId);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

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
              {/* Status Card */}
              <div className="bg-gradient-to-br from-[#2835FF] to-[#5F68FE] rounded-3xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-white font-bold text-2xl">
                    Status Koneksi IoT
                  </h1>
                  <CheckCircle className="text-green-400" fontSize="large" />
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Meteran air Anda telah terhubung dan aktif
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
