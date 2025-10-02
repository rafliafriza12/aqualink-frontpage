// app/services/notification/notification.service.ts

import API from "@/app/utils/API";

export class NotificationService {
  /**
   * Get all notifications for current user
   */
  static async getMyNotifications(token: string) {
    const response = await API.get("/notification/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  /**
   * Mark single notification as read
   */
  static async markAsRead(notificationId: string, token: string) {
    const response = await API.put(
      `/notification/read/${notificationId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead(token: string) {
    const response = await API.put(
      "/notification/read-all",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }

  /**
   * Delete single notification
   */
  static async deleteNotification(notificationId: string, token: string) {
    const response = await API.delete(`/notification/${notificationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  /**
   * Get unread notification count
   */
  static async getUnreadCount(token: string) {
    const response = await API.get("/notification/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const notifications = response.data.data || [];
    return notifications.filter((n: any) => !n.isRead).length;
  }
}
