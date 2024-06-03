const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getShortlistedProducts,
  showCart,
  // addProductToCart,
  // updateProductQuantity,
  // decreamentProductQuanity,
  // removeProductFromCart,
  // productsWithQuantity,

  // fetchShortlistedProducts,

  getAddressesByUser,
} = require("../controllers/data-controller.js");

router.post("/product/", createProduct);
router.get("/product/:productId", getProduct);
router.get("/products/", getProducts);
router.get("/products/:productIds", getShortlistedProducts);
router.put("/product/:productId", updateProduct);
router.delete("/product/:productId", deleteProduct);

// router.get("/shortlisted_products", fetchShortlistedProducts);
// router.get("/productsWithQuantities/:userId", productsWithQuantity);

// router.post("/cart/add", addProductToCart);
// router.put("/cart/update", updateProductQuantity);
// router.delete("/cart/remove", removeProductFromCart);
// router.get("/cart/:userId", showCart);


router.get("/addresses/:userId", getAddressesByUser);


module.exports = router;
