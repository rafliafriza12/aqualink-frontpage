"use client";
import { House } from "lucide-react";
import Box from "@mui/material/Box";
import { useRef, useEffect } from "react";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CreditCardIcon from "@mui/icons-material/CreditCard";
const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [isScrollDown, setIsScrollDown] = useState<boolean>(false);
  const [navActivePosition, setNavActivePosition] = useState<string>(() => {
    if (pathname === "/beranda" || pathname.includes("beranda")) return "home";
    if (pathname === "/notifikasi" || pathname.includes("notifikasi"))
      return "notifikasi";
    if (pathname === "/lapor-kebocoran" || pathname.includes("lapor-kebocoran"))
      return "lapor-kebocoran";
    if (
      pathname === "/pembayaran" ||
      pathname.includes("pembayaran") ||
      pathname.includes("riwayat-tagihan")
    )
      return "pembayaran";
    if (pathname === "/monitoring" || pathname.includes("monitoring"))
      return "monitoring";
    if (
      pathname === "/profile" ||
      pathname.includes("profile") ||
      pathname.includes("faq")
    )
      return "profile";
    return "home";
  });

  const handleScroll = () => {
    const currentScrollPos: number =
      typeof window !== "undefined" ? window.scrollY : 0;
    if (Math.abs(currentScrollPos - prevScrollPos) > 100) {
      if (currentScrollPos > prevScrollPos) {
        setIsScrollDown(true);
        console.log("Down");
      } else {
        setIsScrollDown(false);
        console.log("Up");
      }
      setPrevScrollPos(currentScrollPos);
    }
  };

  useEffect(() => {
    if (pathname === "/beranda" || pathname.includes("beranda"))
      setNavActivePosition("home");
    if (pathname === "/lapor-kebocoran" || pathname.includes("lapor-kebocoran"))
      setNavActivePosition("lapor-kebocoran");
    if (
      pathname === "/pembayaran" ||
      pathname.includes("pembayaran") ||
      pathname.includes("riwayat-tagihan")
    )
      setNavActivePosition("pembayaran");
    if (pathname === "/notifikasi" || pathname.includes("notifikasi"))
      setNavActivePosition("notifikasi");
    if (pathname === "/monitoring" || pathname.includes("monitoring"))
      setNavActivePosition("monitoring");
    if (
      pathname === "/profile" ||
      pathname.includes("profile") ||
      pathname.includes("faq")
    )
      setNavActivePosition("profile");
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [prevScrollPos]);

  return (
    <>
      <div
        className={`w-full h-[74px] hidden lg:flex justify-center items-center fixed z-[150]  left-0 ${
          isScrollDown ? "top-[-15%]" : "top-0"
        } pt-10 duration-300`}
      >
        <div className="bg-[#282A63] w-[85%] flex items-center justify-between py-3 px-5 rounded-full  ">
          <Link
            href={"/beranda"}
            className="p-2 pr-5 bg-[#535BEB] rounded-full flex items-center gap-3"
          >
            <div className="w-[43px] h-[43px] bg-white rounded-full relative">
              <Image
                src={"/assets/logo/Aqualink_2.png"}
                alt="Flowin"
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" flex flex-col items-start text-white ">
              <h1 className="font-nasalization font-bold">FLOWIN</h1>
              <h1 className="font-montserrat font-normal text-xs -mt-1">
                Water Management
              </h1>
            </div>
          </Link>
          <div className="flex items-center gap-4 -ml-[4%]">
            <Link
              href={"/beranda"}
              className={`flex justify-start items-center relative z-0  ${
                navActivePosition === "home"
                  ? "w-[180px]"
                  : "w-[57px] hover:w-[180px] group"
              }  duration-300`}
            >
              <div
                className={`${
                  navActivePosition === "home"
                    ? "bg-[#515cbd]"
                    : "bg-[#535BEB] group-hover:bg-[#515cbd]"
                } duration-300 w-[57px] h-[57px] rounded-full flex justify-center items-center`}
              >
                <House color=" white" size={26} />
              </div>
              <div
                className={`absolute z-[-1] h-full duration-300 rounded-full  ${
                  navActivePosition === "home"
                    ? "w-full rounded-r-none pr-3"
                    : "w-[57px] group-hover:w-full group-hover:rounded-r-none group-hover:pr-3"
                }  bg-gradient-to-r from-[#4554CF] to-transparent flex items-center justify-end  overflow-hidden`}
              >
                <h1
                  className={`duration-500 ${
                    navActivePosition === "home"
                      ? "opacity-[1]"
                      : "opacity-0 group-hover:opacity-[1]"
                  } opacity-0 group-hover:opacity-[1] text-white font-montserrat font-medium`}
                >
                  Dashboard
                </h1>
              </div>
            </Link>
            <Link
              href={"/monitoring"}
              className={`flex justify-start items-center relative z-0  ${
                navActivePosition === "monitoring"
                  ? "w-[180px]"
                  : "w-[57px] hover:w-[180px] group"
              }  duration-300`}
            >
              <div
                className={`${
                  navActivePosition === "monitoring"
                    ? "bg-[#515cbd]"
                    : "bg-[#535BEB] group-hover:bg-[#515cbd]"
                } duration-300 w-[57px] h-[57px] rounded-full flex justify-center items-center`}
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_8871_920)">
                    <path
                      d="M18.6045 9.5928V11.9184C18.6045 12.1497 18.5127 12.3715 18.3491 12.535C18.1856 12.6986 17.9637 12.7905 17.7324 12.7905C17.5012 12.7905 17.2793 12.6986 17.1158 12.535C16.9522 12.3715 16.8604 12.1497 16.8604 11.9184V11.6986L13.465 15.0928C13.3753 15.1848 13.266 15.2552 13.1451 15.2987C13.0242 15.3422 12.8951 15.3577 12.7673 15.344C12.6389 15.3316 12.5149 15.2907 12.4042 15.2243C12.2936 15.158 12.1992 15.0677 12.1278 14.9602L10.858 13.0556L7.88361 16.023C7.71829 16.1771 7.49963 16.2609 7.2737 16.257C7.04777 16.253 6.8322 16.1614 6.67242 16.0017C6.51264 15.8419 6.42111 15.6263 6.41713 15.4004C6.41314 15.1744 6.49701 14.9558 6.65105 14.7905L10.372 11.0695C10.4612 10.9769 10.5705 10.9061 10.6915 10.8625C10.8125 10.819 10.9419 10.8039 11.0697 10.8184C11.1981 10.8307 11.3221 10.8716 11.4328 10.938C11.5434 11.0044 11.6378 11.0946 11.7092 11.2021L12.979 13.1068L15.622 10.4649H15.4069C15.1756 10.4649 14.9538 10.373 14.7902 10.2095C14.6267 10.0459 14.5348 9.82409 14.5348 9.5928C14.5348 9.3615 14.6267 9.13968 14.7902 8.97613C14.9538 8.81258 15.1756 8.7207 15.4069 8.7207H17.7324C17.9635 8.72162 18.1847 8.8138 18.3481 8.97715C18.5114 9.1405 18.6036 9.36179 18.6045 9.5928Z"
                      fill="white"
                    />
                    <path
                      d="M15.9884 0H9.01163C2.69419 0 0 2.69419 0 9.01163V15.9884C0 22.3058 2.69419 25 9.01163 25H15.9884C22.3058 25 25 22.3058 25 15.9884V9.01163C25 2.69419 22.3058 0 15.9884 0ZM23.2558 15.9884C23.2558 21.3535 21.3535 23.2558 15.9884 23.2558H9.01163C3.64651 23.2558 1.74419 21.3535 1.74419 15.9884V9.01163C1.74419 3.64651 3.64651 1.74419 9.01163 1.74419H15.9884C21.3535 1.74419 23.2558 3.64651 23.2558 9.01163V15.9884Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_8871_920">
                      <rect width="25" height="25" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div
                className={`absolute z-[-1] h-full duration-300 rounded-full  ${
                  navActivePosition === "monitoring"
                    ? "w-full rounded-r-none pr-3"
                    : "w-[57px] group-hover:w-full group-hover:rounded-r-none group-hover:pr-3"
                }  bg-gradient-to-r from-[#4554CF] to-transparent flex items-center justify-end  overflow-hidden`}
              >
                <h1
                  className={`duration-500 ${
                    navActivePosition === "monitoring"
                      ? "opacity-[1]"
                      : "opacity-0 group-hover:opacity-[1]"
                  } opacity-0 group-hover:opacity-[1] text-white font-montserrat font-medium`}
                >
                  Monitoring
                </h1>
              </div>
            </Link>
            <Link
              href={"/pembayaran"}
              className={`flex justify-start items-center relative z-0  ${
                navActivePosition === "pembayaran"
                  ? "w-[180px]"
                  : "w-[57px] hover:w-[180px] group"
              }  duration-300`}
            >
              <div
                className={`${
                  navActivePosition === "pembayaran"
                    ? "bg-[#515cbd]"
                    : "bg-[#535BEB] group-hover:bg-[#515cbd]"
                } duration-300 w-[57px] h-[57px] rounded-full flex justify-center items-center`}
              >
                <svg
                  width="25"
                  height="19"
                  viewBox="0 0 25 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.4986 0H3.11811C1.39495 0 0 1.39495 0 3.11811V14.9341C0 16.6573 1.39495 18.0522 3.11811 18.0522H21.4986C23.2217 18.0522 24.6167 16.6573 24.6167 14.9341V3.11811C24.6167 1.39495 23.2217 0 21.4986 0ZM22.9756 14.9341C22.9756 15.7465 22.3109 16.4111 21.4986 16.4111H3.11811C2.30576 16.4111 1.64111 15.7465 1.64111 14.9341V3.11811C1.64111 2.30576 2.30576 1.64111 3.11811 1.64111H21.4986C22.3109 1.64111 22.9756 2.30576 22.9756 3.11811V14.9341Z"
                    fill="white"
                  />
                  <path
                    d="M7.38403 13.1279H4.10181C3.6487 13.1279 3.28125 13.4954 3.28125 13.9485C3.28125 14.4016 3.6487 14.769 4.10181 14.769H7.38403C7.83714 14.769 8.20459 14.4016 8.20459 13.9485C8.20459 13.4954 7.83714 13.1279 7.38403 13.1279Z"
                    fill="white"
                  />
                  <path
                    d="M20.5129 4.10156H4.10181C3.6487 4.10156 3.28125 4.46901 3.28125 4.92212C3.28125 5.37523 3.6487 5.74268 4.10181 5.74268H20.5129C20.966 5.74268 21.3335 5.37523 21.3335 4.92212C21.3335 4.46901 20.966 4.10156 20.5129 4.10156Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div
                className={`absolute z-[-1] h-full duration-300 rounded-full  ${
                  navActivePosition === "pembayaran"
                    ? "w-full rounded-r-none pr-3"
                    : "w-[57px] group-hover:w-full group-hover:rounded-r-none group-hover:pr-3"
                }  bg-gradient-to-r from-[#4554CF] to-transparent flex items-center justify-end  overflow-hidden`}
              >
                <h1
                  className={`duration-500 ${
                    navActivePosition === "pembayaran"
                      ? "opacity-[1]"
                      : "opacity-0 group-hover:opacity-[1]"
                  } opacity-0 group-hover:opacity-[1] text-white font-montserrat font-medium`}
                >
                  Pembayaran
                </h1>
              </div>
            </Link>
            <Link
              href={"/lapor-kebocoran"}
              className={`flex justify-end items-center relative z-0  ${
                navActivePosition === "lapor-kebocoran"
                  ? "w-[180px]"
                  : "w-[57px] hover:w-[180px] group"
              }  duration-300`}
            >
              <div
                className={`absolute z-[-1] h-full duration-300 rounded-full  ${
                  navActivePosition === "lapor-kebocoran"
                    ? "w-full rounded-l-none pl-5"
                    : "w-[57px] group-hover:w-full group-hover:rounded-l-none group-hover:pl-5"
                }  bg-gradient-to-l from-[#4554CF] to-transparent flex items-center justify-start  overflow-hidden`}
              >
                <h1
                  className={`duration-500 ${
                    navActivePosition === "lapor-kebocoran"
                      ? "opacity-[1]"
                      : "opacity-0 group-hover:opacity-[1]"
                  } opacity-0 group-hover:opacity-[1] text-white font-montserrat font-medium`}
                >
                  Laporan
                </h1>
              </div>
              <div
                className={`${
                  navActivePosition === "lapor-kebocoran"
                    ? "bg-[#515cbd]"
                    : "bg-[#535BEB] group-hover:bg-[#515cbd]"
                } duration-300 w-[57px] h-[57px] rounded-full flex justify-center items-center`}
              >
                <svg
                  width="25"
                  height="27"
                  viewBox="0 0 25 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.2176 25.1101C7.93 25.1101 7.6321 25.0313 7.36503 24.8738C6.77954 24.5363 6.42005 23.8613 6.42005 23.1413V21.5439C3.31798 21.1951 1.28418 18.6975 1.28418 15.12V8.37012C1.28418 4.50012 3.65695 1.90137 7.19043 1.90137H17.4622C20.9956 1.90137 23.3684 4.50012 23.3684 8.37012V15.12C23.3684 18.99 20.9956 21.5888 17.4622 21.5888H13.5897L9.21393 24.7839C8.91605 24.9976 8.56684 25.1101 8.2176 25.1101ZM7.19043 3.57761C4.54032 3.57761 2.82494 5.45636 2.82494 8.35886V15.1089C2.82494 18.0114 4.54032 19.8902 7.19043 19.8902C7.61157 19.8902 7.96081 20.2727 7.96081 20.7339V23.1302C7.96081 23.2764 8.04299 23.3439 8.09435 23.3776C8.14571 23.4114 8.24843 23.4451 8.36142 23.3664L12.9324 20.0364C13.0556 19.9464 13.2097 19.8902 13.3638 19.8902H17.4725C20.1226 19.8902 21.8379 18.0114 21.8379 15.1089V8.35886C21.8379 5.45636 20.1226 3.57761 17.4725 3.57761H7.19043Z"
                    fill="white"
                  />
                  <path
                    d="M12.326 13.623C11.9049 13.623 11.5557 13.2405 11.5557 12.7793V12.5431C11.5557 11.2381 12.4287 10.5968 12.7574 10.3493C13.1375 10.0681 13.2607 9.87684 13.2607 9.58434C13.2607 9.02184 12.8396 8.56055 12.326 8.56055C11.8125 8.56055 11.3913 9.02184 11.3913 9.58434C11.3913 10.0456 11.0421 10.4281 10.621 10.4281C10.1998 10.4281 9.85059 10.0456 9.85059 9.58434C9.85059 8.08809 10.9599 6.87305 12.326 6.87305C13.6922 6.87305 14.8015 8.08809 14.8015 9.58434C14.8015 10.8668 13.9387 11.5081 13.6203 11.7443C13.2197 12.0368 13.0964 12.2281 13.0964 12.5431V12.7793C13.0964 13.2518 12.7472 13.623 12.326 13.623Z"
                    fill="white"
                  />
                  <path
                    d="M12.326 16.4248C11.8946 16.4248 11.5557 16.0423 11.5557 15.5811C11.5557 15.1198 11.9049 14.7373 12.326 14.7373C12.7472 14.7373 13.0964 15.1198 13.0964 15.5811C13.0964 16.0423 12.7575 16.4248 12.326 16.4248Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Link>
            <Link
              href={"/profile"}
              className={`flex justify-end items-center relative z-0  ${
                navActivePosition === "profile"
                  ? "w-[180px]"
                  : "w-[57px] hover:w-[180px] group"
              }  duration-300`}
            >
              <div
                className={`absolute z-[-1] h-full duration-300 rounded-full  ${
                  navActivePosition === "profile"
                    ? "w-full rounded-l-none pl-3"
                    : "w-[57px] group-hover:w-full group-hover:rounded-l-none group-hover:pl-3"
                }  bg-gradient-to-l from-[#4554CF] to-transparent flex items-center justify-start  overflow-hidden`}
              >
                <h1
                  className={`duration-500 ${
                    navActivePosition === "profile"
                      ? "opacity-[1]"
                      : "opacity-0 group-hover:opacity-[1]"
                  } opacity-0 group-hover:opacity-[1] text-white font-montserrat font-medium`}
                >
                  Profile
                </h1>
              </div>
              <div
                className={`${
                  navActivePosition === "profile"
                    ? "bg-[#515cbd]"
                    : "bg-[#535BEB] group-hover:bg-[#515cbd]"
                } duration-300 w-[57px] h-[57px] rounded-full flex justify-center items-center`}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    stroke="white"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"
                    stroke="white"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </div>
          <div className=" flex  items-center">
            <Link
              href={"/notifikasi"}
              className={`bg-[#535BEB] duration-300 w-[57px] h-[57px] rounded-full flex justify-center items-center ${
                navActivePosition === "notifikasi"
                  ? "bg-[#515cbd]"
                  : "bg-[#535BEB] hover:bg-[#515cbd]"
              }`}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.3496 19.0851H6.58412V20.88H21.3496V19.0851ZM20.6379 10.2645L21.0506 13.9074L22.8341 13.7054L22.4214 10.0625L20.6379 10.2645ZM6.88308 13.9074L7.29576 10.2645L5.51229 10.0625L5.09963 13.7054L6.88308 13.9074ZM5.62317 16.8304C6.32276 16.0069 6.76074 14.9875 6.88308 13.9074L5.09963 13.7054C5.01688 14.4358 4.72111 15.12 4.25532 15.6682L5.62317 16.8304ZM21.0506 13.9074C21.173 14.9875 21.611 16.0069 22.3105 16.8304L23.6784 15.6682C23.2126 15.12 22.9168 14.4358 22.8341 13.7054L21.0506 13.9074ZM6.58412 19.0851C5.52299 19.0851 4.84802 17.7427 5.62317 16.8304L4.25532 15.6682C2.55735 17.6668 3.88958 20.88 6.58412 20.88V19.0851ZM21.3496 20.88C24.0441 20.88 25.3764 17.6668 23.6784 15.6682L22.3105 16.8304C23.0856 17.7427 22.4108 19.0851 21.3496 19.0851V20.88ZM22.4214 10.0625C21.9246 5.67713 18.3079 2.33301 13.9669 2.33301V4.12788C17.3534 4.12788 20.2392 6.74478 20.6379 10.2645L22.4214 10.0625ZM7.29576 10.2645C7.69447 6.74478 10.5803 4.12788 13.9669 4.12788V2.33301C9.6258 2.33301 6.00906 5.67713 5.51229 10.0625L7.29576 10.2645Z"
                  fill="white"
                />
                <path
                  d="M18.397 22.6912C18.571 22.227 18.3358 21.7098 17.8716 21.5359C17.4074 21.3619 16.8903 21.5971 16.7163 22.0613L18.397 22.6912ZM11.2175 22.0613C11.0436 21.5971 10.5263 21.3619 10.0622 21.5359C9.59811 21.7098 9.36288 22.227 9.53681 22.6912L11.2175 22.0613ZM16.7163 22.0613C16.3302 23.0917 15.2647 23.8719 13.9669 23.8719V25.6668C15.9838 25.6668 17.7381 24.4493 18.397 22.6912L16.7163 22.0613ZM13.9669 23.8719C12.6691 23.8719 11.6037 23.0917 11.2175 22.0613L9.53681 22.6912C10.1957 24.4493 11.9501 25.6668 13.9669 25.6668V23.8719Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full lg:hidden">
        <Box sx={{ pb: 7 }} ref={ref}>
          <CssBaseline />
          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 100,
            }}
            elevation={3}
          >
            <BottomNavigation showLabels sx={{ backgroundColor: "#fffff" }}>
              <BottomNavigationAction
                label="Home"
                icon={
                  <Link href={"/beranda"}>
                    <HomeOutlinedIcon
                      sx={{
                        fontSize: "22px",
                        color:
                          navActivePosition === "home" ? "white" : "#202226",
                      }}
                    />
                  </Link>
                }
                sx={{
                  color: navActivePosition === "home" ? "white" : "#202226",
                  bgcolor: navActivePosition === "home" ? "#202226" : "white",
                }}
              />
              <BottomNavigationAction
                label="Pembayaran"
                icon={
                  <Link href={"/pembayaran"}>
                    <CreditCardIcon
                      sx={{
                        color:
                          navActivePosition === "pembayaran"
                            ? "white"
                            : "#202226",
                      }}
                    />
                  </Link>
                }
                sx={{
                  color:
                    navActivePosition === "pembayaran" ? "white" : "#202226",
                  bgcolor:
                    navActivePosition === "pembayaran" ? "#202226" : "white",
                }}
              />
              <BottomNavigationAction
                label="Monitoring"
                icon={
                  <Link href={"/monitoring"}>
                    <WaterDropOutlinedIcon
                      sx={{
                        color:
                          navActivePosition === "monitoring"
                            ? "white"
                            : "#202226",
                      }}
                    />
                  </Link>
                }
                sx={{
                  color:
                    navActivePosition === "monitoring" ? "white" : "#202226",
                  bgcolor:
                    navActivePosition === "monitoring" ? "#202226" : "white",
                }}
              />
              <BottomNavigationAction
                label="Lapor"
                icon={
                  <Link href={"/lapor-kebocoran"}>
                    <EditNoteOutlinedIcon
                      sx={{
                        color:
                          navActivePosition === "lapor-kebocoran"
                            ? "white"
                            : "#202226",
                      }}
                    />
                  </Link>
                }
                sx={{
                  color:
                    navActivePosition === "lapor-kebocoran"
                      ? "white"
                      : "#202226",
                  bgcolor:
                    navActivePosition === "lapor-kebocoran"
                      ? "#202226"
                      : "white",
                }}
              />
              <BottomNavigationAction
                label="Profile"
                icon={
                  <Link href={"/profile"}>
                    <PersonOutlineOutlinedIcon
                      sx={{
                        color:
                          navActivePosition === "profile" ? "white" : "#202226",
                      }}
                    />
                  </Link>
                }
                sx={{
                  color: navActivePosition === "profile" ? "white" : "#202226",
                  bgcolor:
                    navActivePosition === "profile" ? "#202226" : "white",
                }}
              />
            </BottomNavigation>
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default Navbar;
