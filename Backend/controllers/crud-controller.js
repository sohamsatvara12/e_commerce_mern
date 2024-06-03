const multer = require('multer');
const path = require('path');
const multiparty = require('multiparty');
const pool = require('../db/conn');
const e = require('express');
const stripe = require('stripe')(process.env.STRIPE_SK);
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { category, name } = req.body;
    const uploadPath = path.join(__dirname, '../uploads', 'products', category, name);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});


const upload = multer({ storage });

const addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const images = req.files.map(file => path.relative(__dirname, file.path));
    console.log('images:', images);

    const query = 'INSERT INTO products (name, price, images, category) VALUES ($1, $2, $3, $4) RETURNING *';
    const data = await pool.query(query, [name, price, JSON.stringify(images), category]);

    console.log('saved data:', data.rows[0]);
    return res.status(200).json({ message: "Product added successfully", data: data.rows[0] });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const uploadImages = async (req, res) => {
  try {
    upload.single('images')(req, res, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ message: 'Failed to upload file' });
      }
      console.log("File uploaded successfully:", req.file); 
      return res.status(200).json({ message: 'Image added successfully' });
    });
  } catch (err) {
    console.error("Error uploading files:", err);
    res.status(500).json({ message: 'Failed to upload files' });
  }
};


  const addCategory = async (req, res) => {
      try {
        const { name ,parent} = req.body;
          const query = 'INSERT INTO categories(name,parent) VALUES($1,$2) RETURNING *';
          const data = await pool.query(query, [name, parent]);
          return res.status(200).json({"message":"category added successfully" , "data": data.rows[0]});
      } catch (err) {
          console.error(err);
          throw new Error('Failed to add category');
      }
  };
  const addAddress = async (req, res) => {
    try {
      const { user_id, receiver_name, receiver_phone, building_name, building_number, building_address, city, state, country, landmark, pincode, isdefault } = req.body;
      
      if (isdefault) {
    
        const updateQuery = 'UPDATE addresses SET isdefault = false WHERE user_id = $1 AND isdefault = true RETURNING *';
        await pool.query(updateQuery, [user_id]);
      }
  
      const insertQuery = 'INSERT INTO addresses (user_id, receiver_name, receiver_phone, building_name, building_number, building_address, city, state, country, landmark, pincode, isdefault) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
      const data = await pool.query(insertQuery, [user_id, receiver_name, receiver_phone, building_name, building_number, building_address, city, state, country, landmark, pincode, isdefault]);
      
      return res.status(200).json({ "message": "Address added successfully", "data": data.rows[0] });
    } catch (error) {
      console.error("Error adding address:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  


const handleOrderCheckout = async  (req, res, next) => { 
  try {
    const { address_id, products ,user_id} = req.body;
    console.log(address_id, products, user_id)

    const address_fetch_query = "SELECT * FROM addresses WHERE address_id=$1";
    const address_data = await pool.query(address_fetch_query, [address_id]); 
    console.log(address_id, address_data.rows);

    let productsInfo = [];

    for (const product of products) {
      const product_fetch_query = "SELECT * FROM products WHERE id=$1";
      const product_data = await pool.query(product_fetch_query, [product.product_id]);
      
      if (product_data.rows.length > 0) { 
        productsInfo.push({
          id: product_data.rows[0].id,
          name: product_data.rows[0].name,
          price: product_data.rows[0].price,
          quantity: product.product_quantity
        });
      } else {
        console.log(`Product with id ${product.product_id} not found`);
      }
    }

    const order_insert_query = "INSERT INTO orders (user_id, address_id, products) VALUES ($1, $2, $3) RETURNING *";
    const order_data = await pool.query(order_insert_query, [user_id, address_data.rows[0].address_id, JSON.stringify(productsInfo)]);
     console.log(order_data.rows[0]);

  // Create Stripe checkout session
const session = await stripe.checkout.sessions.create({
  success_url: process.env.FRONTEND_URL + '/cart/success/' + order_data.rows[0].id,
  cancel_url: process.env.FRONTEND_URL + '/cart/cancel/' + order_data.rows[0].id,
  customer_email: "sohamsatvara123@gmail.com",
  mode: 'payment',
  line_items: productsInfo.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name
      },
      unit_amount: item.price * 100, 
    },
    quantity: item.quantity
  })),
  metadata: {
    order_id: order_data.rows[0].order_id
  }
});
    return res.status(200).json({payment_url:session.url, order_id:order_data.rows[0].order_id})
  } catch (error){
    console.error("Error handling order checkout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
//read
const getCategory = async (req, res) => {
  try {
        const categoryId = req.body.categoryId;
        const query = 'SELECT * FROM categories where id = $(1)';
        const data = await pool.query(query, [categoryId]);
        return data.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch category');
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


const getCategories = async (req, res) => {
  try {

        const query = 'SELECT * FROM categories';
        const data = await pool.query(query);

        return res.status(200).json({"message":"categories list" , "category_list": data.rows});
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch category');
    }
};
  
const getProducts = async (req, res) => {
  try {
      const query = "SELECT * FROM products";
      const data = await pool.query(query);
      if (data.rows.length > 0) {
        return res.status(200).json({"message":"product list" , "product_list": data.rows});
      } else {
          res.status(404).json({ message: "Products not found" });
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
      console.log(data);
      res.status(200).json(data.rows);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}
const getAddresses = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const query = "SELECT * FROM addresses WHERE user_id = $1";
    const data = await pool.query(query, [user_id]);
    if (data.rows.length > 0) {
      res.status(200).json({ message: "Addresses list" , addresses: data.rows });
    } else {
      res.status(404).json({ message: "Addresses not found" });
    }
  } catch (error) {
    console.error("Error getting Addresses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





//update
  const updateCategory = async (req, res) => {
    try {
      const { name, parent } = req.body;
      const { categoryId } = req.params;
  
      const query = 'UPDATE categories SET name = $1, parent = $2 WHERE id = $3';
      await pool.query(query, [name, parent, categoryId]);
  
      return res.status(200).json({ message: "Category updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update category' });
    }
  };
  const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { name, price, category } = req.body;
        const images = req.files.map(file => path.relative(__dirname, file.path));
        console.log('images:', images);
        const query = "UPDATE products SET name = $1, price = $2, images = $3, category = $4 WHERE id = $5 RETURNING *";
        const data = await pool.query(query, [name, price, image, category,  productId]);
        if (data.rows.length > 0) {
          return res.status(200).json({ message: "Product updated successfully" , data: data.rows[0] });

        } else {
            res.status(404).json({ message: "Product not updated" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const updateAddress = async (req, res) => {
  try {
    const address_id = req.params.address_id;
    const { user_id, receiver_name, receiver_phone, building_name, building_number, building_address, city, state, country, landmark, pincode, isdefault } = req.body;

    if (isdefault) {
      const updateQuery = 'UPDATE addresses SET isdefault = false WHERE user_id = $1 AND isdefault = true';
      await pool.query(updateQuery, [user_id]);
    }

    const query = `
      UPDATE addresses
      SET receiver_name = $1, receiver_phone = $2, building_name = $3, building_number = $4, building_address = $5,
          city = $6, state = $7, country = $8, landmark = $9, pincode = $10, isdefault = $11
      WHERE address_id = $12
      RETURNING *`;
    const data = await pool.query(query, [receiver_name, receiver_phone, building_name, building_number, building_address, city, state, country, landmark, pincode, isdefault, address_id]);

    if (data.rows.length > 0) {
      return res.status(200).json({ message: "Address updated successfully", data: data.rows[0] });
    } else {
      return res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateOrderPaymentStatus = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    console.log('order_id');
    const { paymentStatus } = req.body;
    const query = "UPDATE orders SET payment_status = $1 WHERE id = $2";
    await pool.query(query, [paymentStatus, order_id]);
    console.log({ message: "Payment status updated successfully" });
    return res.status(200).json({ message: "Payment status updated successfully" });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return res.status(500).json({ message: "Internal Server Error"});
  }
};




//delete
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const query = 'DELETE FROM categories WHERE id = $1';
    await pool.query(query, [categoryId]);
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete category' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const query = "DELETE FROM products WHERE id = $1";
    const data = await pool.query(query, [productId]);

    if (data.rowCount > 0) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.address_id;
    const query = "DELETE FROM addresses WHERE address_id = $1";
    const data = await pool.query(query, [addressId]);
    if (data.rowCount > 0) {
      return res.status(200).json({ message: "Address deleted successfully" });
    } else {
      return res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





module.exports = {

    getProducts,
    getCategories,

    getCategory,
    getProduct,
    getShortlistedProducts,
    getAddresses,

    addProduct,
    addCategory,
    uploadImages,
    addAddress,
    handleOrderCheckout,

    deleteCategory,
    deleteProduct,
    deleteAddress,

    updateCategory,
    updateProduct,
    updateAddress,
    updateOrderPaymentStatus,

    upload

  }