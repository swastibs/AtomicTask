require("dotenv").config();

const requiredEnv = ["MONGODB_URI", "JWT_SECRET"];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);
if (missingEnv.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnv.join(", ")}`,
  );
}

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  TRUST_PROXY: process.env.TRUST_PROXY === "true",
  port: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  REFRESH_TOKEN_EXPIRES_DAYS: Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 30),
  BCRYPT_ROUNDS: Number(process.env.BCRYPT_ROUNDS || 12),
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: process.env.REDIS_DB || 0,
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS,
  COOKIE_SAME_SITE: process.env.COOKIE_SAME_SITE || "lax",
};

if (env.NODE_ENV === "production") {
  if (env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters in production");
  }
  if (!env.CORS_ALLOWED_ORIGINS) {
    throw new Error("CORS_ALLOWED_ORIGINS is required in production");
  }
  if (env.COOKIE_SAME_SITE === "none" && !process.env.COOKIE_SECURE) {
    throw new Error("COOKIE_SECURE=true is required when COOKIE_SAME_SITE=none");
  }
}

if (!['lax', 'strict', 'none'].includes(env.COOKIE_SAME_SITE)) {
  throw new Error("COOKIE_SAME_SITE must be lax, strict, or none");
}

module.exports = env;
