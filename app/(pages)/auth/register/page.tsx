"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/UseAuth";
import Logo from "@/app/components/logo/Logo";
import { useState, useEffect } from "react";
import Google from "@/app/components/logo/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import API from "@/app/utils/API";
import { IsDesktop } from "@/app/hooks";
import { toast, Bounce, ToastContainer } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
const Register: React.FC = () => {
  const isDesktop = IsDesktop();
  const navigation = useRouter();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const Auth = useAuth();

  const onRegister = () => {
    setIsLoading(!isLoading);
    API.post("/users", {
      email: email,
      phone: phone,
      fullName: fullName,
      password: password,
    })
      .then((res) => {
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false);
        console.log(res.data.data);
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
        setTimeout(() => {
          navigation.replace("/auth/login");
        }, 2000);
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
    // Aos.init();
    // Aos.refresh();
    if (Auth.auth.isAuthenticated) {
      navigation.replace("/");
    }
  }, [Auth.auth.isAuthenticated, navigation]);

  if (Auth.auth.isAuthenticated) {
    navigation.replace("/");
    return null;
  }

  return isDesktop ? null : (
    <div className="w-screen flex flex-col justify-center items-center p-7 gap-10 font-poppins">
      <div data-aos={"fade-up"} data-aos-duration={"1000"} className="">
        <Logo size={110} withText={true} />
      </div>

      <div className="flex flex-col gap-2 items-center">
        <h1
          data-aos={"fade-up"}
          data-aos-duration={"1000"}
          className=" text-[#202226] font-semibold text-2xl"
        >
          Register a new account
        </h1>
        <h6 className=" text-center text-[#838383] text-sm">
          Hi new user! Please enter your details.
        </h6>
      </div>
      <div className=" w-full flex flex-col gap-5 items-center">
        <TextField
          id="fullname"
          label="Nama Lengkap"
          variant="outlined"
          value={fullName}
          type="text"
          onChange={(e) => setFullName(e.target.value)}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black", // Warna teks input
              "& fieldset": {
                borderColor: "#EDEDED", // Warna outline default
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED", // Warna outline saat hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED", // Warna outline saat fokus
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Warna label default
              "&.Mui-focused": {
                color: "black", // Warna label saat fokus
              },
            },
          }}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black", // Warna teks input
              "& fieldset": {
                borderColor: "#EDEDED", // Warna outline default
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED", // Warna outline saat hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED", // Warna outline saat fokus
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Warna label default
              "&.Mui-focused": {
                color: "black", // Warna label saat fokus
              },
            },
          }}
        />
        <TextField
          id="phone"
          label="No. HP"
          variant="outlined"
          value={phone}
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black", // Warna teks input
              "& fieldset": {
                borderColor: "#EDEDED", // Warna outline default
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED", // Warna outline saat hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED", // Warna outline saat fokus
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Warna label default
              "&.Mui-focused": {
                color: "black", // Warna label saat fokus
              },
            },
          }}
        />
        <TextField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"} // Toggle tipe input
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black", // Warna teks input
              "& fieldset": {
                borderColor: "#EDEDED", // Warna outline default
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED", // Warna outline saat hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED", // Warna outline saat fokus
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Warna label default
              "&.Mui-focused": {
                color: "black", // Warna label saat fokus
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"} // Toggle tipe input
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black", // Warna teks input
              "& fieldset": {
                borderColor: "#EDEDED", // Warna outline default
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED", // Warna outline saat hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED", // Warna outline saat fokus
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Warna label default
              "&.Mui-focused": {
                color: "black", // Warna label saat fokus
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
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          loading={isLoading}
          variant="outlined"
          onClick={() => onRegister()}
          sx={{
            backgroundColor: "#039FE1",
            width: "100%",
            height: "48px",
            color: "#ffffff",
            borderColor: "#039FE1",
            "&:hover": {
              backgroundColor: "#039FE1", // Warna saat hover
              borderColor: "#039FE1",
            },
            "& .MuiLoadingButton-loadingIndicator": {
              color: "#ffffff", // Warna indikator loading
            },
          }}
        >
          {!isLoading ? (
            <h1 className="text-white font-semibold text-base">Sign up</h1>
          ) : null}
        </LoadingButton>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-5 bg-[#D9D9D9] border-0" />
          <span className="absolute px-3 text-[#838383] -translate-x-1/2 bg-white left-1/2 font-inter">
            Or
          </span>
        </div>
        <Link
          href={"#"}
          className="w-full bg-white flex justify-center items-center text-[#4999F1] font-semibold text-base rounded-xl py-2 border-[2px] border-[#EDEDED] gap-1"
        >
          <div className=" w-8 h-8">
            <Google />
          </div>
          <h1 className=" font-semibold text-[#1E1E1E] text-base">
            Continue with Google
          </h1>
        </Link>
        <h1 className="text-[#838383]">
          Have an account ?{" "}
          <Link className="text-[#202226] font-semibold" href={"/auth/login"}>
            Sign in
          </Link>
        </h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
