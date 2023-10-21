
const People = require("../modelSchema/userModel");
const bcrypt = require("bcrypt");
const createError = require("http-errors");


// Render Signup Page
function signupPage(req, res, next) {
    try {
        res.render("signup");
    } catch (error) {
        next(error)
    }
};

// New User Signup process
async function addNewUser(req, res, next) {
    try {
        if (req.body.password === req.body.confirmPassword) {
            const user = await People.findOne({ email: req.body.email });
            if (user && user._id) {
                res.render("signup", {
                    error: "Email already been used!",
                    formData: {
                        username: req.body.username,
                        email: req.body.email
                    }
                });
            } else {
                bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                    if (!err) {
                        const newUser = {
                            ...req.body,
                            password: hashedPassword
                        };
                        await People.create(newUser).then((user) => {
                            res.redirect("/");
                        });
                    } else {
                        next(err);
                    };
                });
            }
        } else {
            res.render("signup", {
                error: "Password does not matched!",
                formData: {
                    username: req.body.username,
                    email: req.body.email
                }
            });

        }

    } catch (error) {
        next(error);
    }
};


module.exports = { signupPage, addNewUser }