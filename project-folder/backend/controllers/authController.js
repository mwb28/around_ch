/*
authController: Bearbeitet die Anfragen, die von den Routen empfangen werden.
- Login
- changePassword
- logout
- forgotPassword (email nicht implemetiert)
- resetPassword (email nicht implemetiert)
- checkToken
Fututre Features:
- registerUser
- forgotPassword inkl. email
- resetPassword inkl. email
- refreshToken Handling
Der Code ist nach dem Tutorial von johnsmilga.com erstellt worden.  
*/
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/connect");
const queries = require("../db/queries");
const getRandomToken = require("../utils/generateRandomToken");

// Login eines Benutzers, Fehlerbehandlung und Generierung eines JWT-Tokens
const loginUser = async (req, res) => {
  const { email, hashedpassword } = req.body;

  try {
    // Überprüfen, ob die E-Mail existiert
    const user = await pool.query(queries.getUserByEmail, [
      email.trim().toLowerCase(),
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "E-Mail nicht gefunden" });
    }

    // Überprüfen, ob das Passwort gültig ist
    const validPassword = await bcrypt.compare(
      hashedpassword,
      user.rows[0].hashedpassword
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Falsches Passwort" });
    }

    // Überprüfen, ob der Benutzer das anfängliche Passwort ändern muss
    if (user.rows[0].needs_password_change) {
      return res.status(200).json({
        message: "Anfängliches Passwort muss geändert werden",
        needsPasswordChange: true,
      });
    }

    // Generieren eines JWT-Tokens
    const token = jwt.sign(
      { id: user.rows[0].sportl_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // Senden der Antwort
    res.status(200).json({ token });
  } catch (error) {
    console.error("Fehler beim Einloggen:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

// Passwort ändern, falls erforderlich, und das needs_password_change-Flag entfernen
const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Neues Passwort hashen
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Passwort des Benutzers aktualisieren und das needs_password_change-Flag zurücksetzen
    await pool.query(queries.updatePasswordAndRemoveFlag, [
      hashedPassword,
      email,
    ]);
    res.status(200).json({ message: "Passwort erfolgreich geändert" });
  } catch (error) {
    console.error("Fehler beim Ändern des Passworts:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

// Benutzer ausloggen und das Token ungültig machen
const logoutUser = async (req, res) => {
  c;
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    // Token in die Tabelle invalidated_tokens einfügen
    await pool.query(queries.insertinvalidatedToken, [token]);

    res.status(200).json({ message: "Erfolgreich ausgeloggt" });
  } catch (error) {
    console.error("Fehler beim Ausloggen:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

// Middleware, um zu überprüfen, ob das Token ungültig gemacht wurde
const checkToken = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const result = await pool.query(queries.checkInvalidatedToken, [token]);
    if (result.rows.length > 0) {
      return res.status(401).json({ message: "Token ist ungültig" });
    }
    next();
  } catch (error) {
    console.error("Fehler beim Überprüfen des Tokens:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

// Passwort vergessen

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Überprüfe, ob die E-Mail existiert
    const user = await pool.query(queries.getUserByEmail, [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Generiere ein zufälliges Token
    const resetToken = getRandomToken(8);

    // Hash das Token
    const resetTokenHash = await bcrypt.hash(resetToken, 10);

    // Token in die Datenbank speichern
    const expiresAt = new Date(Date.now() + 3600000); // Ablauf in 1 Stunde
    await pool.query(queries.saveResetToken, [
      resetTokenHash,
      email,
      expiresAt,
    ]);

    // Versende die E-Mail mit dem Reset-Token... Future Feature: Implementierung von E-Mail-Versand
    //

    res.status(200).json({ message: "Password reset token sent to email" });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Passwort zurücksetzen
const resetPassword = async (req, res) => {
  const { email, resetToken, newPassword } = req.body;

  try {
    // Finde den gespeicherten Reset-Token in der Datenbank
    const result = await pool.query(queries.getResetTokenByEmail, [email]);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const storedTokenHash = result.rows[0].reset_token;
    const expiresAt = result.rows[0].expires_at;

    // Überprüfen ob der Token abgelaufen ist
    if (new Date() > expiresAt) {
      return res.status(400).json({ message: "Reset token has expired" });
    }

    // Vergleichen des gespeicherten Tokens mit dem eingegebenen Token
    const validToken = await bcrypt.compare(resetToken, storedTokenHash);
    if (!validToken) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Hashen des neuen Passworts
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Aktualisieren des Passworts in der Datenbank
    await pool.query(queries.updatePassword, [hashedPassword, email]);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Funktionen exportieren
module.exports = {
  // registerUser,
  loginUser,
  changePassword,
  logoutUser,
  forgotPassword,
  resetPassword,
  checkToken,
};
