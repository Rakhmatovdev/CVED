import { notification } from "antd";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import qs from "qs";
import { endpoints } from "@/shared/api/endpoints.ts";
import { isDevelopment } from "@/shared/config/environment.ts";
import { AuthManager } from "@/shared/lib/auth-manager.ts";

export const paramsSerializer = (params: Record<string, any>) => {
  return qs.stringify(params, { arrayFormat: "repeat" });
};

const commonConfig = { paramsSerializer, timeout: 30000 };

const env = import.meta.env;
export const baseURL = env.VITE_BACKEND_HOST;
export const urlVersion = env.VITE_API_VERSION;

const Api = axios.create({
  ...commonConfig,
  baseURL: `${baseURL}/${urlVersion}`
});

// --- Token Refresh Queue ---
let isRefreshing = false;
type IProcessFunction = (token: string | null) => void;
const pendingQueue: IProcessFunction[] = [];

const processQueue = (token: string | null, error?: any) => {
  pendingQueue.forEach((cb) => cb(error ? null : token));
  pendingQueue.length = 0;
};

// --- Error Notification Dedupe ---
const shownErrors = new Set<string>();
const showError = (
  key: string,
  message: string,
  description: string,
  duration = 4
) => {
  if (shownErrors.has(key)) return;
  shownErrors.add(key);
  notification.error({ message, description, duration });
  setTimeout(() => shownErrors.delete(key), 5000);
};

// --- Request Interceptor ---
Api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = AuthManager.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["Accept-Language"] =
    localStorage.getItem("i18nextLng") || "ru";
  return config;
});

// --- Response Interceptor ---
Api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { config, response, code } = error;
    const originalRequest = config as typeof config & { _retry?: boolean };
    const status = response?.status;

    if (isDevelopment) {
      console.debug("API error:", {
        status,
        url: originalRequest?.url,
        data: response?.data
      });
    }

    // --- 401: Refresh token logic ---
    if (
      status === 401 &&
      originalRequest &&
      !originalRequest.url?.includes(endpoints.auth.refresh) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingQueue.push((token) => {
            if (!token) return resolve(Promise.reject(error));
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(Api(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const newToken = await AuthManager.refreshAccessToken();
        if (!newToken) throw new Error("Refresh failed");

        AuthManager.setAccessToken(newToken);
        processQueue(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return Api(originalRequest);
      } catch (e) {
        processQueue(null, e);
        AuthManager.logout();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    if (code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

    // --- Other errors ---
    if (status !== 401 && status !== 404) {
      const { code } = error;
      const errorData = (response as any)?.data;

      if (code === "ECONNABORTED") {
        showError("timeout", "Тайм-аут", "Запрос занял слишком много времени");
      } else if (code === "ERR_NETWORK") {
        showError(
          "network",
          "Сетевая ошибка",
          "Проверьте подключение к интернету"
        );
      } else if (status && status >= 500) {
        showError("server", "Ошибка сервера", "Попробуйте позже", 5);
      } else if (errorData?.message) {
        showError(`msg_${status}`, "Ошибка", errorData.message);
      } else if (errorData?.detail) {
        showError(`detail_${status}`, "Ошибка", errorData.detail);
      } else {
        showError(`unknown_${status}`, "Ошибка", "Что-то пошло не так");
      }
    }

    return Promise.reject(error);
  }
);

export default Api;
