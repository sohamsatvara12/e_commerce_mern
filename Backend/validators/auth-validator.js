const { z } = require("zod");

// Creating an object schema
const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  mobile: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
  password: z
    .string({ message: "Password is required" })
    .min(7, { message: "Password must be at least of 6 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});


const vendorRegisterSchema = registerSchema.extend({
  minPrice: z
    .string({ required_error: "Minimum Price is required" })
    .min(1, { message: "Minimum Price must be at least 1 character" })
    .max(255, { message: "Minimum Price must not be more than 255 characters" }),
  maxPrice: z
    .string({ required_error: "Maximum Price is required" })
    .min(1, { message: "Maximum Price must be at least 1 character" })
    .max(255, { message: "Maximum Price must not be more than 255 characters" }),
  address: z
    .string({ required_error: "Address is required" })
    .min(3, { message: "Address must be at least of 3 characters" })
    .max(255, { message: "Address must not be more than 255 characters" }),
  city: z
    .string({ required_error: "City is required" })
    .min(3, { message: "City must be at least of 3 characters" })
    .max(255, { message: "City must not be more than 255 characters" }),
  category: z
    .string({ required_error: "Category is required" })
    .min(3, { message: "Select category" })
    .max(255, { message: "Category must not be more than 255 characters" }),

});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least of 6 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});
const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  otp: z
    .string({ required_error: "OTP is required" })
    .trim()
    .min(6, { message: "OTP must be at least of 6 characters" })
    .max(6, { message: "OTP must not be more than 6 characters" }),
  newPassword: z
    .string({ required_error: "New Password is required" })
    .min(7, { message: "New Password must be at least of 6 characters" })
    .max(1024, "New Password can't be greater than 1024 characters"),
});

module.exports = {registerSchema, vendorRegisterSchema,loginSchema , forgotPasswordSchema}; 
