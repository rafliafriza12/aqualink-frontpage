import { useMutation } from "@tanstack/react-query";
import { getMonitoringStats } from "./monitoring.service";

export const useGetMonitoringStats = () => {
  return useMutation({
    mutationFn: ({
      userId,
      meteranId,
      token,
    }: {
      userId: string;
      meteranId: string;
      token: string;
    }) => getMonitoringStats(userId, meteranId, token),
  });
};
