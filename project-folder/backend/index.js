require("dotenv").config();
const e = require("express");
const db = require("./db/connect");
// express

const express = require("express");
const app = express();

app.use(express.json());

// routes

app.use(express.static("../frontend"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
