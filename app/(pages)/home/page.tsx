"use client";
import { formatToIDR } from "@/app/utils/helper";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useAuth } from "@/app/hooks/UseAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { IsDesktop } from "@/app/hooks";
import WaterCredit from "@/app/components/card/WaterCredit";
import Ellips from "@/app/components/svg/Ellips";
import WalletSVG from "@/app/components/svg/Wallet";
import TokenSVG from "@/app/components/svg/Token";
import ConvertSVG from "@/app/components/svg/Convert";
import TopUpSVG from "@/app/components/svg/TopUp";
import ClaimTokenSVG from "@/app/components/svg/ClaimToken";
import ConvertTokenSVG from "@/app/components/svg/ConvertToken";
import API from "@/app/utils/API";
import Skeleton from "@mui/material/Skeleton";
import BlueShillouete from "@/app/components/svg/BlueShilloute";
import SquareSVG from "@/app/components/svg/Square";
import OpacityIcon from "@mui/icons-material/Opacity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TextField from "@mui/material/TextField";
import TuneIcon from "@mui/icons-material/Tune";
import ActivityCard from "@/app/components/card/Activity";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import ClaimTokenModal from "@/app/components/modals/ClaimTokenModal";
import TopUpModal from "@/app/components/modals/TopUpModal";
import { TrendingUp, TrendingDown } from "lucide-react";
import { toast, Bounce, ToastContainer } from "react-toastify";

const HomePage: React.FC = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const isDesktop = IsDesktop();
  const [wallet, setWallet] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [seacrh, setSearch] = useState<string>("");
  const [subscribed, setSubscribed] = useState<any>([]);
  const [showClaimTokenModal, setShowClaimTokenModal] =
    useState<boolean>(false);
  const [showTopUpModal, setShowTopUpModal] = useState<boolean>(false);
  const [activity, setActivity] = useState<any>([]);

  // const activity: any = [
  //   {
  //     id: "678d0eba08ae5e103168934f",
  //     name: "Rafli Afriza Nugraha",
  //     userId: "677cd8627b6e5be2c217229c",
  //     amount: 100000,
  //     category: "Pembayaran kredit Air",
  //     paymentStatus: "success",
  //   },
  //   {
  //     id: "678d0eba08ae5e103168934f",
  //     name: "Rafli Afriza Nugraha",
  //     userId: "677cd8627b6e5be2c217229c",
  //     amount: 100000,
  //     category: "Top Up Saldo",
  //     paymentStatus: "pending",
  //   },
  //   {
  //     id: "678d0eba08ae5e103168934f",
  //     name: "Rafli Afriza Nugraha",
  //     userId: "677cd8627b6e5be2c217229c",
  //     amount: 100000,
  //     category: "Top Up Saldo",
  //     paymentStatus: "reject",
  //   },
  //   {
  //     id: "678d0eba08ae5e103168934f",
  //     name: "Rafli Afriza Nugraha",
  //     userId: "677cd8627b6e5be2c217229c",
  //     amount: 100000,
  //     category: "Pembayaran kredit Air",
  //     paymentStatus: "success",
  //   },
  //   {
  //     id: "678d0eba08ae5e103168934f",
  //     name: "Rafli Afriza Nugraha",
  //     userId: "677cd8627b6e5be2c217229c",
  //     amount: 100000,
  //     category: "Top Up Saldo",
  //     paymentStatus: "pending",
  //   },
  //   {
  //     id: "678d0eba08ae5e103168934f",
  //     name: "Rafli Afriza Nugraha",
  //     userId: "677cd8627b6e5be2c217229c",
  //     amount: 100000,
  //     category: "Top Up Saldo",
  //     paymentStatus: "reject",
  //   },
  // ];

  // const data: any = [
  //   {
  //     name: "S",
  //     penggunaan: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Sel",
  //     penggunaan: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Rab",
  //     penggunaan: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Kam",
  //     penggunaan: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Jum",
  //     penggunaan: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Sab",
  //     penggunaan: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Min",
  //     penggunaan: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  const [data, setData] = useState<any>([]);

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

  const getWallet = () => {
    API.get(`/wallet/getWalletByUserId/${auth.auth.user?.id}`, {
      headers: {
        Authorization: auth.auth.token,
      },
    })
      .then((res) => {
        // console.log(res.data.data);
        setWallet(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Generate array of days for current month
  const getDaysArray = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Handle month navigation
  const changeMonth = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  };

  // Check if a date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is selected
  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getMonthShort = (month: number) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agt",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    return monthNames[month];
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
      setSubscribed(subscriptions);

      if (subscriptions?.[0]?.waterCredit?._id) {
        await getHistoryWaterUsage(subscriptions[0].waterCredit._id);
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const getActivity = async () => {
    try {
      const formattedDate = selectedDate !== null ? selectedDate : currentDate;
      const response = await API.get(
        `/notification/getNotificationByUserId/${auth.auth.user?.id}?selectedDate=${formattedDate}`,
        {
          headers: {
            Authorization: auth.auth.token,
          },
        }
      );

      setActivity(response.data.data);
      // if (selectedDate) {
      //   toast.success(`${response.data.message}`, {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     transition: Bounce,
      //   });
      // }
    } catch (err: any) {
      // toast.error(`${err.response.data.message}`, {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   transition: Bounce,
      // });
      console.error("Error fetching activities:", err);
    }
  };

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth");
      return;
    }

    const initializeData = async () => {
      await Promise.all([getWallet(), getSubscribed()]);
    };

    // Run getActivity once initially
    getActivity();

    // Set interval only for wallet and subscription updates
    const interval = setInterval(initializeData, 1500);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [auth.auth.isAuthenticated, navigation, selectedDate]);

  if (!auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }

  return isDesktop ? (
    <div className="w-full p-8 flex flex-col gap-8 font-poppins ">
      {/* Top Section */}
      <div className="flex justify-between items-start gap-8">
        {/* Left Column - Welcome & Stats */}
        <div className="w-2/3 flex flex-col gap-6">
          {/* Welcome Header */}
          <div className="flex justify-between items-center bg-[#202226] p-6 rounded-[32px]">
            <div className="flex flex-col text-white gap-1">
              {!isLoading ? (
                <>
                  <h6 className="text-sm">Have a good day! 👋</h6>
                  <h1 className="font-semibold text-xl">
                    Hi, {auth.auth.user?.fullName}
                  </h1>
                </>
              ) : (
                <>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "14px", bgcolor: "#d1d5db" }}
                    width={140}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "20px", bgcolor: "#d1d5db" }}
                    width={180}
                  />
                </>
              )}
            </div>
            <div>
              {!isLoading ? (
                <Link href="/notifikasi">
                  <NotificationsNoneOutlinedIcon
                    sx={{ color: "#ffffff", fontSize: "32px" }}
                  />
                </Link>
              ) : (
                <Skeleton
                  variant="circular"
                  width={32}
                  height={32}
                  sx={{ bgcolor: "#d1d5db" }}
                />
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Balance Card */}
            {!isLoading ? (
              <div className="bg-[#3640F0] rounded-2xl p-6 flex flex-col justify-between h-[200px]">
                <div className="flex gap-3 items-center">
                  <div className="bg-white p-2 rounded-lg">
                    <WalletSVG />
                  </div>
                  <div className="text-white font-montserrat font-bold">
                    <h1 className="text-2xl">Saldo</h1>
                    <h1 className="text-2xl">Anda</h1>
                  </div>
                </div>
                <h1 className="font-extrabold text-2xl text-white">
                  {formatToIDR(wallet?.balance ?? 0)}
                </h1>
              </div>
            ) : (
              <Skeleton
                variant="rounded"
                height={200}
                sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
              />
            )}

            {/* Token Card */}
            {!isLoading ? (
              <div className="bg-[#7D83EF] rounded-2xl p-6 flex flex-col justify-between h-[200px]">
                <div className="flex gap-3 items-center">
                  <div className="bg-white p-2 rounded-full">
                    <TokenSVG />
                  </div>
                  <div className="text-white font-montserrat font-bold">
                    <h1 className="text-xl">Jumlah</h1>
                    <h1 className="text-2xl">Token</h1>
                  </div>
                </div>
                <h1 className="font-extrabold font-montserrat text-white text-3xl">
                  {wallet?.conservationToken ?? 0}
                </h1>
              </div>
            ) : (
              <Skeleton
                variant="rounded"
                height={200}
                sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-6">
            {!isLoading ? (
              <>
                <div className="bg-[#414BF1] rounded-2xl p-6 flex flex-col items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl border-2 border-[#A4B0CC]">
                    <TopUpSVG />
                  </div>
                  <h1 className="font-montserrat font-bold text-white">
                    Top Up
                  </h1>
                </div>
                <div className="bg-[#414BF1] rounded-2xl p-6 flex flex-col items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl border-2 border-[#A4B0CC]">
                    <ClaimTokenSVG size={47} />
                  </div>
                  <h1 className="font-montserrat font-bold text-white">
                    Klaim Token
                  </h1>
                </div>
                <div className="bg-[#414BF1] rounded-2xl p-6 flex flex-col items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl border-2 border-[#A4B0CC]">
                    <ConvertTokenSVG size={47} />
                  </div>
                  <h1 className="font-montserrat font-bold text-white">
                    Tukar Token
                  </h1>
                </div>
              </>
            ) : (
              <>
                <Skeleton
                  variant="rounded"
                  height={160}
                  sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
                />
                <Skeleton
                  variant="rounded"
                  height={160}
                  sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
                />
                <Skeleton
                  variant="rounded"
                  height={160}
                  sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
                />
              </>
            )}
          </div>
        </div>

        {/* Right Column - Water Usage */}
        <div className="w-1/3 bg-[#202226] rounded-[26px] p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {!isLoading ? (
                <>
                  <OpacityIcon sx={{ color: "#93B6E8" }} />
                  <h1 className="font-montserrat font-bold text-2xl text-white">
                    Penggunaan Air
                  </h1>
                </>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "24px", bgcolor: "#d1d5db" }}
                  width={200}
                />
              )}
            </div>
            <div className="flex items-end gap-2">
              {!isLoading ? (
                <>
                  <h1 className="font-montserrat font-extrabold text-4xl text-white">
                    1480
                  </h1>
                  <h6 className="font-inter text-[#8C8C8C] text-lg mb-2">
                    Liter
                  </h6>
                </>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "36px", bgcolor: "#d1d5db" }}
                  width={150}
                />
              )}
            </div>
          </div>

          {!isLoading ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2983FF" stopOpacity={1} />
                      <stop offset="100%" stopColor="#6FC3FF" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="penggunaan"
                    stroke="url(#gradient)"
                    strokeWidth={2}
                  />
                  <Tooltip labelFormatter={(label) => `Hari: ${label}`} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <Skeleton
              variant="rounded"
              height={300}
              sx={{ bgcolor: "#d1d5db" }}
            />
          )}
        </div>
      </div>

      {/* Bottom Section - Calendar & Activities */}
      {!isLoading ? (
        <div className="bg-[#3568AD] rounded-[26px] p-6">
          <div className="flex justify-between items-start gap-8">
            {/* Calendar */}
            <div className="w-1/2">
              <div className="flex items-center gap-2 mb-6">
                <CalendarMonthIcon sx={{ color: "white" }} />
                <h1 className="font-medium text-xl text-white">
                  Kalender Aktivitas
                </h1>
              </div>

              <div className="bg-[#444444] p-4 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => changeMonth(-1)}
                    className="text-white"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <h2 className="text-white text-xl font-semibold">
                    {formatDate(currentDate)}
                  </h2>
                  <button onClick={() => changeMonth(1)} className="text-white">
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-4">
                  {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-white text-sm py-2"
                      >
                        {day}
                      </div>
                    )
                  )}

                  {getDaysArray().map((day, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-lg ${
                        day === null
                          ? "bg-transparent"
                          : "bg-[#373737] hover:bg-gray-700 cursor-pointer"
                      }`}
                    >
                      {day && (
                        <button
                          onClick={() =>
                            setSelectedDate(
                              new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth(),
                                day
                              )
                            )
                          }
                          className={`w-full h-full flex flex-col items-center justify-center rounded-lg ${
                            isToday(day)
                              ? "bg-[#cccfce] text-black"
                              : isSelected(day)
                              ? "bg-white text-black"
                              : "text-white"
                          }`}
                        >
                          <span className="text-xs text-[#8C8C8C]">
                            {getMonthShort(currentDate.getMonth())}
                          </span>
                          <span className="text-sm">{day}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activities */}
            <div className="w-1/2">
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-medium text-xl text-white">
                  Aktivitas Terakhir
                </h1>
                <div className="flex gap-4">
                  <TextField
                    id="search"
                    label="Search"
                    value={seacrh}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                      bgcolor: "#373731",
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": { borderColor: "transparent" },
                        "&:hover fieldset": { borderColor: "transparent" },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#8C8C8C",
                        "&.Mui-focused": { color: "white" },
                      },
                    }}
                  />
                  <button className="p-3 rounded-xl bg-[#373731]">
                    <TuneIcon sx={{ color: "#8C8C8C" }} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {activity.map((data: any, i: number) => (
                  <ActivityCard activity={data} key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton
          variant="rounded"
          height={600}
          sx={{ bgcolor: "#d1d5db", borderRadius: "26px" }}
        />
      )}
    </div>
  ) : (
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins relative z-0">
      {/* Claim Token Modal */}
      <ClaimTokenModal
        showClaimTokenModal={showClaimTokenModal}
        setShowClaimTokenModal={setShowClaimTokenModal}
      />
      <TopUpModal
        setShowTopUpModal={setShowTopUpModal}
        showTopUpModal={showTopUpModal}
      />
      {/* Claim Token Modal */}

      <div className="w-full flex flex-col pt-12 pb-6 px-4 bg-[#202226] rounded-[32px] relative overflow-hidden gap-7 z-0">
        <div className=" absolute z-[-10] top-0 -left-12">
          <Ellips />
        </div>

        <div className=" w-full flex justify-between items-center">
          <div className="flex flex-col text-white gap-1 ">
            {!isLoading ? (
              <h6 className=" text-xs">Have a good day! 👋</h6>
            ) : (
              <Skeleton
                variant="text"
                sx={{ fontSize: "12px", bgcolor: "#d1d5db" }}
                width={140}
                animation="pulse"
              />
            )}
            {!isLoading ? (
              <h1 className=" font-semibold text-base">
                Hi, {auth.auth.user?.fullName}
              </h1>
            ) : (
              <Skeleton
                variant="text"
                sx={{ fontSize: "16px", bgcolor: "#d1d5db" }}
                width={180}
                animation="pulse"
              />
            )}
          </div>

          <div>
            {!isLoading ? (
              <Link href={"/notifikasi"}>
                <NotificationsNoneOutlinedIcon
                  sx={{
                    color: "#ffffff",
                    fontSize: "28px",
                  }}
                />
              </Link>
            ) : (
              <Skeleton
                variant="circular"
                width={30}
                height={30}
                animation="pulse"
                sx={{
                  bgcolor: "#d1d5db",
                }}
              />
            )}
          </div>
        </div>

        <div className="w-full h-[223px] flex justify-between">
          {!isLoading ? (
            <div className=" w-[49%] h-full bg-[#3640F0] rounded-2xl pt-6 pb-7 px-3 flex flex-col justify-between relative z-0">
              <div className=" w-full absolute z-[-3] top-20">
                <h1 className=" font-extrabold font-montserrat text-white text-[80px] absolute z-[-2]">
                  Rp
                </h1>
                <div className="w-[80%] h-[100px] bg-gradient-to-t from-[#3640F0] to-[#3640F0]/20 absolute z-[-1] top-1"></div>
              </div>
              <div className=" w-full flex gap-3 items-center">
                <div className="bg-white p-1 rounded-[8px]">
                  <WalletSVG />
                </div>
                <div className="flex flex-col text-white font-montserrat font-extrabold text-[20px]">
                  <h1 className="-mb-2">Saldo</h1>
                  <h1>Anda</h1>
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-[18px] text-white">
                  {formatToIDR(wallet?.balance ?? 0)}
                </h1>
              </div>
            </div>
          ) : (
            <Skeleton
              variant="rounded"
              width="49%"
              height="100%"
              animation="pulse"
              sx={{
                bgcolor: "#d1d5db",
                borderRadius: "16px",
              }}
            />
          )}
          <div className="w-[49%] h-full flex flex-col justify-between">
            {!isLoading ? (
              <div className=" w-full h-[60.5%] bg-[#7D83EF] rounded-2xl flex flex-col justify-between pt-6 pb-3 px-3">
                <div className=" w-full flex items-center gap-3">
                  <div className=" bg-white p-2 rounded-full">
                    <TokenSVG />
                  </div>
                  <div className=" flex flex-col font-extrabold font-montserrat text-white">
                    <h1 className="text-[14px] -mb-1">Jumlah</h1>
                    <h1 className="text-[22px]">Token</h1>
                  </div>
                </div>
                <div className="pl-2">
                  <h1 className=" font-extrabold font-montserrat text-white text-[25px]">
                    {wallet?.conservationToken ?? 0}
                  </h1>
                </div>
              </div>
            ) : (
              <Skeleton
                variant="rounded"
                width="100%"
                height="60.5%"
                animation="pulse"
                sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
              />
            )}

            {!isLoading ? (
              <div className=" w-full h-[36.5%] bg-[#EDEDED] rounded-2xl flex justify-center items-center gap-2">
                <div className=" bg-white p-2 rounded-full">
                  <ConvertSVG />
                </div>
                <div className=" font-montserrat font-extrabold text-base">
                  <h1>Konversi</h1>
                </div>
              </div>
            ) : (
              <Skeleton
                variant="rounded"
                width="100%"
                height="36.5%"
                animation="pulse"
                sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
              />
            )}
          </div>
        </div>
      </div>

      <div className=" w-full h-[126px] p-[1px] rounded-[25px] bg-gradient-to-tr from-transparent via-[#414BF1] to-transparent">
        <div className="w-full bg-white h-full rounded-[25px] p-1">
          <div className="w-full h-full bg-[#414BF1] rounded-[25px] flex justify-evenly items-center">
            <div className=" flex flex-col items-center gap-1">
              {!isLoading ? (
                <button
                  disabled={isLoading}
                  onClick={() => setShowTopUpModal(true)}
                  className="bg-white p-2 rounded-[15px] border-[2px] border-[#A4B0CC]"
                >
                  <TopUpSVG />
                </button>
              ) : (
                <Skeleton
                  variant="rounded"
                  width={65}
                  height={65}
                  animation="pulse"
                  sx={{ bgcolor: "#d1d5db", borderRadius: "15px" }}
                />
              )}

              {!isLoading ? (
                <h1 className=" font-montserrat font-bold text-xs text-white">
                  Top Up
                </h1>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "12px", bgcolor: "#d1d5db" }}
                  width={40}
                  animation="pulse"
                />
              )}
            </div>
            <div className=" flex flex-col items-center gap-1">
              {!isLoading ? (
                <button
                  disabled={isLoading}
                  onClick={() => setShowClaimTokenModal(true)}
                  className="bg-white p-2 rounded-[15px] border-[2px] border-[#A4B0CC]"
                >
                  <ClaimTokenSVG size={47} />
                </button>
              ) : (
                <Skeleton
                  variant="rounded"
                  width={65}
                  height={65}
                  animation="pulse"
                  sx={{ bgcolor: "#d1d5db", borderRadius: "15px" }}
                />
              )}

              {!isLoading ? (
                <h1 className=" font-montserrat font-bold text-xs text-white">
                  Klaim Token
                </h1>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "12px", bgcolor: "#d1d5db" }}
                  width={70}
                  animation="pulse"
                />
              )}
            </div>
            <div className="flex flex-col items-center gap-1">
              {!isLoading ? (
                <div className="bg-white p-2 rounded-[15px] border-[2px] border-[#A4B0CC]">
                  <ConvertTokenSVG size={47} />
                </div>
              ) : (
                <Skeleton
                  variant="rounded"
                  width={65}
                  height={65}
                  animation="pulse"
                  sx={{ bgcolor: "#d1d5db", borderRadius: "15px" }}
                />
              )}
              {!isLoading ? (
                <h1 className=" font-montserrat font-bold text-xs text-white">
                  Tukan Token
                </h1>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "12px", bgcolor: "#d1d5db" }}
                  width={70}
                  animation="pulse"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        {!isLoading ? (
          <div className=" w-[49%] h-[120px] relative z-0 overflow-hidden shadow-[0px_4px_6px_rgba(0,0,0,0.25)] rounded-3xl">
            <div className="absolute rounded-3xl transition-all duration-300 overflow-hidden" />
            <div className="relative h-full w-full flex flex-col justify-center rounded-3xl p-4 shadow-lg backdrop-blur-md overflow-hidden transition-transform duration-300 ">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="flex items-center justify-between mb-4 ">
                <div className="space-y-1">
                  <h3 className="text-[10px] font-medium text-gray-400">
                    Uang Masuk
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[12px] text-gray-400">Rp</span>
                    <span className="text-[14px] font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                      1.875.000
                    </span>
                  </div>
                </div>
                <div className="bg-blue-600 p-2 rounded-2xl shadow-lg">
                  <TrendingDown className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                  <span className="text-xs font-medium text-green-600">
                    +12.5%
                  </span>
                </div>
                <span className="text-xs text-gray-400">bulan ini</span>
              </div>
            </div>
          </div>
        ) : (
          <Skeleton
            variant="rounded"
            width="49%"
            height="120px"
            animation="pulse"
            sx={{ bgcolor: "#d1d5db", borderRadius: "15px" }}
          />
        )}
        {!isLoading ? (
          <div className=" w-[49%] h-[120px] relative z-0 overflow-hidden shadow-[0px_4px_6px_rgba(0,0,0,0.25)] rounded-3xl">
            <div className="absolute rounded-3xl" />
            <div className="relative h-full w-full flex flex-col justify-center bg-white/90  rounded-3xl p-4 shadow-lg backdrop-blur-md  overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-rose-400 to-orange-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="flex items-center justify-between mb-4 ">
                <div className="space-y-1">
                  <h3 className="text-[10px] font-medium text-gray-400">
                    Uang Keluar
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[12px] text-gray-400">Rp</span>
                    <span className="text-[14px] font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                      1.875.000
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-rose-500 to-orange-500 p-2 rounded-2xl shadow-lg">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                  <span className="text-xs font-medium text-green-600">
                    +12.5%
                  </span>
                </div>
                <span className="text-xs text-gray-400">bulan ini</span>
              </div>
            </div>
          </div>
        ) : (
          <Skeleton
            variant="rounded"
            width="49%"
            height="120px"
            animation="pulse"
            sx={{ bgcolor: "#d1d5db", borderRadius: "15px" }}
          />
        )}
      </div>

      <div className=" w-full h-[251px] rounded-[26px] bg-[#202226] relative z-0 overflow-hidden p-5 flex flex-col justify-between">
        {/* absolute */}
        <div className=" absolute z-[-10] -left-5 -top-5">
          <BlueShillouete />
        </div>
        <div className=" absolute z-[-11] rotate-90 -right-16 -top-16">
          <BlueShillouete />
        </div>
        <div className=" absolute z-[-12] -left-6 ">
          <SquareSVG />
        </div>
        {/* End of absolute */}
        <div className=" flex flex-col">
          <div className=" flex items-center gap-1">
            {!isLoading ? (
              <OpacityIcon sx={{ color: "#93B6E8" }} />
            ) : (
              <Skeleton
                variant="circular"
                width={25}
                height={25}
                animation="pulse"
                sx={{ bgcolor: "#d1d5db", borderRadius: "15px" }}
              />
            )}

            {!isLoading ? (
              <h1 className=" font-montserrat font-bold text-[18px] text-white">
                Penggunaan Air
              </h1>
            ) : (
              <Skeleton
                variant="text"
                sx={{ fontSize: "18px", bgcolor: "#d1d5db" }}
                animation="pulse"
                width={160}
              />
            )}
          </div>
          <div className=" flex items-end gap-1 ml-2">
            {!isLoading ? (
              <h1 className=" font-montserrat font-extrabold text-[35px] text-white">
                {subscribed[0]?.subscriptionDetails?.totalUsedWater?.toFixed(2)}
              </h1>
            ) : (
              <Skeleton
                variant="text"
                sx={{ fontSize: "35px", bgcolor: "#d1d5db" }}
                animation="pulse"
                width={80}
              />
            )}
            {!isLoading ? (
              <h6 className=" font-inter text-[#8C8C8C] text-sm">Liter</h6>
            ) : (
              <Skeleton
                variant="text"
                sx={{ fontSize: "14px", bgcolor: "#d1d5db" }}
                animation="pulse"
                width={60}
              />
            )}
          </div>
        </div>
        <div className=" w-full h-[60%] ">
          {!isLoading ? (
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
                <XAxis dataKey="_id.day" tick={{ fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Skeleton
              variant="rounded"
              width="100%"
              height="100%"
              sx={{ fontSize: "14px", bgcolor: "#d1d5db" }}
              animation="pulse"
            />
          )}
        </div>
      </div>

      {!isLoading ? (
        <div className="w-full bg-[#3568AD] rounded-[26px] flex flex-col gap-4 px-4 py-5">
          <div className=" flex items-center gap-1">
            <CalendarMonthIcon sx={{ color: "white" }} />
            <h1 className=" font-poppins font-medium text-lg text-white">
              Aktivitas Terakhir
            </h1>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between mb-4 p-2 rounded-3xl bg-[#444444]">
              <button
                onClick={() => changeMonth(-1)}
                className="p-1 rounded-full text-white"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-white text-lg font-semibold">
                {formatDate(currentDate)}
              </h2>
              <button
                onClick={() => changeMonth(1)}
                className="p-1 rounded-full  text-white"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-3 font-poppins font-semibold">
              {/* Weekday headers */}
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
                <div key={day} className="text-center text-white text-sm py-2">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {getDaysArray().map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg text-center ${
                    day === null
                      ? "bg-transparent"
                      : "bg-[#444444] hover:bg-gray-700 cursor-pointer"
                  }`}
                >
                  {day && (
                    <button
                      onClick={() =>
                        setSelectedDate(
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            day
                          )
                        )
                      }
                      className={`w-full h-full flex flex-col items-center justify-center rounded-lg font-montserrat  ${
                        isToday(day)
                          ? "bg-[#cccfce] text-black"
                          : isSelected(day)
                          ? "bg-white text-black"
                          : "text-white"
                      }`}
                    >
                      <h1 className=" text-[9px] text-[#8C8C8C] font-normal">
                        {getMonthShort(currentDate.getMonth())}
                      </h1>
                      <h1 className=" text-xs font-normal">{day}</h1>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className=" w-full flex flex-col gap-4">
            {activity.map((data: any, i: number) => {
              if (i < 5) return <ActivityCard activity={data} key={i} />;
            })}
          </div>
        </div>
      ) : (
        <Skeleton
          variant="rounded"
          width="100%"
          height="657px"
          animation="pulse"
          sx={{
            borderRadius: "26px",
            bgcolor: "#d1d5db",
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default HomePage;
