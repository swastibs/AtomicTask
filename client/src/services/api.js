import axios from "axios";

// Get the API URL from environment variables
// Vite uses import.meta.env, Create React App uses process.env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Request Interceptor
 * Automatically attaches the JWT token to every request if it exists
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
  (error) => {
    // Any status code outside 2xx triggers this

    // Handle 401 Unauthorized (token expired or invalid)
    if (error.response?.status === 401) {
      // Clear the invalid token
      localStorage.removeItem("token");

      // Optional: Redirect to login page
      // window.location.href = "/login";

      // You can also dispatch a custom event or update context here
      // window.dispatchEvent(new CustomEvent("auth:logout"));
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
