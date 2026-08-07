const router = require("express").Router();
const { validate } = require("express-validation");

const auth = require("../middlewares/auth");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  restoreTask,
  getTaskStats,
} = require("../controllers/task.controller");

const {
  createTaskValidation,
  updateTaskValidation,
  getTasksValidation,
  getTaskValidation,
  deleteTaskValidation,
} = require("../validations/task.validation");

// All task routes require authentication
router.use(auth);

// ─── Routes ──────────────────────────────────────────

// Get task statistics (overview counts)
router.get("/stats", getTaskStats);

// Get all tasks (with filters & pagination)
router.get("/", validate(getTasksValidation), getTasks);

// Get single task
router.get("/:id", validate(getTaskValidation), getTask);

// Create task
router.post("/", validate(createTaskValidation), createTask);

// Update task
router.put("/:id", validate(updateTaskValidation), updateTask);

// Restore deleted task
router.patch("/:id/restore", validate(getTaskValidation), restoreTask);

// Delete task (soft delete)
router.delete("/:id", validate(deleteTaskValidation), deleteTask);

module.exports = router;
