const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const activityController = require("../controllers/activityController");
const router = express.Router();
const { addActivity } = require("../controllers/activityController");

// Route für das Hinzuügen einer neuen sportlichen Aktivität
router.post("/challenge/:id/activity", authenticateUser, addActivity);

module.exports = router;
