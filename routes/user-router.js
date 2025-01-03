const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginuser,
  logoutUser,
  editUser
} = require("../controllers/user.auth.controller");
const isloggedin = require("../middlewares/isloggedin");
const userModel = require("../models/user.model");

// User Register
router.post("/registerUser", registerUser);
router.get("/registerUser", function (req, res) {
  const logmsgErr = req.flash("logmsgErr");
  const logmsgScc = req.flash("logmsgScc");
  res.render("register", { logmsgErr, logmsgScc });
});

// User Login
router.post("/loginUser", loginuser);
router.get("/loginUser", function (req, res) {
  const logmsgErr = req.flash("logmsgErr");
  const logmsgScc = req.flash("logmsgScc");
  res.render("login", { logmsgErr, logmsgScc });
});


// User Logout
router.get("/logoutUser", logoutUser);


// User Profile
router.get("/userProfile", isloggedin, async function (req, res) {
  try {
    const userId = req.user._id || req.session.userId;

    const user = await userModel.findOne(userId).populate("blogs");

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/user/loginUser");
    }
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("profile", { user, blogs: user.blogs,success,error });
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});


router.post("/edituser/:id",isloggedin,editUser);


router.get("/edituser/:id",isloggedin,async function(req,res){
  const userId = req.params.id;
  const user = await userModel.findById(userId);
  // console.log(user);
  const error = req.flash("error")

  res.render("editProfile",{user,error});
});







module.exports = router;
