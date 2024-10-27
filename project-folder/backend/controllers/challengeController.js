/*
 getAllChallenges,
  getSingleChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,

*/
const pool = require("../db/connect");
const queries = require("../db/queries");

const getAllChallenges = async (req, res) => {
  try {
    const challenges = await pool.query(queries.getAllChallenges);
    res.status(200).json(challenges.rows);
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

module.exports = {
  getAllChallenges,
  getSingleChallenge,
};
