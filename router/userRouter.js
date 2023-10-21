const express = require("express");
const { signupPage, addNewUser } = require("../controller/userController");
const {checkLogin} = require("../middlewear/checkLogin");
const router = express.Router();

// 

// Sigup Page Route
router.get("/user", signupPage);

// Add new User Route
router.post("/user", checkLogin, addNewUser);

module.exports = router;