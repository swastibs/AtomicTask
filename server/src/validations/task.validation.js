const { Joi } = require("express-validation");

// ─── Create Task ─────────────────────────────────────
const createTaskValidation = {
  body: Joi.object({
    title: Joi.string().required().min(1).max(200).messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 1 character",
      "string.max": "Title cannot exceed 200 characters",
      "any.required": "Title is required",
    }),

    description: Joi.string().max(2000).allow("").optional().messages({
      "string.max": "Description cannot exceed 2000 characters",
    }),

    status: Joi.string()
      .valid("todo", "in_progress", "done", "archived")
      .default("todo")
      .optional(),

    priority: Joi.string()
      .valid("low", "medium", "high", "urgent")
      .default("medium")
      .optional(),

    dueDate: Joi.date().iso().allow(null).optional(),

    tags: Joi.array().items(Joi.string().trim()).default([]).optional(),
  }).options({ abortEarly: false }),

  params: Joi.object({}).max(0),
  query: Joi.object({}).max(0),
};

// ─── Update Task ─────────────────────────────────────
const updateTaskValidation = {
  body: Joi.object({
    title: Joi.string().min(1).max(200).optional().messages({
      "string.min": "Title must be at least 1 character",
      "string.max": "Title cannot exceed 200 characters",
    }),

    description: Joi.string().max(2000).allow("").optional().messages({
      "string.max": "Description cannot exceed 2000 characters",
    }),

    status: Joi.string()
      .valid("todo", "in_progress", "done", "archived")
      .optional(),

    priority: Joi.string().valid("low", "medium", "high", "urgent").optional(),

    dueDate: Joi.date().iso().allow(null).optional(),

    tags: Joi.array().items(Joi.string().trim()).optional(),
  })
    .min(1)
    .messages({
      "object.min": "At least one field must be provided for update",
    })
    .options({ abortEarly: false }),

  params: Joi.object({
    id: Joi.string().required().messages({
      "any.required": "Task ID is required",
    }),
  }),

  query: Joi.object({}).max(0),
};

// ─── Get Tasks (with filters) ──────────────────────
const getTasksValidation = {
  body: Joi.object({}).max(0),

  params: Joi.object({}).max(0),

  query: Joi.object({
    status: Joi.string()
      .valid("todo", "in_progress", "done", "archived")
      .optional(),
    priority: Joi.string().valid("low", "medium", "high", "urgent").optional(),
    page: Joi.number().integer().min(1).default(1).optional(),
    limit: Joi.number().integer().min(1).max(100).default(20).optional(),
    sortBy: Joi.string()
      .valid("createdAt", "dueDate", "priority", "updatedAt")
      .default("createdAt")
      .optional(),
    sortOrder: Joi.string().valid("asc", "desc").default("desc").optional(),
    search: Joi.string().allow("").optional(),
  }).unknown(true), // ✅ Allow extra query parameters
};

// ─── Get Single Task ────────────────────────────────
const getTaskValidation = {
  body: Joi.object({}).max(0),

  params: Joi.object({
    id: Joi.string().required().messages({
      "any.required": "Task ID is required",
    }),
  }),

  query: Joi.object({}).max(0),
};

// ─── Delete Task ────────────────────────────────────
const deleteTaskValidation = {
  body: Joi.object({}).max(0),

  params: Joi.object({
    id: Joi.string().required().messages({
      "any.required": "Task ID is required",
    }),
  }),

  query: Joi.object({}).max(0),
};

module.exports = {
  createTaskValidation,
  updateTaskValidation,
  getTasksValidation,
  getTaskValidation,
  deleteTaskValidation,
};
