export type FilterType = "hari" | "minggu" | "bulan" | "tahun";

export interface HistoryData {
  _id: {
    time?: string;
    day?: string;
    week?: number;
    month?: string;
  };
  totalUsedWater: number;
}

export interface HistoryUsageResponse {
  status: number;
  filter: FilterType;
  data: HistoryData[];
  notification: any;
  totalUsageToday: number;
}
