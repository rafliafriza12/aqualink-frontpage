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
// import { TrendingUp, TrendingDown } from "lucide-react";
// import { toast, Bounce, ToastContainer } from "react-toastify";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

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
  const [isShowBalance, setIsShowBalance] = useState<boolean>(false);
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

  const getWallet = async () => {
    try {
      const res = await API.get(
        `/wallet/getWalletByUserId/${auth.auth.user?.id}`,
        {
          headers: {
            Authorization: auth.auth.token,
          },
        }
      );
      setWallet(res.data.data);
    } catch (err) {
      console.log(err);
    }
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
      console.log(subscriptions);
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
    } catch (err: any) {
      console.error("Error fetching activities:", err);
    }
  };

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth");
      return;
    }

    const initializeData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([getWallet(), getSubscribed(), getActivity()]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing data:", error);
        setIsLoading(false);
      }
    };

    // initializeData();

    // const interval = setInterval(initializeData, 10000);
    initializeData();
    // return () => clearInterval(interval);
  }, [
    auth.auth.isAuthenticated,
    navigation,
    selectedDate,
    showClaimTokenModal,
  ]);

  if (!auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }

  return isDesktop ? //               <Skeleton //               /> //                 width={140} //                 sx={{ fontSize: "14px", bgcolor: "#d1d5db" }} //                 variant="text" //               <Skeleton //             <> //           ) : ( //             </> //               </h1> //                 Hi, {auth.auth.user?.fullName} //               <h1 className="font-semibold text-xl"> //               <h6 className="text-sm">Have a good day! 👋</h6> //             <> //           {!isLoading ? ( //         <div className="flex flex-col text-white gap-1"> //       <div className="flex justify-between items-center bg-[#202226] p-6 rounded-[32px]"> //       {/* Welcome Header */} //     <div className="w-2/3 flex flex-col gap-6"> //     {/* Left Column - Welcome & Stats */} //   <div className="flex justify-between items-start gap-8"> //   {/* Top Section */} // <div className="w-full p-8 flex flex-col gap-8 font-poppins ">
  //                 variant="text"
  //                 sx={{ fontSize: "20px", bgcolor: "#d1d5db" }}
  //                 width={180}
  //               />
  //             </>
  //           )}
  //         </div>
  //         <div>
  //           {!isLoading ? (
  //             <Link href="/notifikasi">
  //               <NotificationsNoneOutlinedIcon
  //                 sx={{ color: "#ffffff", fontSize: "32px" }}
  //               />
  //             </Link>
  //           ) : (
  //             <Skeleton
  //               variant="circular"
  //               width={32}
  //               height={32}
  //               sx={{ bgcolor: "#d1d5db" }}
  //             />
  //           )}
  //         </div>
  //       </div>

  //       {/* Stats Cards */}
  //       <div className="grid grid-cols-2 gap-6">
  //         {/* Balance Card */}
  //         {!isLoading ? (
  //           <div className="bg-[#3640F0] rounded-2xl p-6 flex flex-col justify-between h-[200px]">
  //             <div className="flex gap-3 items-center">
  //               <div className="bg-white p-2 rounded-lg">
  //                 <WalletSVG />
  //               </div>
  //               <div className="text-white font-montserrat font-bold">
  //                 <h1 className="text-2xl">Saldo</h1>
  //                 <h1 className="text-2xl">Anda</h1>
  //               </div>
  //             </div>
  //             <h1 className="font-extrabold text-2xl text-white">
  //               {formatToIDR(wallet?.balance ?? 0)}
  //             </h1>
  //           </div>
  //         ) : (
  //           <Skeleton
  //             variant="rounded"
  //             height={200}
  //             sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
  //           />
  //         )}

  //         {/* Token Card */}
  //         {!isLoading ? (
  //           <div className="bg-[#7D83EF] rounded-2xl p-6 flex flex-col justify-between h-[200px]">
  //             <div className="flex gap-3 items-center">
  //               <div className="bg-white p-2 rounded-full">
  //                 <TokenSVG />
  //               </div>
  //               <div className="text-white font-montserrat font-bold">
  //                 <h1 className="text-xl">Jumlah</h1>
  //                 <h1 className="text-2xl">Token</h1>
  //               </div>
  //             </div>
  //             <h1 className="font-extrabold font-montserrat text-white text-3xl">
  //               {wallet?.conservationToken ?? 0}
  //             </h1>
  //           </div>
  //         ) : (
  //           <Skeleton
  //             variant="rounded"
  //             height={200}
  //             sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
  //           />
  //         )}
  //       </div>

  //       {/* Action Buttons */}
  //       <div className="grid grid-cols-3 gap-6">
  //         {!isLoading ? (
  //           <>
  //             <div className="bg-[#414BF1] rounded-2xl p-6 flex flex-col items-center gap-4">
  //               <div className="bg-white p-3 rounded-2xl border-2 border-[#A4B0CC]">
  //                 <TopUpSVG />
  //               </div>
  //               <h1 className="font-montserrat font-bold text-white">
  //                 Top Up
  //               </h1>
  //             </div>
  //             <div className="bg-[#414BF1] rounded-2xl p-6 flex flex-col items-center gap-4">
  //               <div className="bg-white p-3 rounded-2xl border-2 border-[#A4B0CC]">
  //                 <ClaimTokenSVG size={47} />
  //               </div>
  //               <h1 className="font-montserrat font-bold text-white">
  //                 Klaim Token
  //               </h1>
  //             </div>
  //             <div className="bg-[#414BF1] rounded-2xl p-6 flex flex-col items-center gap-4">
  //               <div className="bg-white p-3 rounded-2xl border-2 border-[#A4B0CC]">
  //                 <ConvertTokenSVG size={47} />
  //               </div>
  //               <h1 className="font-montserrat font-bold text-white">
  //                 Tukar Token
  //               </h1>
  //             </div>
  //           </>
  //         ) : (
  //           <>
  //             <Skeleton
  //               variant="rounded"
  //               height={160}
  //               sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
  //             />
  //             <Skeleton
  //               variant="rounded"
  //               height={160}
  //               sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
  //             />
  //             <Skeleton
  //               variant="rounded"
  //               height={160}
  //               sx={{ bgcolor: "#d1d5db", borderRadius: "16px" }}
  //             />
  //           </>
  //         )}
  //       </div>
  //     </div>

  //     {/* Right Column - Water Usage */}
  //     <div className="w-1/3 bg-[#202226] rounded-[26px] p-6 flex flex-col gap-6">
  //       <div className="flex flex-col gap-2">
  //         <div className="flex items-center gap-2">
  //           {!isLoading ? (
  //             <>
  //               <OpacityIcon sx={{ color: "#93B6E8" }} />
  //               <h1 className="font-montserrat font-bold text-2xl text-white">
  //                 Penggunaan Air
  //               </h1>
  //             </>
  //           ) : (
  //             <Skeleton
  //               variant="text"
  //               sx={{ fontSize: "24px", bgcolor: "#d1d5db" }}
  //               width={200}
  //             />
  //           )}
  //         </div>
  //         <div className="flex items-end gap-2">
  //           {!isLoading ? (
  //             <>
  //               <h1 className="font-montserrat font-extrabold text-4xl text-white">
  //                 1480
  //               </h1>
  //               <h6 className="font-inter text-[#8C8C8C] text-lg mb-2">
  //                 Liter
  //               </h6>
  //             </>
  //           ) : (
  //             <Skeleton
  //               variant="text"
  //               sx={{ fontSize: "36px", bgcolor: "#d1d5db" }}
  //               width={150}
  //             />
  //           )}
  //         </div>
  //       </div>

  //       {!isLoading ? (
  //         <div className="h-[300px]">
  //           <ResponsiveContainer width="100%" height="100%">
  //             <LineChart data={data}>
  //               <defs>
  //                 <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
  //                   <stop offset="0%" stopColor="#2983FF" stopOpacity={1} />
  //                   <stop offset="100%" stopColor="#6FC3FF" stopOpacity={1} />
  //                 </linearGradient>
  //               </defs>
  //               <Line
  //                 type="monotone"
  //                 dataKey="penggunaan"
  //                 stroke="url(#gradient)"
  //                 strokeWidth={2}
  //               />
  //               <Tooltip labelFormatter={(label) => `Hari: ${label}`} />
  //               <XAxis dataKey="name" tick={{ fontSize: 12 }} />
  //             </LineChart>
  //           </ResponsiveContainer>
  //         </div>
  //       ) : (
  //         <Skeleton
  //           variant="rounded"
  //           height={300}
  //           sx={{ bgcolor: "#d1d5db" }}
  //         />
  //       )}
  //     </div>
  //   </div>

  //   {/* Bottom Section - Calendar & Activities */}
  //   {!isLoading ? (
  //     <div className="bg-[#3568AD] rounded-[26px] p-6">
  //       <div className="flex justify-between items-start gap-8">
  //         {/* Calendar */}
  //         <div className="w-1/2">
  //           <div className="flex items-center gap-2 mb-6">
  //             <CalendarMonthIcon sx={{ color: "white" }} />
  //             <h1 className="font-medium text-xl text-white">
  //               Kalender Aktivitas
  //             </h1>
  //           </div>

  //           <div className="bg-[#444444] p-4 rounded-3xl">
  //             <div className="flex items-center justify-between mb-6">
  //               <button
  //                 onClick={() => changeMonth(-1)}
  //                 className="text-white"
  //               >
  //                 <ChevronLeft size={24} />
  //               </button>
  //               <h2 className="text-white text-xl font-semibold">
  //                 {formatDate(currentDate)}
  //               </h2>
  //               <button onClick={() => changeMonth(1)} className="text-white">
  //                 <ChevronRight size={24} />
  //               </button>
  //             </div>

  //             <div className="grid grid-cols-7 gap-4">
  //               {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
  //                 (day) => (
  //                   <div
  //                     key={day}
  //                     className="text-center text-white text-sm py-2"
  //                   >
  //                     {day}
  //                   </div>
  //                 )
  //               )}

  //               {getDaysArray().map((day, index) => (
  //                 <div
  //                   key={index}
  //                   className={`aspect-square rounded-lg ${
  //                     day === null
  //                       ? "bg-transparent"
  //                       : "bg-[#373737] hover:bg-gray-700 cursor-pointer"
  //                   }`}
  //                 >
  //                   {day && (
  //                     <button
  //                       onClick={() =>
  //                         setSelectedDate(
  //                           new Date(
  //                             currentDate.getFullYear(),
  //                             currentDate.getMonth(),
  //                             day
  //                           )
  //                         )
  //                       }
  //                       className={`w-full h-full flex flex-col items-center justify-center rounded-lg ${
  //                         isToday(day)
  //                           ? "bg-[#cccfce] text-black"
  //                           : isSelected(day)
  //                           ? "bg-white text-black"
  //                           : "text-white"
  //                       }`}
  //                     >
  //                       <span className="text-xs text-[#8C8C8C]">
  //                         {getMonthShort(currentDate.getMonth())}
  //                       </span>
  //                       <span className="text-sm">{day}</span>
  //                     </button>
  //                   )}
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </div>

  //         {/* Activities */}
  //         <div className="w-1/2">
  //           <div className="flex items-center justify-between mb-6">
  //             <h1 className="font-medium text-xl text-white">
  //               Aktivitas Terakhir
  //             </h1>
  //             <div className="flex gap-4">
  //               <TextField
  //                 id="search"
  //                 label="Search"
  //                 value={seacrh}
  //                 onChange={(e) => setSearch(e.target.value)}
  //                 sx={{
  //                   bgcolor: "#373731",
  //                   "& .MuiOutlinedInput-root": {
  //                     color: "white",
  //                     "& fieldset": { borderColor: "transparent" },
  //                     "&:hover fieldset": { borderColor: "transparent" },
  //                     "&.Mui-focused fieldset": {
  //                       borderColor: "transparent",
  //                     },
  //                   },
  //                   "& .MuiInputLabel-root": {
  //                     color: "#8C8C8C",
  //                     "&.Mui-focused": { color: "white" },
  //                   },
  //                 }}
  //               />
  //               <button className="p-3 rounded-xl bg-[#373731]">
  //                 <TuneIcon sx={{ color: "#8C8C8C" }} />
  //               </button>
  //             </div>
  //           </div>

  //           <div className="space-y-4">
  //             {activity.map((data: any, i: number) => (
  //               <ActivityCard activity={data} key={i} />
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   ) : (
  //     <Skeleton
  //       variant="rounded"
  //       height={600}
  //       sx={{ bgcolor: "#d1d5db", borderRadius: "26px" }}
  //     />
  //   )}
  // </div>
  null : (
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins relative z-0">
      {/* Claim Token Modal */}
      <ClaimTokenModal
        showClaimTokenModal={showClaimTokenModal}
        setShowClaimTokenModal={setShowClaimTokenModal}
        wallet={wallet}
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
                  {isShowBalance
                    ? formatToIDR(wallet?.balance ?? 0)
                    : "Rp ********"}
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
              <button
                onClick={() => setIsShowBalance(!isShowBalance)}
                className=" w-full h-[36.5%] bg-[#EDEDED] rounded-2xl flex justify-center items-center gap-2"
              >
                <div className=" bg-white p-2 rounded-full">
                  {isShowBalance ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </div>
                <div className=" font-montserrat font-extrabold text-sm">
                  <h1>{isShowBalance ? "Tutup" : "Lihat"} Saldo</h1>
                </div>
              </button>
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
                <svg
                  width="65"
                  height="65"
                  viewBox="175.7 78 490.6 436.9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="white">
                    <path d="m666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9v-22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6v-22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zm-101.4 106.7c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zm73.9-208.1c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zm53.8 142.9c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 420.9 296.5"
                        to="360 420.9 296.5"
                        dur="10s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <circle cx="420.9" cy="296.5" r="45.7">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 420.9 296.5"
                        to="360 420.9 296.5"
                        dur="10s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                </svg>
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
                <h1 className=" font-montserrat font-bold text-xs text-white opacity-0">
                  Placeholder
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
                <button
                  disabled={isLoading}
                  onClick={() => setShowClaimTokenModal(true)}
                  className="bg-white p-2 rounded-[15px] border-[2px] border-[#A4B0CC]"
                >
                  <ConvertTokenSVG size={47} />
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

      {/* <div className="w-full flex justify-between items-center">
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
      </div> */}

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

        {subscribed.length > 0 ? (
          subscribed[0]?.subscriptionDetails?.subscribeStatus ? (
            <>
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
                      {subscribed[0]?.subscriptionDetails?.totalUsedWater?.toFixed(
                        2
                      )}
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
                    <h6 className=" font-inter text-[#8C8C8C] text-sm">
                      Liter
                    </h6>
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
                        <linearGradient
                          id="gradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop
                            offset="0%"
                            stopColor="#2983FF"
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor="#6FC3FF"
                            stopOpacity={1}
                          />
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
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <OpacityIcon sx={{ color: "#93B6E8", fontSize: 48 }} />
              <div className="text-center">
                <h2 className="font-montserrat font-bold text-xl text-white mb-2">
                  Langganan Tidak Aktif
                </h2>
                <p className="font-inter text-[#8C8C8C] text-sm">
                  Silakan aktifkan kembali langganan Anda
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <OpacityIcon sx={{ color: "#93B6E8", fontSize: 48 }} />
            <div className="text-center">
              <h2 className="font-montserrat font-bold text-xl text-white mb-2">
                Belum Ada Data Penggunaan Air
              </h2>
              <p className="font-inter text-[#8C8C8C] text-sm">
                Anda belum berlangganan kredit air
              </p>
            </div>
          </div>
        )}
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
    </div>
  );
};

export default HomePage;
