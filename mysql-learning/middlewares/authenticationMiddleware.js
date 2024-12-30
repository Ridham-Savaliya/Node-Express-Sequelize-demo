// const Jwt = require("jsonwebtoken");
// const User = require("../models/user");

// async function authenticate(req, res, next) {
//   // Get the token from the Authorization header
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided!" });
//   }

//   // Split the Bearer token format
//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Invalid token format!" });
//   }

//   try {
//     // Verify the token
//     const decoded = Jwt.verify(token, process.env.SECRET_KEY);

//     // Find the user by ID
//     const user = await User.findByPk(decoded.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Attach the user to the request object
//     req.user = user;

//     // Proceed to the next middleware
//     next();
//   } catch (error) {
//     if (error instanceof Jwt.TokenExpiredError) {
//       return res.status(401).json({ message: "Token has expired!" });
//     }
//     console.error("JWT Error:", error.message);
//     res.status(403).json({ message: "Failed to authenticate the token!" });
//   }
// }

// module.exports = authenticate;
