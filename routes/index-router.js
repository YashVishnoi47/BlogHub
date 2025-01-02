const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isloggedin");
const blogModel = require("../models/blogPost.model");

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/blogs", isloggedin, async function (req, res) {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 }); // Fetch all blogs, sorted by latest
    res.render("allBlogs", { blogs }); // Pass blogs to the template
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
