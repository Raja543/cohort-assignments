const jwt = require("jsonwebtoken");
const { User } = require("../db");

async function userMiddleware(req, res, next) {
  // Check the headers and validate the user from the user DB
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    // Attach the user object to the request for later use in the route handlers
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}

module.exports = userMiddleware;
