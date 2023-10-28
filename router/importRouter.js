const express = require("express");
const setTitle = require("../middlewear/resLocals");
const {checkLogin} = require("../middlewear/checkLogin")
const { getImport, createImport, createHousebl, viewImport, getNewHousebl } = require("../controller/importController");
const router = express.Router();



router.get("/import", setTitle("Create New"), checkLogin, getImport);// Import Create page render
router.post("/import", checkLogin, createImport); // New Import Post Route

router.get("/:id", setTitle("will import Id"), checkLogin, viewImport); // View a Import details by Id

router.get("/import/:id", setTitle("Add House BL"), checkLogin, getNewHousebl); // Render Create new House BL Page
router.post("/import/:id", checkLogin, createHousebl); // Post a new House BL Route



module.exports = router;