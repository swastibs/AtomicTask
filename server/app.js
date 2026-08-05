const express = require("express");
const passport = require("passport");
const helmet = require("helmet");

const apiRouter = require("./src/routes/index.route");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/errorHandler");
const passportConfig = require("./src/config/passport");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

passportConfig(passport);
app.use(passport.initialize());

app.use("/api", apiRouter);
app.use(errorHandler);

module.exports = app;
