const createError = require("http-errors");
const Import = require("../modelSchema/importModel");
const Housebl = require("../modelSchema/houseblModel");
const Invoice = require("../modelSchema/invoiceModel");



// Get new import page function
async function getImport(req, res, next) {
  try {
    res.render("createImport")
  } catch (error) {
    next(createError(500, error))
  }
};

// Posting new Import function
async function createImport(req, res, next) {
   try {
    const newImport = { 
        ...req.body,
        creator: req.userId
     }
    await Import.create(newImport);
    res.redirect("/index")
   } catch (error) {
    next(createError(500, error))
   } 
};

// Edit Import Page Render function
async function editImport(req, res, next) {
  try {
    const foundImport = await Import.findOne({_id: req.params.id});
    res.render("editImport", {
      importData: foundImport
    })
  } catch (error) {
   next(createError(500, error))
  } 
};

// Edit Import Save function
async function updateImport(req, res, next) {
  try {
    const updateData = {
      ...req.body
    }
    await Import.findOneAndUpdate({_id: req.params.id}, updateData);
    res.redirect("/import/" + req.params.id)
  } catch (error) {
   next(createError(500, error))
  } 
};

// View a import page function
async function viewImport(req, res, next) {
  try {
    const foundImport = await Import.findOne({_id: req.params.id}).populate("creator", "-password");
    const foundHbl = await Housebl.find({mblno: req.params.id});
    const foundInvoice = await Invoice.find({invoiceno: foundImport.jobno}).populate("hbl");
    res.render("viewImport", {
        title: foundImport.mblno,
        imports: foundImport,
        hbls: foundHbl,
        invoices: foundInvoice
    });
  } catch (error) {
    next(error)
  }  
};

// Render Create housebl page
async function getNewHousebl(req, res, next) {
  try {
    const foundImport = await Import.findOne({_id: req.params.id});
   res.render("createHousebl", {
    imp: foundImport
   });  
  } catch (error) {
   next(createError(500, error))
  }
};

// Posting new house bl
async function createHousebl(req, res, next) {
  try {
    const newHousebl = new Housebl({
      mblno: req.params.id,
      ...req.body,
      creator: req.userId
    });
    
    await newHousebl.save();
    //res.redirect("import");
    res.redirect("/import/" + req.params.id);
  } catch (error) {
    const foundImport = await Import.findOne({_id: req.params.id});
    res.render("createHousebl", {
    imp: foundImport,
    error: "You must enter the value to the field, or cancel operation."
   });
  }
};
 

module.exports = {
    getImport,
    createImport,
    createHousebl,
    viewImport,
    getNewHousebl,
    editImport,
    updateImport
};