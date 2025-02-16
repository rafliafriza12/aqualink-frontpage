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

const ChangePassword: React.FC = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const isDesktop = IsDesktop();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

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
          <button className="w-full flex justify-center items-center py-3 bg-[#FFE0BD] rounded-[30px]">
            <h1 className=" font-montserrat font-bold text-[#343333] text-[20px]">
              Simpan
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
