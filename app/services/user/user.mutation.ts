import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfile } from "./user.service";
import { useAuth } from "@/app/hooks/UseAuth";

export const useGetUserProfile = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => getUserProfile(auth.auth.token || ""),
    onSuccess: (data) => {
      queryClient.setQueryData(["userProfile"], data);
    },
    onError: (error: any) => {
      console.error("Error fetching user profile:", error);
    },
  });
};
