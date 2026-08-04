const router = require("express").Router();
const { successResponse } = require("../utils/ApiResponse");

// Health check
router.get("/health", (req, res) => {
  successResponse(res, {
    message: "Server is healthy",
    data: { uptime: process.uptime() },
  });
});

module.exports = router;
