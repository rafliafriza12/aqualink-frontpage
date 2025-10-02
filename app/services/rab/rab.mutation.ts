import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyRAB,
  updateRABPaymentStatus,
  createRABPayment,
} from "./rab.service";
import { useAuth } from "@/app/hooks/UseAuth";
import { toast } from "react-toastify";

export const useGetMyRAB = () => {
  const auth = useAuth();

  return useMutation({
    mutationFn: () => getMyRAB(auth.auth.token || ""),
    onError: (error: any) => {
      console.error("Error fetching RAB:", error);
    },
  });
};

export const useUpdateRABPayment = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rabId, isPaid }: { rabId: string; isPaid: boolean }) =>
      updateRABPaymentStatus(rabId, isPaid, auth.auth.token || ""),
    onSuccess: (data) => {
      toast.success(data.message || "Pembayaran RAB berhasil");
      queryClient.invalidateQueries({ queryKey: ["myRAB"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal memproses pembayaran RAB"
      );
    },
  });
};

/**
 * Create Midtrans payment for RAB
 */
export const useCreateRABPayment = () => {
  const auth = useAuth();

  return useMutation({
    mutationFn: (rabId: string) =>
      createRABPayment(rabId, auth.auth.token || ""),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal membuat pembayaran RAB"
      );
    },
  });
};
