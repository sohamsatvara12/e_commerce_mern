// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../store/store';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// import { Link } from "react-router-dom";
// import "../css/cart.css";

// export default function OrderReview() {
//     const { token,addProductToShortlist, increaseProductQuantity, decreaseProductQuantity, shortlistedProducts } = useAuth();
//     const [cartProducts, setCartProducts] = useState([]);
    

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const productIds = shortlistedProducts.map(product => product.product_id);
//                 const response = await axios.get(`http://localhost:8080/api/data/products/${productIds.join(',')}`);
//                 if (response.data) {
//                     setCartProducts(response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         if (shortlistedProducts.length > 0) {
//             fetchProducts();
//         }
//     }, [shortlistedProducts]);

//     useEffect(() => {
//         // Calculate total price whenever cartProducts or shortlistedProducts change
//         let totalPrice = 0;
//         for (const product of shortlistedProducts) {
//             const cartProduct = cartProducts.find(
//                 cartProduct => cartProduct.id === product.product_id
//             );
//             const price = cartProduct ? cartProduct.price : 0;
//             totalPrice += price * product.product_quantity;
//         }
//         setTotalPrice(totalPrice);
//     }, [cartProducts, shortlistedProducts]);
    
//     const addToCart = (product) => {
//         addProductToShortlist(product);
//     };

//     const increaseQuantity = (product) => {
//         increaseProductQuantity(product);
//     };

//     const decreaseQuantity = (product) => {
//         decreaseProductQuantity(product);
//     };

//     const renderQuantityControls = (product) => {
//         const shortlistedProduct = shortlistedProducts.find(sp => sp.product_id === product.id);
//         const quantity = shortlistedProduct ? shortlistedProduct.product_quantity : 0;

//         return (
//             <div className="cartBtn flex w-full justify-evenly items-center">
//                 {quantity > 0 ? (
//                     <>
//                         <FontAwesomeIcon icon={faMinus} className='cart-icon' onClick={() => decreaseQuantity(product)} />
//                         <h2 className='text-[16px]'>{quantity}</h2>
//                         <FontAwesomeIcon icon={faPlus} className='cart-icon' onClick={() => increaseQuantity(product)} />
//                     </>
//                 ) : (
//                     <button className="add-cart-btn w-full color-black" onClick={() => addToCart(product)}>Add to cart</button>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <div className='page-width'>
//             <h2>My Cart</h2>

//             <div className="cart-container flex">
//                 <div className="cart-content">
//                     {cartProducts.map((product, index) => (
//                         <div className="cart-product-card" key={index}>
//                             <img src={`images/products/${product.image}`} alt={product.name} className='product-image' />
//                             <div className="cart-item-content">
//                                 <h3>{product.name}</h3>
//                                 <h4>Price: ${product.price}</h4> {/* Display fetched price */}
//                                 <p>Description: {product.description}</p>
//                                 {renderQuantityControls(product)}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="cart-bill">
//                     <h2>Payment Details</h2>
//                     <div className="bill-content">
//                         Total Price: ${totalPrice.toFixed(2)} 
//                         <Link to={token ? "/order-delivery-details":"/login</div>"} className='block mt-10 bg-[#0078AD] rounded-2xl px-5 py-2 text-white'>{token ? "Place Order" : "Login First"}</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react'

function OrderReview() {
  return (
    <div>
      
    </div>
  )
}

export default OrderReview
