const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const pool = require('../db/conn');

let otpStore = {};


const verifyTokenAndGetUserData = (token) => {
  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};


const register = async (req, res) => {
 
  try {
    const { name, email, mobile, password } = req.body;

 
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const  role = 'user'

    await pool.query(
      'INSERT INTO users (name, email, mobile, password,role) VALUES ($1, $2, $3, $4, $5)',
      [name, email, mobile, hashedPassword, role]
    );

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
    });
    res.status(201).send({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } 
};


const adminRegister = async (req, res) => {

  try {
    const { name, email, mobile, password, minPrice, maxPrice, address, city, category } = req.body;

    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const logo = req.file ? req.file.filename : '';
    await pool.query(
      'INSERT INTO admins (name, email, mobile, password, min_price, max_price, address, city, category, logo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [name, email, mobile, hashedPassword, minPrice, maxPrice, address, city, category, logo]
    );

  
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
    });
    res.status(201).send({ message: 'admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } 
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    
    if (rows.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const user = rows[0];
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      console.log(token);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  } 
};


const user = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userData = verifyTokenAndGetUserData(token);
    res.status(200).json({ fetchedTokenData: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendOTP = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const { email } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;
    console.log("OTP:", otp);

    await transporter.sendMail({
      from: "YourApp",
      to: email,
      subject: "OTP for Password Reset",
      text: `Your OTP for password reset is: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (otpStore[email] && otpStore[email] == otp) {
      delete otpStore[email];
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {

  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } 
};

module.exports = { register, adminRegister, login, user, sendOTP, verifyOTP, resetPassword };
