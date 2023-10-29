const createError = require("http-errors");
const Housebl = require("../modelSchema/houseblModel");
const Invoice = require("../modelSchema/invoiceModel");

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
            console.log(result.hbl.mblno);
            res.redirect("/import/" + result.hbl.mblno)
        });             
    } catch (error) {
        next(error)
    }
};

module.exports = {
    newInvoicePage,
    newInvoice
}