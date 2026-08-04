const router = require("express").Router();
const healthRouter = require("./health.route");

router.use("/health", healthRouter);

module.exports = router;
