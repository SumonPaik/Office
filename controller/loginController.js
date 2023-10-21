
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const People = require("../modelSchema/userModel");


// Login Page Render
function loginPage(req, res, next) {
    try {
        res.render("login");
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
                    res.redirect("index");
                } else {
                    res.render("login", {
                        error: "Wrong Username or Password! Try again.", 
                        formData: {
                            email: req.body.email
                        }
                    });
                }
            });
        } else {
            res.render("login", {
                error: "Wrong Username or Password! Try again.", 
                formData: {
                    email: req.body.email
                    }
                });
        }
    } catch (error) {       
        next(error)
    };
};

module.exports = {loginPage, getLogin};