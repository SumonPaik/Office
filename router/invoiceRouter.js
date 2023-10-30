const express = require("express");
const setTitle = require("../middlewear/resLocals");
const {checkLogin} = require("../middlewear/checkLogin");
const { newInvoicePage, newInvoice, viewInvoice } = require("../controller/invoiceController");
const router = express.Router();

router.get("/invoice/:hblId", setTitle("Create Invoice"), checkLogin, newInvoicePage); // Render Create New Invoice Page
router.post("/invoice/:hblId", setTitle("Create Invoice"), checkLogin, newInvoice); // Render Create New Invoice Page
router.get("/invoice/:invId/view", setTitle("Invoice"), checkLogin, viewInvoice); // Render Create New Invoice Page

module.exports = router;