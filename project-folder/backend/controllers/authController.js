const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/connect");
const queries = require("../db/queries");
const BadRequestError = require("../errors/bad-request");
const crypto = require("crypto");
// Provides register a new user, its comment-out for the first development phase.
// // Register a new user and generate a JWT token plus check if the email already exists
// const registerUser = async (req, res) => {
//   const { name, vorname, email, password, school } = req.body;

//   try {
//     // Check if the email already exists
//     const emailCheck = await pool.query(queries.checkEmailExists, [email]);
//     if (emailCheck.rows.length > 0) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Register the new user
//     const newUser = await pool.query(queries.registerUser, [
//       name,
//       vorname,
//       email,
//       hashedPassword,
//       school,
//     ]);

//     // Generate a JWT token
//     const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Send the response
//     res.status(201).json({ token });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// Login a user, handle the errors and generate a JWT token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Received login request for email:", email);

    // Check if the email exists
    const user = await pool.query(queries.getUserByEmail, [
      email.trim().toLowerCase(),
    ]);
    console.log("User query result:", user.rows);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Check if user needs to change initial password
    if (user.rows[0].needs_password_change) {
      return res.status(200).json({
        message: "Initial password needs to be changed",
        needsPasswordChange: true,
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the response
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// changePassword if needed and remove the needs_password_change flag

const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the users password and reset the needs_password_change flag
    await pool.query(queries.updatePasswordAndRemoveFlag, [
      hashedPassword,
      email,
    ]);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout a user and invalidate the token
const logoutUser = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    // Insert the token into the invalidated_tokens table
    await pool.query(queries.insertInvalidatedToken, [token]);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to check if the token is invalidated
const checkToken = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const result = await pool.query(queries.checkInvalidatedToken, [token]);
    if (result.rows.length > 0) {
      return res.status(401).json({ message: "Token is invalidated" });
    }
    next();
  } catch (error) {
    console.error("Error checking token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists
    const user = await pool.query(queries.getUserByEmail, [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = await bcrypt.hash(resetToken, 10);

    // Save the reset token hash in the database
    await pool.query(queries.saveResetToken, [resetTokenHash, email]);

    // Send the reset token to the user's email (pseudo-code)
    // sendEmail(email, `Your password reset token is: ${resetToken}`);

    res.status(200).json({ message: "Password reset token sent to email" });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const { email, resetToken, newPassword } = req.body;

  try {
    // Check if the email exists
    const user = await pool.query(queries.getUserByEmail, [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Check if the reset token is valid
    const validToken = await bcrypt.compare(
      resetToken,
      user.rows[0].reset_token
    );
    if (!validToken) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await pool.query(queries.updatePassword, [hashedPassword, email]);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export the functions
module.exports = {
  // registerUser,
  loginUser,
  changePassword,
  logoutUser,
  forgotPassword,
  resetPassword,
  checkToken,
};
