const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized. Please login first.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized. User not found.",
      });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      message: "Not authorized. Invalid or expired token.",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin privileges required.",
    });
  }
  next();
};

const isVerified = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).json({
      message: "Please verify your email first.",
    });
  }
  next();
};

module.exports = {
  protect,
  isAdmin,
  isVerified,
};
