const Redis = require("ioredis");
const env = require("./env.config");

let redisClient;
let redisReady = false;

const createRedisClient = () => {
  if (redisClient) return redisClient;

  if (!env.REDIS_HOST) {
    console.warn(
      "⚠️ Redis is not configured. Token blacklist is disabled. Set REDIS_HOST and related vars for production.",
    );

    redisClient = {
      get: async () => null,
      setex: async () => null,
      on: () => {},
    };

    return redisClient;
  }

  redisClient = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT || 6379,
    password: env.REDIS_PASSWORD || undefined,
    db: env.REDIS_DB || 0,
    retryStrategy: (times) => Math.min(times * 100, 10000),
  });

  redisClient.on("ready", () => {
    if (!redisReady) {
      redisReady = true;
      console.log("✅ Redis connected");
    }
  });

  redisClient.on("error", (err) => console.error("❌ Redis error:", err));

  return redisClient;
};

const initRedis = async () => {
  const redis = createRedisClient();

  if (redisReady || typeof redis.once !== "function") {
    return redis;
  }

  await new Promise((resolve, reject) => {
    const handleReady = () => {
      cleanup();
      resolve(redis);
    };

    const handleError = (err) => {
      cleanup();
      reject(err);
    };

    const cleanup = () => {
      redis.off("ready", handleReady);
      redis.off("error", handleError);
    };

    redis.once("ready", handleReady);
    redis.once("error", handleError);
  });

  return redis;
};

const redis = createRedisClient();

module.exports = { redis, initRedis };
