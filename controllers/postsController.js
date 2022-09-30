const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const listPost = (req, res) => {
  pool.query("SELECT * FROM posts", (err, rows) => {
    if (err) return handleSQLError(res, err);
    res.json(rows);
  });
};

const createPost = (req, res) => {
  const { user_name, created_at, park_location, post } = req.body;
  pool.query(
    `SELECT * FROM users WHERE user_name = "${user_name}"`,
    (err, rows) => {
      if (err) return handleSQLError(res, err);
      const user_id = rows[0].id;
      pool.query(
        `INSERT INTO posts (user_id, created_at, park_location, post) VALUES ("${user_id}", "${created_at}", "${park_location}", "${post}")`,
        (err, results) => {
          if (err) return handleSQLError(res, err);
          return res.json({ newId: results.insertId });
        }
      );
    }
  );
};

module.exports = { listPost, createPost };
