const jwt = require("jsonwebtoken");

// Function for check User Authorization
const checkLogin = async function(req, res, next){
    try {
        const cookie = req.signedCookies;
        if (cookie) {
            //const token = cookie[process.env.COOKIE_NAME];
            const decoded = jwt.verify(cookie[process.env.COOKIE_NAME], process.env.JWT_SECRET);
            const { username, mobile, userId } = decoded;
            req.username = username;
            req.mobile = mobile;
            req.userId = userId;
            res.locals.loggedInUser= decoded   
            next();
        } else {
            res.send("No cookie found")
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "Message": "Authentication Faild!"
        })
    }
};

// Function for check If User already Authorized
function checkAuthorization(req, res, next) {
    const cookie = req.signedCookies;
    if (cookie) {
        const isAuthorized = jwt.verify(cookie[process.env.COOKIE_NAME], process.env.JWT_SECRET);
        if (isAuthorized) {
            res.redirect("/home")
        } else {
            next();
        }
    } else {
        next();
    }
}


module.exports = {checkLogin, checkAuthorization};