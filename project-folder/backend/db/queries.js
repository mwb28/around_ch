// Auth queries for the database
const registerUser =
  "INSERT INTO sportlehrperson (name, vorname, email, password, school) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const getUserByEmail = "SELECT * FROM sportlehrperson WHERE email = $1";
const updatePasswordAndRemoveFlag =
  "UPDATE sportlehrperson SET hashedPassword = $1, needs_password_change = false WHERE email = $2";
const insertinvalidatedToken =
  "INSERT  INTO invalidatedtoken (token) VALUES ($1) RETURNING *";
const getInvalidatedToken = "SELECT * FROM invalidatedtoken WHERE token = $1";

//challenge queries for the database
const getAllChallenges = "SELECT * FROM challenge";
const getSingleChallenge = "SELECT * FROM challenge WHERE challenge_id = $1";
const getAllUserChallenges = "SELECT * FROM challenge WHERE sportl_id = $1 ";

module.exports = {
  registerUser,
  getUserByEmail,
  updatePasswordAndRemoveFlag,
  insertinvalidatedToken,
  getInvalidatedToken,
  getAllChallenges,
  getSingleChallenge,
  getAllUserChallenges,
};
