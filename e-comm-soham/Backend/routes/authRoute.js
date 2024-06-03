const express = require("express");
const router = express.Router();
const {register , login , getUser , getUserByToken} = require("../controllers/auth-controller.js");

router.post("/register",register);
router.post("/login", login);
router.get("/user", getUser); 
router.get("/profile", getUserByToken); 

module.exports = router;
