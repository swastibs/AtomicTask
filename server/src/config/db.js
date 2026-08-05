const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    console.log(chalk.blue.bold("● MongoDB connected"));
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error(chalk.red("MongoDB connection error:", error));
  }
};

module.exports = connectDB;
