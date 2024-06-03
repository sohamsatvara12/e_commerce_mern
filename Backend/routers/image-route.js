const express = require('express');
const router = express.Router();
const fileController = require('../controllers/image-controller');
const upload = require('../middlewares/upload'); 

// Upload file
router.post('/upload', upload.single('file'), fileController.uploadFile);

// Get file by category and image name
router.get('/show/:category/:imgName', fileController.getFileByCategoryAndName);

// Get file by filename
router.get('/:filename', fileController.getFileByName);

// Update file by filename
router.put('/:filename', upload.single('file'), fileController.updateFileByName);

// Delete file by filename
router.delete('/:filename', fileController.deleteFileByName);

module.exports = router;
