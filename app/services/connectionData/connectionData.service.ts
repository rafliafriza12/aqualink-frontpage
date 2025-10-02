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
