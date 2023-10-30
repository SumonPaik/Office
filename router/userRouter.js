const express = require("express");
const { signupPage, addNewUser, manageUser, updateUser } = require("../controller/userController");
const {checkLogin} = require("../middlewear/checkLogin");
const setTitle = require("../middlewear/resLocals");

const router = express.Router();

// 

// Singup Page Route
router.get("/user", setTitle("User Management"), checkLogin, signupPage);

// New User signup route
router.post("/user", setTitle("User Management"), checkLogin, addNewUser);

// Edit User Page render Route
router.get("/user/:id", setTitle("Update User Info"), checkLogin, manageUser);

// Edit User Page render Route
router.post("/user/:id", setTitle("User Management"), checkLogin, updateUser);

// Delete route for user
router.post("/user/:id/delete", setTitle("User Management"), checkLogin, manageUser);

module.exports = router;