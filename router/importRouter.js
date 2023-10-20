const express = require("express");
const router = express.Router();

const { indexPage } = require("../controller/importController");


router.get("/", (req, res)=>{
    res.render("index", {title: "index"})
});


module.exports = router;