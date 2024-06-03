const { z } = require("zod");

const reviewSchema = z.object({
  userId: z.string().nonempty({ message: "User ID is required" }),
  vendorId: z.string().nonempty({ message: "Vendor ID is required" }),
  rating: z.number().int().min(1).max(5, { message: "Rating must be between 1 and 5" }),
  comment: z.string().min(1, { message: "Comment must not be empty" }).max(1000, { message: "Comment must not exceed 1000 characters" }),
});

module.exports = { reviewSchema };
