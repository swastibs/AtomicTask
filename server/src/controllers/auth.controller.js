const jwt = require("jsonwebtoken");
const env = require("../config/env.config");
const User = require("../models/User.model");
const RefreshSession = require("../models/RefreshSession.model");
const ApiError = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");
const { sanitizeUser } = require("../utils/sanitize");
const {
  REFRESH_COOKIE,
  hashToken,
  readCookie,
  createSession,
  createAccessToken,
  establishSession,
  clearRefreshCookie,
  cookieOptions,
} = require("../utils/authTokens");

const sessionPayload = (user, accessToken) => ({
  user: sanitizeUser(user),
  accessToken,
});

exports.signUp = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) throw new ApiError(409, "Unable to create account");

  const user = await User.create({ name, email: normalizedEmail, password });
  const accessToken = await establishSession(res, user, req);
  return ApiResponse.created(res, sessionPayload(user, accessToken), "Account created successfully");
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

  // Do not disclose whether an account exists or is disabled.
  if (!user || !user.isActive || user.isDeleted || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = await establishSession(res, user, req);
  return ApiResponse.ok(res, sessionPayload(user, accessToken), "Login successful");
});

exports.refresh = catchAsync(async (req, res) => {
  const refreshToken = readCookie(req, REFRESH_COOKIE);
  if (!refreshToken) throw new ApiError(401, "Session expired. Please sign in again");

  const session = await RefreshSession.findOne({ refreshTokenHash: hashToken(refreshToken) });
  if (!session) {
    clearRefreshCookie(res);
    throw new ApiError(401, "Session expired. Please sign in again");
  }

  // A replayed rotated token is a compromise signal: invalidate the entire family.
  if (session.revokedAt || session.expiresAt <= new Date()) {
    await RefreshSession.updateMany(
      { familyId: session.familyId, revokedAt: null },
      { $set: { revokedAt: new Date() } },
    );
    clearRefreshCookie(res);
    throw new ApiError(401, "Session expired. Please sign in again");
  }

  const user = await User.findById(session.userId);
  if (!user || !user.isActive || user.isDeleted) {
    await RefreshSession.updateMany(
      { userId: session.userId, revokedAt: null },
      { $set: { revokedAt: new Date() } },
    );
    clearRefreshCookie(res);
    throw new ApiError(401, "Session expired. Please sign in again");
  }

  const { session: replacement, refreshToken: replacementToken } = await createSession(
    user,
    req,
    session.familyId,
  );
  const rotated = await RefreshSession.findOneAndUpdate(
    { _id: session._id, revokedAt: null },
    { $set: { revokedAt: new Date(), replacedBy: replacement._id } },
  );
  if (!rotated) {
    await RefreshSession.updateMany(
      { familyId: session.familyId, revokedAt: null },
      { $set: { revokedAt: new Date() } },
    );
    clearRefreshCookie(res);
    throw new ApiError(401, "Session expired. Please sign in again");
  }
  res.cookie(REFRESH_COOKIE, replacementToken, cookieOptions());

  return ApiResponse.ok(
    res,
    sessionPayload(user, createAccessToken(user, replacement._id)),
    "Session refreshed",
  );
});

exports.logout = catchAsync(async (req, res) => {
  if (req.auth?.sessionId) {
    await RefreshSession.findByIdAndUpdate(req.auth.sessionId, {
      $set: { revokedAt: new Date() },
    });
  }
  clearRefreshCookie(res);
  return ApiResponse.ok(res, null, "Logged out successfully");
});
