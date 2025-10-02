import API from "@/app/utils/API";

export const getMyRAB = async (token: string) => {
  try {
    const response = await API.get("/rab-connection/my-rab", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRABPaymentStatus = async (
  rabId: string,
  isPaid: boolean,
  token: string
) => {
  try {
    const response = await API.put(
      `/rab-connection/${rabId}/payment`,
      { isPaid },
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

/**
 * Create Midtrans payment for RAB
 * Returns snap token for payment popup
 */
export const createRABPayment = async (rabId: string, token: string) => {
  try {
    const response = await API.post(
      `/rab-connection/${rabId}/pay`,
      {},
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

// ============== Service Class (Recommended) ==============

export class RABService {
  /**
   * Get my RAB connection
   */
  static async getMyRAB(token: string) {
    const response = await API.get("/rab-connection/my-rab", {
      headers: { Authorization: token },
    });
    return response.data;
  }

  /**
   * Create Midtrans payment for RAB
   * Returns snap token for payment popup
   */
  static async createPayment(rabId: string, token: string) {
    const response = await API.post(
      `/rab-connection/${rabId}/pay`,
      {},
      { headers: { Authorization: token } }
    );
    return response.data;
  }

  /**
   * Update RAB payment status (manual/admin)
   */
  static async updatePaymentStatus(
    rabId: string,
    isPaid: boolean,
    token: string
  ) {
    const response = await API.put(
      `/rab-connection/${rabId}/payment`,
      { isPaid },
      { headers: { Authorization: token } }
    );
    return response.data;
  }
}
