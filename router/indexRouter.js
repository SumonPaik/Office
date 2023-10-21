const express = require("express");
const { indexPage } = require("../controller/indexController");
const setTitle = require("../middlewear/resLocals");
const { checkLogin } = require("../middlewear/checkLogin");

const router = express.Router();


router.get("/index", setTitle("Import Index"), checkLogin, indexPage);

module.exports = router;