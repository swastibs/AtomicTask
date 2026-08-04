const router = require("express").Router();
const { signUp, login, getMe } = require("../controllers/auth.controller");
const requireAuth = require("../middleware/auth.middleware");

router.post("/signup", signUp);
router.post("/login", login);

// Protected route example
router.get("/me", requireAuth, getMe);

module.exports = router;
