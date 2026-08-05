const router = require("express").Router();
const healthRouter = require("./health.route");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
