const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports.registerUser = async function (req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      req.flash("logmsgErr", "All fields are required");
      return res.redirect("/user/registerUser");
      // return res.send("All f"); //Debug
    }

    const user = await userModel.findOne({ email });
    if (user) {
       req.flash("logmsgErr", "User alredy exists");
       return res.redirect("/user/registerUser");
      // return res.send("User alredy exists"); //Debug
    }

    const saltRoundes = 10;
    const hashedPassword = await bcrypt.hash(password, saltRoundes);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.Sec_Key
    );

    res.cookie("token", token, {
      httpOnly: true,
    });
    req.flash("logmsgSucc", "User Registered");
    return res.redirect("/user/loginUser");
    // res.send(newUser); //Debug
  } catch (error) {
    console.log(error);
    return res.send("Internal Server Error");
  }
};

module.exports.loginuser = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.send("All fields are required"); //Debug
      req.flash('logmsgErr',"All fields are required");
      return res.redirect('/user/loginUser');
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      // return res.send("User don't Exists, Register"); //Debug
      req.flash('logmsgErr',"Invalid Email or Password");
      return res.redirect('/user/loginUser');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.Sec_Key
      );
      res.cookie("token", token);
      // res.send("done");
      res.redirect("/user/userProfile");
    } else {
      // return res.send("invalid"); //debug
      req.flash('logmsgErr',"Incorrect Password, try again");
      return res.redirect('/user/loginUser');
    }
  } catch (error) {
    return res.send("Internal Sever"); //Debug
  }
};

module.exports.logoutUser = function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};



