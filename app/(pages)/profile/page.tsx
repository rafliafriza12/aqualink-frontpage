"use client";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useAuth } from "@/app/hooks/UseAuth";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import { IsDesktop } from "@/app/hooks";
import CircleBackground from "@/app/components/svg/CircleBackground";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChevronRight from "@mui/icons-material/ChevronRight";
import KeyIcon from "@mui/icons-material/Key";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import API from "@/app/utils/API";
const Profile: React.FC = () => {
  const navigation = useRouter();
  const auth = useAuth();
  const isDesktop = IsDesktop();
  const initialName: any = auth.auth.user?.fullName
    .split(" ")
    .map((data: any) => data[0]);

  const onLogout = () => {
    API.post("/users/logout", {
      userId: auth.auth.user?.id,
    })
      .then((res) => {
        console.log(res.data);
        auth.logout();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth");
    }
  }, [auth.auth.isAuthenticated, navigation]);

  if (!auth.auth.isAuthenticated) {
    return null; // Hindari rendering konten saat redirect
  }
  return isDesktop ? null : (
    <div className=" w-screen flex flex-col font-inter relative z-0 h-[100dvh] overflow-hidden -top-5 -left-[16px] -mb-24">
      <div className=" absolute z-[-10] ">
        <CircleBackground />
      </div>
      <div className=" w-full flex flex-col gap-6 py-[18.4px] px-4">
        <HeaderMobile mode="normal" />
        <div className=" py-4 px-5 bg-[#202226] rounded-3xl flex items-center justify-between">
          <div className="w-[80%] flex items-center gap-3">
            <div className=" w-[60px] h-[60px] rounded-full bg-[#218D96] font-inter font-medium text-xl text-white flex justify-center items-center">
              <h1>{initialName.map((data: any) => data)}</h1>
            </div>
            <div className="w-[69%] flex flex-col">
              <h1 className=" w-full text-left text-white font-inter font-semibold text-base">
                {auth.auth.user?.fullName}
              </h1>
              <h1 className="font-poppins text-left text-xs text-white">
                {auth.auth.user?.email}
              </h1>
            </div>
          </div>

          <Link
            href={"/profile/edit-profil"}
            className="bg-[#5F68FE] rounded-[6px] p-1"
          >
            <DriveFileRenameOutlineIcon sx={{ color: "white" }} />
          </Link>
        </div>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-[1.5px] my-5 bg-gradient-to-r from-transparent via-[#333338] to-transparent border-0 rounded-full" />
        </div>

        <div className=" w-full h-[90px] flex flex-col justify-between rounded-[24px] bg-[#202226] py-1">
          <Link
            href={"/notifikasi"}
            className=" w-full h-[50%] flex justify-between items-center px-4"
          >
            <div className=" flex items-center gap-3 ">
              <NotificationsNoneOutlinedIcon sx={{ color: "white" }} />
              <h1 className=" font-poppins font-semibold text-sm text-white">
                Notifikasi
              </h1>
            </div>
            <ChevronRight className=" text-white" />
          </Link>
          <Link
            href={"/profile/ubah-password"}
            className=" w-full h-[50%] flex justify-between items-center px-4"
          >
            <div className=" flex items-center gap-3 ">
              <KeyIcon sx={{ color: "white" }} />
              <h1 className=" font-poppins font-semibold text-sm text-white">
                Ubah Password
              </h1>
            </div>
            <ChevronRight className=" text-white" />
          </Link>
        </div>

        <Link
          href={"/faq"}
          className=" w-full h-[54px] rounded-[24px] bg-gradient-to-t from-[#ffffff]/40 via-[#2835FF]/60 to-[#2835FF] border-[1px] border-[#2835FF] flex items-center justify-between px-4"
        >
          <div className=" flex items-center gap-3 ">
            <LiveHelpOutlinedIcon sx={{ color: "white" }} />
            <h1 className=" font-poppins font-semibold text-sm text-white">
              F.A.Q
            </h1>
          </div>
          <ChevronRight className=" text-white" />
        </Link>

        <button
          onClick={() => onLogout()}
          className=" w-full h-[54px] rounded-[24px] bg-[white] border-[2px] border-[#EA3434] flex items-center justify-between px-4"
        >
          <div className=" flex items-center gap-3 ">
            <LogoutOutlinedIcon sx={{ color: "#EA3434" }} />
            <h1 className=" font-poppins font-semibold text-sm text-[#EA3434]">
              Keluar
            </h1>
          </div>
          <ChevronRight className=" text-[#EA3434]" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
