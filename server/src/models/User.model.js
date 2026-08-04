const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password must be at least 4 characters"],
      select: false,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      default: "User",
    },

    avatar: { type: String, default: "" },

    points: { type: Number, default: 0, min: 0 },

    subscription: {
      plan: { type: String, enum: ["free", "pro", "team"], default: "free" },
      status: {
        type: String,
        enum: ["active", "inactive", "canceled", "past_due"],
        default: "active",
      },
      razorpayCustomerId: { type: String, default: null },
      razorpaySubscriptionId: { type: String, default: null },
      expiresAt: { type: Date, default: null },
    },

    preferences: {
      timezone: { type: String, default: "UTC" },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
      },
    },

    lastActive: { type: Date, default: Date.now },

    isDeleted: { type: Boolean, default: false, index: true },

    deletedBy: { type: String, default: null },

    deletedAt: { type: Date, default: null },

    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

userSchema.index({ "subscription.status": 1 });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
