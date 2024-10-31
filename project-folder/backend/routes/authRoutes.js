const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  changePassword,
  logoutUser,
} = require("../controllers/authController");
const authenticateUser = require("../middleware/authenticatUser");

//router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/changePassword", authenticateUser, changePassword);
router.post("/logout", logoutUser);
module.exports = router;
