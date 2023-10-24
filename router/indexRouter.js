const express = require("express");
const { indexPage, viewImport } = require("../controller/indexController");
const setTitle = require("../middlewear/resLocals");
const { checkLogin } = require("../middlewear/checkLogin");

const router = express.Router();


router.get("/index", setTitle("Import Index"), checkLogin, indexPage);
router.get("/index/:id", setTitle("Import Index"), checkLogin, viewImport);
// router.get("/import/:hblno", setTitle("House BL"), view)


module.exports = router;