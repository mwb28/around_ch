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
// Zeige alle Herausforderungen an
const getAllChallenges = async (req, res) => {
  const sportlId = req.user ? req.user.sportl_id : null;
  try {
    let challenges;
    if (sportlId) {
      challenges = await pool.query(queries.getAllUserChallenges, [sportlId]);
    } else {
      challenges = await pool.query(queries.getAllChallenges);
    }

    // Bildpfad für jede Challenge dynamisch hinzufügen
    const challengesNoImage = challenges.rows.map((challenge) => {
      // let imageUrl;

      // Logik für den Bildpfad basierend auf challengevl_id
      // switch (challenge.challengevl_id) {
      //   case 8:
      //     imageUrl = "/assets/images/bielersee_small.png";
      //     break;
      //   case 9:
      //     imageUrl = "/static/images/image_for_9.jpg";
      //     break;
      //   default:
      //     imageUrl = "/static/images/default_image.jpg";
      // }

      // Challenge-Objekt mit imageUrl zurückgeben
      return { ...challenge };
    });

    res.status(200).json(challengesNoImage);
  } catch (error) {
    console.error("Fehler beim Abrufen der Herausforderungen:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

// Zeige eine einzelne Herausforderung an
const getSingleChallenge = async (req, res) => {
  const { challenge_id } = req.params;

  try {
    const challenge = await pool.query(queries.getSingleChallenge, [
      challenge_id,
    ]);
    res.status(200).json(challenge.rows[0]);
  } catch (error) {
    console.error("Fehler beim Abrufen der Herausforderung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

const getAllTemplateChallenges = async (req, res) => {
  try {
    const templateChallenges = await pool.query(
      queries.getAllTemplateChallenges
    );
    res.status(200).json(templateChallenges.rows);
  } catch (error) {
    console.error("Fehler beim Abrufen der Vorlagen-Herausforderungen:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};
// Erstelle eine neue Herausforderung
const createChallenge = async (req, res) => {
  const { startzeitpunkt, endzeitpunkt, challengevl_id, sportkl_id } = req.body;
  const { sportl_id } = req.user;
  const abgeschlossen = false;
  if (endzeitpunkt && new Date(endzeitpunkt) <= new Date(startzeitpunkt)) {
    return res
      .status(400)
      .send({ error: "Endzeitpunkt muss nach dem Startzeitpunkt liegen." });
  }
  try {
    await pool.query("BEGIN");
    // Überprüft ob die angegebene Sportklasse existiert
    if (sportkl_id) {
      const klasseExistiert = await pool.query(queries.getSportklasseId, [
        sportkl_id,
      ]);
      if (klasseExistiert.rows.length === 0) {
        await pool.query("ROLLBACK");
        return res
          .status(400)
          .json({ message: "Die angegebene Sportklasse existiert nicht." });
      }
    }

    //neue Herausforderung und gleichzeitig eine Instanz erstellen
    const newChallenge = await pool.query(queries.createChallenge, [
      startzeitpunkt,
      endzeitpunkt,
      abgeschlossen,
      challengevl_id,
      sportl_id,
    ]);
    if (sportkl_id) {
      const challenge_id = newChallenge.rows[0].challenge_id;
      await pool.query(queries.createInstanceOfChallenge, [
        0, // Meter absolviert
        "in_progress", // Status
        sportkl_id,
        challenge_id,
      ]);
    }
    await pool.query("COMMIT");
    res.status(201).json(newChallenge.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Fehler beim Erstellen der Herausforderung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

// Erstelle eine Instanz einer Herausforderung die bereits existiert
const create_instance_of_challenge = async (req, res) => {
  const { meter_absolviert, status, sportkl_id, challenge_id } = req.body;

  try {
    await pool.query("BEGIN");
    const challengeQuery = await pool.query(queries.challengeQuery, [
      challenge_id,
    ]);

    if (challengeQuery.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: "Challenge nicht gefunden" });
    }

    const { endzeitpunkt, abgeschlossen } = challengeQuery.rows[0];

    if (abgeschlossen) {
      await pool.query("ROLLBACK");
      return res
        .status(400)
        .json({ message: "Herausforderung bereits abgeschlossen" });
    }

    if (endzeitpunkt && new Date(endzeitpunkt) < new Date()) {
      await pool.query("ROLLBACK");
      return res
        .status(400)
        .json({ message: "Herausforderung bereits abgelaufen" });
    }

    const newInstanceOfChallenge = await pool.query(
      queries.create_instance_of_challenge,
      [meter_absolviert || 0, status || "in_progress", sportkl_id, challenge_id]
    );

    await pool.query("COMMIT");

    res.status(201).json(newInstanceOfChallenge.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Fehler beim Erstellen der Herausforderung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

// Füge eine Aktivität zu einer Herausforderungsinstance hinzu
const addActivityToChallengeInstance = async (req, res) => {
  const {
    meter,
    uhrzeit,
    datum,
    dauer,
    anzahl_m,
    anzahl_w,
    anzahl_d,
    instanz_id,
  } = req.body;

  try {
    await pool.query("BEGIN");
    await pool.query(queries.addActivity, [
      meter,
      uhrzeit,
      datum,
      dauer,
      anzahl_m || 0,
      anzahl_w || 0,
      anzahl_d || 0,
      instanz_id,
    ]);
    await pool.query(queries.updateChallengeInstance, [meter, instanz_id]);
    await pool.query("COMMIT");
    res
      .status(201)
      .json({ message: "Aktivität hinzugefügt und Challenge aktualisiert" });
  } catch (error) {
    await pool.query("ROLLBACK");
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
  getAllTemplateChallenges,
  createChallenge,
  create_instance_of_challenge,
  deleteChallenge,
  addActivityToChallengeInstance,
};
