const env = require("../config/env.config");
const ApiError = require("../utils/ApiError");

const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, "");
const allowedOrigins = (env.CORS_ALLOWED_ORIGINS || "http://localhost:5173,http://localhost:3000")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

module.exports = (req, res, next) => {
  const origin = req.get("origin");
  // Cookie-authenticated requests must be initiated by one of our web clients.
  if (!origin || !allowedOrigins.includes(normalizeOrigin(origin))) {
    return next(new ApiError(403, "Untrusted request origin"));
  }
  return next();
};
