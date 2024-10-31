const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticatUser");
const {
  getAllChallenges,
  getSingleChallenge,
  createChallenge,
  addActivityToChallenge,
  deleteChallenge,
} = require("../controllers/challengeController");

// Öffentliche Routen
router.get("/public", getAllChallenges);
router.get("/public/single/:id", getSingleChallenge);

// Private Routen
// to do...
// Challenge erstellen
router.post("/create", authenticateUser, createChallenge);
//delete route
router.delete("/delete/:id", authenticateUser, deleteChallenge);
// update route
router.post("/:id/addActivity", authenticateUser, addActivityToChallenge);

module.exports = router;
