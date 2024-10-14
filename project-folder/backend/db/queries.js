const registerUser =
  "INSERT INTO users (name, email, password, school) VALUES ($1, $2, $3, $4) RETURNING *";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";

module.export = {
  registerUser,
  getUserByEmail,
};
