const express = require("express");

const apiRouter = require("./src/routes/index.route");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api", apiRouter);

app.use(errorHandler);

module.exports = app;
