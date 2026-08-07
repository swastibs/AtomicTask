const http = require("http");
const chalk = require("chalk");
const mongoose = require("mongoose");
const app = require("./app");
const env = require("./src/config/env.config");
const { initRedis } = require("./src/config/redis");

const PORT = env.port || process.env.PORT || 8080;

const server = http.createServer(app);

const gracefulShutdown = async (signal) => {
  console.log(chalk.yellow(`\n${signal} received. Starting shutdown...`));

  server.close(async (err) => {
    if (err) {
      console.error(chalk.red("Error closing server:"), err);
      process.exit(1);
    }

    console.log(chalk.green("✓ HTTP server closed."));

    try {
      await mongoose.connection.close();
      console.log(chalk.green("✓ MongoDB connection closed."));
      console.log(chalk.green("✅ Shutdown complete."));
      process.exit(0);
    } catch (error) {
      console.error(chalk.red("✖ Error closing MongoDB:"), error);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error(
      chalk.red(
        "Could not close connections in time, forcefully shutting down.",
      ),
    );
    process.exit(1);
  }, 10000);
};

const startServer = () => {
  server.listen(PORT, () => {
    console.log(
      chalk.green("Server is running on "),
      chalk.yellow(`http://localhost:${PORT}`),
    );
    console.log(
      chalk.hex("#f8a115")(`
▄▖▗      ▘  ▄▖    ▌ 
▌▌▜▘▛▌▛▛▌▌▛▘▐ ▀▌▛▘▙▘
▛▌▐▖▙▌▌▌▌▌▙▖▐ █▌▄▌▛▖
  `),
    );
  });

  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
};

const start = async () => {
  try {
    await initRedis();
  } catch (error) {
    console.error(chalk.red("Redis failed to start:"), error);
  }

  startServer();
};

start().catch((err) => {
  console.error(chalk.red("Startup failed:"), err);
  process.exit(1);
});
