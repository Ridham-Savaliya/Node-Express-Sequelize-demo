const Jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt");
const User = require("../models/user");

function authorizeRoles(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user.role; // Extract role from authenticated user

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "You do not have permission to access this route!" });
    }
    next(); // User has the correct role; proceed to the next middleware or route handler
  };
}

module.exports = authorizeRoles;

