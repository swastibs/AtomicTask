import { createContext, useState, useEffect } from "react";
import authService from "../services/auth";

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
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await authService.getMe();
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await authService.signup(name, email, password);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
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
      const { token, user } = response.data;
      localStorage.setItem("token", token);
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
      localStorage.removeItem("token");
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
