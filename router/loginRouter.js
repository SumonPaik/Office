const express = require("express");
//const {checkLogin} = require("../middlewear/checkLogin");
const { loginPage, getLogin, indexPage } = require("../controller/loginController");
const setTitle = require("../middlewear/resLocals");
const { signinPageHandler, checkLogin } = require("../middlewear/checkLogin");
const router = express.Router();



// Get Login page Route
router.get("/", signinPageHandler, setTitle("User Login"), loginPage);

// User Login Route
router.post("/", setTitle("User Login"), getLogin);

// Get Index page 
router.get("/index", setTitle("Index"), checkLogin, indexPage );

module.exports = router;