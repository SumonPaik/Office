const jwt = require("jsonwebtoken");

// Function for index Route Athentication

// Function for check User Authentication
const checkLogin = async function(req, res, next){
    try {
        const cookie = req.signedCookies;
        if (cookie) {
            const decoded = jwt.verify(cookie[process.env.COOKIE_NAME], process.env.JWT_SECRET);
            const { username, mobile, userId } = decoded;
            req.username = username;
            req.mobile = mobile;
            req.userId = userId;
            res.locals.loggedInUser= decoded  
            next();
        } else {
            res.redirect("/");
        }
       
    } catch (error) {
        next(error);
    }
};


module.exports = {checkLogin};