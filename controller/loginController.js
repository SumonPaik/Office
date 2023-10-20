
// Get Login Page Controller
function loginPage(req, res, next) {
    try {       
        const data = {
            title: "Login Page",
            error: null
        };
        res.render("login", data);
    } catch (error) {
        next(error);
    }
};

// User Login Controller
// async function userLogin(req, res, next) {
//     try {
//         const user = await People.findOne({email: req.body.email});
//         if (user && user.email) {
//             res.render("home", {
//                 title: "Login Page",
//                 error: null
//             });
//         } else {
            
//         }
//     } catch (error) {
//         next(error)
//     }
// };


// Export modules to loginRouter
module.exports={
    loginPage
};