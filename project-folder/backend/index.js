require("dotenv").config();
const db = require("./db/connect");
// express

const express = require("express");
const app = express();

app.use(express.json());

// routes

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server läuft auf ${port}`);
});
