"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginCredentials } from "./auth.type";
import { toast, Bounce } from "react-toastify";
import { login, register, logout } from "./auth.service";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";

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

      auth.login(userData);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(response.message, TOAST_CONFIG);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Login failed";
      toast.error(errorMessage, TOAST_CONFIG);
      console.error("Login error:", error);
    },
  });
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
      }, 1500);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Logout gagal";
      toast.error(errorMessage, TOAST_CONFIG);
      //   console.error("Login error:", error);
    },
  });
};
