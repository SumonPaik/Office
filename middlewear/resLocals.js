
const moment = require("moment");

function setTitle(pageTitle) {
    return function(req, res, next){
        res.locals.html = true;
        res.locals.title = pageTitle;
        res.locals.formData = {},
        res.locals.loggedInUser = {},
        res.locals.error = "",
        res.locals.moment = moment
        next();
    }
    
};

module.exports = setTitle;