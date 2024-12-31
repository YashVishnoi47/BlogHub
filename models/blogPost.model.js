const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  BloggerName: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required:true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  blogText:{
    type: String,
    required:true
  }
});

module.exports = mongoose.model("post",postSchema);
