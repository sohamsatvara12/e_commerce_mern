// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const express = require('express');
const router = express.Router();

const { register, adminRegister, login, user, sendOTP, verifyOTP, resetPassword } = require('../controllers/auth-controller');

// Routes
router.post('/register', register);
router.post('/admin', adminRegister);
router.post('/login', login);
router.get('/user', user);
router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);
router.post('/resetPassword', resetPassword);

module.exports = router;
