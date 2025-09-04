"use client";

import RiwaayatTagihanCard from "@/app/components/card/riwayat-tagihan-card";

const RiwayatTagihan: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 lg:gap-10 font-poppins relative z-0 ">
      <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
        <RiwaayatTagihanCard />
        <RiwaayatTagihanCard />
        <RiwaayatTagihanCard />
      </div>
    </div>
  );
};

export default RiwayatTagihan;
