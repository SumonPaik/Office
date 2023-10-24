const Import = require("../modelSchema/importModel");
const Housebl = require("../modelSchema/houseblModel");
const moment = require("moment");

// Rendering Index Page
async function indexPage(req, res, next) {
    try {
        await Import.find({}).populate("creator", "-password").then((importList)=>{
            res.render("index", {
                importList: importList,
                moment: moment
            })
        });        
    } catch (error) {
        next(error)
    }
};

async function viewImport(req, res, next) {
        try {
            const foundImport = await Import.findOne({_id: req.params.id});
            const foundHbl = await Housebl.find({mblno: req.params.id}).populate("mblno");
            console.log(foundImport, foundHbl)
        } catch (error) {
         next(error)   
        }
};

module.exports = {
    indexPage,
    viewImport
}
