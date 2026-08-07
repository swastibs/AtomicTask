const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const env = require("../config/env.config");
const RefreshSession = require("../models/RefreshSession.model");

const REFRESH_COOKIE = "refresh_token";

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const parseDurationMs = (days) => days * 24 * 60 * 60 * 1000;

const cookieOptions = () => ({
  httpOnly: true,
  secure: env.NODE_ENV === "production" || process.env.COOKIE_SECURE === "true",
  sameSite: env.COOKIE_SAME_SITE,
  path: "/api/auth",
  maxAge: parseDurationMs(env.REFRESH_TOKEN_EXPIRES_DAYS),
});

const readCookie = (req, name) => {
  const encoded = req.headers.cookie
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
  return encoded ? decodeURIComponent(encoded) : null;
};

const createAccessToken = (user, sessionId) =>
  jwt.sign(
    { sub: user._id.toString(), sid: sessionId.toString(), type: "access" },
    env.JWT_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
      issuer: "atomictask-api",
      audience: "atomictask-client",
    },
  );

const createSession = async (user, req, familyId = crypto.randomUUID()) => {
  const refreshToken = crypto.randomBytes(48).toString("base64url");
  const session = await RefreshSession.create({
    userId: user._id,
    refreshTokenHash: hashToken(refreshToken),
    familyId,
    expiresAt: new Date(Date.now() + parseDurationMs(env.REFRESH_TOKEN_EXPIRES_DAYS)),
    userAgent: req.get("user-agent") || null,
    ip: req.ip || null,
  });
  return { session, refreshToken };
};

const establishSession = async (res, user, req) => {
  const { session, refreshToken } = await createSession(user, req);
  res.cookie(REFRESH_COOKIE, refreshToken, cookieOptions());
  return createAccessToken(user, session._id);
};

const clearRefreshCookie = (res) => res.clearCookie(REFRESH_COOKIE, cookieOptions());

module.exports = {
  REFRESH_COOKIE,
  hashToken,
  readCookie,
  createAccessToken,
  createSession,
  establishSession,
  clearRefreshCookie,
  cookieOptions,
};
