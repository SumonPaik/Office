const createError = require("http-errors");
const moment = require("moment");
const Import = require("../modelSchema/importModel");
const Housebl = require("../modelSchema/houseblModel");

async function getImport(req, res, next) {
    try {
        res.render("createImport")   
    } catch (error) {
        next(createError(500, error))
    }
};

async function createImport(req, res, next) {
   try {
    const newImport = { 
        ...req.body,
        creator: req.userId
     }
    await Import.create(newImport);
    res.redirect("index")
   } catch (error) {
    next(createError(500, error))
   } 
};

async function createHousebl(req, res, next) {
    try {
     const newHousebl = { 
         ...req.body
     };
     console.log(newHousebl);
    await Housebl.create(newHousebl);
     res.send("New Housebl inserted!")
    } catch (error) {
     next(createError(500, error))
    } 
 };
 

module.exports = {
    getImport,
    createImport,
    createHousebl
};