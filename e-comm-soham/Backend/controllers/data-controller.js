const pool = require('../db');
const { use } = require('../routes/authRoute');

const createProduct = async (req, res) => {
    try {
        const { name, price,image, category } = req.body;
        const query = "INSERT INTO products (name, price,image,category) VALUES ($1, $2, $3, $4) RETURNING *";
        const data = await pool.query(query, [name, price,image, category]);
        res.status(201).json(data.rows[0]);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const query = "SELECT * FROM products WHERE id = $1";
        const data = await pool.query(query, [productId]);
        if (data.rows.length > 0) {
            res.status(200).json(data.rows[0]);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const getProducts = async (req, res) => {
    try {
        const query = "SELECT * FROM products";
        const data = await pool.query(query);
        if (data.rows.length > 0) {
            res.status(200).json(data.rows);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getShortlistedProducts = async (req, res) => {
    try {
        const productIds = req.params.productIds.split(',');
        const query = `SELECT * FROM products WHERE id IN (${productIds.map((_, index) => `$${index + 1}`).join(',')})`;
        const data = await pool.query(query, productIds);
        res.status(200).json(data.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { name, price } = req.body;
        const query = "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *";
        const data = await pool.query(query, [name, price, productId]);
        if (data.rows.length > 0) {
            res.status(200).json(data.rows[0]);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const query = "DELETE FROM products WHERE id = $1 RETURNING *";
        const data = await pool.query(query, [productId]);
        if (data.rows.length > 0) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const showCart = async (req, res) => {
    try {
        const userId = req.params.userId;

        const query = "SELECT products FROM shortlisted_products WHERE user_id = $1";
        const data = await pool.query(query, [userId]); 
        if (data.rows.length > 0) {
            res.status(200).json(data.rows);
        } else {
            res.status(404).json({ message: "Cart is empty..." });
        }
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAddressesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const query = "SELECT addresses FROM addresses WHERE user_id = $1";
        const data = await pool.query(query, [userId]);
        if (data.rows.length > 0) {
            res.status(200).json({ addresses: data.rows }); // Send addresses in JSON format
        } else {
            res.status(404).json({ message: "Addresses not found" });
        }
    } catch (error) {
        console.error("Error getting Addresses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// const addProductToCart = async (req, res) => {
//     try {
//         const { userId, productId } = req.body;
//         const checkUserExistQuery = "SELECT products FROM shortlisted_products WHERE user_id = $1";
//         const shortlistedProductsResult = await pool.query(checkUserExistQuery, [userId]);

//         if (shortlistedProductsResult.rows.length > 0) {
//             const products = shortlistedProductsResult.rows[0].products;
//             const productExists = products.some(product => product.product_id === productId);

//             if (productExists) {
//                 res.status(200).json({ message: "Product is already in the cart" });
//             } else {
//                 products.push({ "product_id" : productId, product_quantity: 1 });
//                 const updateQuery = "UPDATE shortlisted_products SET products = $1 WHERE user_id = $2";
//                 await pool.query(updateQuery, [JSON.stringify(products), userId]);
//                 res.status(200).json({ message: "Product added to cart successfully" });
//             }
//         } else {
//             const insertQuery = "INSERT INTO shortlisted_products (user_id, products) VALUES ($1, $2)";
//             const newProducts = [{ "product_id":productId, product_quantity: 1 }];
//             await pool.query(insertQuery, [userId, JSON.stringify(newProducts)]);
//             res.status(200).json({ message: "Product added to cart successfully" });
//         }
//     } catch (error) {
//         console.error("Error adding product:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// const updateProductQuantity = async (req, res) => {
//     try {
//         const { userId, productId, action } = req.body;

//         const checkUserExistQuery = "SELECT products FROM shortlisted_products WHERE user_id = $1";
//         const userShortlistedProducts = await pool.query(checkUserExistQuery, [userId]);

//         if (userShortlistedProducts.rows.length > 0) {
//             let products = userShortlistedProducts.rows[0].products || [];
//             let productFound = false;
//             products = products.map((product) => {
//                 if (product.product_id === productId) {
//                     productFound = true;
                
//                     if (action === "increment") {
//                         product.product_quantity += 1;
//                         console.log('increment product quantity');
//                     } else if (action === "decrement") {
//                         product.product_quantity -= 1;
//                         console.log('decrement product quantity');
//                         if (product.product_quantity <= 0) {
//                             console.log('removed product quantity');
//                             return null; 
//                         }
//                     }
//                 }
//                 return product;
//             }).filter(product => product !== null); 

//             if (!productFound) {
//                 return res.status(404).json({ message: "Product not found in the cart." });
//             }

//             const updateQuery = "UPDATE shortlisted_products SET products = $1 WHERE user_id = $2";
//             await pool.query(updateQuery, [JSON.stringify(products), userId]);

//             res.status(200).json({ message: "Product quantity updated successfully" });
//         } else {
//             res.status(404).json({ message: "User not found or no products in the cart." });
//         }
//     } catch (error) {
//         console.error("Error updating product quantity:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };


// const decreamentProductQuanity = async (req, res) =>{

// }

// const removeProductFromCart = async (req, res) =>{

// }


// const fetchShortlistedProducts = async (req, res) => {
//     const { userId } = req.query;
  
//     if (!userId) {
//       return res.status(400).json({ error: 'User ID is required' });
//     }
  
//     try {
//       const result = await pool.query(
//         'SELECT products FROM shortlisted_products WHERE user_id = $1',
//         [userId]
//       );
  
//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: 'No shortlisted products found for this user' });
//       }
  
//       const products = result.rows[0].products;
  
//       res.status(200).json(products);
//     } catch (error) {
//       console.error('Error fetching quantities:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
  
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    getShortlistedProducts,
    updateProduct,
    deleteProduct,

    
    showCart,
    // productsWithQuantity,
    // addProductToCart,
    // updateProductQuantity,
    // decreamentProductQuanity,
    // removeProductFromCart,
    // fetchShortlistedProducts,

    getAddressesByUser
};
