const express = require("express");
const setTitle = require("../middlewear/resLocals");
const {checkLogin} = require("../middlewear/checkLogin");
const { newInvoicePage } = require("../controller/invoiceController");
const router = express.Router();

router.get("/invoice/:hblId", setTitle("Create Invoice"), checkLogin, newInvoicePage); // Render Create New Invoice Page


module.exports = router;