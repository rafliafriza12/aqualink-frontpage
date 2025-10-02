// app/types/notification.types.ts

export type NotificationCategory = "TRANSAKSI" | "INFORMASI" | "PERINGATAN";

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  category: NotificationCategory;
  link: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsResponse {
  status: number;
  count: number;
  data: Notification[];
}
