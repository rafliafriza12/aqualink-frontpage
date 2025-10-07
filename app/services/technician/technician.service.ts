import API from "@/app/utils/API";

export interface Technician {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

// Get all technicians (Admin only)
export const getAllTechnicians = async (token: string) => {
  try {
    const response = await API.get("/technician", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get technician by ID (Admin only)
export const getTechnicianById = async (id: string, token: string) => {
  try {
    const response = await API.get(`/technician/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
