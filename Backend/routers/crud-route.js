const express = require("express");
const router = express.Router();
const {
  getProducts,
  getCategories,
  addProduct,
  addCategory,
  uploadImages,
  deleteCategory,
  deleteProduct,
  updateCategory,
  updateProduct,
  getShortlistedProducts,
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
  handleOrderCheckout,
  updateOrderPaymentStatus,
  upload
} = require("../controllers/crud-controller");

// Create routes
router.post("/product", upload.array('images'), addProduct);
router.post("/upload", uploadImages);
// router.post('/upload', upload.array('files'), uploadImages);
router.post("/category", addCategory);
router.post("/address", addAddress);
router.post("/checkout", handleOrderCheckout);
router.put("/checkout/:order_id", updateOrderPaymentStatus);

// Delete routes
router.delete("/category/:categoryId", deleteCategory);
router.delete("/product/:productId", deleteProduct);
router.delete("/address/:address_id", deleteAddress);


// Read routes
router.get("/products", getProducts);
router.get("/addresses/:user_id", getAddresses);
router.get("/categories", getCategories);
router.get("/products/:productIds", getShortlistedProducts);

// Update routes
router.put("/category/:categoryId", updateCategory);
router.put("/product/:productId", updateProduct);
router.put("/address/:address_id", updateAddress);

module.exports = router;
