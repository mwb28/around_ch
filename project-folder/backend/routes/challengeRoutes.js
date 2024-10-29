const express = require("express");
const router = express.Router();

const {
  getAllChallenges,
  getSingleChallenge,
  // createChallenge,
  // updateChallenge,
  // deleteChallenge,
} = require("../controllers/challengeController");
const { getSingleChallenge } = require("../db/queries");
// Öffentliche Routen
router.get("/challenges/public", getAllChallenges);
router.get("/challenges/public/single/:id", getSingleChallenge);

// Private Routen
// to do...
// router.post("/createChallenge", createChallenge);
// router.patch("/updateChallenge/:id", updateChallenge);
// router.delete("/deleteChallenge/:id", deleteChallenge);
module.exports = router;
