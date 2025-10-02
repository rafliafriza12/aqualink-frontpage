import API from "@/app/utils/API";

export const getUserProfile = async (token: string) => {
  try {
    const response = await API.get("/users/profile", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
