require("dotenv").config();
const pool = require("./db/connect");
const authRoutes = require("./routes/authRoutes");

// express

const express = require("express");
const app = express();

app.use(express.json());

// routes

app.use(express.static("../frontend"));
app.use("/api/v1/auth", authRoutes); // Authentication routes (register/login)

const port = process.env.PORT || 5000;
pool.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
  } else {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
