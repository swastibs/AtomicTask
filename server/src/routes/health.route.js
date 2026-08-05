const router = require("express").Router();
const { ApiResponse } = require("../utils/ApiResponse");

const formatUptime = (seconds) => {
  let remaining = Math.floor(seconds);
  const years = Math.floor(remaining / (365 * 24 * 60 * 60));
  remaining %= 365 * 24 * 60 * 60;
  const days = Math.floor(remaining / 86400);
  remaining %= 86400;
  const hours = Math.floor(remaining / 3600);
  remaining %= 3600;
  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const parts = [];
  if (years) parts.push(`${years}y`);
  if (days || years) parts.push(`${days}d`);
  if (hours || days || years) parts.push(`${hours}h`);
  if (minutes || hours || days || years) parts.push(`${minutes}min`);
  parts.push(`${secs}sec`);
  return parts.join(", ");
};

router.get("/", (req, res) => {
  ApiResponse.ok(
    res,
    { uptime: formatUptime(process.uptime()) },
    "Server is healthy",
  );
});

module.exports = router;
