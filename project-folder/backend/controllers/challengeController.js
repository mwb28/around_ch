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
// Zeige alle Herausforderungen an
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
// Zeige eine einzelne Herausforderung an
const getSingleChallenge = async (req, res) => {
  const { challenge_id } = req.params;

  try {
    const challenge = await pool.query(queries.getSingleChallenge, [challenge_id]);
    res.status(200).json(challenge.rows[0]);
  } catch (error) {
    console.error("Fehler beim Abrufen der Herausforderung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};
// Erstelle eine neue Herausforderung
const createChallenge = async (req, res) => {
  const { challengevl_id, startzeitpunkt, sportkl_id, gegner_sportkl_id } =
    req.body;
  const { sportl_id } = req.user;

  try {
    await.pool.query('BEGIN');
    const newChallenge = await pool.query(queries.createChallenge, [
      challengevl_id,
      sportl_id,
      startzeitpunkt,
    ]);

    const challenge_id = newChallenge.rows[0].challenge_id;

    await pool.query(queries.addChallengeEnemy, [
      sportkl_id,
      challenge_id,
      gegner_sportkl_id || null,
    ]);
await pool.query('COMMIT');
    res.status(201).json(newChallenge.rows[0]);
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Fehler beim Erstellen der Herausforderung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};
// Füge eine Aktivität zu einer Herausforderung hinzu
const addActivityToChallenge = async (req, res) => {
  const {
    meter,
    uhrzeit,
    datum,
    dauer,
    anzahl_m,
    anzahl_w,
    anzahl_d,
    challenge_id,
  } = req.body;

  try {
    await pool.query(queries.addActivity, [
      meter,
      uhrzeit,
      datum,
      dauer,
      anzahl_m || 0,
      anzahl_w || 0,
      anzahl_d || 0,
      challenge_id,
    ]);
    await pool.query(queries.updateChallenge, [meter, challenge_id]);
    res
      .status(201)
      .json({ message: "Aktivität hinzugefügt und Challenge aktualisiert" });
  } catch (error) {
    console.error(
      "Fehler beim Hinzufügen der Aktivität oder Challenge:",
      error.message
    );
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};
// Lösche eine Herausforderung
const deleteChallenge = async (req, res) => {
  const { challenge_id } = req.params;
  try {
    if (isNaN(challenge_id)) {
      return res.status(400).json({ message: "Ungültige Herausforderung" });
    }
    const result = await pool.query(queries.deleteChallenge, [challenge_id]);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Herausforderung nicht gefunden" });
    }

    res.status(200).json({ message: "Herausforderung gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen der Herausforderung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

module.exports = {
  getAllChallenges,
  getSingleChallenge,
  createChallenge,
  deleteChallenge,
  addActivityToChallenge,
};
