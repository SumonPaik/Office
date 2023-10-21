
// Rendering Index Page
function indexPage(req, res, next) {
    try {
        res.render("index", {
            title: "Login Page",
            errors: null
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {indexPage}
