/*
Admin und User Controller
- get all users
- get single user
- update user
- delete user
- ev. update pwassword
- integratinon von sportklasseController?

*/

const pool = require("../db/connect");
const queries = require("../db/queries");
// get curret user info
const userInfo = async (req, res) => {
  const { sportl_id } = req.user;
  try {
    const user = await pool.query(queries.getUserInfo, [sportl_id]);
    res
      .status(200)
      .json({ name: user.rows[0].vorname + " " + user.rows[0].nachname });
  } catch (error) {
    console.error("Fehler beim Abrufen der Benutzerinformationen:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

const checkUserStatus = (req, res) => {
  res.status(200).json({
    message: "Benutzer ist eingeloggt",
    user: req.user,
  });
};

// Registriere eine neue Sportklasse
const registerSportklasse = async (req, res) => {
  const { name, jahrgang } = req.body;
  const { sportl_id, schul_id } = req.user;

  try {
    const newSportklasse = await pool.query(queries.registerSportklasse, [
      name,
      jahrgang,
      schul_id,
      sportl_id,
    ]);
    res.status(201).json(newSportklasse.rows[0]);
  } catch (error) {
    console.error("Fehler beim Registrieren der Sportklasse:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};
const getAllSportClasses = async (req, res) => {
  const { sportl_id } = req.user;
  try {
    const sportClasses = await pool.query(queries.allSportClasses, [sportl_id]);
    res.status(200).json(sportClasses.rows);
  } catch (error) {
    console.error("Fehler beim Abrufen der Sportklassen:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

module.exports = {
  userInfo,
  checkUserStatus,
  registerSportklasse,
  getAllSportClasses,
};
