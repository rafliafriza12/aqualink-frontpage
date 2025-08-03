import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { store } from "../store";
import { logout } from "../store/slices/authSlice";
// Membuat instance API dengan konfigurasi dasar
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

// Menambahkan interceptor untuk request
API.interceptors.request.use(
  (config: any): any => {
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Menambahkan interceptor untuk response
API.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default API;
