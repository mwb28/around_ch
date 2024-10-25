const registerUser =
  "INSERT INTO sportlehrperson (name, vorname, email, password, school) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const getUserByEmail = "SELECT * FROM sportlehrperson WHERE email = $1";
const updatePasswordAndRemoveFlag =
  "UPDATE sportlehrperson SET hashedPassword = $1, needs_password_change = false WHERE email = $2";
const invalidatetedToken =
  "INSERT  INTO invalidatetoken (token) VALUES ($1) RETURNING *";
const getInvalidatedToken = "SELECT * FROM invalidatetoken WHERE token = $1";

module.exports = {
  registerUser,
  getUserByEmail,
  updatePasswordAndRemoveFlag,
  invalidatetedToken,
  getInvalidatedToken,
};
