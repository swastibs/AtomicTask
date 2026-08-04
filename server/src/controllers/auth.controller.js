const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { successResponse, errorResponse } = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");
exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    console.log("🚀 ~ User already exist:", { email: existUser.email });
    return errorResponse(res, 400, "User already exists");
  }

  const user = await User.create({ name, email, password });
  console.log("🚀 ~ user created:", { email: user.email });

  return successResponse(res, {
    statusCode: 201,
    message: "User created successfully",
    data: { name: user.name, email: user.email },
  });
});

exports.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user)
      return errorResponse(res, 401, info?.message || "Invalid credentials");

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    return successResponse(res, {
      message: "Login successful",
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email },
      },
    });
  })(req, res, next);
};

exports.getMe = catchAsync(async (req, res, next) => {
  return successResponse(res, {
    data: { user: req.user },
  });
});
