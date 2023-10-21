const express = require("express");
const { signupPage, addNewUser } = require("../controller/userController");
const {checkLogin} = require("../middlewear/checkLogin");
const setTitle = require("../middlewear/resLocals");

const router = express.Router();

// 

// Singup Page Route
router.get("/user", setTitle("New Signup"),  signupPage);

// New User signup route
router.post("/user", setTitle("New Signup"), addNewUser);

module.exports = router;