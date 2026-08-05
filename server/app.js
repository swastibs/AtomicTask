const express = require("express");
const app = express();
const apiRouter = require("./src/routes/index.route");

app.use("/api", apiRouter);

module.exports = app;
