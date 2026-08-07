const router = require("express").Router();

const { validate } = require("express-validation");
const { signUp, login, refresh, logout } = require("../controllers/auth.controller");
const {
  signUpValidation,
  loginValidation,
} = require("../validations/auth.validation");
const auth = require("../middlewares/auth");
const requireTrustedOrigin = require("../middlewares/requireTrustedOrigin");

router.post("/signup", requireTrustedOrigin, validate(signUpValidation), signUp);
router.post("/login", requireTrustedOrigin, validate(loginValidation), login);
router.post("/refresh", requireTrustedOrigin, refresh);
router.post("/logout", auth, logout);

module.exports = router;
