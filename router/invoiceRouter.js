const express = require("express");
const setTitle = require("../middlewear/resLocals");
const {checkLogin} = require("../middlewear/checkLogin");
const { 
    newInvoicePage, 
    newInvoice, 
    viewInvoice, 
    editInvoicePage, 
    updateInvoice, 
    invoiceList
} = require("../controller/invoiceController");
const router = express.Router();


router.get("/invoice", setTitle("Invoice List"), checkLogin, invoiceList); // Invoice List render

router.get("/invoice/:hblId", setTitle("Create Invoice"), checkLogin, newInvoicePage); // Render Create New Invoice Page
router.post("/invoice/:hblId", setTitle("Create Invoice"), checkLogin, newInvoice); // Render Create New Invoice Page
router.get("/invoice/:invId/view", setTitle("Invoice"), checkLogin, viewInvoice); // Render Create New Invoice Page
router.get("/invoice/:invId/edit", setTitle("Invoice"), checkLogin, editInvoicePage); // Render Edit Invoice Page
router.post("/invoice/:invId/edit", setTitle("Invoice"),checkLogin, updateInvoice); // Render Edit Invoice Page

module.exports = router;