const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// Function for index Route Athentication

// Function for check User Authentication
const checkLogin = async function (req, res, next) {
    try {
        const cookie = req.signedCookies;
        if (cookie) {
            const decoded = jwt.verify(cookie[process.env.COOKIE_NAME], process.env.JWT_SECRET);
            if (decoded) {
                const { username, mobile, userId } = decoded;
                req.username = username;
                req.mobile = mobile;
                req.userId = userId;
                res.locals.loggedInUser = decoded
                next();
            } else {
                next(createError(401, "Your session has expired! Log in again."));                
            }
        } else {
            res.redirect("/");
        }
    } catch (error) {
        next(createError(401, "You must login first!"))        
    }
};


module.exports = { checkLogin };