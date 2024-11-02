// Benutzerinfos abrufen
// Akualisiern der Benutzerinfos
//... weitere
// User infos abrufen

const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticatUser");
const { registerSportklasse } = require("../controllers/userController");
console.log(typeof registerSportklasse);

//router.get("/infoUser, authenticateUser, getUserInfo");
// Registriere eine neue Sportklasse
router.route("/registerSporklasse").post(authenticateUser, registerSportklasse);

module.exports = router;
