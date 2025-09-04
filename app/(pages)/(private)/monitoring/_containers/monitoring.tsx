"use client";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  LineChart,
  Line,
  XAxis,
  BarChart,
  Bar,
  Rectangle,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/UseAuth";
import API from "@/app/utils/API";
import { formatToIDR } from "@/app/utils/helper";
const Monitoring: React.FC = () => {
  const auth = useAuth();
  const [data, setData] = useState<any>([]);
  const [subscribed, setSubscribed] = useState<any>([]);
  const dataBarchart = [
    {
      name: "Senin",
      prediksi: 4000,
      aktual: 2400,
      amt: 2400,
    },
    {
      name: "Selasa",
      prediksi: 3000,
      aktual: 1398,
      amt: 2210,
    },
    {
      name: "Rabu",
      prediksi: 2000,
      aktual: 9800,
      amt: 2290,
    },
    {
      name: "Kamis",
      prediksi: 2780,
      aktual: 3908,
      amt: 2000,
    },
    {
      name: "Jumat",
      prediksi: 1890,
      aktual: 4800,
      amt: 2181,
    },
    {
      name: "Sabtu",
      prediksi: 2390,
      aktual: 3800,
      amt: 2500,
    },
    {
      name: "Minggu",
      prediksi: 3490,
      aktual: 4300,
      amt: 2100,
    },
  ];

  const formatLabel: any = (label: string) => {
    const dayMap: Record<string, string> = {
      S: "Senin",
      Sel: "Selasa",
      Rab: "Rabu",
      Kam: "Kamis",
      Jum: "Jum,at",
      Sab: "Sabtu",
      Min: "Minggu",
    };
    return dayMap[label] || label;
  };
  const getHistoryWaterUsage = async (waterCreditId: string) => {
    try {
      const response = await API.get(
        `/history/getHistory/${auth.auth.user?.id}/${waterCreditId}?filter=minggu`,
        {
          headers: {
            Authorization: auth.auth.token,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching water usage history:", error);
    }
  };
  const getSubscribed = async () => {
    try {
      const response = await API.get(
        `/subscribe/getSubscribeByUserId/${auth.auth.user?.id}`,
        {
          headers: {
            Authorization: auth.auth.token,
          },
        }
      );
      const subscriptions = response.data.data.subscriptions;
      //   console.log(subscriptions);
      setSubscribed(subscriptions);

      if (subscriptions?.[0]?.waterCredit?._id) {
        await getHistoryWaterUsage(subscriptions[0].waterCredit._id);
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.all([getSubscribed()]);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initializeData();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 lg:gap-7 font-poppins relative z-0">
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 font-montserrat gap-5 lg:gap-7">
        <div className=" w-full rounded-2xl bg-[#252525] relative z-0">
          <div className="rounded-2xl absolute z-[-1] w-full h-full bg-gradient-to-r from-[#414BF1]/40 via-[#AE73F6]/20 to-transparent"></div>
          <div className=" w-full p-7 flex flex-col justify-start items-start gap-3">
            <h1 className="text-base md:text-lg font-semibold text-white/60">
              Penggunaan Keseluruhan
            </h1>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {subscribed[0]?.subscriptionDetails?.totalUsedWater?.toFixed(2) ??
                0}
            </h1>
            <h1 className="text-base md:text-lg font-semibold text-white/60">
              Liter
            </h1>
          </div>
        </div>
        <div className=" w-full rounded-2xl bg-[#252525] relative z-0">
          <div className="rounded-2xl absolute z-[-1] w-full h-full bg-gradient-to-r from-[#414BF1]/40 via-[#AE73F6]/20 to-transparent"></div>
          <div className=" w-full p-7 flex flex-col justify-start items-start gap-3">
            <h1 className="text-base md:text-lg font-semibold text-white/60">
              Penggunaan Bulan Ini
            </h1>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {subscribed[0]?.subscriptionDetails?.totalUsedWater?.toFixed(2) ??
                0}
            </h1>
            <h1 className="text-base md:text-lg font-semibold text-white/60">
              Liter
            </h1>
          </div>
        </div>
        <div className=" w-full rounded-2xl bg-[#252525] relative z-0">
          <div className="rounded-2xl absolute z-[-1] w-full h-full bg-gradient-to-r from-[#414BF1]/40 via-[#AE73F6]/20 to-transparent"></div>
          <div className=" w-full p-7 flex flex-col justify-start items-start gap-3">
            <h1 className="text-base md:text-lg font-semibold text-white/60">
              Penggunaan Rata - Rata
            </h1>
            <h1 className="text-3xl md:text-4xl font-bold text-white">540</h1>
            <h1 className="ttext-base md:text-lg font-semibold text-white/60">
              Liter / Hari
            </h1>
          </div>
        </div>
        <div className=" w-full rounded-2xl bg-[#252525] relative z-0">
          <div className="rounded-2xl absolute z-[-1] w-full h-full bg-gradient-to-r from-[#414BF1]/40 via-[#AE73F6]/20 to-transparent"></div>
          <div className=" w-full p-7 flex flex-col justify-start items-start gap-3">
            <h1 className="text-base md:text-lg font-semibold text-white/60">
              Evaluasi Penggunaan
            </h1>
            <h1 className="text-base md:text-lg font-semibold text-white w-full py-1 px-2 rounded-full bg-gradient-to-r from-[#414BF1] to-[#252B8B] text-center">
              Hemat 40% dari bulan lalu
            </h1>
          </div>
        </div>
      </div>

      <div className=" w-full grid grid-cols-1 lg:grid-cols-3 lg:gap-7 font-montserrat">
        <div className="w-full col-span-2 bg-[#252525] rounded-2xl p-7 mt-5 lg:mt-0">
          <div className="w-full flex items-start justify-between">
            <h1 className="font-bold text-white text-xl">Penggunaan Air</h1>
            <button className="flex items-center p-2 md:px-4 md:py-3 gap-2 rounded-lg bg-white/20">
              <CalendarMonthIcon sx={{ color: "white" }} />
              <h1 className="text-white font-medium text-sm md:text-base">
                Mingguan
              </h1>
            </button>
          </div>
          <div className="w-full h-[200px] md:h-[450px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={300} height={100} data={data}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2983FF" stopOpacity={1} />
                    <stop offset="100%" stopColor="#6FC3FF" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="totalUsedWater"
                  stroke="url(#gradient)"
                  strokeWidth={2}
                />
                <Tooltip labelFormatter={formatLabel} />
                {/* <YAxis className="hidden md:block" /> */}
                <XAxis dataKey="_id.day" tick={{ fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full bg-[#252525] rounded-2xl relative z-0 overflow-hidden font-montserrat order-first lg:order-last">
          <div className="absolute z-[-2] w-[150%] -translate-x-[50%] left-[50%] -bottom-[10%] md:-bottom-[50%] lg:bottom-0">
            <svg
              className="w-full h-auto"
              viewBox="0 0 634 307"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.08">
                <g filter="url(#filter0_f_9208_3666)">
                  <path
                    d="M533.417 189.396C532.828 221.032 442.602 197.136 321.658 194.73C200.713 192.325 100.694 213.637 101.283 182.001C101.872 150.364 195.409 98.4321 316.353 100.837C437.298 103.243 534.006 157.759 533.417 189.396Z"
                    fill="url(#paint0_linear_9208_3666)"
                    fill-opacity="0.8"
                  />
                </g>
                <g
                  style={{ mixBlendMode: "plus-lighter" }}
                  filter="url(#filter1_f_9208_3666)"
                >
                  <path
                    d="M514.022 175.422C513.787 188.062 433.291 153.508 324.162 151.337C215.034 149.167 120.821 180.571 121.056 167.931C121.292 155.291 211.9 106.421 321.029 108.591C430.157 110.762 514.257 162.782 514.022 175.422Z"
                    fill="white"
                    fill-opacity="0.8"
                  />
                </g>
                <g
                  style={{ mixBlendMode: "overlay" }}
                  filter="url(#filter2_f_9208_3666)"
                >
                  <path
                    d="M514.024 160.496C513.779 173.68 433.309 137.707 324.181 135.537C215.052 133.366 120.813 166.202 121.058 153.018C121.304 139.834 211.953 88.7832 321.081 90.9535C430.21 93.1238 514.27 147.311 514.024 160.496Z"
                    fill="white"
                    fill-opacity="0.8"
                  />
                </g>
                <path
                  d="M520.435 161.938C525.018 164.755 527.697 169.798 527.697 175.178V280C527.697 288.837 520.534 296 511.697 296H112.988C104.151 296 96.9876 288.837 96.9876 280V175.352C96.9876 169.98 99.6599 164.943 104.233 162.124C157.727 129.146 231.29 108.783 312.485 108.783C393.527 108.783 466.966 129.07 520.435 161.938Z"
                  fill="url(#paint1_linear_9208_3666)"
                />
                <g
                  style={{ mixBlendMode: "plus-lighter" }}
                  opacity="0.87"
                  filter="url(#filter3_f_9208_3666)"
                >
                  <path
                    d="M309.115 112.022C210.559 107.7 135.812 146.267 135.87 144.124C135.929 141.981 210.772 99.9389 309.327 104.261C407.883 108.583 492.859 141.981 492.801 144.124C492.742 146.267 407.67 116.343 309.115 112.022Z"
                    fill="white"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_f_9208_3666"
                  x="0.780273"
                  y="0.256836"
                  width="633.14"
                  height="305.883"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="50.25"
                    result="effect1_foregroundBlur_9208_3666"
                  />
                </filter>
                <filter
                  id="filter1_f_9208_3666"
                  x="88.4557"
                  y="75.9215"
                  width="458.167"
                  height="134.874"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="16.3"
                    result="effect1_foregroundBlur_9208_3666"
                  />
                </filter>
                <filter
                  id="filter2_f_9208_3666"
                  x="88.4576"
                  y="58.2867"
                  width="458.167"
                  height="137.706"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="16.3"
                    result="effect1_foregroundBlur_9208_3666"
                  />
                </filter>
                <filter
                  id="filter3_f_9208_3666"
                  x="67.4701"
                  y="35.5492"
                  width="493.731"
                  height="177.084"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="34.2"
                    result="effect1_foregroundBlur_9208_3666"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_9208_3666"
                  x1="460.57"
                  y1="136.819"
                  x2="203.683"
                  y2="257.25"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#414BF1" />
                  <stop offset="0.825" stop-color="#262B8C" />
                  <stop offset="1" stop-color="#050951" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_9208_3666"
                  x1="312.342"
                  y1="234.01"
                  x2="312.342"
                  y2="108.783"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0E0A17" />
                  <stop offset="1" stop-color="#1A0046" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className=" w-full h-full flex flex-col justify-start items-start gap-7 p-5 md:p-7">
            <div className="w-full flex items-center justify-between">
              <h1 className="font-bold text-white text-lg md:text-xl">
                Informasi Meteran
              </h1>
              <h1 className=" text-[#0EC585] font-medium px-4 py-1 border border-[#0EC585] text-sm md:text-base rounded-full text-center">
                Aktif
              </h1>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              <div className=" flex flex-col gap-1">
                <h1 className=" text-white/60 font-semibold text-xs md:text-sm">
                  ID Meteran
                </h1>
                <h1 className=" text-white font-bold text-lg md:text-xl">
                  1234567890
                </h1>
              </div>
              <div className=" flex flex-col gap-1">
                <h1 className=" text-white/60 font-semibold text-xs md:text-sm">
                  Kategori Pengguna
                </h1>
                <h1 className=" text-white font-bold text-lg md:text-xl">
                  Rumah Tangga I
                </h1>
              </div>
              <div className=" flex flex-col gap-1">
                <h1 className=" text-white/60 font-semibold text-xs md:text-sm">
                  Harga Kategori
                </h1>
                <h1 className=" text-[#5073FF] font-bold text-lg md:text-xl">
                  {formatToIDR(5500)} / 1000 L
                </h1>
              </div>
              <div className=" flex flex-col gap-1">
                <h1 className=" text-white/60 font-semibold text-xs md:text-sm">
                  Pembacaan Meteran Terakhir
                </h1>
                <h1 className=" text-white font-bold text-lg md:text-xl">
                  5 September 2025
                </h1>
              </div>
              <div className=" flex flex-col gap-2 items-start">
                <h1 className=" text-white/60 font-semibold text-xs md:text-sm">
                  Kondisi Meteran
                </h1>
                <h1 className=" text-[#0EC585] font-medium px-4 py-1 border border-[#0EC585] text-sm md:text-base rounded-full text-center">
                  Terhubung
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full grid grid-cols-1 lg:grid-cols-3 lg:gap-7 font-montserrat">
        <div className="w-full col-span-2 bg-[#252525] rounded-2xl p-5 lg:p-7 mt-5 lg:mt-0">
          <div className="w-full flex items-start justify-between">
            <h1 className="font-bold text-white text-lg md:text-xl">
              Penggunaan Air
            </h1>
            <button className="flex items-center p-2 md:px-4 md:py-3 gap-2 rounded-lg bg-white/20">
              <CalendarMonthIcon sx={{ color: "white" }} />
              <h1 className="text-white font-medium text-sm md:text-base">
                Mingguan
              </h1>
            </button>
          </div>
          <div className="w-full h-[250px] md:h-[450px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={dataBarchart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                {/* <YAxis /> */}
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="prediksi"
                  fill="#4E58FF"
                  activeBar={<Rectangle fill="#4E58FF" stroke="none" />}
                />
                <Bar
                  dataKey="aktual"
                  fill="#0EC585"
                  activeBar={<Rectangle fill="#0EC585" stroke="none" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full bg-[#252525] rounded-2xl relative z-0 overflow-hidden font-montserrat order-first lg:order-last">
          <div className=" w-full h-full flex flex-col justify-between items-start gap-7 pt-7">
            <h1 className="font-bold text-white text-lg md:text-xl px-7">
              Prediksi
            </h1>
            <div className=" w-full flex flex-col gap-2">
              <div className="px-7 py-14 bg-gradient-to-r from-[#414BF1]/40 via-[#AE73F6]/30 to-transparent flex flex-col gap-1">
                <h1 className="text-white/60 font-semibold text-base">
                  Prediksi Pengguna Bulan Ini
                </h1>
                <h1 className="text-white font-semibold text-4xl">
                  2670 Liter
                </h1>
              </div>
              <div className="px-7 py-14 bg-gradient-to-l from-[#0EC585]/40 via-[#0EC585]/30 to-transparent flex flex-col gap-1">
                <h1 className="text-white/60 font-semibold text-base">
                  Estimasi Tagihan
                </h1>
                <h1 className="text-white font-semibold text-4xl">
                  {formatToIDR(52500)}
                </h1>
                <h1 className="text-white/60 font-medium text-sm">
                  Berdasarkan penggunaan bulan ini
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
