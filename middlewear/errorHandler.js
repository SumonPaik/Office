const createError = require("http-errors");

function notFoundHandler(req, res, next) {
    next(createError(404, "Requested page not found!"))
};

function defaultErrorHandler(err, req, res, next) {
    res.render("error", {
        title: "Error Page",
        error: err
    });
};

module.exports = {
    notFoundHandler,
    defaultErrorHandler
};