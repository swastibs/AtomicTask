const chalk = require("chalk");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });
  } catch (error) {
    console.error(
      chalk.red.bold("✖ MongoDB connection failed:"),
      chalk.red(error.message),
    );

    console.log(chalk.yellow.bold("↻ Retrying in 5 seconds..."));

    setTimeout(connectDB, 5000);
  }
};

mongoose.connection.on("connected", () => {
  console.log(chalk.greenBright.bold("● MongoDB connection established."));
});

mongoose.connection.on("error", (err) => {
  console.error(chalk.redBright("● MongoDB error:"), chalk.red(err.message));
});

mongoose.connection.on("disconnected", () => {
  console.warn(chalk.yellowBright("● MongoDB disconnected."));
});

const gracefulShutdown = async (signal) => {
  console.log(
    `\n${chalk.cyan.bold(signal)} ${chalk.white("received. Closing MongoDB connection...")}`,
  );

  try {
    await mongoose.connection.close();

    console.log(chalk.green.bold("✔ MongoDB connection closed."));

    process.exit(0);
  } catch (error) {
    console.error(
      chalk.red.bold("✖ Error closing MongoDB:"),
      chalk.red(error.message),
    );

    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

connectDB();

module.exports = connectDB;
