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
const allSportClasses = "SELECT * FROM sportklasse WHERE sportl_id = $1";
const getSportklasseId =
  "SELECT sportkl_id FROM sportklasse WHERE sportkl_id = $1";
//Heruasforderungen
const allActiveChallenges = `SELECT 
  challenge.challenge_id,
  challenge.startzeitpunkt,
  challenge.endzeitpunkt,
  challenge_vorlage.challengevl_id,
  challenge_vorlage.name_der_challenge, 
challenge_vorlage.total_meter,challenge_vorlage.geojson_daten 
  FROM challenge JOIN challenge_vorlage 
  ON challenge.challengevl_id = challenge_vorlage.challengevl_id 
  WHERE challenge.abgeschlossen = false`;
const getAllUserChallengesOfsameChallengeId = ` SELECT 
kci.instanz_id, 
kci.meter_absolviert, 
kci.sportkl_id, 
sk.name AS sprtklasse_name,
s.schulname,
cv.name_der_challenge
FROM klassen_challenge_instanz kci 
  JOIN sportklasse sk 
    ON kci.sportkl_id = sk.sportkl_id 
  JOIN schule s 
    ON sk.schul_id = s.schul_id 
  JOIN challenge c 
    ON kci.challenge_id = c.challenge_id
  JOIN challenge_vorlage cv 
    ON c.challengevl_id = cv.challengevl_id
  WHERE kci.challenge_id = $1 
    AND kci.status = 'in_progress'`;
const getSingleChallenge = `  SELECT 
    c.challenge_id,
    c.startzeitpunkt,
    c.endzeitpunkt, 
    cv.total_meter,
    cv.geojson_daten
  FROM 
    challenge c 
  JOIN 
    challenge_vorlage cv ON c.challengevl_id = cv.challengevl_id
  WHERE 
    c.challenge_id = $1`;
const getAllTemplateChallenges = `SELECT 
    challenge_vorlage.name_der_challenge,
    challenge_vorlage.total_meter
    FROM challenge_vorlage`;
const allUserChallenges = `SELECT 
    cv.name_der_challenge,
    STRING_AGG(DISTINCT sk_own.name, ', ') AS eigene_sportklassen,
    STRING_AGG(DISTINCT sk_other.name, ', ') AS andere_sportklassen,
    c.startzeitpunkt,
    c.endzeitpunkt,
    cv.total_meter
FROM 
    challenge c
JOIN 
    challenge_vorlage cv ON c.challengevl_id = cv.challengevl_id
JOIN 
    klassen_challenge_instanz kci ON kci.challenge_id = c.challenge_id
LEFT JOIN 
    sportklasse sk_own ON kci.sportkl_id = sk_own.sportkl_id AND sk_own.sportl_id = $1
LEFT JOIN 
    sportklasse sk_other ON kci.sportkl_id = sk_other.sportkl_id AND sk_other.sportl_id <> $1
WHERE 
    c.abgeschlossen = false
    AND c.sportl_id = $1
    AND kci.status = 'in_progress'
GROUP BY 
    cv.name_der_challenge, c.startzeitpunkt, c.endzeitpunkt, cv.total_meter
HAVING 
    STRING_AGG(DISTINCT sk_own.name, ', ') IS NOT NULL
ORDER BY 
    c.startzeitpunkt;
`;
const createChallenge = `INSERT INTO challenge 
  (startzeitpunkt, endzeitpunkt, abgeschlossen, challengevl_id, sportl_id) 
  VALUES ($1, $2, $3, $4, $5) RETURNING *`;

const createInstanceOfChallenge = `INSERT INTO klassen_challenge_instanz 
  (meter_absolviert, status, sportkl_id, challenge_id) 
  VALUES ($1, $2, $3, $4) RETURNING *`;
const challengeQuery =
  "SECLET endzeitpunkt, abgeschlossen FORM challenge WHERE challenge_id = $1";
//Akitivitäten
const addActivity = `INSERT INTO sportlicheleistung 
      (meter, uhrzeit, datum, dauer, anzahl_m, anzahl_w, anzahl_d, challenge_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)RETURNING `;
// const addChallengeEnemy =
//   "INSERT INTO nimmtteilan (sportkl_id, challenge_id, gegner_sportkl_id) VALUES ($1, $2, $3)";
const updateChallengeInstance =
  "UPDATE challenge_instance SET meters_absolviert = meter_absolviert + $1 WHERE instanz_id = $2";
const getAllArchiveChallenges = `SELECT * FROM challenge WHERE abgeschossen = true AND sportl_id = $1`;
const deleteChallenge = "DELETE FROM challenge WHERE challenge_id = $1";

module.exports = {
  registerUser,
  getUserByEmail,
  updatePasswordAndRemoveFlag,
  getUserInfo,
  registerSportklasse,
  allSportClasses,
  getSportklasseId,
  getSchulIdFromSportlId,
  insertinvalidatedToken,
  getInvalidatedToken,
  allActiveChallenges,
  getAllUserChallengesOfsameChallengeId,
  getSingleChallenge,
  getAllTemplateChallenges,
  allUserChallenges,
  addActivity,
  createChallenge,
  updateChallengeInstance,
  getAllArchiveChallenges,
  deleteChallenge,
  createInstanceOfChallenge,
  challengeQuery,
};
