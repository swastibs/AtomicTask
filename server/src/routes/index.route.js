const router = require("express").Router();

const healthRouter = require("./health.route");
const authRouter = require("./auth.route");

router.use("/health", healthRouter);
router.use("/auth", authRouter);

module.exports = router;
