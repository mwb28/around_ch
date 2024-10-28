const express = require("express");
const router = express.Router();

const {
  getAllChallengesPublic,
  getSingleChallengePublic,
  // createChallenge,
  // updateChallenge,
  // deleteChallenge,
} = require("../controllers/challengeController");
const { getSingleChallenge } = require("../db/queries");

router.get("/getAllChallenges", getAllChallengesPublic);
router.get("/getSingleChallenge/:id", getSingleChallengePublic);
// router.post("/createChallenge", createChallenge);
// router.patch("/updateChallenge/:id", updateChallenge);
// router.delete("/deleteChallenge/:id", deleteChallenge);
module.exports = router;
