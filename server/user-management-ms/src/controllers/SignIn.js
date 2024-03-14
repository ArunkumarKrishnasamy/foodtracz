const express = require("express");
const pool = require("../config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SignIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await pool.query("SELECT * FROM user_table WHERE email=$1", [
      email,
    ]);
    let APP_SECRET = process.env.APP_SECRET;

    if (user.rowCount > 0) {
      let compare = bcrypt.compareSync(password, user.rows[0].password);
      if (compare) {
        let token = jwt.sign(
          { email: user.email, id: user.rows[0].user_id },
          APP_SECRET
        );
        res.json({ token });
      } else {
        res.status(401).json({ message: "Password doesn't match" });
      }
    } else {
      res.status(404).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = SignIn;
