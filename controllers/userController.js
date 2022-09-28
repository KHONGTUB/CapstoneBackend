const mysql = require("mysql");
const { resourceLimits } = require("worker_threads");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const list = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const create = (req, res) => {
  const { email, user_name, password } = req.body;
  pool.query(
    `INSERT INTO users (email, user_name, hashed) VALUES ("${email}", "${user_name}", "${password}")`,
    (err, results) => {
      if (err) return handleSQLError(res, err);
      return res.json({ newId: results.insertId });
    }
  );
};

module.exports = { list, create };
