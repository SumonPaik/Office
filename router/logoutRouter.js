const express = require("express");
const logout = express.Router();

logout.get("/logout", (req, res, next)=>{
    res.clearCookie(process.env.COOKIE_NAME, {
        path: "/"
    }).redirect("/")
   
});

module.exports = logout;