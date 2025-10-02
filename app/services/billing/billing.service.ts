import API from "@/app/utils/API";

// ============== Existing Functions (Backward Compatibility) ==============

export const getMyBilling = async (token: string) => {
  try {
    const response = await API.get("/billing/my-billing", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUnpaidBilling = async (token: string) => {
  try {
    const response = await API.get("/billing/unpaid", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const payBilling = async (
  billingId: string,
  paymentMethod: string,
  token: string
) => {
  try {
    const response = await API.put(
      `/billing/${billingId}/pay`,
      { paymentMethod },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============== New Service Class (Recommended) ==============

export class BillingService {
  /**
   * Get all unpaid billings for current user
   */
  static async getUnpaidBillings(token: string) {
    const response = await API.get("/billing/unpaid", {
      headers: { Authorization: token },
    });
    return response.data;
  }

  /**
   * Get billing history for current user
   */
  static async getBillingHistory(token: string) {
    const response = await API.get("/billing/my", {
      headers: { Authorization: token },
    });
    return response.data;
  }

  /**
   * Pay single bill using wallet (manual payment)
   */
  static async paySingleBill(billingId: string, token: string) {
    const response = await API.put(
      `/billing/pay/${billingId}`,
      { paymentMethod: "MANUAL" },
      { headers: { Authorization: token } }
    );
    return response.data;
  }

  /**
   * Pay all unpaid bills using wallet (manual payment)
   */
  static async payAllBills(token: string) {
    const response = await API.put(
      "/billing/pay-all",
      { paymentMethod: "MANUAL" },
      { headers: { Authorization: token } }
    );
    return response.data;
  }

  /**
   * Create Midtrans payment for single bill
   * Returns snap token for payment popup
   */
  static async createPayment(billingId: string, token: string) {
    const response = await API.post(
      `/billing/create-payment/${billingId}`,
      {},
      { headers: { Authorization: token } }
    );
    return response.data;
  }

  /**
   * Create Midtrans payment for all unpaid bills
   * Returns snap token for payment popup
   */
  static async createPaymentForAllBills(token: string) {
    const response = await API.post(
      "/billing/create-payment-all",
      {},
      { headers: { Authorization: token } }
    );
    return response.data;
  }

  /**
   * Get single billing by ID
   */
  static async getBillingById(billingId: string, token: string) {
    const response = await API.get(`/billing/${billingId}`, {
      headers: { Authorization: token },
    });
    return response.data;
  }
}
