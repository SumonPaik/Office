const express = require("express");
const router = express.Router();

// Login Route Controller module Import
const { loginPage } = require("../controller/loginController");


// Get Login page Route
router.get("/", loginPage);

// User Login Route
//router.post("/", userLogin)

module.exports = router;