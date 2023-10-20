//jshint esversion:6

// Extarnal module Import
const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

// Internal Module Imports
const {notFoundHandler, defaultErrorHandler} = require("./middlewear/errorHandler");


// Require Modules
const app = express();
require('dotenv').config();
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_NAME));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));

// Mongo DB Connection Setup
mongoose.connect("mongodb://127.0.0.1:27017/importDB", {useNewUrlparser: true});

// Router setup
app.get("/", (req, res)=>{
    res.send("Welcome!")
});



// 404 - Route not found handler
app.use(notFoundHandler);

// 500 Common Error Handler
app.use(defaultErrorHandler);

// End
app.listen(3000, ()=>{
    console.log("listening on port: 3000")
});