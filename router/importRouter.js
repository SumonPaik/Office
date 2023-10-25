const express = require("express");
const setTitle = require("../middlewear/resLocals");
const {checkLogin} = require("../middlewear/checkLogin")
const { getImport, createImport, createHousebl, viewImport } = require("../controller/importController");
const router = express.Router();



router.get("/import", setTitle("Create New"), checkLogin, getImport);// Import
router.post("/import", checkLogin, createImport);
router.get("/import/:id", setTitle("will import Id"), checkLogin, viewImport);// Import

router.post("/import/housebl", createHousebl)



module.exports = router;