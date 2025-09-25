"use client";
import Ellips from "@/app/components/svg/Ellips";
import { formatToIDR } from "@/app/utils/helper";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Link from "next/link";
import { useAuth } from "@/app/hooks/UseAuth";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import WalletSVG from "@/app/components/svg/Wallet";
import API from "@/app/utils/API";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import BlueShillouete from "@/app/components/svg/BlueShilloute";
import SquareSVG from "@/app/components/svg/Square";
import OpacityIcon from "@mui/icons-material/Opacity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import ActivityCard from "@/app/components/card/Activity";
import { Inbox } from "lucide-react";

const BerandaPage: React.FC = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    )
  );
  const [subscribed, setSubscribed] = useState<any>([]);
  const [activity, setActivity] = useState<any>([]);
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

  // const onCreateTopUp = () => {
  //   setIsLoading(true);
  //   API.post(
  //     `/midtrans/topup/${auth.auth.user?.id}`,
  //     {
  //       customerDetails: {
  //         userId: auth.auth.user?.id,
  //         firstName: auth.auth.user?.fullName.split(" ")[0],
  //         lastName: auth.auth.user?.fullName
  //           .split(" ")
  //           .slice(1, auth.auth.user.fullName.split(" ").length - 1)
  //           .join(" "),
  //         email: auth.auth.user?.email,
  //         phone: auth.auth.user?.phone,
  //       },
  //       paymentMethod: "QRIS",
  //       amount: 5000000,
  //     },
  //     { headers: { Authorization: auth.auth.token } }
  //   )
  //     .then((res) => {
  //       setIsLoading(false);
  //       toast.success(`${res.data.message}`, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       });
  //       if (res.data.redirectUrl) {
  //         navigation.push(res.data.redirectUrl);
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       toast.error(`${err.response.data.message}`, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       });
  //     });
  // };

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
      //   console.log(subscriptions);
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
      console.log(response.data.data);
      setActivity(response.data.data);
    } catch (err: any) {
      console.error("Error fetching activities:", err);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([getSubscribed(), getActivity()]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing data:", error);
        setIsLoading(false);
      }
    };

    initializeData();
  }, [auth.auth.isAuthenticated, selectedDate]);

  // useEffect #2: Interval khusus history
  // useEffect(() => {
  //   if (!subscribed?.[0]?.waterCredit?._id) return;

  //   const intervalId = setInterval(() => {
  //     getSubscribed();
  //   }, 1000); // 1 detik

  //   return () => clearInterval(intervalId);
  // }, [subscribed]);
  return (
    <div className=" w-full  flex flex-col gap-7 items-center">
      {/* bagian I */}
      <div className="w-full flex flex-col pt-12 pb-4 px-4 lg:pb-10 lg:pl-7 lg:pr-10 bg-[#202226] rounded-[32px] relative overflow-hidden gap-7 z-0">
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

        <div className=" w-full h-[223px] grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:gap-7">
          {!isLoading ? (
            <div className=" w-full h-full bg-gradient-to-b from-[#2D3288] to-[#4A57B4] rounded-2xl pt-6 pb-7 px-3 md:px-5 flex flex-col justify-between relative z-0 lg:shadow-[10px_10px_0px_#646ACF]">
              <div className=" w-full absolute z-[-3] top-20">
                <h1 className=" font-extrabold font-montserrat bg-gradient-to-b from-white  to-[#4A57B4] bg-clip-text text-transparent text-[80px] absolute z-[-2] opacity-[0.7]">
                  Rp
                </h1>
              </div>
              <div className=" w-full flex gap-3 items-center">
                <div className="bg-white w-[40px] p-1 rounded-[8px]">
                  <WalletSVG />
                </div>
                <div className="flex flex-col text-white font-montserrat w-auto md:w-0 lg:w-auto font-extrabold text-[20px]">
                  <h1 className="">Estimasi Tagihan</h1>
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-[30px] md:text-2xl lg:text-4xl text-white w-full text-right pr-4">
                  {formatToIDR(
                    (3300 / 1000) *
                      subscribed[0]?.subscriptionDetails?.totalUsedWater?.toFixed(
                        2
                      )
                  )}
                </h1>
              </div>
            </div>
          ) : (
            <Skeleton
              variant="rounded"
              width="100%"
              height="100%"
              animation="pulse"
              sx={{
                bgcolor: "#d1d5db",
                borderRadius: "16px",
              }}
            />
          )}
          <div className=" w-full h-full p-5 col-span-2 hidden md:flex flex-col items-start justify-between bg-gradient-to-b from-[#2D3288] to-[#4A57B4] rounded-2xl lg:shadow-[10px_10px_0px_#646ACF]">
            <div className=" w-full flex gap-3 items-center">
              <div className="bg-white w-[40px] p-1 rounded-[8px]">
                <svg
                  className="w-full h-auto"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3333 6.45833C9.96737 6.45833 9.66081 6.33433 9.41367 6.08633C9.16653 5.83833 9.04253 5.53178 9.04167 5.16667C9.04081 4.80156 9.16481 4.495 9.41367 4.247C9.66253 3.999 9.96909 3.875 10.3333 3.875C10.6976 3.875 11.0046 3.999 11.2543 4.247C11.504 4.495 11.6276 4.80156 11.625 5.16667C11.6224 5.53178 11.4984 5.83876 11.253 6.08762C11.0076 6.33649 10.701 6.46006 10.3333 6.45833ZM20.6667 6.45833C20.3007 6.45833 19.9941 6.33433 19.747 6.08633C19.4999 5.83833 19.3759 5.53178 19.375 5.16667C19.3741 4.80156 19.4981 4.495 19.747 4.247C19.9959 3.999 20.3024 3.875 20.6667 3.875C21.0309 3.875 21.3379 3.999 21.5876 4.247C21.8374 4.495 21.9609 4.80156 21.9583 5.16667C21.9558 5.53178 21.8318 5.83876 21.5863 6.08762C21.3409 6.33649 21.0344 6.46006 20.6667 6.45833ZM5.16667 11.625C4.8007 11.625 4.49414 11.501 4.247 11.253C3.99987 11.005 3.87587 10.6984 3.875 10.3333C3.87414 9.96822 3.99814 9.66167 4.247 9.41367C4.49587 9.16567 4.80242 9.04167 5.16667 9.04167C5.53092 9.04167 5.83791 9.16567 6.08763 9.41367C6.33735 9.66167 6.46092 9.96822 6.45834 10.3333C6.45575 10.6984 6.33175 11.0054 6.08634 11.2543C5.84092 11.5032 5.53437 11.6267 5.16667 11.625ZM25.8333 11.625C25.4674 11.625 25.1608 11.501 24.9137 11.253C24.6665 11.005 24.5425 10.6984 24.5417 10.3333C24.5408 9.96822 24.6648 9.66167 24.9137 9.41367C25.1625 9.16567 25.4691 9.04167 25.8333 9.04167C26.1976 9.04167 26.5046 9.16567 26.7543 9.41367C27.004 9.66167 27.1276 9.96822 27.125 10.3333C27.1224 10.6984 26.9984 11.0054 26.753 11.2543C26.5076 11.5032 26.201 11.6267 25.8333 11.625ZM5.16667 21.9583C4.8007 21.9583 4.49414 21.8343 4.247 21.5863C3.99987 21.3383 3.87587 21.0318 3.875 20.6667C3.87414 20.3016 3.99814 19.995 4.247 19.747C4.49587 19.499 4.80242 19.375 5.16667 19.375C5.53092 19.375 5.83791 19.499 6.08763 19.747C6.33735 19.995 6.46092 20.3016 6.45834 20.6667C6.45575 21.0318 6.33175 21.3388 6.08634 21.5876C5.84092 21.8365 5.53437 21.9601 5.16667 21.9583ZM25.8333 21.9583C25.4674 21.9583 25.1608 21.8343 24.9137 21.5863C24.6665 21.3383 24.5425 21.0318 24.5417 20.6667C24.5408 20.3016 24.6648 19.995 24.9137 19.747C25.1625 19.499 25.4691 19.375 25.8333 19.375C26.1976 19.375 26.5046 19.499 26.7543 19.747C27.004 19.995 27.1276 20.3016 27.125 20.6667C27.1224 21.0318 26.9984 21.3388 26.753 21.5876C26.5076 21.8365 26.201 21.9601 25.8333 21.9583ZM10.3333 27.125C9.96737 27.125 9.66081 27.001 9.41367 26.753C9.16653 26.505 9.04253 26.1984 9.04167 25.8333C9.04081 25.4682 9.16481 25.1617 9.41367 24.9137C9.66253 24.6657 9.96909 24.5417 10.3333 24.5417C10.6976 24.5417 11.0046 24.6657 11.2543 24.9137C11.504 25.1617 11.6276 25.4682 11.625 25.8333C11.6224 26.1984 11.4984 26.5054 11.253 26.7543C11.0076 27.0032 10.701 27.1267 10.3333 27.125ZM20.6667 27.125C20.3007 27.125 19.9941 27.001 19.747 26.753C19.4999 26.505 19.3759 26.1984 19.375 25.8333C19.3741 25.4682 19.4981 25.1617 19.747 24.9137C19.9959 24.6657 20.3024 24.5417 20.6667 24.5417C21.0309 24.5417 21.3379 24.6657 21.5876 24.9137C21.8374 25.1617 21.9609 25.4682 21.9583 25.8333C21.9558 26.1984 21.8318 26.5054 21.5863 26.7543C21.3409 27.0032 21.0344 27.1267 20.6667 27.125ZM11.625 21.9583C10.9146 21.9583 10.3066 21.7056 9.80117 21.2001C9.2957 20.6947 9.04253 20.0863 9.04167 19.375V11.625C9.04167 10.9146 9.29484 10.3066 9.80117 9.80117C10.3075 9.29569 10.9154 9.04253 11.625 9.04167H19.375C20.0854 9.04167 20.6938 9.29483 21.2001 9.80117C21.7065 10.3075 21.9592 10.9154 21.9583 11.625V19.375C21.9583 20.0854 21.7056 20.6938 21.2001 21.2001C20.6947 21.7065 20.0863 21.9592 19.375 21.9583H11.625Z"
                    fill="#3640F0"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-white font-montserrat font-extrabold text-[20px]">
                <h1 className="">Akses Cepat</h1>
              </div>
            </div>

            <div className=" w-full grid grid-cols-4 gap-4 text-white">
              <Link
                href={"/pembayaran"}
                className=" w-full flex md:flex-col lg:flex-row gap-4 items-center  md:justify-center lg:justify-start p-4 rounded-xl bg-[#6169F5] border-[1px] border-[#9EA3F2] hover:[transform:translate(0px,-5px)] hover:shadow-[0px_7px_10px_rgba(0,0,0,0.25)] duration-300"
              >
                <div className="w-[40px] lg:w-[60px] lg:p-1 lg:bg-white rounded-lg">
                  <svg
                    className="w-full h-auto "
                    viewBox="0 0 80 80"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-[#CCCEFF] lg:fill-[#6169F5]"
                      d="M16.4399 14.2861C13.5983 14.2861 10.873 15.415 8.86373 17.4243C6.85441 19.4336 5.72559 22.1588 5.72559 25.0004V27.1433H74.2856V25.0004C74.2856 22.1588 73.1568 19.4336 71.1474 17.4243C69.1381 15.415 66.4129 14.2861 63.5713 14.2861H16.4399ZM5.72559 55.0004V31.429H74.2856V55.0004C74.2856 57.842 73.1568 60.5672 71.1474 62.5766C69.1381 64.5859 66.4129 65.7147 63.5713 65.7147H16.4427C13.6011 65.7147 10.8759 64.5859 8.86659 62.5766C6.85727 60.5672 5.72844 57.842 5.72844 55.0004M52.1427 47.1433C51.5744 47.1433 51.0294 47.369 50.6275 47.7709C50.2256 48.1728 49.9999 48.7178 49.9999 49.2861C49.9999 49.8545 50.2256 50.3995 50.6275 50.8014C51.0294 51.2032 51.5744 51.429 52.1427 51.429H62.1427C62.711 51.429 63.2561 51.2032 63.658 50.8014C64.0598 50.3995 64.2856 49.8545 64.2856 49.2861C64.2856 48.7178 64.0598 48.1728 63.658 47.7709C63.2561 47.369 62.711 47.1433 62.1427 47.1433H52.1427Z"
                    />
                  </svg>
                </div>
                <h1 className="hidden font-semibold font-poppins text-base  lg:block">
                  Pembayaran
                </h1>
              </Link>
              <Link
                href={"/riwayat-tagihan"}
                className="w-full flex md:flex-col lg:flex-row gap-4 items-center  md:justify-center lg:justify-start p-4 rounded-xl bg-[#6169F5] border-[1px] border-[#9EA3F2] hover:[transform:translate(0px,-5px)] hover:shadow-[0px_7px_10px_rgba(0,0,0,0.25)] duration-300"
              >
                <div className="w-[35px] lg:w-[60px] lg:p-1.5 lg:bg-white rounded-lg">
                  <svg
                    className="w-full h-auto"
                    viewBox="0 0 63 63"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M38.0628 7.21875C38.0628 6.69661 38.2702 6.19585 38.6394 5.82663C39.0086 5.45742 39.5094 5.25 40.0315 5.25H55.7815C56.3037 5.25 56.8044 5.45742 57.1736 5.82663C57.5429 6.19585 57.7503 6.69661 57.7503 7.21875V22.9688C57.7503 23.4909 57.5429 23.9917 57.1736 24.3609C56.8044 24.7301 56.3037 24.9375 55.7815 24.9375C55.2594 24.9375 54.7586 24.7301 54.3894 24.3609C54.0202 23.9917 53.8128 23.4909 53.8128 22.9688V11.97L36.1728 29.61C35.9925 29.8034 35.7752 29.9586 35.5337 30.0662C35.2922 30.1738 35.0315 30.2316 34.7672 30.2363C34.5028 30.241 34.2402 30.1923 33.9951 30.0933C33.7499 29.9943 33.5273 29.8469 33.3403 29.66C33.1534 29.473 33.006 29.2503 32.907 29.0052C32.8079 28.76 32.7593 28.4975 32.764 28.2331C32.7686 27.9688 32.8265 27.7081 32.9341 27.4666C33.0417 27.2251 33.1969 27.0077 33.3903 26.8275L51.0303 9.1875H40.0315C39.5094 9.1875 39.0086 8.98008 38.6394 8.61087C38.2702 8.24165 38.0628 7.7409 38.0628 7.21875Z"
                      className="fill-[#CCCEFF] lg:fill-[#6169F5]"
                    />
                    <path
                      d="M29.5312 7.21875C15.0334 7.21875 3.28125 18.9709 3.28125 33.4687C3.28125 47.9666 15.0334 59.7187 29.5312 59.7187C44.0291 59.7187 55.7812 47.9666 55.7812 33.4687C55.7795 31.8937 55.6447 30.3581 55.377 28.8619C53.8839 28.7594 52.4854 28.094 51.4641 27.0001C50.4428 25.9062 49.8748 24.4653 49.875 22.9687V21.4777L38.9576 32.3951C37.85 33.5028 36.3477 34.125 34.7812 34.125C33.2148 34.125 31.7125 33.5028 30.6049 32.3951C29.4972 31.2875 28.875 29.7852 28.875 28.2187C28.875 26.6523 29.4972 25.15 30.6049 24.0424L41.5222 13.125H40.0312C38.5347 13.1252 37.0938 12.5572 35.9999 11.5359C34.906 10.5146 34.2406 9.11607 34.1381 7.623C32.6401 7.35525 31.1045 7.2205 29.5312 7.21875Z"
                      className="fill-[#CCCEFF] lg:fill-[#6169F5]"
                    />
                  </svg>
                </div>
                <h1 className="hidden font-semibold font-poppins text-base  lg:block">
                  Riwayat Tagihan
                </h1>
              </Link>
              <Link
                href={"/lapor-kebocoran"}
                className=" w-full flex md:flex-col lg:flex-row gap-4 items-center  md:justify-center lg:justify-start p-4 rounded-xl bg-[#6169F5] border-[1px] border-[#9EA3F2] hover:[transform:translate(0px,-5px)] hover:shadow-[0px_7px_10px_rgba(0,0,0,0.25)] duration-300"
              >
                <div className="w-[40px] lg:w-[60px] lg:p-1 lg:bg-white rounded-lg">
                  <svg
                    className="w-full h-auto"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M60 58.3333H20V35C20 23.955 28.955 15 40 15C51.045 15 60 23.955 60 35V58.3333Z"
                      className="fill-[#CCCEFF] lg:fill-[#6169F5] stroke-[#CCCEFF] lg:stroke-[#6169F5]"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.3337 70.0003H66.667M6.66699 21.667L11.667 23.3337M21.667 6.66699L23.3337 11.667M16.667 16.667L11.667 11.667"
                      stroke="#CCCEFF"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <h1 className="hidden font-semibold font-poppins text-base  lg:block">
                  Laporan
                </h1>
              </Link>
              <Link
                href={"/monitoring"}
                className=" w-full flex md:flex-col lg:flex-row gap-4 items-center  md:justify-center lg:justify-start p-4 rounded-xl bg-[#6169F5] border-[1px] border-[#9EA3F2] hover:[transform:translate(0px,-5px)] hover:shadow-[0px_7px_10px_rgba(0,0,0,0.25)] duration-300"
              >
                <div className="w-[30px] lg:w-[60px] lg:p-2 lg:bg-white rounded-lg">
                  <svg
                    className="w-full h-auto"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.25 0.0537109C11.6013 0.956711 0 13.1227 0 28C0 35.1377 2.67167 41.65 7.06767 46.5967L26.25 27.2767V0.0537109ZM28.728 29.75L9.55033 49.063C14.6506 53.5444 21.2107 56.011 28 56C42.8773 56 55.0433 44.3987 55.9463 29.75H28.728ZM29.75 0.0537109C43.82 0.921711 55.0783 12.18 55.9463 26.25H29.75V0.0537109Z"
                      className="fill-[#CCCEFF] lg:fill-[#6169F5]"
                    />
                  </svg>
                </div>
                <h1 className="hidden font-semibold font-poppins text-base  lg:block">
                  Monitoring
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* bagian I */}

      {/* Akses cepat mobile */}
      <div className=" w-full p-5 col-span-2 flex md:hidden flex-col items-start justify-center gap-5 bg-gradient-to-b from-[#2D3288] to-[#4A57B4] rounded-2xl lg:shadow-[10px_10px_0px_#646ACF]">
        <div className=" w-full flex gap-3 items-center">
          <div className="bg-white w-[40px] p-1 rounded-[8px]">
            <svg
              className="w-full h-auto"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3333 6.45833C9.96737 6.45833 9.66081 6.33433 9.41367 6.08633C9.16653 5.83833 9.04253 5.53178 9.04167 5.16667C9.04081 4.80156 9.16481 4.495 9.41367 4.247C9.66253 3.999 9.96909 3.875 10.3333 3.875C10.6976 3.875 11.0046 3.999 11.2543 4.247C11.504 4.495 11.6276 4.80156 11.625 5.16667C11.6224 5.53178 11.4984 5.83876 11.253 6.08762C11.0076 6.33649 10.701 6.46006 10.3333 6.45833ZM20.6667 6.45833C20.3007 6.45833 19.9941 6.33433 19.747 6.08633C19.4999 5.83833 19.3759 5.53178 19.375 5.16667C19.3741 4.80156 19.4981 4.495 19.747 4.247C19.9959 3.999 20.3024 3.875 20.6667 3.875C21.0309 3.875 21.3379 3.999 21.5876 4.247C21.8374 4.495 21.9609 4.80156 21.9583 5.16667C21.9558 5.53178 21.8318 5.83876 21.5863 6.08762C21.3409 6.33649 21.0344 6.46006 20.6667 6.45833ZM5.16667 11.625C4.8007 11.625 4.49414 11.501 4.247 11.253C3.99987 11.005 3.87587 10.6984 3.875 10.3333C3.87414 9.96822 3.99814 9.66167 4.247 9.41367C4.49587 9.16567 4.80242 9.04167 5.16667 9.04167C5.53092 9.04167 5.83791 9.16567 6.08763 9.41367C6.33735 9.66167 6.46092 9.96822 6.45834 10.3333C6.45575 10.6984 6.33175 11.0054 6.08634 11.2543C5.84092 11.5032 5.53437 11.6267 5.16667 11.625ZM25.8333 11.625C25.4674 11.625 25.1608 11.501 24.9137 11.253C24.6665 11.005 24.5425 10.6984 24.5417 10.3333C24.5408 9.96822 24.6648 9.66167 24.9137 9.41367C25.1625 9.16567 25.4691 9.04167 25.8333 9.04167C26.1976 9.04167 26.5046 9.16567 26.7543 9.41367C27.004 9.66167 27.1276 9.96822 27.125 10.3333C27.1224 10.6984 26.9984 11.0054 26.753 11.2543C26.5076 11.5032 26.201 11.6267 25.8333 11.625ZM5.16667 21.9583C4.8007 21.9583 4.49414 21.8343 4.247 21.5863C3.99987 21.3383 3.87587 21.0318 3.875 20.6667C3.87414 20.3016 3.99814 19.995 4.247 19.747C4.49587 19.499 4.80242 19.375 5.16667 19.375C5.53092 19.375 5.83791 19.499 6.08763 19.747C6.33735 19.995 6.46092 20.3016 6.45834 20.6667C6.45575 21.0318 6.33175 21.3388 6.08634 21.5876C5.84092 21.8365 5.53437 21.9601 5.16667 21.9583ZM25.8333 21.9583C25.4674 21.9583 25.1608 21.8343 24.9137 21.5863C24.6665 21.3383 24.5425 21.0318 24.5417 20.6667C24.5408 20.3016 24.6648 19.995 24.9137 19.747C25.1625 19.499 25.4691 19.375 25.8333 19.375C26.1976 19.375 26.5046 19.499 26.7543 19.747C27.004 19.995 27.1276 20.3016 27.125 20.6667C27.1224 21.0318 26.9984 21.3388 26.753 21.5876C26.5076 21.8365 26.201 21.9601 25.8333 21.9583ZM10.3333 27.125C9.96737 27.125 9.66081 27.001 9.41367 26.753C9.16653 26.505 9.04253 26.1984 9.04167 25.8333C9.04081 25.4682 9.16481 25.1617 9.41367 24.9137C9.66253 24.6657 9.96909 24.5417 10.3333 24.5417C10.6976 24.5417 11.0046 24.6657 11.2543 24.9137C11.504 25.1617 11.6276 25.4682 11.625 25.8333C11.6224 26.1984 11.4984 26.5054 11.253 26.7543C11.0076 27.0032 10.701 27.1267 10.3333 27.125ZM20.6667 27.125C20.3007 27.125 19.9941 27.001 19.747 26.753C19.4999 26.505 19.3759 26.1984 19.375 25.8333C19.3741 25.4682 19.4981 25.1617 19.747 24.9137C19.9959 24.6657 20.3024 24.5417 20.6667 24.5417C21.0309 24.5417 21.3379 24.6657 21.5876 24.9137C21.8374 25.1617 21.9609 25.4682 21.9583 25.8333C21.9558 26.1984 21.8318 26.5054 21.5863 26.7543C21.3409 27.0032 21.0344 27.1267 20.6667 27.125ZM11.625 21.9583C10.9146 21.9583 10.3066 21.7056 9.80117 21.2001C9.2957 20.6947 9.04253 20.0863 9.04167 19.375V11.625C9.04167 10.9146 9.29484 10.3066 9.80117 9.80117C10.3075 9.29569 10.9154 9.04253 11.625 9.04167H19.375C20.0854 9.04167 20.6938 9.29483 21.2001 9.80117C21.7065 10.3075 21.9592 10.9154 21.9583 11.625V19.375C21.9583 20.0854 21.7056 20.6938 21.2001 21.2001C20.6947 21.7065 20.0863 21.9592 19.375 21.9583H11.625Z"
                fill="#3640F0"
              />
            </svg>
          </div>
          <div className="flex flex-col text-white font-montserrat font-extrabold text-[20px]">
            <h1 className="">Akses Cepat</h1>
          </div>
        </div>

        <div className=" w-full grid grid-cols-1 gap-4 text-white">
          <Link
            href={"/pembayaran"}
            className=" w-full flex md:flex-col lg:flex-row gap-4 items-center  md:justify-center lg:justify-start py-1 px-2 rounded-xl bg-[#6169F5] border-[1px] border-[#9EA3F2] hover:[transform:translate(0px,-5px)] hover:shadow-[0px_7px_10px_rgba(0,0,0,0.25)] duration-300"
          >
            <div className="w-[40px] lg:w-[60px] lg:p-1 lg:bg-white rounded-lg">
              <svg
                className="w-full h-auto "
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-[#CCCEFF] lg:fill-[#6169F5]"
                  d="M16.4399 14.2861C13.5983 14.2861 10.873 15.415 8.86373 17.4243C6.85441 19.4336 5.72559 22.1588 5.72559 25.0004V27.1433H74.2856V25.0004C74.2856 22.1588 73.1568 19.4336 71.1474 17.4243C69.1381 15.415 66.4129 14.2861 63.5713 14.2861H16.4399ZM5.72559 55.0004V31.429H74.2856V55.0004C74.2856 57.842 73.1568 60.5672 71.1474 62.5766C69.1381 64.5859 66.4129 65.7147 63.5713 65.7147H16.4427C13.6011 65.7147 10.8759 64.5859 8.86659 62.5766C6.85727 60.5672 5.72844 57.842 5.72844 55.0004M52.1427 47.1433C51.5744 47.1433 51.0294 47.369 50.6275 47.7709C50.2256 48.1728 49.9999 48.7178 49.9999 49.2861C49.9999 49.8545 50.2256 50.3995 50.6275 50.8014C51.0294 51.2032 51.5744 51.429 52.1427 51.429H62.1427C62.711 51.429 63.2561 51.2032 63.658 50.8014C64.0598 50.3995 64.2856 49.8545 64.2856 49.2861C64.2856 48.7178 64.0598 48.1728 63.658 47.7709C63.2561 47.369 62.711 47.1433 62.1427 47.1433H52.1427Z"
                />
              </svg>
            </div>
            <h1 className=" font-semibold font-poppins text-sm">Pembayaran</h1>
          </Link>
          <Link
            href={"/riwayat-tagihan"}
            className="w-full flex md:flex-col lg:flex-row gap-4 items-center  md:justify-center lg:justify-start py-1 px-2 rounded-xl bg-[#6169F5] border-[1px] border-[#9EA3F2] hover:[transform:translate(0px,-5px)] hover:shadow-[0px_7px_10px_rgba(0,0,0,0.25)] duration-300"
          >
            <div className="w-[40px] lg:w-[60px] p-1 lg:bg-white rounded-lg">
              <svg
                className="w-full h-auto"
                viewBox="0 0 63 63"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M38.0628 7.21875C38.0628 6.69661 38.2702 6.19585 38.6394 5.82663C39.0086 5.45742 39.5094 5.25 40.0315 5.25H55.7815C56.3037 5.25 56.8044 5.45742 57.1736 5.82663C57.5429 6.19585 57.7503 6.69661 57.7503 7.21875V22.9688C57.7503 23.4909 57.5429 23.9917 57.1736 24.3609C56.8044 24.7301 56.3037 24.9375 55.7815 24.9375C55.2594 24.9375 54.7586 24.7301 54.3894 24.3609C54.0202 23.9917 53.8128 23.4909 53.8128 22.9688V11.97L36.1728 29.61C35.9925 29.8034 35.7752 29.9586 35.5337 30.0662C35.2922 30.1738 35.0315 30.2316 34.7672 30.2363C34.5028 30.241 34.2402 30.1923 33.9951 30.0933C33.7499 29.9943 33.5273 29.8469 33.3403 29.66C33.1534 29.473 33.006 29.2503 32.907 29.0052C32.8079 28.76 32.7593 28.4975 32.764 28.2331C32.7686 27.9688 32.8265 27.7081 32.9341 27.4666C33.0417 27.2251 33.1969 27.0077 33.3903 26.8275L51.0303 9.1875H40.0315C39.5094 9.1875 39.0086 8.98008 38.6394 8.61087C38.2702 8.24165 38.0628 7.7409 38.0628 7.21875Z"
                  className="fill-[#CCCEFF] lg:fill-[#6169F5]"
                />
                <path
                  d="M29.5312 7.21875C15.0334 7.21875 3.28125 18.9709 3.28125 33.4687C3.28125 47.9666 15.0334 59.7187 29.5312 59.7187C44.0291 59.7187 55.7812 47.9666 55.7812 33.4687C55.7795 31.8937 55.6447 30.3581 55.377 28.8619C53.8839 28.7594 52.4854 28.094 51.4641 27.0001C50.4428 25.9062 49.8748 24.4653 49.875 22.9687V21.4777L38.9576 32.3951C37.85 33.5028 36.3477 34.125 34.7812 34.125C33.2148 34.125 31.7125 33.5028 30.6049 32.3951C29.4972 31.2875 28.875 29.7852 28.875 28.2187C28.875 26.6523 29.4972 25.15 30.6049 24.0424L41.5222 13.125H40.0312C38.5347 13.1252 37.0938 12.5572 35.9999 11.5359C34.906 10.5146 34.2406 9.11607 34.1381 7.623C32.6401 7.35525 31.1045 7.2205 29.5312 7.21875Z"
                  className="fill-[#CCCEFF] lg:fill-[#6169F5]"
                />
              </svg>
            </div>
            <h1 className=" font-semibold font-poppins text-sm">
              Riwayat Tagihan
            </h1>
          </Link>
          <Link
            href={"/lapor-kebocoran"}
            className=" w-full flex md:flex-col lg:flex-row gap-4 items-center  md:justify-center lg:justify-start py-1 px-2 rounded-xl bg-[#6169F5] border-[1px] border-[#9EA3F2] hover:[transform:translate(0px,-5px)] hover:shadow-[0px_7px_10px_rgba(0,0,0,0.25)] duration-300"
          >
            <div className="w-[40px] lg:w-[60px] lg:p-1 lg:bg-white rounded-lg">
              <svg
                className="w-full h-auto"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60 58.3333H20V35C20 23.955 28.955 15 40 15C51.045 15 60 23.955 60 35V58.3333Z"
                  className="fill-[#CCCEFF] lg:fill-[#6169F5] stroke-[#CCCEFF] lg:stroke-[#6169F5]"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.3337 70.0003H66.667M6.66699 21.667L11.667 23.3337M21.667 6.66699L23.3337 11.667M16.667 16.667L11.667 11.667"
                  stroke="#CCCEFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h1 className=" font-semibold font-poppins text-sm">Laporan</h1>
          </Link>
          <Link
            href={"/monitoring"}
            className=" w-full flex md:flex-col lg:flex-row gap-4 items-center  md:justify-center lg:justify-start py-1 px-2 rounded-xl bg-[#6169F5] border-[1px] border-[#9EA3F2] hover:[transform:translate(0px,-5px)] hover:shadow-[0px_7px_10px_rgba(0,0,0,0.25)] duration-300"
          >
            <div className="w-[40px] lg:w-[60px] p-1 lg:bg-white rounded-lg">
              <svg
                className="w-full h-auto"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26.25 0.0537109C11.6013 0.956711 0 13.1227 0 28C0 35.1377 2.67167 41.65 7.06767 46.5967L26.25 27.2767V0.0537109ZM28.728 29.75L9.55033 49.063C14.6506 53.5444 21.2107 56.011 28 56C42.8773 56 55.0433 44.3987 55.9463 29.75H28.728ZM29.75 0.0537109C43.82 0.921711 55.0783 12.18 55.9463 26.25H29.75V0.0537109Z"
                  className="fill-[#CCCEFF] lg:fill-[#6169F5]"
                />
              </svg>
            </div>
            <h1 className=" font-semibold font-poppins text-sm">Monitoring</h1>
          </Link>
        </div>
      </div>
      {/* Akses cepat mobile */}

      {/* Bagian II */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Tanggal & Notif */}
        {!isLoading ? (
          <div className="w-full bg-gradient-to-br from-[#313976] to-[#5C6ADC] rounded-[26px] lg:col-span-2 flex flex-col gap-4 px-4 py-5 lg:p-7">
            <div className=" flex items-center gap-1">
              <CalendarMonthIcon sx={{ color: "white" }} />
              <h1 className=" font-poppins font-medium text-lg text-white">
                Aktivitas Terakhir
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
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

                  {/* Calendar days */}
                  {getDaysArray().map((day, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-lg text-center ${
                        day === null
                          ? "bg-transparent"
                          : "bg-[#A7ACFF] hover:bg-gray-700 cursor-pointer"
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
                              ? "bg-[#ffffff] text-black"
                              : isSelected(day)
                              ? "bg-gray-700 text-white"
                              : "text-black hover:text-white"
                          }`}
                        >
                          <h1 className=" text-[9px]   font-normal">
                            {getMonthShort(currentDate.getMonth())}
                          </h1>
                          <h1 className=" text-xs font-normal">{day}</h1>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                {activity.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-2xl text-white">
                    <Inbox className="w-12 h-12 mb-3 text-white" />
                    <p className="text-lg font-semibold">Belum ada aktivitas</p>
                    <p className="text-sm ">
                      Aktivitas terbaru akan tampil di sini
                    </p>
                  </div>
                ) : (
                  activity
                    .slice(0, 5)
                    .map((data: any, i: number) => (
                      <ActivityCard activity={data} key={i} />
                    ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className=" w-full lg:col-span-2">
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
          </div>
        )}
        {/* Tanggal & Notif */}

        {/* Grafik Air */}
        <div className=" w-full h-[251px] order-first lg:order-last md:h-[400px] lg:h-auto rounded-[26px] bg-[#202226] relative z-0 overflow-hidden p-5 lg:p-7 flex flex-col justify-between">
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
        {/* Grafik Air */}
      </div>
      {/* Bagian II */}
    </div>
  );
};

export default BerandaPage;
