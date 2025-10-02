export interface MonitoringStats {
  currentMonth: {
    totalUsage: number;
    averageDailyUsage: number;
    daysElapsed: number;
    daysInMonth: number;
  };
  lastMonth: {
    totalUsage: number;
  };
  comparison: {
    percentage: number;
    status: "naik" | "turun" | "sama";
    message: string;
  };
  prediction: {
    remainingDays: number;
    predictedUsage: number;
    totalProjected: number;
  };
  meteran: {
    totalPemakaian: number;
    pemakaianBelumTerbayar: number;
  };
}

export interface MonitoringStatsResponse {
  status: string;
  data: MonitoringStats;
}
