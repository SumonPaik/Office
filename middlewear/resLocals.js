
const moment = require("moment");
const format = require("format-number");
const amountFormat = format({prefix: "Tk. ", negativeType: "brackets"});


function setTitle(pageTitle) {
    return function(req, res, next){
        res.locals.html = true;
        res.locals.title = pageTitle;
        res.locals.formData = {},
        res.locals.loggedInUser = {},
        res.locals.error = "",
        res.locals.moment = moment,
        res.locals.amountFormat = amountFormat
        next();
    }
    
};

module.exports = setTitle;