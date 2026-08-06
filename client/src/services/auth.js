import api from "./api";

/**
 * Authentication API Service
 * All auth-related API calls
 */
const authService = {
  /**
   * Sign up a new user
   * @param {string} name - User's full name
   * @param {string} email - User's email address
   * @param {string} password - User's password (min 6 chars)
   * @returns {Promise} - API response
   */
  signup: (name, email, password) => {
    return api.post("/auth/signup", { name, email, password });
  },

  /**
   * Log in an existing user
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise} - API response
   */
  login: (email, password) => {
    return api.post("/auth/login", { email, password });
  },

  /**
   * Get the current logged-in user's data
   * @returns {Promise} - API response with user data
   */
  getMe: () => {
    return api.get("/auth/me");
  },

  /**
   * Log out (client-side only – token removal happens in context)
   * Server-side logout can be added if your API supports it
   */
  logout: () => {
    return api.post("/auth/logout");
  },
};

export default authService;
