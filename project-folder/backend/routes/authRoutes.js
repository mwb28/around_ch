const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  changePassword,
  logoutUser,
} = require("../controllers/authController");

//router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/changePassword", changePassword);
router.post("/logout", logoutUser);
module.exports = router;
