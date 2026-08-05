const router = require("express").Router();

const { validate } = require("express-validation");
const { signUp } = require("../controllers/auth.controller");
const { signUpValidation } = require("../validations/auth.validation");

router.post("/signup", validate(signUpValidation), signUp);

module.exports = router;
