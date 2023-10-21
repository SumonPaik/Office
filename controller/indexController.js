
// Rendering Index Page
function indexPage(req, res, next) {
    try {
        res.render("index");
    } catch (error) {
        next(error)
    }
};

module.exports = {indexPage}
