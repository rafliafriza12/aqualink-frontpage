import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyBilling, getUnpaidBilling, payBilling } from "./billing.service";
import { useAuth } from "@/app/hooks/UseAuth";
import { toast } from "react-toastify";

export const useGetMyBilling = () => {
  const auth = useAuth();

  return useMutation({
    mutationFn: () => getMyBilling(auth.auth.token || ""),
    onError: (error: any) => {
      console.error("Error fetching billing:", error);
    },
  });
};

export const useGetUnpaidBilling = () => {
  const auth = useAuth();

  return useMutation({
    mutationFn: () => getUnpaidBilling(auth.auth.token || ""),
    onError: (error: any) => {
      console.error("Error fetching unpaid billing:", error);
    },
  });
};

export const usePayBilling = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      billingId,
      paymentMethod,
    }: {
      billingId: string;
      paymentMethod: string;
    }) => payBilling(billingId, paymentMethod, auth.auth.token || ""),
    onSuccess: (data) => {
      toast.success(data.message || "Pembayaran berhasil");
      queryClient.invalidateQueries({ queryKey: ["myBilling"] });
      queryClient.invalidateQueries({ queryKey: ["unpaidBilling"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal melakukan pembayaran"
      );
    },
  });
};
