const express = require("express");
const router = express.Router();
const {
  createBlog,
  deleteBlog,
  editBlog,
} = require("../controllers/blog.controller");
const isloggedin = require("../middlewares/isloggedin");
const blogModel = require("../models/blogPost.model");

router.post("/createPost", isloggedin, createBlog);

router.get("/createPost", function (req, res) {
  res.render("createBlog");
});

router.post("/delete/:id", isloggedin, deleteBlog);

router.post("/editBlog/:id", isloggedin, editBlog);

router.get("/editBlog/:id", isloggedin, async function (req, res) {
  try {
    const blogId = req.params.id;

    const blog = await blogModel.findById(blogId);
    if (!blog) {
      req.flash("error", "No blog found");
      res.redirect("/user/userProfile");
    }

    const success = req.flash("success");
    const error = req.flash("error");
    res.render("editBlog", { blog, error, success });
  } catch (error) {
    res.send("Internal Server Error");
  }
});

router.get("/aBlog/:id", async function (req, res) {
  try {
    const blogId = req.params.id;
    // const user = req.user._id;

    const blog = await blogModel.findById(blogId);
    if (!blog) {
      req.flash("error", "Blog not found");
      res.redirect("/blogs");
    }

    res.render("aBlog", { blog });
  } catch (error) {
    res.send("internal Server Error");
  }
});

module.exports = router;
