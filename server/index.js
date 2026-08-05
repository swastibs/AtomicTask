const http = require("http");
const chalk = require("chalk");
const app = require("./app");
require("dotenv");

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

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
