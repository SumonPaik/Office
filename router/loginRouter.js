const express = require("express");
const { loginPage, getLogin } = require("../controller/loginController");
const router = express.Router();


// Login Route Controller module Import


// Get Login page Route
router.get("/", loginPage);

// User Login Route
router.post("/", getLogin);

module.exports = router;