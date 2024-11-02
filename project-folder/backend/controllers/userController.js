/*
Admin und User Controller
- get all users
- get single user
- update user
- delete user
- ev. update pwassword
- integratinon von sportklasseController?

*/

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
module.exports = { registerSportklasse };
