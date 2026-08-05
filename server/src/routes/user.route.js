const router = require("express").Router();

const auth = require("../middlewares/auth");
const { ApiResponse } = require("../utils/ApiResponse");
const { sanitizeUser } = require("../utils/sanitize");

router.get("/me", auth, (req, res) => {
  ApiResponse.ok(res, sanitizeUser(req.user), "User profile");
});

module.exports = router;
