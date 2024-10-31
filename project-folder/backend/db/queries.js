// Auth queries for the database
const registerUser =
  "INSERT INTO sportlehrperson (name, vorname, email, password, school) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const getUserByEmail = "SELECT * FROM sportlehrperson WHERE email = $1";
const updatePasswordAndRemoveFlag =
  "UPDATE sportlehrperson SET password_gehashed = $1, needs_password_change = false WHERE email = $2";
const insertinvalidatedToken =
  "INSERT  INTO invalidatedtoken (token) VALUES ($1) RETURNING *";
const getInvalidatedToken = "SELECT * FROM invalidatedtoken WHERE token = $1";

//challenge queries for the database
const getAllChallenges = "SELECT * FROM challenge";
const getSingleChallenge = "SELECT * FROM challenge WHERE challenge_id = $1";
const getAllUserChallenges = "SELECT * FROM challenge WHERE sportl_id = $1 ";
const createChallenge =
  "INSERT INTO challenge (challengevl_id, sportl_id, startzeitpunkt) VALUES ($1, $2, $3) RETURNING *";
// add activity to challenge
const addActivity =
  "INSERT INTO sportlicheleistung (meter, uhrzeit, datum, dauer, anzahl_m, anzahl_w, anzahl_d, challenge_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

const updateChallenge =
  "UPDATE challenge SET meters_completed = meters_completed + $1WHERE challenge_id = $2";

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
  createChallenge,
  updateChallenge,
};
