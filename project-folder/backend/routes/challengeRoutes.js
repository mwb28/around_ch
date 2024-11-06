const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticatUser");
const {
  getAllChallenges,
  getSingleChallenge,
  getAllUserChallengesOfsameChallengeId,
  getAllTemplateChallenges,
  createChallenge,
  addActivityToChallengeInstance,
  deleteChallenge,
} = require("../controllers/challengeController");

// Öffentliche Routen
router.get("/public", getAllChallenges);
router.get("/public/single/:challenge_id", getSingleChallenge);
router.get("/templates", getAllTemplateChallenges);
router.get(
  "/public/pendingInstanzes/:challenge_id",
  getAllUserChallengesOfsameChallengeId
);

// Private Routen
// to do...
// Challenge erstellen
router.post("/create", authenticateUser, createChallenge);
//delete route
router.delete("/:challenge_id/delete", authenticateUser, deleteChallenge);
// update route
router.post(
  "/:challenge_id/addActivity",
  authenticateUser,
  addActivityToChallengeInstance
);

module.exports = router;
