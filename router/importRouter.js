const express = require("express");
const setTitle = require("../middlewear/resLocals");
const {checkLogin} = require("../middlewear/checkLogin")
const { getImport, createImport, createHousebl } = require("../controller/importController");
const router = express.Router();



router.get("/import", setTitle("Import Details"), checkLogin, getImport);
router.post("/import", checkLogin, createImport)

router.post("/import/housebl", createHousebl)



module.exports = router;