import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createConnectionData,
  getMyConnectionData,
} from "./connectionData.service";
import { useAuth } from "@/app/hooks/UseAuth";
import { toast } from "react-toastify";

export const useCreateConnectionData = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      createConnectionData(formData, auth.auth.token || ""),
    onSuccess: (data) => {
      toast.success(data.message || "Data koneksi berhasil dikirim");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["myConnectionData"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal mengirim data koneksi"
      );
    },
  });
};

export const useGetMyConnectionData = () => {
  const auth = useAuth();

  return useMutation({
    mutationFn: () => getMyConnectionData(auth.auth.token || ""),
    onError: (error: any) => {
      console.error("Error fetching connection data:", error);
    },
  });
};
