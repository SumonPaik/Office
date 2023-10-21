const express = require("express");
const logout = express.Router();

logout.delete("/logout", (req, res, next)=>{
    res.clearCookie(process.env.COOKIE_NAME);
});

module.exports = logout;