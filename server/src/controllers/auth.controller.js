const jwt = require("jsonwebtoken");
const env = require("../config/env.config");

const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");
const { sanitizeUser } = require("../utils/sanitize");
const { blacklistToken } = require("../utils/tokenBlacklist");

exports.signUp = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  return ApiResponse.created(
    res,
    sanitizeUser(newUser),
    "User created successfully",
  );
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  user.password = undefined;

  const token = jwt.sign({ id: user._id, email: user.email }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN || "7d",
  });

  return ApiResponse.success(
    res,
    { user: sanitizeUser(user), token },
    "Login successful",
  );
});

exports.logout = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "No token provided");
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.decode(token);
  if (!decoded || !decoded.exp) {
    throw new ApiError(400, "Invalid token format");
  }

  await blacklistToken(token, decoded.exp);

  return ApiResponse.ok(res, null, "Logged out successfully");
});
