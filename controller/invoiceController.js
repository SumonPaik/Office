const createError = require("http-errors");
const numWords = require('num-words');
const Housebl = require("../modelSchema/houseblModel");
const Invoice = require("../modelSchema/invoiceModel");
const Import = require("../modelSchema/importModel");

// Render Create invoice Page
async function invoiceList(req, res, next) {
    try {
        const invoices = await Invoice.find({}).populate("hbl");
        res.render("invoice-list", {
            invoices: invoices
        });
    } catch (error) {
        next(createError(500, error))
    }
};

// Render Create invoice Page
async function newInvoicePage(req, res, next) {
    try {
        const foundHousebl = await Housebl.findOne({_id: req.params.hblId}).populate("mblno");
        //console.log(req.params.hblId);
        //console.log(foundHousebl);        
        res.render("createInvoice", {
            housebl: foundHousebl
        });
    } catch (error) {
        next(createError(500, error))
    }
};

// Create new invoice (post route)
async function newInvoice(req, res, next) {
    try {
        const newInvoice = {
            hbl: req.params.hblId,
            ...req.body,
            totalamount: req.body.amount1 + req.body.amount2 + req.body.amount3 + req.body.amount4,
            creator: req.userId
        };
        await Invoice.create(newInvoice);
        await Invoice.findOne({hbl: req.params.hblId}).populate("hbl")
        .then((result)=>{
            // console.log(result);
            res.redirect("/import/" + result.hbl.mblno)
        });             
    } catch (error) {
        const foundHousebl = await Housebl.findOne({_id: req.params.hblId}).populate("mblno");
        //console.log(foundHousebl);        
        res.render("createInvoice", {
            housebl: foundHousebl,
            formData: req.body,
            error: error
        });
    }
};

// Render Edit invoice Page
async function editInvoicePage(req, res, next) {
    try {
        const foundInvoice  = await Invoice.findOne({_id: req.params.invId}).populate("hbl");
        // console.log(foundInvoice);
        
        res.render("editInvoice", {
            invoice: foundInvoice
        });
    } catch (error) {
        next(createError(500, error))
    }
};

// Save Edited invoice (post route)
async function updateInvoice(req, res, next) {
    try {
        
        const formData = {
            ...req.body
        };
        await Invoice.findOneAndUpdate({_id: req.params.invId}, formData)
        .then((update)=>{console.log(update)})
        res.redirect("/invoice/" + req.params.invId + "/view");          
    } catch (error) {
        next(error);    
    }
};

// View an invoice
async function viewInvoice(req, res, next) {
  try {
    const foundInvoice  = await Invoice.findOne({_id: req.params.invId}).populate("creator hbl", "-password");
    const foundMbl = await Import.findOne({_id: foundInvoice.hbl.mblno});
    //console.log(foundMbl);
    if (!foundInvoice) {
        next(createError("Invoice not found!"));
    }
    res.render("viewInvoice", {
        invoice: foundInvoice,
        mbl: foundMbl,
        numWords: numWords
    });
  } catch (error) {
    next(error)
  }  
};

module.exports = {
    newInvoicePage,
    newInvoice,
    viewInvoice,
    editInvoicePage,
    updateInvoice,
    invoiceList
}