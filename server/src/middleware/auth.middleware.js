const passport = require("passport");
const { errorResponse } = require("../utils/ApiResponse");

const requireAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user)
      return errorResponse(res, 401, "Unauthorized - invalid or expired token");

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = requireAuth;
