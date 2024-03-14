const express = require("express");
const pool = require("../config/config");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
// Register new user
const NewUserSignup = async (req, res) => {
  try {
    let {
      first_name,
      last_name,
      password,
      contact_number,
      email,
      created_by,

      updated_by,
    } = req.body;
    let APPSECRET = process.env.APP_SECRET;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    password = hash;

    let created_date = new Date();
    let updated_date = new Date();

    const addUser = await pool.query(
      `INSERT INTO user_table (user_id,first_name, last_name, password, contact_number,email,is_active, created_by, created_date, updated_by, updated_date) VALUES ('${uuid.v4()}',$1,$2,$3, $4,$5,true, $6, $7,$8, $9)`,
      [
        first_name,
        last_name,
        password,
        contact_number,
        email,
        created_by,
        created_date,
        updated_by,
        updated_date,
      ]
    );
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { NewUserSignup };
