const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

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
    {
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
    "User created successfully",
  );
});
