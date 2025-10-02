import API from "@/app/utils/API";
import { MonitoringStatsResponse } from "./monitoring.type";

/**
 * Get monitoring statistics for a user's meter
 */
export const getMonitoringStats = async (
  userId: string,
  meteranId: string,
  token: string
): Promise<MonitoringStatsResponse> => {
  const response = await API.get(`/monitoring/stats/${userId}/${meteranId}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
