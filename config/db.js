const mongoose = require("mongoose");
require("dotenv").config();

const connection = async function () {
  await mongoose.connect(process.env.MONGODB_URI);

};

module.exports = connection;
