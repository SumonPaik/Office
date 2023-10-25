const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// Function for index Route Athentication

// Function for check User Authentication
const checkLogin = async function (req, res, next) {
    try {
        const cookie = req.signedCookies ? req.signedCookies : null
        
        if (cookie) {
            const decoded = jwt.verify(cookie[process.env.COOKIE_NAME], process.env.JWT_SECRET);
            if (decoded) { 
                const userObject = {
                    userId: decoded.userId,
                    username: decoded.username,
                    email: decoded.email,
                    role: decoded.role
                };
                
                // Regenarate jwt and  set cookie
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE
                });
                // Reset cookie
                await res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.COOKIE_EXPIRE,
                    httpOnly: true,
                    signed: true
                }); 

                const {userId, username, email, role} = decoded;
                req.username = username;
                req.email = email;
                req.userId = userId;
                req.role = role;
                res.locals.loggedInUser = userObject;
                next();
            } else {
                next(createError(401, "Unauthorized Attemp! Provide valid user information"));                
            }
        } else {
            res.redirect("/");
        }
    } catch (error) {
        next(createError(401, "Log in first!"))       
    }
};

// Signin page handler

function signinPageHandler(req, res, next) {
    try {
        const cookie = req.signedCookies[process.env.COOKIE_NAME];
        if (cookie) {
            res.redirect("index");
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
};



module.exports = { checkLogin, signinPageHandler };