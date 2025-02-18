"use client";

import Link from "next/link";

interface ReportStatusCardProps {
  _id: string;
  status: string;
  problem: string;
}

const ReportStatusCard: React.FC<ReportStatusCardProps> = ({
  _id,
  status,
  problem,
}) => {
  return (
    <Link
      href={"#"}
      className=" w-full rounded-[5px] px-4 py-4 bg-[#414BF1]/25 flex flex-col"
    >
      <div className="w-full">
        <h1
          className={`text-left font-montserrat font-bold ${
            status.toLocaleLowerCase().includes("diterima")
              ? "text-[#3BA726]"
              : "text-[#D15050]"
          }`}
        >
          {status}
        </h1>
      </div>
      <div className=" w-full">
        <p className=" text-left text-[#060620]/50 font-inter text-[13px]">
          {problem.slice(0, 120)}
          {problem.length > 120 && ". . . ."}
        </p>
      </div>
    </Link>
  );
};

export default ReportStatusCard;
