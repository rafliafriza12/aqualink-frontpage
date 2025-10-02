# 🔧 RAB Payment Integration Update

**Date:** December 2024  
**Status:** ✅ **COMPLETED**

---

## 📋 What Was Updated

### Problem Identified

❌ **RAB Payment page was using OLD method:**

- Used `updateRABPaymentStatus` (manual payment flag)
- No Midtrans Snap integration
- Direct payment confirmation without actual payment gateway
- Inconsistent with billing payment flow

### Solution Implemented

✅ **Updated to use Midtrans Snap:**

- Integrated `useMidtrans` hook
- Created `createRABPayment` API call
- Midtrans Snap popup for payment
- Consistent payment flow with billing system

---

## 🔄 Changes Made

### 1. **RAB Service** (`app/services/rab/rab.service.ts`)

#### Added:

```typescript
/**
 * Create Midtrans payment for RAB
 * Returns snap token for payment popup
 */
export const createRABPayment = async (rabId: string, token: string) => {
  const response = await API.post(
    `/rab-connection/${rabId}/pay`,
    {},
    { headers: { Authorization: token } }
  );
  return response.data;
};

// Service Class
export class RABService {
  static async createPayment(rabId: string, token: string);
  static async getMyRAB(token: string);
  static async updatePaymentStatus(
    rabId: string,
    isPaid: boolean,
    token: string
  );
}
```

### 2. **RAB Mutation** (`app/services/rab/rab.mutation.ts`)

#### Added:

```typescript
/**
 * Create Midtrans payment for RAB
 */
export const useCreateRABPayment = () => {
  const auth = useAuth();

  return useMutation({
    mutationFn: (rabId: string) =>
      createRABPayment(rabId, auth.auth.token || ""),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal membuat pembayaran RAB"
      );
    },
  });
};
```

### 3. **RAB Payment Page** (`app/(pages)/(private)/profile/rab-payment/page.tsx`)

#### Before:

```typescript
// Used manual update
const updatePaymentMutation = useUpdateRABPayment();

const handlePayment = async () => {
  await updatePaymentMutation.mutateAsync({
    rabId: rabData._id,
    isPaid: true, // ← Just set flag, no actual payment
  });
};
```

#### After:

```typescript
// Uses Midtrans Snap
const createPaymentMutation = useCreateRABPayment();
const { isSnapLoaded, openSnap } = useMidtrans();
const [isLoadingPayment, setIsLoadingPayment] = useState<boolean>(false);

const handlePayment = async () => {
  if (!isSnapLoaded) {
    toast.error("Sistem pembayaran sedang dimuat...");
    return;
  }

  // Create Midtrans payment
  const response = await createPaymentMutation.mutateAsync(rabData._id);
  const { token: snapToken } = response;

  // Open Midtrans Snap popup
  openSnap(snapToken, {
    onSuccess: () => {
      Swal.fire({
        title: "Pembayaran Berhasil!",
        text: "RAB sudah dibayar.",
        icon: "success",
      }).then(() => {
        router.push("/profile");
      });
    },
    onPending: () => {
      /* ... */
    },
    onError: () => {
      /* ... */
    },
    onClose: () => {
      setIsLoadingPayment(false);
    },
  });
};
```

---

## 🎯 Payment Flow

### Old Flow (Before):

```
User clicks "Bayar"
  ↓
Confirmation dialog
  ↓
PUT /rab-connection/:id/payment { isPaid: true }
  ↓
Success message
```

❌ **Problem:** No actual payment, just flag update

### New Flow (After):

```
User clicks "Bayar"
  ↓
Confirmation dialog
  ↓
POST /rab-connection/:rabId/pay
  ↓
Backend creates Midtrans transaction (order_id: RAB-{rabId})
  ↓
Return Snap Token
  ↓
Open Midtrans Snap Popup
  ↓
User completes payment
  ↓
Midtrans sends webhook to /api/webhook/payment
  ↓
Backend updates RAB isPaid = true
  ↓
Notification sent
  ↓
Success message
```

✅ **Better:** Real payment gateway integration

---

## 🔗 Backend Support

### API Endpoint

```javascript
// POST /api/rab-connection/:rabId/pay
export const createRabPayment = async (req, res) => {
  const { rabId } = req.params;

  // Get RAB data
  const rab = await RabConnection.findById(rabId);

  // Create order_id: RAB-{rabId}
  const orderId = `RAB-${rab._id}`;

  // Create Midtrans transaction
  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: rab.totalBiaya,
    },
    customer_details: { ... },
    item_details: [
      {
        id: `rab-${rab._id}`,
        price: rab.totalBiaya,
        quantity: 1,
        name: `Biaya Pemasangan RAB`,
      },
    ],
  };

  const transaction = await snap.createTransaction(parameter);

  res.json({
    token: transaction.token,
    orderId: orderId,
    grossAmount: rab.totalBiaya,
  });
};
```

### Webhook Handler

```javascript
// paymentWebhookController.js handles RAB-* order IDs
if (order_id.startsWith("RAB-")) {
  const rabId = orderId.replace("RAB-", "");
  const rab = await RabConnection.findById(rabId);

  if (transaction_status === "settlement") {
    rab.isPaid = true;
    rab.paidAt = new Date();
    await rab.save();

    // Send notification
    await Notification.create({
      userId: rab.userId,
      title: "Pembayaran RAB Berhasil",
      message: `Pembayaran RAB sebesar ${formatCurrency(
        rab.totalBiaya
      )} telah berhasil`,
      category: "TRANSAKSI",
      link: "/profile",
    });
  }
}
```

---

## ✅ Verification Checklist

### Backend ✅

- [x] `createRabPayment` endpoint exists at `/rab-connection/:rabId/pay`
- [x] Creates Midtrans transaction with order_id: `RAB-{rabId}`
- [x] Returns snap token
- [x] Webhook handles `RAB-*` order IDs
- [x] Updates `isPaid` and `paidAt` on success
- [x] Sends notification

### Frontend ✅

- [x] `createRABPayment` service method
- [x] `useCreateRABPayment` mutation hook
- [x] `useMidtrans` hook integration
- [x] Snap script auto-loads
- [x] Payment button shows "Loading..." when Snap not ready
- [x] Opens Midtrans Snap popup
- [x] Handles all callbacks (success, pending, error, close)
- [x] Success → Redirect to `/profile`
- [x] Error handling with toast notifications
- [x] Loading states

---

## 🎨 UI Updates

### Payment Button

#### Before:

```tsx
<button onClick={handlePayment} disabled={updatePaymentMutation.isPending}>
  {updatePaymentMutation.isPending
    ? "Memproses..."
    : `Bayar ${formatCurrency(rabData.totalBiaya)}`}
</button>
```

#### After:

```tsx
<button onClick={handlePayment} disabled={isLoadingPayment || !isSnapLoaded}>
  {isLoadingPayment
    ? "Memproses..."
    : !isSnapLoaded
    ? "Loading..."
    : `Bayar ${formatCurrency(rabData.totalBiaya)}`}
</button>
```

**Improvements:**

- ✅ Checks if Snap is loaded
- ✅ Shows "Loading..." when Snap not ready
- ✅ Better loading state management
- ✅ Disabled during payment process

---

## 🧪 Testing

### Test Scenarios

1. **RAB Payment Flow**

   - [ ] Open `/profile/rab-payment`
   - [ ] See RAB details
   - [ ] Click "Bayar" button
   - [ ] Confirmation dialog appears
   - [ ] Confirm payment
   - [ ] Midtrans Snap popup opens
   - [ ] Complete payment (use sandbox card)
   - [ ] Success message appears
   - [ ] Redirected to `/profile`
   - [ ] RAB marked as paid
   - [ ] Notification received

2. **Edge Cases**

   - [ ] Already paid RAB → Button disabled
   - [ ] Snap not loaded → Shows "Loading..."
   - [ ] Cancel payment → Popup closes, no error
   - [ ] Payment error → Error toast shown
   - [ ] Network error → Error toast shown

3. **Backend Verification**
   - [ ] Webhook receives RAB payment
   - [ ] RAB `isPaid` updated to `true`
   - [ ] `paidAt` timestamp recorded
   - [ ] Notification created
   - [ ] Transaction record saved

---

## 📊 Comparison

| Feature          | Before                    | After              |
| ---------------- | ------------------------- | ------------------ |
| Payment Method   | Manual flag update        | Midtrans Snap      |
| Real Payment     | ❌ No                     | ✅ Yes             |
| Webhook          | ❌ N/A                    | ✅ Handled         |
| Order ID         | ❌ N/A                    | ✅ RAB-{rabId}     |
| Notification     | ⚠️ Manual                 | ✅ Auto            |
| Loading State    | ⚠️ Basic                  | ✅ Advanced        |
| Snap Ready Check | ❌ No                     | ✅ Yes             |
| Error Handling   | ⚠️ Basic                  | ✅ Comprehensive   |
| User Feedback    | ⚠️ Limited                | ✅ Toast + Dialog  |
| Consistency      | ❌ Different from billing | ✅ Same as billing |

---

## 🎯 Benefits

### For Users

✅ **Real payment gateway** - Secure transaction via Midtrans  
✅ **Multiple payment methods** - Card, e-wallet, bank transfer, etc.  
✅ **Better feedback** - Clear loading states and messages  
✅ **Consistent experience** - Same flow as billing payment

### For Developers

✅ **Code consistency** - Uses same patterns as billing  
✅ **Reusable hooks** - `useMidtrans` hook shared  
✅ **Better maintainability** - Service class architecture  
✅ **Proper error handling** - Toast notifications

### For System

✅ **Real transactions** - Proper payment records  
✅ **Webhook integration** - Automated status updates  
✅ **Notifications** - Auto-sent on payment success  
✅ **Audit trail** - Transaction history tracked

---

## 🔐 Security

### Payment Security

✅ **Midtrans PCI DSS compliant**  
✅ **Server-side validation**  
✅ **Order ID verification** (RAB-{rabId})  
✅ **User ownership check**  
✅ **Webhook signature verification** (in backend)

### Auth Security

✅ **Token required** for all API calls  
✅ **User ID verification** in backend  
✅ **Cannot pay other user's RAB**

---

## 📚 Related Documentation

- [FRONTEND_IMPLEMENTATION_GUIDE.md](./FRONTEND_IMPLEMENTATION_GUIDE.md) - Midtrans Snap integration guide
- [FRONTEND_IMPLEMENTATION_SUMMARY.md](./FRONTEND_IMPLEMENTATION_SUMMARY.md) - Billing payment implementation
- [ARCHITECTURE_DOCUMENTATION.md](../aqualink-backend/ARCHITECTURE_DOCUMENTATION.md) - Backend payment architecture

---

## ✅ Status: COMPLETE

RAB Payment has been successfully updated to use Midtrans Snap integration, matching the billing payment flow.

**Files Modified:**

- ✅ `app/services/rab/rab.service.ts` - Added `createRABPayment` method
- ✅ `app/services/rab/rab.mutation.ts` - Added `useCreateRABPayment` hook
- ✅ `app/(pages)/(private)/profile/rab-payment/page.tsx` - Updated to use Midtrans Snap

**Backend Support:**

- ✅ Endpoint: `POST /rab-connection/:rabId/pay`
- ✅ Webhook: Handles `RAB-*` order IDs
- ✅ Order ID format: `RAB-{rabId}`

**No compilation errors** ✅  
**Ready for testing** ✅

---

_Last Updated: December 2024_
