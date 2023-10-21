const express = require("express");
const { indexPage } = require("../controller/indexController");
const router = express.Router();


router.get("/index", indexPage);

module.exports = router;