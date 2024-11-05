// Benutzerinfos abrufen
// Akualisiern der Benutzerinfos
//... weitere
// User infos abrufen

const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticatUser");
const {
  registerSportklasse,
  userInfo,
  checkUserStatus,
} = require("../controllers/userController");

router.get("/authcheck", authenticateUser, checkUserStatus);
//router.get("/infoUser, authenticateUser, getUserInfo");
router.get("/current", authenticateUser, userInfo);
// Registriere eine neue Sportklasse
router
  .route("/registerSportklasse")
  .post(authenticateUser, registerSportklasse);

module.exports = router;
