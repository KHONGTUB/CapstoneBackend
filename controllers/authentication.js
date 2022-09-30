const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const pool = require("../sql/connection");
const bcrypt = require("bcrypt");
const { handleSQLError } = require("../sql/error");
require("dotenv").config();

const { SECRET } = process.env;

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, result) => {
    if (err) return res.sendStatus(403);

    next();
  });
}

function generateToken(user) {
  return jwt.sign(user, SECRET);
}

const signup = async (req, res) => {
  const { email, user_name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  pool.query(
    `SELECT * FROM users WHERE user_name = "${user_name}"`,
    (err, rows) => {
      if (err) return handleSQLError(res, err);
      if (rows.length > 0) {
        return res.send("Username Already Exsist!");
      } else {
        console.log("Available");
        pool.query(
          `INSERT INTO users (email, user_name, hashed) VALUES ("${email}", "${user_name}", "${hashedPassword}")`,
          (err, results) => {
            if (err) return handleSQLError(res, err);
            return res.send("You have been registered!");
          }
        );
      }
    }
  );
};

const login = (req, res) => {
  const { user_name, password } = req.body;

  pool.query(
    `SELECT * FROM users WHERE user_name = "${user_name}"`,
    async (err, rows) => {
      if (err) return handleSQLError(res, err);
      if (rows.length > 0) {
        const match = await bcrypt.compare(password, rows[0].hashed);
        if (match) {
          const token = generateToken({ user_name, password });
          res.json({ token: token, username: rows[0].user_name });
        } else {
          res.sendStatus(403);
        }
      } else {
        return res.sendStatus(404);
      }
    }
  );
};

module.exports = { login, signup, authenticateToken };
