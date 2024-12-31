const express = require("express");
const blogMOdel = require("../models/blogPost.model");
const isloggedin = require("../middlewares/isloggedin");

module.exports.createBlog = async function (req, res) {
  try {
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
    res.send(createdBlogPost);
    // req.flash('success', 'Blog post created successfully');
    // res.redirect('/profile');
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
};
