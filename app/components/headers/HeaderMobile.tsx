"use client";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useRouter, usePathname } from "next/navigation";
import Ellips from "../svg/Ellips";
import { useState, useEffect } from "react";
import Link from "next/link";

interface HeaderMobileProps {
  mode: string;
}
const HeaderMobile: React.FC<HeaderMobileProps> = ({ mode }) => {
  const navigation = useRouter();
  const pathName = usePathname().split("/");
  const [headerName, setHeaderName] = useState<any>("");
  useEffect(() => {
    if (pathName[pathName.length - 1] === "faq") {
      setHeaderName("F.A.Q");
    } else {
      setHeaderName(() =>
        pathName[pathName.length - 1]
          .split("-")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }
  }, [pathName]);
  return (
    <div
      className={`w-full flex items-center justify-between overflow-hidden py-7 px-4 rounded-[15px] relative z-0 ${
        mode === "dark" ? "bg-[#202226]" : "bg-transparent"
      }`}
    >
      <button onClick={() => navigation.back()}>
        <ChevronLeft
          className={`${
            mode === "dark" || mode === "light"
              ? "text-white"
              : "text-[#202226]"
          }`}
        />
      </button>
      <h1
        className={`font-poppins font-semibold text-base ${
          mode === "dark" || mode === "light" ? "text-white" : "text-[#202226]"
        }`}
      >
        {headerName}
      </h1>
      <Link href={"/notifikasi"}>
        <NotificationsNoneOutlinedIcon
          sx={{
            color: mode === "dark" || mode === "light" ? "white" : "#202226",
          }}
        />
      </Link>
      {mode === "dark" && (
        <div className="absolute z-[-5] -left-5">
          <Ellips />
        </div>
      )}
    </div>
  );
};

export default HeaderMobile;
