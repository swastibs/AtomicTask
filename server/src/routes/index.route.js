const router = require("express").Router();
const healthRouter = require("./health.route.js");

router.use("/health", healthRouter);

module.exports = router;
