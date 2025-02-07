"use client";
import API from "@/app/utils/API";
import { useAuth } from "@/app/hooks/UseAuth";
import { IsDesktop } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import WhiteShillouete from "@/app/components/svg/WhiteShillouete";
import TriangleParticle from "@/app/components/svg/TriangleParticle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
const EditProfile: React.FC = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const isDesktop = IsDesktop();
  const [fullName, setFullName] = useState<any>(auth.auth.user?.fullName);
  const [email, setEmail] = useState<any>(auth.auth.user?.email);
  const initialName: any = auth.auth.user?.fullName
    .split(" ")
    .map((data: any) => data[0]);

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
      <div className=" absolute z-[-9]">
        <WhiteShillouete />
      </div>
      <div className=" absolute z-[-10] w-full h-full bg-gradient-to-b from-[#979CEE] via-white to-transparent"></div>

      <div className=" w-full flex flex-col gap-6 py-[18.4px] px-4">
        <HeaderMobile mode="light" />

        <div className="w-full h-[461px] px-6 mt-3 ">
          <div className="w-full h-full bg-[#202226] rounded-[15px] relative z-0 flex flex-col items-center">
            <div className="w-full h-full overflow-hidden absolute z-[-10] rounded-[15px]">
              {/* Absolute */}
              <div className=" absolute z-[-5]">
                <TriangleParticle />
              </div>
              <div className=" absolute z-[-6] -left-10 rotate-12">
                <WhiteShillouete />
              </div>
              <div className=" absolute z-[-6] -right-10 bottom-0 rotate-[190deg]">
                <WhiteShillouete />
              </div>
            </div>
            {/* End of Absolute */}

            <div className=" w-[100px] h-[100px] bg-transparent rounded-full border-[1px] border-white p-2 absolute z-[1] -top-12 py">
              <div className=" rounded-full w-full h-full bg-[#218D96] flex justify-center items-center">
                <h1 className="font-inter font-medium text-xl text-white">
                  {initialName.map((data: any) => data)}
                </h1>
              </div>
            </div>
            <div className="w-full h-full flex flex-col items-center gap-8 pt-16 pb-4">
              <h1 className=" text-white font-poppins font-semibold text-[20px] text-center">
                {auth.auth.user?.fullName}
              </h1>

              <div className=" w-full flex flex-col gap-5 px-7">
                <div className=" w-full flex flex-col gap-1">
                  <label
                    htmlFor="fullName"
                    className=" font-poppins font-semibold text-sm text-[#F5F5F5]"
                  >
                    Username
                  </label>
                  <div className=" w-full flex items-center gap-2 p-3 bg-white rounded-xl">
                    <PersonOutlineOutlinedIcon sx={{ color: "#6A5AE0" }} />
                    <input
                      id="fullName"
                      className="w-[83%] focus:outline-none font-poppins font-semibold text-sm text-[#2C2A2A]"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className=" w-full flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className=" font-poppins font-semibold text-sm text-[#F5F5F5]"
                  >
                    Email
                  </label>
                  <div className=" w-full flex items-center gap-2 p-3 bg-white rounded-xl">
                    <EmailOutlinedIcon sx={{ color: "#6A5AE0" }} />
                    <input
                      id="email"
                      className="w-[83%] focus:outline-none font-poppins font-semibold text-sm text-[#2C2A2A]"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[46px] px-6">
          <button className=" w-full h-full bg-[#202226] rounded-[15px] relative z-0 overflow-hidden flex justify-center items-center">
            <div className=" absolute z-[-4] -top-14 -left-10 -rotate-[27deg]">
              <WhiteShillouete />
            </div>
            <div className=" absolute z-[-5] -bottom-16 -right-10 -rotate-[215deg]">
              <WhiteShillouete />
            </div>
            <h1 className=" font-poppins font-semibold text-white text-base">
              Simpan Perubahan
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
