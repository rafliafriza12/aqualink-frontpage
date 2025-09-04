"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/UseAuth";
import { IsDesktop } from "@/app/hooks";
import { useEffect, useState } from "react";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import ReportStatusCard from "@/app/components/card/ReportStatusCard";
import Skeleton from "@mui/material/Skeleton";
import { toast, Bounce, ToastContainer } from "react-toastify";
import API from "@/app/utils/API";
const ReportStatus: React.FC = () => {
  const Auth = useAuth();
  const [reportsStatus, setReportsStatus] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getReportsStatusByUserId = () => {
    API.get(`/report/getByReporterID/${Auth.auth.user?.id}`, {
      headers: { Authorization: Auth.auth.token },
    })
      .then((res) => {
        setIsLoading(false);
        setReportsStatus(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(`${err.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  useEffect(() => {
    getReportsStatusByUserId();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins">
      <HeaderMobile mode="dark" />
      {isLoading
        ? [1, 2, 3, 4].map((skeleton: number, i: number) => {
            return (
              <Skeleton
                key={i}
                variant="rounded"
                height="80px"
                width="100%"
                sx={{ bgcolor: "#d1d5db", borderRadius: "5px" }}
              />
            );
          })
        : reportsStatus.map((reportStatus: any, i: number) => {
            return (
              <ReportStatusCard
                _id={reportStatus?._id}
                status={reportStatus?.status}
                problem={reportStatus.problem}
                key={i}
              />
            );
          })}
      <ToastContainer />
    </div>
  );
};

export default ReportStatus;
