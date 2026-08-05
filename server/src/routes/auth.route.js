const router = require("express").Router();

const { validate } = require("express-validation");
const { signUp, login, logout } = require("../controllers/auth.controller");
const {
  signUpValidation,
  loginValidation,
} = require("../validations/auth.validation");
const auth = require("../middlewares/auth");

router.post("/signup", validate(signUpValidation), signUp);
router.post("/login", validate(loginValidation), login);
router.post("/logout", auth, logout);

module.exports = router;
