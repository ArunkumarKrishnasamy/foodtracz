const express = require("express");
const pool = require("../config/config");

const NewUserSignup = async (req, res) => {
  try {
    const newuser = await pool.query("SELECT * FROM user_table");
    res.status(200).json({ newuser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { NewUserSignup };
