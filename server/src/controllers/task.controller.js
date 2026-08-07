const Task = require("../models/Task.model");
const ApiError = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

// ─── Get all tasks (with filters & pagination) ────
exports.getTasks = catchAsync(async (req, res) => {
  const {
    status,
    priority,
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    sortOrder = "desc",
    search = "",
  } = req.query;

  // Build filter – only show user's tasks
  const filter = {
    userId: req.user._id,
    isDeleted: false,
  };

  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  // Text search
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Sort
  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const limitNum = parseInt(limit);

  // Execute query
  const [tasks, total] = await Promise.all([
    Task.find(filter).sort(sort).skip(skip).limit(limitNum).lean(), // ⚡ faster reads
    Task.countDocuments(filter),
  ]);

  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Tasks retrieved successfully",
    data: tasks,
    meta: {
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
      filters: { status, priority, search },
    },
  });
});

// ─── Get single task ────────────────────────────────
exports.getTask = catchAsync(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({
    _id: id,
    userId: req.user._id,
    isDeleted: false,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return ApiResponse.ok(res, task, "Task retrieved successfully");
});

// ─── Create task ────────────────────────────────────
exports.createTask = catchAsync(async (req, res) => {
  const { title, description, status, priority, dueDate, tags } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    tags,
    userId: req.user._id,
  });

  return ApiResponse.created(res, task, "Task created successfully");
});

// ─── Update task ────────────────────────────────────
exports.updateTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Find task and ensure it belongs to the user
  const task = await Task.findOne({
    _id: id,
    userId: req.user._id,
    isDeleted: false,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  // Special handling for marking as done
  if (updates.status === "done" && task.status !== "done") {
    updates.completedAt = new Date();
  }

  // Prevent updating certain fields directly
  // (userId, isDeleted, deletedAt, deletedBy are protected)

  // Apply updates
  Object.keys(updates).forEach((key) => {
    // Skip protected fields
    if (["userId", "isDeleted", "deletedAt", "deletedBy"].includes(key)) return;
    task[key] = updates[key];
  });

  await task.save();

  return ApiResponse.ok(res, task, "Task updated successfully");
});

// ─── Delete task (soft delete) ─────────────────────
exports.deleteTask = catchAsync(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({
    _id: id,
    userId: req.user._id,
    isDeleted: false,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  // Soft delete
  task.isDeleted = true;
  task.deletedAt = new Date();
  task.deletedBy = req.user._id;
  await task.save();

  return ApiResponse.ok(res, null, "Task deleted successfully");
});

// ─── Restore deleted task ──────────────────────────
exports.restoreTask = catchAsync(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({
    _id: id,
    userId: req.user._id,
    isDeleted: true,
  });

  if (!task) {
    throw new ApiError(404, "Deleted task not found");
  }

  task.isDeleted = false;
  task.deletedAt = null;
  task.deletedBy = null;
  await task.save();

  return ApiResponse.ok(res, task, "Task restored successfully");
});

// ─── Get task statistics ────────────────────────────
exports.getTaskStats = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const [total, todo, inProgress, done, overdue] = await Promise.all([
    Task.countDocuments({ userId, isDeleted: false }),
    Task.countDocuments({ userId, status: "todo", isDeleted: false }),
    Task.countDocuments({ userId, status: "in_progress", isDeleted: false }),
    Task.countDocuments({ userId, status: "done", isDeleted: false }),
    Task.countDocuments({
      userId,
      isDeleted: false,
      status: { $ne: "done" },
      dueDate: { $lt: new Date() },
      dueDate: { $ne: null },
    }),
  ]);

  return ApiResponse.ok(
    res,
    {
      total,
      todo,
      inProgress,
      done,
      overdue,
      completionRate: total > 0 ? Math.round((done / total) * 100) : 0,
    },
    "Task statistics retrieved",
  );
});
