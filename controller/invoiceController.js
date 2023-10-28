const createError = require("http-errors");
const Housebl = require("../modelSchema/houseblModel");

async function newInvoicePage(req, res, next) {
    try {
        const foundHousebl = await Housebl.findOne({_id: req.params.hblId}).populate("mblno");
        console.log(req.params.hblId);
        console.log(foundHousebl);
        
        res.render("createInvoice", {
            housebl: foundHousebl
        });
    } catch (error) {
        next(createError(500, error))
    }
};

module.exports = {
    newInvoicePage
}