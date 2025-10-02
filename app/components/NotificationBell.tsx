/**
 * Notification Bell Component
 *
 * Features:
 * - Shows unread notification count badge
 * - Dropdown list of notifications
 * - Click notification → mark as read + navigate to link
 * - Auto-refresh every 30 seconds
 * - Category color coding
 *
 * Usage:
 * import NotificationBell from "@/app/components/NotificationBell";
 *
 * <NotificationBell />
 */

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NotificationService } from "@/app/services/notification/notification.service";
import { Notification } from "@/app/types/notification.types";
import { useAuth } from "@/app/hooks/UseAuth";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CircularProgress from "@mui/material/CircularProgress";

const NotificationBell = () => {
  const router = useRouter();
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.token) {
      fetchNotifications();

      // Poll every 30 seconds for new notifications
      const interval = setInterval(fetchNotifications, 30000);

      return () => clearInterval(interval);
    }
  }, [auth.token]);

  const fetchNotifications = async () => {
    if (!auth.token) return;

    try {
      setIsLoading(true);
      const response = await NotificationService.getMyNotifications(auth.token);
      const notifs = response.data || [];

      setNotifications(notifs);
      setUnreadCount(notifs.filter((n: Notification) => !n.isRead).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!auth.token) return;

    try {
      // Mark as read if unread
      if (!notification.isRead) {
        await NotificationService.markAsRead(notification._id, auth.token);
      }

      // Navigate to link if exists
      if (notification.link) {
        router.push(notification.link);
      }

      // Close dropdown
      setIsOpen(false);

      // Refresh notifications
      fetchNotifications();
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!auth.token) return;

    try {
      await NotificationService.markAllAsRead(auth.token);
      fetchNotifications();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "TRANSAKSI":
        return "bg-blue-100 text-blue-600";
      case "PERINGATAN":
        return "bg-red-100 text-red-600";
      case "INFORMASI":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 7) return `${diffDays} hari yang lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Notifications"
      >
        <NotificationsIcon sx={{ fontSize: 28, color: "#252525" }} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 max-h-[600px] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Notifikasi</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Tandai semua dibaca
                </button>
              )}
            </div>

            {/* Loading State */}
            {isLoading && notifications.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center">
                <CircularProgress size={32} />
                <p className="mt-4 text-gray-500">Memuat notifikasi...</p>
              </div>
            ) : notifications.length === 0 ? (
              /* Empty State */
              <div className="p-8 text-center">
                <NotificationsIcon
                  sx={{ fontSize: 64, color: "#CBD5E0", marginBottom: 2 }}
                />
                <p className="text-gray-500 font-medium">
                  Tidak ada notifikasi
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Notifikasi akan muncul di sini
                </p>
              </div>
            ) : (
              /* Notifications List */
              <div className="divide-y overflow-y-auto max-h-[500px]">
                {notifications.map((notif) => (
                  <div
                    key={notif._id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !notif.isRead
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4
                        className={`font-semibold text-sm ${
                          !notif.isRead ? "text-blue-900" : "text-gray-800"
                        }`}
                      >
                        {notif.title}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded ${getCategoryColor(
                          notif.category
                        )}`}
                      >
                        {notif.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(notif.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
