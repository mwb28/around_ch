/*
 getAllChallengesPublic: Alle aktiven Herausforderungen abrufen, nur Ansicht
  getSingleChallengePuplic, Eine aktive Herausforderung abrufen, nur Ansicht
  createChallenge, Eine neue Herausforderung erstellen, nur Auswahl, keine eigene Herausforderung erstellen
  startChallenge: Eine Herausforderung starten,
  acvitvateChallenge, Braucht es das?
  updateChallenge, Eine bestehende Herausforderung neue sportliche Leistung hinzufügen (in km)
  deleteChallenge, Eine Herausforderung löschen
  completeChallenge, status auf completed setzen
  archiveChallenge, Herausforderung archivieren
  visualizeChallenge, Bild für Visualisierung anzeigen... hier braucht es ev. noch weitere routen.
  
*/
const pool = require("../db/connect");
const queries = require("../db/queries");

const getAllChallenges = async (req, res) => {
  const sportlId = req.user ? req.user.sportl_id : null;
  try {
    let challenges;
    if (sportlId) {
      challenges = await pool.query(queries.getAllUserChallenges, [sportlId]);
    } else {
      challenges = await pool.query(queries.getAllChallenges);
      res.status(200).json(challenges.rows);
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Herausforderungen:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

const getSingleChallenge = async (req, res) => {
  const { id } = req.params;

  try {
    const challenge = await pool.query(queries.getSingleChallenge, [id]);
    res.status(200).json(challenge.rows[0]);
  } catch (error) {
    console.error("Fehler beim Abrufen der Herausforderung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};
//const createChallenge = async (req, res) => {

module.exports = {
  getAllChallenges,
  getSingleChallenge,
};
