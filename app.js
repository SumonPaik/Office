//jshint esversion:6

// Extarnal module Import
const express = require("express");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


// Internal Module Imports
const {notFoundHandler, defaultErrorHandler} = require("./middlewear/errorHandler");
const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/userRouter");
const indexRouter = require("./router/indexRouter");
const logoutRouter = require("./router/logoutRouter");

// Require Modules
const app = express();
require('dotenv').config();

// Set ejs as view engine template
app.set("view engine", "ejs");

// Request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_NAME));

// Set static folder
app.use(express.static(__dirname + "/public"));

// Mongo DB Connection Setup
mongoose.connect(process.env.MONGODB_CONNECTION, {useNewUrlparser: true});

// Router setup
app.use("/", loginRouter); // Login Router
app.use("/", userRouter); // User Router
app.use("/", indexRouter); // Index Router
app.use("/", logoutRouter); // Logout Router


// 404 - Route not found handler
app.use(notFoundHandler);

// 500 Common Error Handler
app.use(defaultErrorHandler);

// End
app.listen(process.env.PORT, ()=>{
    console.log("listening on port: " + process.env.PORT)
});