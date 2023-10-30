
const People = require("../modelSchema/userModel");
const bcrypt = require("bcrypt");
const createError = require("http-errors");


// Render Signup Page
async function signupPage(req, res, next) {
    try {
        if (req.role === "admin") {
            const users = await People.find({});
            res.render("user", {
                users: users
            });
        } else {
           next(createError(401, "You are not authorized for this page!")) 
        }        
    } catch (error) {
        next(error)
    }
};

// New User Signup process
async function addNewUser(req, res, next) {
    try {
        if (req.role === "admin") {
            if (req.body.password === req.body.confirmPassword) {                
                const user = await People.findOne({ email: req.body.email });
                if (user && user._id) {
                    res.render("user", {
                        error: "Email already been used!",
                        formData: {
                            username: req.body.username,
                            email: req.body.email
                        },
                        users: await People.find({})
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                        if (!err) {
                            const newUser = {
                                ...req.body,
                                password: hashedPassword
                            };
                            await People.create(newUser).then((user) => {
                                res.redirect("/user");
                            });
                        } else {
                            next(err);
                        };
                    });
                }
            } else {
                res.render("user", {
                    error: "Password does not matched!",
                    formData: {
                        username: req.body.username,
                        email: req.body.email
                    },
                    users: await People.find({})
                });
    
            }
        } else {
            next(createError(401, "You are not authorized to play this operation!"))
        }
    } catch (error) {
        next(error);
    }
};

// Delete User or Update route
async function manageUser(req, res, next) {
  try {
    if (req.body.edit === "edit") {
        const user = await People.findOne({_id: req.params.id});
        res.render("edituser", {
            title: "Edit User info",
            user: user
        });
    } else {
        if (req.body.delete === "delete") {
            await People.findOneAndDelete({_id: req.params.id});
            res.redirect("/user")
        }
    }
  } catch (error) {
    next(error)
  }  
};

// Update user info
async function updateUser(req, res, next) {
    try {
        const update = req.body;
        const user = await People.findOneAndUpdate(
            {_id: req.params.id}, 
            {$set: {
                username: req.body.username,
                email: req.body.email,
                role: req.body.role
            }}, 
            {new: true}
        );
        res.redirect("/user")      
    } catch (error) {
      next(error)
    }  
  };

module.exports = { 
    signupPage,
    addNewUser,
    manageUser,
    updateUser
}