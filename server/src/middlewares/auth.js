const jwt = require("jsonwebtoken");
const env = require("../config/env.config");
const User = require("../models/User.model");
const RefreshSession = require("../models/RefreshSession.model");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  const authorization = req.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication required");
  }

  let payload;
  try {
    payload = jwt.verify(authorization.slice(7), env.JWT_SECRET, {
      issuer: "atomictask-api",
      audience: "atomictask-client",
    });
  } catch {
    throw new ApiError(401, "Invalid or expired access token");
  }

  if (payload.type !== "access" || !payload.sub || !payload.sid) {
    throw new ApiError(401, "Invalid access token");
  }

  const [user, session] = await Promise.all([
    User.findById(payload.sub),
    RefreshSession.findOne({ _id: payload.sid, userId: payload.sub, revokedAt: null }),
  ]);
  if (!user || !user.isActive || user.isDeleted || !session || session.expiresAt <= new Date()) {
    throw new ApiError(401, "Session is no longer valid");
  }

  req.user = user;
  req.auth = { sessionId: session._id };
  next();
});
