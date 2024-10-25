const express = require("express");
const router = express.Router();

const {
  getAllChallenges,
  getSingleChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} = require("../controllers/challengeController");

router.get("/getAllChallenges", getAllChallenges);
router.get("/getSingleChallenge/:id", getSingleChallenge);
router.post("/createChallenge", createChallenge);
router.patch("/updateChallenge/:id", updateChallenge);
router.delete("/deleteChallenge/:id", deleteChallenge);
