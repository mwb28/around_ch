const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticatUser");
const {
  getAllActiveChallenges,
  getAllActiveUserChallenges,
  getSingleChallenge,
  getAllUserChallengesOfsameChallengeId,
  getAllTemplateChallenges,
  createChallenge,
  addActivityToChallengeInstance,
  getAllArchiveChallenges,
  deleteChallenge,
} = require("../controllers/challengeController");

// Öffentliche Routen
router.get("/public", getAllActiveChallenges);
router.get("/public/single/:challenge_id", getSingleChallenge);
router.get("/templates", getAllTemplateChallenges);
router.get(
  "/public/pendingInstanzes/:challenge_id",
  getAllUserChallengesOfsameChallengeId
);

// Private Routen
// to do...
// Challenge erstellen
router.get("/user", authenticateUser, getAllActiveUserChallenges);
router.post("/create", authenticateUser, createChallenge);

router.get("/archiveChallenges", authenticateUser, getAllArchiveChallenges);
//delete route
router.delete("/:challenge_id/delete", authenticateUser, deleteChallenge);
// update route
router.post(
  "/:challenge_id/addActivity",
  authenticateUser,
  addActivityToChallengeInstance
);

module.exports = router;
