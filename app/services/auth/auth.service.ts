import API from "@/app/utils/API";
import { LoginCredentials, RegisterCredentials } from "./auth.type";

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await API.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (credentials: RegisterCredentials) => {
  try {
    const response = await API.post("/users", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (token: string | null) => {
  try {
    const response = await API.post(
      "/users/logout",
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
