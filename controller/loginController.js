
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const People = require("../modelSchema/userModel");
const cookie = require("express");
const cookieParser = require("cookie-parser");

// Login Page Render
function loginPage(req, res, next) {
    try {
        res.render("login", {
            title: "Login Page",
            loggedInUser: null,
            errors: null
        })
    } catch (error) {
        next(error)
    }
};

// User Login
async function getLogin(req, res, next) {
    try {
        const user = await People.findOne({ email: req.body.email });       
        if (user && user._id) {
            bcrypt.compare(req.body.password, user.password, async function(err, result) {
                if (result === true) {
                    
                    const userObject = {
                        userId: user._id,
                        username: user.username,
                        email: user.email 
                    };
                    const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRE
                    });
                    await res.cookie(process.env.COOKIE_NAME, token, {
                        maxAge: process.env.COOKIE_EXPIRE,
                        httpOnly: true,
                        signed: true
                    });
                    res.redirect("/index");
                } else {
                    res.render("login", { 
                        title: "Login Page",
                        errors: "Wrong Password"
                    });
                }
            });
        } else {
            res.render("login", {
                email: req.body.email,
                title: "Login Page",
                errors: "wrong username"
            });
        }
    } catch (error) {       
        next(error)
    };
};

module.exports = {loginPage, getLogin};