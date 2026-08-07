const { errorResponse } = require("../utils/ApiResponse");
const { ValidationError } = require("express-validation");
const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // --- Custom ApiError ---
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  }

  // --- express-validation error ---
  else if (err instanceof ValidationError) {
    statusCode = 400;
    message = "Validation failed";

    // Collect ALL validation errors from all locations (body, params, query)
    const allErrors = [];

    // Check all possible locations
    const locations = ["body", "params", "query"];
    for (const location of locations) {
      const details = err.details?.[location];
      if (details && Array.isArray(details)) {
        details.forEach((d) => {
          allErrors.push({
            field: d.context?.key || d.path?.[0] || "unknown",
            message: d.message,
            location: location,
          });
        });
      }
    }

    if (allErrors.length > 0) {
      errors = allErrors;
    }
  }

  // --- Mongoose validation error ---
  else if (
    err.name === "ValidationError" &&
    err.errors &&
    typeof err.errors === "object"
  ) {
    statusCode = 400;
    message = "Validation Error";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // --- MongoDB duplicate key ---
  else if (err.code === 11000) {
    statusCode = 409;
    message = "A record with those details already exists";
    errors = null;
  }

  // --- CastError (invalid ObjectId) ---
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
    errors = [{ field: err.path, message: `Invalid ${err.path}` }];
  }

  // --- JWT errors ---
  else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Expected client/auth failures (4xx) are not server errors and should not
  // create noisy stack traces during normal signed-out session checks.
  if (statusCode >= 500) {
    console.error("Unhandled server error:", err);
  }

  return errorResponse(res, statusCode, message, errors);
};

module.exports = errorHandler;
