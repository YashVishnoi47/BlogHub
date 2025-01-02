const express = require("express");
const blogMOdel = require("../models/blogPost.model");
const isloggedin = require("../middlewares/isloggedin");
const userModel = require("../models/user.model");

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

    // res.send(createdBlogPost);
    req.flash("success", "Blog post created successfully");
    res.redirect("/user/userProfile");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
};

module.exports.deleteBlog = async function (req, res) {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const deletedBlog = await blogMOdel.findByIdAndDelete({
      _id: blogId,
      user: userId,
    });

    // console.log(deletedBlog)

    if (!deletedBlog) {
      req.flash("error", "Blog not found");
      return res.redirect("/user/userProfile");
    }

    req.flash("success", "Deleted");
    res.redirect("/user/userProfile");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
};

module.exports.editBlog = async function (req, res) {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;
    const { title, blogText } = req.body;
    if (!title || !blogText) {
      req.flash("error", "All fields are required");
      return res.redirect("/user/userProfile");
      // res.send("All the fields are required");
    }

    const blog = await blogMOdel.findById(blogId);
    if (!blog) {
      req.flash("error", "Blog not found");
      res.redirect("/user/userProfile");
    }

    blog.title = title;
    blog.blogText = blogText;
    await blog.save();

    // res.send(createdBlogPost);
    req.flash("success", "Blog post updated successfully");
    res.redirect("/user/userProfile");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
};
