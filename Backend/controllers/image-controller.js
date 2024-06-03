const fs = require('fs-extra');
const path = require('path');
const upload = require('../middlewares/upload'); // Assuming upload configuration is in a separate file

// Upload file
exports.uploadFile = (req, res) => {
    const { category, image_name } = req.body;

    if (!category || !image_name || !req.file) {
        return res.status(400).send('Category, image_name, or file not provided.');
    }

    const filepath = path.join(__dirname, '../uploads', `${category}s`, image_name);

    fs.move(req.file.path, filepath, { overwrite: true }, err => {
        if (err) {
            console.error('Error moving file:', err);
            return res.status(500).send('Failed to save file.');
        }

        res.status(201).send({ message: 'File uploaded successfully', filename: req.file.filename });
    });
};

// Get file by category and image name
exports.getFileByCategoryAndName = (req, res) => {
    const filepath = path.join(__dirname, '../uploads', req.params.category, req.params.imgName);
    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        res.status(404).send('File not found');
    }
};

// Get file by filename
exports.getFileByName = (req, res) => {
    const filepath = path.join(__dirname, '../uploads', req.params.filename);
    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        res.status(404).send('File not found');
    }
};

// Update file by filename
exports.updateFileByName = (req, res) => {
    const oldFilepath = path.join(__dirname, '../uploads', req.params.filename);
    if (!fs.existsSync(oldFilepath)) {
        return res.status(404).send('File not found');
    }

    if (!req.file) {
        return res.status(400).send('No file uploaded or invalid file type.');
    }

    fs.removeSync(oldFilepath);
    res.status(200).send({ message: 'File updated successfully', filename: req.file.filename });
};

// Delete file by filename
exports.deleteFileByName = (req, res) => {
    const filepath = path.join(__dirname, '../uploads', req.params.filename);
    if (fs.existsSync(filepath)) {
        fs.removeSync(filepath);
        res.status(200).send('File deleted successfully');
    } else {
        res.status(404).send('File not found');
    }
};
