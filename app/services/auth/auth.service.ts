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

export const logout = async (userId: string | undefined) => {
  try {
    const response = await API.post("/users/logout", { userId });
    return response.data;
  } catch (error) {
    throw error;
  }
};
