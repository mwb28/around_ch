const pool = require("../db/connect");

const checkChallengeEndDate = async (req, res, next) => {
  try {
    const query = `
      UPDATE challenge 
      SET abgeschlossen = true 
      WHERE endzeitpunkt <= NOW() AND abgeschlossen = false;
    `;
    const result = await pool.query(query);

    if (result.rowCount > 0) {
      console.log(`${result.rowCount} Challenges archiviert.`);
    }

    next(); // Weiter zur Route
  } catch (error) {
    console.error("Fehler beim Überprüfen des Endzeitpunkts:", error.message);
    res
      .status(500)
      .json({ message: "Interner Serverfehler bei der Endzeitprüfung" });
  }
};

module.exports = checkChallengeEndDate;
