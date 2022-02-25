const User = require("../models/user");
const jwt = require("jsonwebtoken");

const protectedRoute = async (req, res, next) => {
  const cookie = req.cookies.jwt_token;

  if (cookie) {
    try {
      const decoded = jwt.verify(cookie, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({
        message: "Not Authorized",
      });
    }
  }

  if (!cookie) {
    res.status(401).json({
      message: "Not Authorized",
    });
  }
};

module.exports = protectedRoute;
