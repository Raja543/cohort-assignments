// Middleware for handling admin authentication
const { Admin } = require("../db");
const jwt = require("jsonwebtoken");

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.sub);
    if (!admin) {
      return res.status(401).json({ error: "Unauthorized - Admin not found" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}

module.exports = adminMiddleware;
