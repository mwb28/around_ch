const express = require("express");
const router = express.Router();
const {
  validateChallengeParticipation,
} = require("../middleware/challengeValidation");
const checkChallengeAndArchive = require("../middleware/checkAndArchiveChallenge");
const authenticateUser = require("../middleware/authenticatUser");
const {
  getAllActiveChallenges,
  getAllActiveUserChallenges,
  getSingleChallenge,
  getAllUserChallengesOfsameChallengeId,
  getAllTemplateChallenges,
  createChallenge,
  addActivityToChallengeInstance,
  createInstanceOfChallenge,
  getAllArchivedChallenges,
  deleteChallenge,
} = require("../controllers/challengeController");

// Öffentliche Routen
router.get("/active", checkChallengeAndArchive, getAllActiveChallenges);
router.get("/active/single/:challenge_id", getSingleChallenge);
router.get("/templates", getAllTemplateChallenges);
router.get(
  "/pendingInstanzes/:challenge_id",
  getAllUserChallengesOfsameChallengeId
);

// Challenge erstellen
router.get("/user", authenticateUser, getAllActiveUserChallenges);
router.post("/create", authenticateUser, createChallenge);
router.post(
  "/createInstance",
  authenticateUser,
  validateChallengeParticipation,
  createInstanceOfChallenge
);

router.get("/archived", getAllArchivedChallenges);
//delete route
router.delete("/:challenge_id/delete", authenticateUser, deleteChallenge);
// update route
router.post("/addActivity", authenticateUser, addActivityToChallengeInstance);

module.exports = router;
