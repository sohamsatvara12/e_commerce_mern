const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

exports.register = async (req, res) => {
    try {
        const {name, email, password, phone, address } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (name,email, password, phone, address) VALUES ($1, $2, $3, $4,$5)";
        await pool.query(query, [name,email, hashedPassword, phone, address]);
        res.status(200).send("User registered successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getUser = async (req, res) => {
    try {
        const { email } = req.params.email;
        const query = "SELECT * FROM users WHERE email = $1";
        const data = await pool.query(query, [email]);
        res.send(data.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const query = "SELECT * FROM users WHERE email = $1";
        const data = await pool.query(query, [email]);
        if (data.rows.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        const user = data.rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: user.email }, 'hdyeox78345jhsuywer845dhnm5478fcjh', { expiresIn: '1h' });
        const updateTokenQuery = "UPDATE users SET token = $1 WHERE id = $2";
        await pool.query(updateTokenQuery, [token, user.id]);

        console.log("token : ", token);
        
        res.status(200).send({ message: "User authenticated", token, user });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};


exports.getUserByToken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).send({ message: "Authorization token missing" });
        }
        const decoded = jwt.verify(token, 'hdyeox78345jhsuywer845dhnm5478fcjh');
        const { email } = decoded;
        const query = "SELECT * FROM users WHERE email = $1";
        const data = await pool.query(query, [email]);
        if (data.rows.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(data.rows[0]);
    } catch (err) {
        console.error(err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: "Invalid token" });
        }
        res.status(500).send("Internal Server Error");
    }
};
