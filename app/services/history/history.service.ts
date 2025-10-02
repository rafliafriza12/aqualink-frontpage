import API from "@/app/utils/API";

export const getHistoryUsage = async (
  userId: string,
  meteranId: string,
  filter: "hari" | "minggu" | "bulan" | "tahun" = "hari"
) => {
  try {
    const response = await API.get(
      `/history/getHistory/${userId}/${meteranId}`,
      {
        params: { filter },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
