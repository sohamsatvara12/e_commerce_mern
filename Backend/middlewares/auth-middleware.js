const jwt = require("jsonwebtoken");
const User = require("../models/registered-user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res .status(401) .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
  const jwtToken = token.replace("Bearer", "").trim();

  try {
    // Verifying the token
    const JWT_SECRET_KEY ="hdyeox78345jhsuywer845dhnm5478fcjh"
    const decoded = jwt.verify(jwtToken, JWT_SECRET_KEY);

    console.log("Decoded Token:", decoded);

    // Fetch user data from the database based on the user ID from the decoded token
    const user = await User.findById(decoded._id);
    console.log("User Data:", user);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    // Attach user data to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
