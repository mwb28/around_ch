const pool = require("../db/connect");
const queries = require("../db/queries");

const addActivity = async (req, res) => {
  const { id } = req.params;
  const { meter, uhrzeit, datum, dauer, anzahl_m, anzahl_w, anzahl_d } =
    req.body;

  try {
    await pool.query(queries.addActivityToChallenge, [
      meter,
      uhrzeit,
      datum,
      dauer,
      anzahl_m,
      anzahl_w,
      anzahl_d,
      id,
    ]);
    res.status(201).json({ message: "Aktivität hinzugefügt" });
  } catch (error) {
    console.error("Fehler beim Hinzufügen der Aktivität:", error.message);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

module.exports = {
  addActivity,
};