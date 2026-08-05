const Redis = require("ioredis");
const env = require("./env.config");

const redis = new Redis({
  host: env.REDIS_HOST || "localhost",
  port: env.REDIS_PORT || 6379,
  password: env.REDIS_PASSWORD || undefined,
  db: env.REDIS_DB || 0,
  retryStrategy: (times) => {
    return Math.min(times * 100, 10000);
  },
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

module.exports = redis;
