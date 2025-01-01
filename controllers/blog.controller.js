const express = require("express");
const blogMOdel = require("../models/blogPost.model");
const isloggedin = require("../middlewares/isloggedin");
const userModel = require("../models/user.model")

module.exports.createBlog = async function (req, res) {
  try {
    const userId = req.user._id;
    const { title, blogText } = req.body;
    if (!title || !blogText) {
      res.send("All the fields are required");
      // res.flash("succ","Blog Created")
      // return res.redirect('/')
    }

    const blogPost = await blogMOdel.create({
      title,
      blogText,
      BloggerName: req.user._id,
    });

    const createdBlogPost = await blogPost.save();


    await userModel.findByIdAndUpdate(
      userId,
      { $push: { blogs: createdBlogPost._id } }, // Push the blog ID
      { new: true } // Return updated document
    );



    res.send(createdBlogPost);
    // req.flash('success', 'Blog post created successfully');
    // res.redirect('/profile');
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
};
