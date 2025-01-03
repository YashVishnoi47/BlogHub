const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isloggedin");
const blogModel = require("../models/blogPost.model");
const upload = require("../middlewares/multer");
const userModel = require("../models/user.model");

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/blogs", isloggedin, async function (req, res) {
  try {
    const blogs = await blogModel
      .find()
      .sort({ createdAt: -1 })
      .populate("BloggerName"); // Fetch all blogs, sorted by latest
    res.render("allBlogs", { blogs }); // Pass blogs to the template
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/uploads",
  upload.single("file"),
  isloggedin,
  async function (req, res) {
    if (!req.file) {
      req.flash("error", "File not uploaded");
      return res.redirect("/user/userProfile");
    }
    const filePath = `/uploads/${req.file.filename}`;

    try {

      const userId = req.user._id;
      const user = await userModel.findById(userId);

      if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/user.userProfile");
      }

      user.profilePic = filePath;
      await user.save();

      req.flash("success", "File uploaded Successfully");
      res.redirect("/user/userProfile");
    } catch (error) {
      req.flash("error", "Error uploading profile picture");
      res.redirect("/user/userProfile");
    }
  }
);

module.exports = router;
