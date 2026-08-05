const router = require("express").Router();

const { validate } = require("express-validation");
const { signUp, login } = require("../controllers/auth.controller");
const { signUpValidation, loginValidation } = require("../validations/auth.validation");

router.post("/signup", validate(signUpValidation), signUp);
router.post("/login", validate(loginValidation), login);

module.exports = router;
