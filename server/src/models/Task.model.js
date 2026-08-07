const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: ["todo", "in_progress", "done", "archived"],
      default: "todo",
      index: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
      index: true,
    },

    dueDate: { type: Date, default: null },
    completedAt: { type: Date, default: null },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
      index: true,
    },

    tags: { type: [String], default: [], index: true },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },

  { timestamps: true },
);

TaskSchema.index({ userId: 1, status: 1 });
TaskSchema.index({ userId: 1, dueDate: 1 });
TaskSchema.index({ userId: 1, priority: 1 });
TaskSchema.index({ userId: 1, isDeleted: 1 });
TaskSchema.index({ teamId: 1, status: 1 });

TaskSchema.virtual("isOverdue").get(function () {
  if (!this.dueDate) return false;
  if (this.status === "done" || this.status === "archived") return false;
  return new Date() > this.dueDate;
});

TaskSchema.set("toJSON", { virtuals: true });
TaskSchema.set("toObject", { virtuals: true });
module.exports = mongoose.model("Task", TaskSchema);
