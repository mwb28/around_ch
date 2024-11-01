// Auth queries for the database
const registerUser =
  "INSERT INTO sportlehrperson (name, vorname, email, password, school) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const getUserByEmail = "SELECT * FROM sportlehrperson WHERE email = $1";
const updatePasswordAndRemoveFlag =
  "UPDATE sportlehrperson SET password_gehashed = $1, needs_password_change = false WHERE email = $2";
const insertinvalidatedToken =
  "INSERT  INTO invalidated_tokens (token) VALUES ($1) RETURNING *";
const getInvalidatedToken = "SELECT * FROM invalidated_tokens WHERE token = $1";

//challenge queries for the database
const getAllChallenges = "SELECT * FROM challenge";
const getSingleChallenge = "SELECT * FROM challenge WHERE challenge_id = $1";
const getAllUserChallenges = "SELECT * FROM challenge WHERE sportl_id = $1 ";
const createChallenge =
  "INSERT INTO challenge (challengevl_id, sportl_id, startzeitpunkt) VALUES ($1, $2, $3) RETURNING *";
// add activity to challenge
const addActivity =
  "INSERT INTO sportlicheleistung (meter, uhrzeit, datum, dauer, anzahl_m, anzahl_w, anzahl_d, challenge_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)RETURNING *";
const addChallengeEnemy =
  "INSERT INTO nimmtteilan (sportkl_id, challenge_id, gegner_sportkl_id) VALUES ($1, $2, $3)";
const updateChallenge =
  "UPDATE challenge SET meters_completed = meters_completed + $1 WHERE challenge_id = $2";
const deleteChallenge = "DELETE FROM challenge WHERE challenge_id = $1";
const checkChallengeParticipation =
  "SELECT * FROM nimmtteilan WHERE sportkl_id = $1 AND challenge_id = $2";

module.exports = {
  registerUser,
  getUserByEmail,
  updatePasswordAndRemoveFlag,
  insertinvalidatedToken,
  getInvalidatedToken,
  getAllChallenges,
  getSingleChallenge,
  getAllUserChallenges,
  addActivity,
  addChallengeEnemy,
  createChallenge,
  updateChallenge,
  deleteChallenge,
};
