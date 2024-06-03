// upload.js
const multer = require('multer');
const path = require('path');

// Define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const productTitle = req.body.name; // Assuming 'name' is the product title
    const uploadPath = path.join(__dirname, `../uploads/${productTitle}`);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // You can customize the filename if needed
  },
});

// Initialize multer upload
const upload = multer({ storage });

module.exports = upload;
