
async function indexPage(req, res, next){
    try {
        const data = {
            title: "Import Index",
            loggedUser: null
        };
        
        res.render("index", data);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    indexPage
};