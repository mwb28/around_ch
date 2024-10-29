const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Nicht autorisiert: Kein Token bereitgestellt" });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error("Fehler beim Überprüfen des Tokens:", error.message);
    res.status(403).json({ message: "Nicht autorisiert: Ungültiger Token" });
  }
};
module.exports = authenticateUser;
