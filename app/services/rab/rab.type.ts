export interface RABConnection {
  _id: string;
  connectionDataId: string;
  userId: string;
  totalBiaya: number;
  rabFile: string;
  isPaid: boolean;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MyRABResponse {
  status: number;
  data: RABConnection;
  message: string;
}

export interface UpdateRABPaymentResponse {
  status: number;
  data: RABConnection;
  message: string;
}
