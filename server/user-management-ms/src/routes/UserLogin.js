const express = require("express");
const router = express.Router();
const postUser = require("../controllers/SignUp");

// Post new user
router.post("/", postUser.NewUserSignup);

const logInUser = require("../controllers/SignIn");
// SignIn
router.post("/signin", logInUser);

const auth = require("../middleware/authentication");
const testing = require("../controllers/Test");
// test auth
router.get("/auth", auth, testing);

module.exports = router;
