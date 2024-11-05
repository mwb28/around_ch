//  Authentifizierung der Sportlehrpersonen
const registerUser =
  "INSERT INTO sportlehrperson (name, vorname, email, password, school) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const getUserByEmail = "SELECT * FROM sportlehrperson WHERE email = $1";
const updatePasswordAndRemoveFlag =
  "UPDATE sportlehrperson SET password_gehashed = $1, needs_password_change = false WHERE email = $2";
const insertinvalidatedToken =
  "INSERT  INTO invalidated_tokens (token) VALUES ($1) RETURNING *";
const getSchulIdFromSportlId =
  "SELECT schul_id FROM sportlehrperson WHERE sportl_id = $1";
const getInvalidatedToken = "SELECT * FROM invalidated_tokens WHERE token = $1";

// Userinfos
const getUserInfo = "SELECT * FROM sportlehrperson WHERE sportl_id = $1";
// Registeren der Sporklassen
const registerSportklasse =
  "INSERT INTO sportklasse (name,jahrgang, schul_id, sportl_id) VALUES ($1, $2, $3, $4) RETURNING *";
const getSportklasseId =
  "SELECT sportkl_id FROM sportklasse WHERE sportkl_id = $1";
//Heruasforderungen
const getAllChallenges =
  "SELECT challenge.challenge_id,challenge.startzeitpunkt,challenge.endzeitpunkt,challenge_vorlage.name_der_challenge, challenge_vorlage.total_meter,challenge_vorlage.geojson_daten FROM challenge JOIN challenge_vorlage ON challenge.challengevl_id = challenge_vorlage.challengevl_id WHERE challenge.abgeschlossen = false";

const getSingleChallenge = "SELECT * FROM challenge WHERE challenge_id = $1";
const getAllTemplateChallenges = "SELECT * FROM challenge_vorlage";
const getAllUserChallenges = "SELECT * FROM challenge WHERE sportl_id = $1 ";
const createChallenge =
  "INSERT INTO challenge (startzeitpunkt, endzeitpunkt, abgeschlossen, challengevl_id, sportl_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";

const createInstanceOfChallenge =
  "INSERT INTO klassen_challenge_instanz (meter_absolviert, status, sportkl_id, challenge_id) VALUES ($1, $2, $3, $4) RETURNING *";
const challengeQuery =
  "SECLET endzeitpunkt, abgeschlossen FORM challenge WHERE challenge_id = $1";
//Akitivitäten
const addActivity =
  "INSERT INTO sportlicheleistung (meter, uhrzeit, datum, dauer, anzahl_m, anzahl_w, anzahl_d, challenge_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)RETURNING *";
// const addChallengeEnemy =
//   "INSERT INTO nimmtteilan (sportkl_id, challenge_id, gegner_sportkl_id) VALUES ($1, $2, $3)";
const updateChallengeInstance =
  "UPDATE challenge_instance SET meters_absolviert = meter_absolviert + $1 WHERE instanz_id = $2";
const deleteChallenge = "DELETE FROM challenge WHERE challenge_id = $1";

module.exports = {
  registerUser,
  getUserByEmail,
  updatePasswordAndRemoveFlag,
  getUserInfo,
  registerSportklasse,
  getSportklasseId,
  getSchulIdFromSportlId,
  insertinvalidatedToken,
  getInvalidatedToken,
  getAllChallenges,
  getSingleChallenge,
  getAllTemplateChallenges,
  getAllUserChallenges,
  addActivity,
  createChallenge,
  updateChallengeInstance,
  deleteChallenge,
  createInstanceOfChallenge,
  challengeQuery,
};
