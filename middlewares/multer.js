const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/"); // Ensure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4(); // Unique filename using uuid
    const fileExtension = path.extname(file.originalname); 
    cb(null, uniqueFilename + fileExtension); // Use unique filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;
