"use client";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useAuth } from "@/app/hooks/UseAuth";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
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
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import API from "@/app/utils/API";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useLogout } from "@/app/services/auth/auth.mutation";
const Profile: React.FC = () => {
  const auth = useAuth();
  const initialName: any = auth.auth.user?.fullName
    .split(" ")
    .map((data: any) => data[0]);

  const [openModal, setOpenModal] = useState(false);

  const logoutMutation = useLogout();
  const onLogout = () => {
    logoutMutation.mutate(auth.auth.token);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
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

        <div className=" w-full h-[135px] flex flex-col justify-between rounded-[24px] bg-[#202226] py-1">
          <Link
            href={"/notifikasi"}
            className=" w-full h-[33%] flex justify-between items-center px-4"
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
            className=" w-full h-[33%] flex justify-between items-center px-4"
          >
            <div className=" flex items-center gap-3 ">
              <KeyIcon sx={{ color: "white" }} />
              <h1 className=" font-poppins font-semibold text-sm text-white">
                Ubah Password
              </h1>
            </div>
            <ChevronRight className=" text-white" />
          </Link>
          <button
            onClick={handleOpenModal}
            className=" w-full h-[33%] flex justify-between items-center px-4 cursor-pointer"
          >
            <div className=" flex items-center gap-3 ">
              <AccountBalanceOutlinedIcon sx={{ color: "white" }} />
              <h1 className=" font-poppins font-semibold text-sm text-white">
                Jadi Pemilik Kredit Air
              </h1>
            </div>
            <ChevronRight className=" text-white" />
          </button>
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
          {logoutMutation.isPending ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin fill-[#EA3434]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <ChevronRight className=" text-[#EA3434]" />
          )}
        </button>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Fade in={openModal}>
          <div className="modal-content bg-white rounded-lg shadow-lg p-8 mx-auto my-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px]">
            <h2 className="font-montserrat font-bold text-xl text-center text-[#2835FF] mb-4">
              Informasi
            </h2>
            <p className="text-center text-gray-700 mb-6">
              Untuk sekarang pengajuan masih berbasis manual, anda bisa
              mengajukan langsung ke email{" "}
              <span className="font-semibold">aqualink@gmail.com</span>
            </p>
            <div className="w-full flex justify-center">
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-[#5F68FE] text-white rounded-lg px-6 py-2 transition duration-200 hover:bg-[#4a5bcf]"
              >
                Tutup
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Profile;
