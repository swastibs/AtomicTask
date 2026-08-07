import axios from "axios";

// Get the API URL from environment variables
// Vite uses import.meta.env, Create React App uses process.env
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "/api" : "http://localhost:3000/api");

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: true,
});

let refreshPromise = null;

// React Strict Mode and concurrent failed requests can both ask for a refresh.
// Share one rotation so the same refresh cookie is never consumed twice.
export async function refreshAccessToken() {
  refreshPromise ??= api.post("/auth/refresh");
  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

/**
 * Request Interceptor
 * Attaches the short-lived access token held only in memory.
 */
api.interceptors.request.use(
  (config) => {
    const authorization = api.defaults.headers.common.Authorization;
    if (authorization) {
      config.headers.Authorization = authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * Handles token expiry and other common errors
 */
api.interceptors.response.use(
  (response) => {
    // Any status code within 2xx triggers this
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Refresh once and replay an API request whose access token has expired.
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !/\/auth\/(login|signup|refresh)/.test(originalRequest.url || "")
    ) {
      originalRequest._retry = true;
      try {
        const response = await refreshAccessToken();
        const accessToken = response.data.data.accessToken;
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        delete api.defaults.headers.common.Authorization;
        window.dispatchEvent(new CustomEvent("auth:expired"));
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden (insufficient permissions)
    if (error.response?.status === 403) {
      // You could show a notification or redirect to a "no access" page
      console.warn("You don't have permission to perform this action.");
    }

    // Handle network errors (no response from server)
    if (error.response?.status === undefined) {
      console.error("Network error – please check your connection.");
    }

    return Promise.reject(error);
  },
);

export default api;
