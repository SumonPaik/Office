const express = require("express");
const { loginPage, getLogin } = require("../controller/loginController");
const setTitle = require("../middlewear/resLocals");
const router = express.Router();



// Get Login page Route
router.get("/", setTitle("User Login"), loginPage);

// User Login Route
router.post("/", setTitle("User Login"), getLogin);

module.exports = router;