const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Define the vendor schema
const vendorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    minPrice: {
        type: Number,
        required: true
    },
    maxPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
    },
    logo: {
        type: String,
        required: false // Make the logo field optional
    },
    isVendor: {
        type: Boolean,
        default:true
    },
    tokens: [{
        type: String
    }]
});

// Hash the password before saving to the database
vendorSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Generate authentication token
vendorSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, "hdyeox78345jhsuywer845dhnm5478fcjh");
    this.tokens.push(token);
    await this.save();
    return token;
};

// Creating the Vendor model
const Vendor = model("Vendor", vendorSchema);

module.exports = Vendor;
