"use client";
import API from "@/app/utils/API";
import { useAuth } from "@/app/hooks/UseAuth";
import { useState, useEffect } from "react";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import WhiteShillouete from "@/app/components/svg/WhiteShillouete";
import TriangleParticle from "@/app/components/svg/TriangleParticle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { toast, Bounce, ToastContainer } from "react-toastify";
const EditProfile: React.FC = () => {
  const auth = useAuth();
  const [fullName, setFullName] = useState<any>(auth.auth.user?.fullName);
  const [email, setEmail] = useState<any>(auth.auth.user?.email);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialName: any = auth.auth.user?.fullName
    .split(" ")
    .map((data: any) => data[0]);

  const onEditProfile = () => {
    setIsLoading(true);
    API.put(
      `/users/editProfile/${auth.auth.user?.id}`,
      {
        newFullName: fullName,
        newEmail: email,
      },
      { headers: { Authorization: auth.auth.token } }
    )
      .then((res) => {
        setIsLoading(false);
        const data: any = {
          user: {
            id: res.data.data._id,
            fullName: res.data.data.fullName,
            phone: res.data.data.phone,
            email: res.data.data.email,
          },
          token: `Bearer ${res.data.data.token}`,
        };
        // console.log(data);
        auth.login(data);
        toast.success(`${res.data.message}`, {
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

  return (
    <div className=" w-full flex flex-col font-inter relative z-0 min-h-screen  ">
      {/* <div className=" w-full fixed lg:hidden inset-0 z-[-9]">
        <WhiteShillouete />
      </div> */}
      <div className=" fixed inset-0 lg:hidden z-[-10] w-full h-full bg-gradient-to-b from-[#979CEE] via-white to-transparent"></div>

      <div className=" w-full flex flex-col gap-6 py-[18.4px] ">
        <HeaderMobile mode="light" />

        <div className="w-full h-[461px]  mt-3 ">
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
          <button
            onClick={() => onEditProfile()}
            className=" w-full h-full bg-[#202226] rounded-[15px] relative z-0 overflow-hidden flex justify-center items-center"
          >
            <div className=" absolute z-[-4] -top-14 -left-10 -rotate-[27deg]">
              <WhiteShillouete />
            </div>
            <div className=" absolute z-[-5] -bottom-16 -right-10 -rotate-[215deg]">
              <WhiteShillouete />
            </div>
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-gray-200 animate-spin fill-[#ffffff]"
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
              </div>
            ) : (
              <h1 className=" font-poppins font-semibold text-white text-base">
                Simpan Perubahan
              </h1>
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
