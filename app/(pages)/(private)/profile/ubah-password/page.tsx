"use client";
import API from "@/app/utils/API";
import { useAuth } from "@/app/hooks/UseAuth";
import { IsDesktop } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, Bounce, ToastContainer } from "react-toastify";

const ChangePassword: React.FC = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const isDesktop = IsDesktop();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const onChangePassword = () => {
    if (newPassword === confirmNewPassword) {
      setIsLoading(true);
      API.put(
        `/users/changePassword/${auth.auth.user?.id}`,
        { newPassword: newPassword },
        {
          headers: {
            Authorization: auth.auth.token,
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
          setNewPassword("");
          setConfirmNewPassword("");
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
    } else {
      toast.error(`Konfirmasi sandi belum sesuai`, {
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
    }
  };

  return (
    <div className=" w-screen flex flex-col font-inter relative z-0 h-[100dvh] overflow-hidden -top-5 -left-[16px] -mb-24">
      <div className=" w-full flex flex-col gap-6 py-[18.4px] px-4 items-center">
        <HeaderMobile mode="dark" />

        <div className="w-full flex flex-col items-center gap-2">
          <label
            htmlFor="newPassword"
            className=" font-montserrat font-bold text-sm text-[#1D1E1F]"
          >
            Buat Password Baru
          </label>
          <TextField
            id="newPassword"
            label=""
            type={showPassword ? "text" : "password"} // Toggle tipe input
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              width: "100%",
              bgcolor: "#3A3B46",
              borderRadius: "15px",
              fontWeight: 600,
              "& .MuiOutlinedInput-root": {
                color: "white", // Warna teks input
                "& fieldset": {
                  borderColor: "transparent", // Warna outline default
                },
                "&:hover fieldset": {
                  borderColor: "transparent", // Warna outline saat hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent", // Warna outline saat fokus
                },
              },
              "& .MuiInputLabel-root": {
                color: "white", // Warna label default
                "&.Mui-focused": {
                  color: "white", // Warna label saat fokus
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    style={{ color: "gray" }}
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "white" }} />
                    ) : (
                      <Visibility sx={{ color: "white" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="w-full flex flex-col items-center gap-2">
          <label
            htmlFor="newPassword"
            className=" font-montserrat font-bold text-sm text-[#1D1E1F]"
          >
            Konfirmasi Password Baru
          </label>
          <TextField
            id="newPassword"
            label=""
            type={showConfirmPassword ? "text" : "password"} // Toggle tipe input
            variant="outlined"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            sx={{
              width: "100%",
              bgcolor: "#3A3B46",
              borderRadius: "15px",
              fontWeight: 600,
              "& .MuiOutlinedInput-root": {
                color: "white", // Warna teks input
                "& fieldset": {
                  borderColor: "transparent", // Warna outline default
                },
                "&:hover fieldset": {
                  borderColor: "transparent", // Warna outline saat hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent", // Warna outline saat fokus
                },
              },
              "& .MuiInputLabel-root": {
                color: "white", // Warna label default
                "&.Mui-focused": {
                  color: "white", // Warna label saat fokus
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    style={{ color: "gray" }}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff sx={{ color: "white" }} />
                    ) : (
                      <Visibility sx={{ color: "white" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className=" w-full flex items-center justify-between p-5 rounded-[15px] bg-[#3A3B46] mt-8">
          <WarningAmberOutlinedIcon
            sx={{ color: "#FF5959", fontSize: "50px" }}
          />
          <p className=" w-[80%] font-inter font-medium text-xs text-[#F6EDB6]">
            Harap pastikan Anda mengingat dan login dengan kata sandi baru yang
            baru saja Anda buat. Perubahan akan terlihat secara real-time
            setelah Anda mengubah kata sandi.
          </p>
        </div>

        <div className="w-[80%] p-1 border-[1px] border-[#FFE0BD] rounded-[30px] mt-8">
          <button
            onClick={() => onChangePassword()}
            className="w-full flex justify-center items-center py-3 bg-[#FFE0BD] rounded-[30px]"
          >
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-gray-200 animate-spin fill-[#343333]"
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
              <h1 className=" font-montserrat font-bold text-[#343333] text-[20px]">
                Simpan
              </h1>
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
