# 🎨 Frontend Implementation Guide - Aqualink

**Date:** October 3, 2025  
**Purpose:** Panduan implementasi frontend untuk integrasi dengan backend API

---

## 📋 Table of Contents

1. [Payment Page Implementation](#payment-page-implementation)
2. [Notification System](#notification-system)
3. [Midtrans Integration](#midtrans-integration)
4. [API Service Layer](#api-service-layer)
5. [Type Definitions](#type-definitions)
6. [Component Examples](#component-examples)

---

## 💳 Payment Page Implementation

### Location

`/app/(pages)/(private)/pembayaran/`

### Features Required

1. **Display Unpaid Bills**

   - List all unpaid billings
   - Show period, amount, due date
   - Calculate and show denda (late fee) if overdue
   - Show overdue status badge

2. **Payment Options**

   - Pay single bill (manual or Midtrans)
   - Pay all bills at once (manual or Midtrans)
   - Top-up wallet option

3. **Bill Details**
   - Biaya air (water cost)
   - Biaya beban (fixed cost)
   - Denda (late fee if any)
   - Total amount

---

## 🔔 Notification System

### Requirements

**Backend sends notifications with:**

```typescript
{
  userId: string;
  title: string;
  message: string;
  category: "TRANSAKSI" | "INFORMASI" | "PERINGATAN";
  link: string; // ← IMPORTANT: Click destination
  isRead: boolean;
  createdAt: Date;
}
```

### Notification Click Handler

```typescript
const handleNotificationClick = (notification: Notification) => {
  // Mark as read
  await markNotificationAsRead(notification._id);

  // Navigate to link
  if (notification.link) {
    router.push(notification.link);
  }
};
```

### Notification Link Mapping

| Event                 | Link               | Purpose                |
| --------------------- | ------------------ | ---------------------- |
| New billing           | `/pembayaran`      | Direct to payment page |
| Overdue billing       | `/pembayaran`      | Remind to pay          |
| Payment reminder      | `/pembayaran`      | Encourage payment      |
| Payment success       | `/riwayat-tagihan` | View history           |
| Payment failed        | `/pembayaran`      | Retry payment          |
| Wallet top-up success | `/pembayaran`      | Ready to pay           |

---

## 🔗 Midtrans Integration

### Installation

```bash
npm install midtrans-client
# or
yarn add midtrans-client
```

### Snap Integration

```typescript
// 1. Load Snap.js in layout or _document
<script
  src="https://app.sandbox.midtrans.com/snap/snap.js"
  data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
></script>;

// 2. Type definition
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess: (result: any) => void;
          onPending: (result: any) => void;
          onError: (result: any) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}
```

### Payment Flow

#### A. Single Billing Payment

```typescript
const paySingleBill = async (billingId: string) => {
  try {
    setIsLoading(true);

    // Create Midtrans payment
    const response = await API.post(
      `/billing/create-payment/${billingId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { token: snapToken, orderId } = response.data.data;

    // Open Midtrans Snap
    window.snap.pay(snapToken, {
      onSuccess: (result) => {
        toast.success("Pembayaran berhasil!");
        router.push("/riwayat-tagihan");
      },
      onPending: (result) => {
        toast.info("Pembayaran sedang diproses...");
      },
      onError: (result) => {
        toast.error("Pembayaran gagal!");
      },
      onClose: () => {
        // User closed popup
        setIsLoading(false);
      },
    });
  } catch (error) {
    toast.error("Gagal membuat pembayaran");
    setIsLoading(false);
  }
};
```

#### B. Multiple Bills Payment

```typescript
const payAllBills = async () => {
  try {
    setIsLoading(true);

    // Create Midtrans payment for all bills
    const response = await API.post(
      `/billing/create-payment-all`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { token: snapToken, summary } = response.data.data;

    console.log(
      `Paying ${summary.totalBills} bills, total: Rp${summary.totalAmount}`
    );

    // Open Midtrans Snap
    window.snap.pay(snapToken, {
      onSuccess: (result) => {
        toast.success(`Pembayaran ${summary.totalBills} tagihan berhasil!`);
        router.push("/riwayat-tagihan");
      },
      onPending: (result) => {
        toast.info("Pembayaran sedang diproses...");
      },
      onError: (result) => {
        toast.error("Pembayaran gagal!");
      },
      onClose: () => {
        setIsLoading(false);
      },
    });
  } catch (error) {
    toast.error("Gagal membuat pembayaran");
    setIsLoading(false);
  }
};
```

#### C. Manual Payment (Wallet)

```typescript
const payWithWallet = async (billingId: string) => {
  try {
    setIsLoading(true);

    const response = await API.put(
      `/billing/pay/${billingId}`,
      { paymentMethod: "MANUAL" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success("Pembayaran berhasil!");
    fetchUnpaidBills(); // Refresh data
  } catch (error) {
    toast.error(error.response?.data?.message || "Pembayaran gagal");
  } finally {
    setIsLoading(false);
  }
};
```

---

## 🔧 API Service Layer

### Billing Service

```typescript
// app/services/billing/billing.service.ts

import API from "@/app/utils/API";

export class BillingService {
  // Get unpaid billings
  static async getUnpaidBillings(token: string) {
    const response = await API.get("/billing/unpaid", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // Get billing history
  static async getBillingHistory(token: string) {
    const response = await API.get("/billing/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // Pay single bill (manual)
  static async paySingleBill(billingId: string, token: string) {
    const response = await API.put(
      `/billing/pay/${billingId}`,
      { paymentMethod: "MANUAL" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }

  // Pay all bills (manual)
  static async payAllBills(token: string) {
    const response = await API.put(
      "/billing/pay-all",
      { paymentMethod: "MANUAL" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }

  // Create Midtrans payment (single)
  static async createPayment(billingId: string, token: string) {
    const response = await API.post(
      `/billing/create-payment/${billingId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }

  // Create Midtrans payment (all bills)
  static async createPaymentForAllBills(token: string) {
    const response = await API.post(
      "/billing/create-payment-all",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
}
```

### Notification Service

```typescript
// app/services/notification/notification.service.ts

import API from "@/app/utils/API";

export class NotificationService {
  // Get my notifications
  static async getMyNotifications(token: string) {
    const response = await API.get("/notification/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // Mark as read
  static async markAsRead(notificationId: string, token: string) {
    const response = await API.put(
      `/notification/read/${notificationId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }

  // Mark all as read
  static async markAllAsRead(token: string) {
    const response = await API.put(
      "/notification/read-all",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }

  // Delete notification
  static async deleteNotification(notificationId: string, token: string) {
    const response = await API.delete(`/notification/${notificationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}
```

---

## 📝 Type Definitions

### Billing Types

```typescript
// app/types/billing.types.ts

export interface UnpaidBill {
  _id: string;
  userId: string;
  meteranId: {
    _id: string;
    noMeteran: string;
    kelompokPelangganId: {
      namaKelompok: string;
    };
  };
  periode: string;
  pemakaianAwal: number;
  pemakaianAkhir: number;
  totalPemakaian: number;
  biayaAir: number;
  biayaBeban: number;
  totalTagihan: number;
  denda: number;
  totalWithDenda: number;
  daysLate: number;
  dueDate: string;
  isPaid: boolean;
  isOverdue: boolean;
  createdAt: string;
}

export interface UnpaidBillsResponse {
  status: number;
  data: {
    bills: UnpaidBill[];
    totalUnpaid: number;
    count: number;
  };
}

export interface PaymentResponse {
  status: number;
  message: string;
  data: {
    orderId: string;
    token: string;
    redirectUrl: string;
    billing?: {
      periode: string;
      biayaAir: number;
      biayaBeban: number;
      denda: number;
      totalAmount: number;
    };
    summary?: {
      totalBills: number;
      totalAmount: number;
      bills: Array<{
        periode: string;
        totalTagihan: number;
      }>;
    };
  };
}
```

### Notification Types

```typescript
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
```

---

## 🎨 Component Examples

### 1. Payment Page Component

```typescript
// app/(pages)/(private)/pembayaran/_containers/Pembayaran.tsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BillingService } from "@/app/services/billing/billing.service";
import { UnpaidBill } from "@/app/types/billing.types";
import { useAuth } from "@/app/hooks/UseAuth";

const PembayaranPage = () => {
  const router = useRouter();
  const { auth } = useAuth();
  const [unpaidBills, setUnpaidBills] = useState<UnpaidBill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBills, setSelectedBills] = useState<string[]>([]);

  useEffect(() => {
    fetchUnpaidBills();
  }, []);

  const fetchUnpaidBills = async () => {
    try {
      const response = await BillingService.getUnpaidBillings(auth.token);
      setUnpaidBills(response.data.bills);
    } catch (error) {
      toast.error("Gagal memuat data tagihan");
    }
  };

  const handlePaySingleBill = async (
    billingId: string,
    useWallet: boolean = false
  ) => {
    try {
      setIsLoading(true);

      if (useWallet) {
        // Manual payment dengan wallet
        await BillingService.paySingleBill(billingId, auth.token);
        toast.success("Pembayaran berhasil!");
        fetchUnpaidBills();
      } else {
        // Payment via Midtrans
        const response = await BillingService.createPayment(
          billingId,
          auth.token
        );
        const { token: snapToken } = response.data;

        window.snap.pay(snapToken, {
          onSuccess: () => {
            toast.success("Pembayaran berhasil!");
            router.push("/riwayat-tagihan");
          },
          onPending: () => {
            toast.info("Pembayaran sedang diproses");
          },
          onError: () => {
            toast.error("Pembayaran gagal");
          },
          onClose: () => {
            setIsLoading(false);
          },
        });
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Gagal melakukan pembayaran"
      );
      setIsLoading(false);
    }
  };

  const handlePayAllBills = async (useWallet: boolean = false) => {
    try {
      setIsLoading(true);

      if (useWallet) {
        // Manual payment untuk semua tagihan
        await BillingService.payAllBills(auth.token);
        toast.success("Semua tagihan berhasil dibayar!");
        fetchUnpaidBills();
      } else {
        // Payment via Midtrans untuk semua tagihan
        const response = await BillingService.createPaymentForAllBills(
          auth.token
        );
        const { token: snapToken, summary } = response.data;

        console.log(`Membayar ${summary.totalBills} tagihan`);

        window.snap.pay(snapToken, {
          onSuccess: () => {
            toast.success(`${summary.totalBills} tagihan berhasil dibayar!`);
            router.push("/riwayat-tagihan");
          },
          onPending: () => {
            toast.info("Pembayaran sedang diproses");
          },
          onError: () => {
            toast.error("Pembayaran gagal");
          },
          onClose: () => {
            setIsLoading(false);
          },
        });
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Gagal melakukan pembayaran"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pembayaran Tagihan</h1>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Total Tagihan Belum Dibayar</p>
            <p className="text-3xl font-bold text-blue-600">
              {unpaidBills.length} Tagihan
            </p>
          </div>
          <button
            onClick={() => handlePayAllBills()}
            disabled={unpaidBills.length === 0 || isLoading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            Bayar Semua via Midtrans
          </button>
        </div>
      </div>

      {/* Bills List */}
      <div className="space-y-4">
        {unpaidBills.map((bill) => (
          <div key={bill._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Periode: {bill.periode}
                </h3>
                <p className="text-sm text-gray-600">
                  Meteran: {bill.meteranId.noMeteran}
                </p>
              </div>
              {bill.isOverdue && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                  Terlambat {bill.daysLate} hari
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Biaya Air</p>
                <p className="font-semibold">
                  Rp {bill.biayaAir.toLocaleString("id-ID")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Biaya Beban</p>
                <p className="font-semibold">
                  Rp {bill.biayaBeban.toLocaleString("id-ID")}
                </p>
              </div>
              {bill.denda > 0 && (
                <div>
                  <p className="text-sm text-gray-600">Denda</p>
                  <p className="font-semibold text-red-600">
                    Rp {bill.denda.toLocaleString("id-ID")}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-xl font-bold text-blue-600">
                  Rp {bill.totalWithDenda.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handlePaySingleBill(bill._id, false)}
                disabled={isLoading}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Bayar via Midtrans
              </button>
              <button
                onClick={() => handlePaySingleBill(bill._id, true)}
                disabled={isLoading}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Bayar dengan Wallet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PembayaranPage;
```

### 2. Notification Component

```typescript
// app/components/NotificationBell.tsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NotificationService } from "@/app/services/notification/notification.service";
import { Notification } from "@/app/types/notification.types";
import { useAuth } from "@/app/hooks/UseAuth";

const NotificationBell = () => {
  const router = useRouter();
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await NotificationService.getMyNotifications(auth.token);
      setNotifications(response.data);
      setUnreadCount(
        response.data.filter((n: Notification) => !n.isRead).length
      );
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    try {
      // Mark as read
      if (!notification.isRead) {
        await NotificationService.markAsRead(notification._id, auth.token);
      }

      // Navigate to link
      if (notification.link) {
        router.push(notification.link);
      }

      setIsOpen(false);
      fetchNotifications();
    } catch (error) {
      console.error("Error handling notification click:", error);
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

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Notifikasi</h3>
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Tidak ada notifikasi
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notif) => (
                <div
                  key={notif._id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    !notif.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{notif.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getCategoryColor(
                        notif.category
                      )}`}
                    >
                      {notif.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(notif.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
```

---

## 🔑 Environment Variables

Add to `.env.local`:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# Midtrans
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key_here
NEXT_PUBLIC_MIDTRANS_SERVER_KEY=your_server_key_here
```

---

## ✅ Implementation Checklist

### Payment Page

- [ ] Display unpaid bills list
- [ ] Show bill details (air, beban, denda)
- [ ] Calculate total with denda
- [ ] Single bill payment button
- [ ] Pay all bills button
- [ ] Wallet payment option
- [ ] Midtrans payment integration
- [ ] Loading states
- [ ] Error handling
- [ ] Success toast notifications

### Notification System

- [ ] Notification bell component
- [ ] Unread count badge
- [ ] Notification dropdown
- [ ] Mark as read on click
- [ ] Navigate to notification.link
- [ ] Category color coding
- [ ] Auto-refresh (polling)
- [ ] Mark all as read option

### Midtrans Integration

- [ ] Load Snap.js script
- [ ] Create payment function
- [ ] Handle onSuccess callback
- [ ] Handle onPending callback
- [ ] Handle onError callback
- [ ] Handle onClose callback
- [ ] Show loading state
- [ ] Redirect after success

---

## 🎯 Testing Scenarios

### Payment Flow

1. **Single Bill Payment**

   - Select bill
   - Click "Bayar via Midtrans"
   - Complete payment on Midtrans
   - Verify redirect to /riwayat-tagihan
   - Check notification received

2. **Multiple Bills Payment**

   - Click "Bayar Semua"
   - Verify total amount
   - Complete payment
   - Verify all bills marked as paid
   - Check notification received

3. **Wallet Payment**
   - Click "Bayar dengan Wallet"
   - Verify immediate update
   - Check notification
   - Verify balance deducted

### Notification Flow

1. **Receive Notification**

   - Backend sends notification
   - Bell icon shows unread count
   - Notification appears in list

2. **Click Notification**
   - Mark as read
   - Navigate to link
   - Verify correct page opened

---

## 📚 Additional Resources

- [Midtrans Snap Documentation](https://docs.midtrans.com/en/snap/overview)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Query](https://tanstack.com/query/latest)

---

_Documentation by: Development Team_  
_Last Updated: October 3, 2025_
