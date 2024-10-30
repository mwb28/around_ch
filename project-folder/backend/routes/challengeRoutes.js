const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticatUser");

const {
  getAllChallenges,
  getSingleChallenge,
  createChallenge,
  // updateChallenge,
  // deleteChallenge,
} = require("../controllers/challengeController");

// Öffentliche Routen
router.get("/public", getAllChallenges);
router.get("/public/single/:id", getSingleChallenge);

// Private Routen
// to do...
router.post("/createChallenge", authenticateUser, createChallenge);
// router.patch("/updateChallenge/:id", updateChallenge);
// router.delete("/deleteChallenge/:id", deleteChallenge);
module.exports = router;
