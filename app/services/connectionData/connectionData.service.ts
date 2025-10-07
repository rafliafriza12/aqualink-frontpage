import API from "@/app/utils/API";

export const createConnectionData = async (
  formData: FormData,
  token: string
) => {
  try {
    const response = await API.post("/connection-data", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyConnectionData = async (token: string) => {
  try {
    const response = await API.get("/connection-data/my-connection", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Assign technician to connection data (Admin only)
export const assignTechnician = async (
  connectionDataId: string,
  technicianId: string,
  token: string
) => {
  try {
    const response = await API.put(
      `/connection-data/${connectionDataId}/assign-technician`,
      { technicianId },
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

// Unassign technician from connection data (Admin only)
export const unassignTechnician = async (
  connectionDataId: string,
  token: string
) => {
  try {
    const response = await API.put(
      `/connection-data/${connectionDataId}/unassign-technician`,
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
