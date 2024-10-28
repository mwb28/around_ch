/*
 getAllChallengesPublic: Alle aktiven Herausforderungen abrufen, nur Ansicht
  getSingleChallengePuplic, Eine aktive Herausforderung abrufen, nur Ansicht
    getAllChallengesPrivate, Alle Herausforderungen, die ein bestimmter Benutzer erstellt hat, abrufen
    getSingleChallengePrivate, Eine bestimmte Herausforderung, die ein bestimmter Benutzer erstellt hat, abrufen
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

const getAllChallengesPublic = async (req, res) => {
  try {
    const challenges = await pool.query(queries.getAllChallenges);
    res.status(200).json(challenges.rows);
  } catch (error) {
    console.error("Fehler beim Abrufen der Herausforderungen:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

const getSingleChallengePublic = async (req, res) => {
  const { id } = req.params;

  try {
    const challenge = await pool.query(queries.getSingleChallenge, [id]);
    res.status(200).json(challenge.rows[0]);
  } catch (error) {
    console.error("Fehler beim Abrufen der Herausforderung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

const getAllChallengesPrivate = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const user = await verifyToken(token);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const challenges = await pool.query(queries.getAllChallengesPrivate);
    res.status(200).json(challenges.rows);
  } catch (error) {
    console.error("Fehler beim Abrufen der privaten Herausforderungen:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

const getSingleChallengePrivate = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const user = await verifyToken(token);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const challenge = await pool.query(queries.getSingleChallengePrivate, [id]);
    res.status(200).json(challenge.rows[0]);
  } catch (error) {
    console.error("Fehler beim Abrufen der privaten Herausforderung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

module.exports = {
  getAllChallengesPublic,
  getSingleChallengePublic,
  getAllChallengesPrivate,
  getSingleChallengePrivate,
};
