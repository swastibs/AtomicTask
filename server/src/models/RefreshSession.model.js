const mongoose = require("mongoose");

const RefreshSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    refreshTokenHash: { type: String, required: true, unique: true },
    familyId: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true, index: true },
    revokedAt: { type: Date, default: null },
    replacedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
    userAgent: { type: String, maxlength: 512, default: null },
    ip: { type: String, maxlength: 64, default: null },
  },
  { timestamps: true },
);

// Expired session records are removed automatically by MongoDB.
RefreshSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("RefreshSession", RefreshSessionSchema);
