const createError = require("http-errors");
const Housebl = require("../modelSchema/houseblModel");
const Invoice = require("../modelSchema/invoiceModel");

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
        console.log(req.body);
        //console.log(foundHousebl);        
        res.render("createInvoice", {
            housebl: foundHousebl,
            formData: req.body,
            error: error
        });
    }
};

// View an invoice
async function viewInvoice(req, res, next) {
  try {
    const foundInvoice  = await Invoice.findOne({_id: req.params.invId}).populate("hbl");
    // console.log(foundInvoice);
    res.render("viewInvoice", {
        invoice: foundInvoice
    });
  } catch (error) {
    next(error)
  }  
};

module.exports = {
    newInvoicePage,
    newInvoice,
    viewInvoice
}