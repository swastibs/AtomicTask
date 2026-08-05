const { Joi } = require("express-validation");

const signUpValidation = {
  body: Joi.object({
    name: Joi.string().required().min(2).max(50).messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
      "any.required": "Name is required",
    }),

    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

    password: Joi.string().required().min(4).max(16).messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 4 characters",
      "string.max": "Password cannot exceed 16 characters",
      "any.required": "Password is required",
    }),
  }).options({ abortEarly: false }),

  params: Joi.object({}).max(0),
  query: Joi.object({}).max(0),
};

module.exports = { signUpValidation };
