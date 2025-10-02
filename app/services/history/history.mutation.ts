import { useMutation } from "@tanstack/react-query";
import { getHistoryUsage } from "./history.service";
import { FilterType } from "./history.type";

export const useGetHistoryUsage = () => {
  return useMutation({
    mutationFn: ({
      userId,
      meteranId,
      filter,
    }: {
      userId: string;
      meteranId: string;
      filter: FilterType;
    }) => getHistoryUsage(userId, meteranId, filter),
    onError: (error: any) => {
      console.error("Error fetching history usage:", error);
    },
  });
};
