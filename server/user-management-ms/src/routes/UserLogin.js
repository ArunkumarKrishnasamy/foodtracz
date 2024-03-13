const express = require("express");
const router = express.Router();
const getData = require("../controllers/SignUp");

router.get("/", getData.NewUserSignup);

module.exports = router;
