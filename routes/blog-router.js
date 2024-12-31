const express = require('express');
const router = express.Router();
const {createBlog} = require("../controllers/blog.controller")
const isloggedin = require('../middlewares/isloggedin')
 

router.post("/createPost",isloggedin,createBlog);

module.exports = router;
