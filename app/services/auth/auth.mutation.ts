"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginCredentials } from "./auth.type";
import { toast, Bounce } from "react-toastify";
import { login, register, logout } from "./auth.service";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";
import axios from "axios";
import API from "@/app/utils/API";

const TOAST_CONFIG = {
  position: "top-center" as const,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light" as const,
  transition: Bounce,
};

export const useLogin = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const userData = {
        user: {
          id: response.data._id,
          fullName: response.data.fullName,
          phone: response.data.phone,
          email: response.data.email,
        },
        token: `Bearer ${response.data.token}`,
      };

      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(response.message, TOAST_CONFIG);
      setTimeout(() => {
        auth.login(userData);
      }, 2000);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Login failed";
      toast.error(errorMessage, TOAST_CONFIG);
      console.error("Login error:", error);
    },
  });
};

export const useRegisterByGoogle = () => {
  const auth = useAuth();

  const register = async (response: any) => {
    try {
      const responseGoogle = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        }
      );

      const serverResponse = await API.post("/users/register/google", {
        email: responseGoogle.data.email,
        fullName:
          responseGoogle.data.given_name +
          " " +
          responseGoogle.data.family_name,
      });

      const serverData = serverResponse.data;
      if (serverData.data.status) {
        toast.error(serverData.message, TOAST_CONFIG);
        return;
      }
      const userData = {
        user: {
          id: serverData.data._id,
          fullName: serverData.data.fullName,
          phone: serverData.data.phone,
          email: serverData.data.email,
        },
        token: `Bearer ${serverData.data.token}`,
      };
      toast.success(serverData.message, TOAST_CONFIG);
      setTimeout(() => {
        auth.login(userData);
      }, 2000);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login gagal";
      toast.error(errorMessage, TOAST_CONFIG);
    }
  };

  return register;
};

export const useLoginByGoogle = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const register = useRegisterByGoogle();

  const login = async (response: any) => {
    try {
      const responseGoogle = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        }
      );

      const serverResponse = await API.post("/users/login/google", {
        email: responseGoogle.data.email,
      });

      const serverData = serverResponse.data;
      if (serverData.data.status === "NEED_REGISTER") {
        register(response);
        // toast.success(serverData.message, TOAST_CONFIG);
        // setTimeout(() => {
        //   navigation.replace("/auth/register");
        // }, 2000);

        return;
      }
      const userData = {
        user: {
          id: serverData.data._id,
          fullName: serverData.data.fullName,
          phone: serverData.data.phone,
          email: serverData.data.email,
        },
        token: `Bearer ${serverData.data.token}`,
      };

      toast.success(serverData.message, TOAST_CONFIG);
      setTimeout(() => {
        auth.login(userData);
      }, 2000);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login gagal";
      toast.error(errorMessage, TOAST_CONFIG);
    }
  };

  return login;
};

export const useRegister = () => {
  const navigation = useRouter();
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      toast.success(response.message, TOAST_CONFIG);
      setTimeout(() => {
        navigation.replace("/auth/login");
      }, 2000);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Register gagal";
      toast.error(errorMessage, TOAST_CONFIG);
      //   console.error("Login error:", error);
    },
  });
};

export const useLogout = () => {
  const auth = useAuth();
  return useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      toast.success(response.message, TOAST_CONFIG);
      setTimeout(() => {
        auth.logout();
      }, 2000);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Logout gagal";
      toast.error(errorMessage, TOAST_CONFIG);
      //   console.error("Login error:", error);
    },
  });
};
