const { z } = require("zod");


const feedbackSchema = z.object({
  sender: z
    .string({ required_error: "Sender name is required" })
    .trim()
    .min(3, { message: "Sender name must be at least 3 characters" })
    .max(255, { message: "Sender name must not exceed 255 characters" }),
  sender_email: z
    .string({ required_error: "Sender email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Sender email must be at least 3 characters" })
    .max(255, { message: "Sender email must not exceed 255 characters" }),
  content: z
    .string({ required_error: "Message content is required" })
    .trim()
    .min(1, { message: "Message must not be empty" })
    .max(1000, { message: "Message must not exceed 1000 characters" }),
});

module.exports = {feedbackSchema};
