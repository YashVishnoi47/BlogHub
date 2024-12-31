const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports.registerUser = async function (req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      req.flash("logMsg", "All fields are required");
      return res.send("All f"); //Debug
      //   return res.redirect("/user/register");
    }

    const user = await userModel.findOne({ email });
    if (user) {
      //   req.flash("logmsg", "User alredy exists");
      return res.send("User alredy exists"); //Debug
      //   return res.redirect("/user/register");
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
    // req.flash("logmsg", "User Registered");
    res.send(newUser); //Debug
    // return res.redirect("/register");
  } catch (error) {
    console.log(error);
    return res.send("Internal Server Error");
  }
};

module.exports.loginuser = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send("All fields are required"); //Debug
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send("User don't Exists, Register"); //Debug
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.Sec_Key
      );
      res.cookie("token", token);
      res.send("done");
      // res.redirect("/profile");
    } else {
      return res.send("invalid"); //debug
      // req.flash("error", "Something went wrong");
      // return res.redirect("/register");
    }
  } catch (error) {
    return res.send("Internal Sever"); //Debug
  }
};
