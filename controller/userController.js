const mongoose = require("mongoose");
const People = require("../modelSchema/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Render Signup Page
function signupPage(req, res, next) {
    try {
        res.render("signup", {
            title: "User Signup",
            loggedInUser: null,
            errors: null
        });
    } catch (error) {
        next(error)
    }
};

// Add new user

async function addNewUser(req, res, next) {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (!err) {
                const newUser = {
                    ...req.body,
                    password: hashedPassword
                };
                await People.create(newUser).then((user) => {
                   res.redirect("/");
                });
            } else {
                next(err)
            };
        });

    } catch (error) {
        next(error)
    }
};


module.exports = { signupPage, addNewUser }