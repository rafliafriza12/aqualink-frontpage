export interface Billing {
  _id: string;
  userId: string;
  meteranId: string;
  periode: string;
  pemakaianAwal: number;
  pemakaianAkhir: number;
  totalPemakaian: number;
  biayaAir: number;
  biayaBeban: number;
  totalTagihan: number;
  isPaid: boolean;
  paidAt: string | null;
  paymentMethod: string | null;
  dueDate: string;
  isOverdue: boolean;
  denda: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UnpaidBill extends Billing {
  daysLate: number;
  totalWithDenda: number;
}

export interface MyBillingResponse {
  status: number;
  count: number;
  data: Billing[];
}

export interface UnpaidBillingResponse {
  status: number;
  data: {
    bills: UnpaidBill[];
    totalUnpaid: number;
    count: number;
  };
}

export interface PayBillingResponse {
  status: number;
  message: string;
  data: {
    billing: Billing;
    notification: any;
    summary: {
      periode: string;
      biayaAir: number;
      biayaBeban: number;
      denda: number;
      totalPaid: number;
    };
  };
}
