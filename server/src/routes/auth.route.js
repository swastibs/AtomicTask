const router = require("express").Router();

const { validate } = require("express-validation");
const { signUp, login, refresh, logout } = require("../controllers/auth.controller");
const {
  signUpValidation,
  loginValidation,
} = require("../validations/auth.validation");
const auth = require("../middlewares/auth");
const requireTrustedOrigin = require("../middlewares/requireTrustedOrigin");

// Authentication responses may set or rotate a session cookie. They must never
// be stored by a browser, CDN, or external-origin rewrite cache.
router.use((req, res, next) => {
  res.set({
    "Cache-Control": "no-store, private",
    "CDN-Cache-Control": "no-store",
    Pragma: "no-cache",
  });
  res.vary("Cookie");
  next();
});

router.post("/signup", requireTrustedOrigin, validate(signUpValidation), signUp);
router.post("/login", requireTrustedOrigin, validate(loginValidation), login);
router.post("/refresh", requireTrustedOrigin, refresh);
router.post("/logout", auth, logout);

module.exports = router;
