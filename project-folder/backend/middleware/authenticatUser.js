const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  let token;
  // header ckeck :
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // token check :
  else if (req.cookies.token) {
    token = req.cookies.token;
  }
  // token not provided  :
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  // token verification :
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
module.exports = authenticateUser;
