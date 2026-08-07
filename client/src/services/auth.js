import api, { refreshAccessToken } from "./api";

const authService = {
  signup: (name, email, password) => {
    return api.post("/auth/signup", { name, email, password });
  },

  login: (email, password) => {
    return api.post("/auth/login", { email, password });
  },

  refresh: refreshAccessToken,

  // ✅ CORRECT endpoint
  getMe: () => {
    return api.get("/users/me");
  },

  logout: () => {
    return api.post("/auth/logout");
  },
};

export default authService;
