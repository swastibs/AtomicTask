import api from "./api";

const authService = {
  signup: (name, email, password) => {
    return api.post("/auth/signup", { name, email, password });
  },

  login: (email, password) => {
    return api.post("/auth/login", { email, password });
  },

  // ✅ CORRECT endpoint
  getMe: () => {
    return api.get("/users/me");
  },

  logout: () => {
    return api.post("/auth/logout");
  },
};

export default authService;
