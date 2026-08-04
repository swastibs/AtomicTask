const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const apiRouter = require("./src/routes/index.route");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler.middleware");

const app = express();

connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use(apiRouter);

// Global error handler (always after routes)
app.use(errorHandler);

module.exports = app;
