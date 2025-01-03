const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "post",
    },
  ],
  profilePic: {
    type: String, // Store the path to the profile picture
    default: "uploads/profile-icon.jpg", // Default image path if no profile picture is uploaded
  },
});

module.exports = mongoose.model("user", userSchema);
