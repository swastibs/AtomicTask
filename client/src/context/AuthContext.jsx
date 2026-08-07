import { createContext, useState, useEffect } from "react";
import authService from "../services/auth";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getErrorMessage = (error) => {
    if (error.response?.data) {
      const data = error.response.data;
      if (data.message) return data.message;
      if (data.error) return data.error;
      if (data.errors) {
        const firstError = Object.values(data.errors)[0];
        if (typeof firstError === "string") return firstError;
        if (Array.isArray(firstError)) return firstError[0];
      }
    }
    if (error.message) return error.message;
    if (error.response?.status === 400)
      return "Invalid request. Please check your input.";
    if (error.response?.status === 401)
      return "Invalid email or password. Please try again.";
    if (error.response?.status === 409)
      return "Email already exists. Please use a different email.";
    if (error.response?.status === 500)
      return "Server error. Please try again later.";
    return "Something went wrong. Please try again.";
  };

  const checkAuth = async () => {
    try {
      const response = await authService.refresh();
      const { accessToken, user } = response.data.data;
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      setUser(user);
    } catch {
      delete api.defaults.headers.common.Authorization;
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      delete api.defaults.headers.common.Authorization;
      setUser(null);
    };
    window.addEventListener("auth:expired", handleSessionExpired);
    return () => window.removeEventListener("auth:expired", handleSessionExpired);
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await authService.signup(name, email, password);
      const { accessToken, user } = response.data.data;
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      setUser(user);
      return { success: true, user };
    } catch (error) {
      const message = getErrorMessage(error);
      return { success: false, error: message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { accessToken, user } = response.data.data;
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      setUser(user);
      return { success: true, user };
    } catch (error) {
      const message = getErrorMessage(error);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // If the API fails (network, 401, etc.), we still want to log out locally
      console.error("Logout API error:", error);
    } finally {
      delete api.defaults.headers.common.Authorization;
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
