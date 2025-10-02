"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import CircleBackground from "@/app/components/svg/CircleBackground";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { useGetHistoryUsage } from "@/app/services/history/history.mutation";
import { useGetUserProfile } from "@/app/services/user/user.mutation";
import { ArrowBack, WaterDrop, TrendingUp } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { FilterType } from "@/app/services/history/history.type";

const UsagePage = () => {
  const router = useRouter();
  const historyMutation = useGetHistoryUsage();
  const profileMutation = useGetUserProfile();

  const [filter, setFilter] = useState<FilterType>("hari");
  const [chartData, setChartData] = useState<any[]>([]);
  const [totalUsage, setTotalUsage] = useState(0);
  const [userId, setUserId] = useState("");
  const [meteranId, setMeteranId] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await profileMutation.mutateAsync();
        if (result?.data?.user) {
          setUserId(result.data.user._id);
          if (result.data.user.meteranId) {
            setMeteranId(result.data.user.meteranId._id);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (userId && meteranId) {
      fetchHistoryData();
    }
  }, [filter, userId, meteranId]);

  const fetchHistoryData = async () => {
    try {
      const result = await historyMutation.mutateAsync({
        userId,
        meteranId,
        filter,
      });

      if (result?.data) {
        const formattedData = result.data.map((item: any) => ({
          name:
            item._id.time ||
            item._id.day ||
            `Minggu ${item._id.week}` ||
            item._id.month,
          usage: Number(item.totalUsedWater.toFixed(2)),
        }));

        setChartData(formattedData);
        setTotalUsage(result.totalUsageToday || 0);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: "hari", label: "Hari Ini" },
    { value: "minggu", label: "Minggu Ini" },
    { value: "bulan", label: "Bulan Ini" },
    { value: "tahun", label: "Tahun Ini" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#202226] border border-gray-700 rounded-lg p-3">
          <p className="text-white font-semibold">{payload[0].payload.name}</p>
          <p className="text-blue-500">{payload[0].value} liter</p>
        </div>
      );
    }
    return null;
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
          <div className="bg-gradient-to-br from-[#2835FF] to-[#5F68FE] rounded-3xl p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <WaterDrop className="text-white" fontSize="large" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Pemakaian Hari Ini</p>
                  <h2 className="text-white font-bold text-2xl">
                    {totalUsage.toFixed(2)} L
                  </h2>
                </div>
              </div>
              <TrendingUp className="text-white/60" fontSize="large" />
            </div>
            <p className="text-white/80 text-xs">
              {totalUsage >= 500
                ? "⚠️ Pemakaian tinggi! Pertimbangkan untuk menghemat air."
                : "✓ Pemakaian dalam batas normal"}
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`py-3 rounded-xl font-semibold text-sm transition ${
                  filter === option.value
                    ? "bg-[#2835FF] text-white"
                    : "bg-[#202226] text-gray-400"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Chart Card */}
          <div className="bg-[#202226] rounded-3xl p-6">
            <h2 className="text-white font-semibold text-xl mb-4">
              Grafik Pemakaian Air
            </h2>

            {historyMutation.isPending ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : chartData.length > 0 ? (
              <div className="w-full h-[300px] lg:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  {filter === "hari" || filter === "minggu" ? (
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis
                        dataKey="name"
                        stroke="#9CA3AF"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke="#9CA3AF"
                        style={{ fontSize: "12px" }}
                        label={{
                          value: "Liter",
                          angle: -90,
                          position: "insideLeft",
                          style: { fill: "#9CA3AF" },
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="usage"
                        stroke="#5F68FE"
                        strokeWidth={3}
                        dot={{ fill: "#2835FF", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  ) : (
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis
                        dataKey="name"
                        stroke="#9CA3AF"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke="#9CA3AF"
                        style={{ fontSize: "12px" }}
                        label={{
                          value: "Liter",
                          angle: -90,
                          position: "insideLeft",
                          style: { fill: "#9CA3AF" },
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="usage"
                        fill="url(#colorGradient)"
                        radius={[8, 8, 0, 0]}
                      />
                      <defs>
                        <linearGradient
                          id="colorGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#2835FF" />
                          <stop offset="100%" stopColor="#5F68FE" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8">
                <WaterDrop
                  className="text-gray-400 mx-auto mb-3"
                  fontSize="large"
                />
                <p className="text-gray-400">Belum ada data pemakaian</p>
              </div>
            )}

            {/* Statistics */}
            {chartData.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-[#2A2D31] rounded-xl p-3 text-center">
                  <p className="text-gray-400 text-xs mb-1">Tertinggi</p>
                  <p className="text-white font-bold text-lg">
                    {Math.max(...chartData.map((d) => d.usage)).toFixed(2)} L
                  </p>
                </div>
                <div className="bg-[#2A2D31] rounded-xl p-3 text-center">
                  <p className="text-gray-400 text-xs mb-1">Rata-rata</p>
                  <p className="text-white font-bold text-lg">
                    {(
                      chartData.reduce((sum, d) => sum + d.usage, 0) /
                      chartData.length
                    ).toFixed(2)}{" "}
                    L
                  </p>
                </div>
                <div className="bg-[#2A2D31] rounded-xl p-3 text-center">
                  <p className="text-gray-400 text-xs mb-1">Terendah</p>
                  <p className="text-white font-bold text-lg">
                    {Math.min(...chartData.map((d) => d.usage)).toFixed(2)} L
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tips Card */}
          <div className="bg-[#202226] rounded-3xl p-6 mt-6">
            <h3 className="text-white font-semibold text-lg mb-3">
              💡 Tips Hemat Air
            </h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Perbaiki keran yang bocor segera</li>
              <li>• Gunakan shower daripada bathtub</li>
              <li>• Matikan keran saat menyikat gigi</li>
              <li>• Tampung air AC untuk menyiram tanaman</li>
              <li>• Cuci kendaraan menggunakan ember, bukan selang</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsagePage;
