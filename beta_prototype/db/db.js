// backend/db.js
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'beta_aroundch',
  password: 'your_password',
  port: 5432,
});

module.exports = {
  pool,
};

