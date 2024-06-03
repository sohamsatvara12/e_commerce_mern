import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../store/store.js";
 
function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const {
    addProductToShortlist,
    increaseProductQuantity,
    decreaseProductQuantity,
    shortlistedProducts,
  } = useAuth();
 
  const addToCart = (product) => {
    addProductToShortlist(product);
  };
 
  const increaseQuantity = (product) => {
    increaseProductQuantity(product);
  };
 
  const decreaseQuantity = (product) => {
    decreaseProductQuantity(product);
  };
 
  const renderQuantityControls = (product) => {
    const shortlistedProduct = shortlistedProducts.find(
      (sp) => sp.product_id === product.id
    );
    const quantity = shortlistedProduct
      ? shortlistedProduct.product_quantity
      : 0;
 
    return (
      <div className="cartBtn flex w-full justify-evenly items-center">
        {quantity > 0 ? (
          <>
            <FontAwesomeIcon
              icon={faMinus}
              className="cart-icon"
              onClick={() => decreaseQuantity(product)}
            />
            <h2 className="text-[16px]">{quantity}</h2>
            <FontAwesomeIcon
              icon={faPlus}
              className="cart-icon"
              onClick={() => increaseQuantity(product)}
            />
          </>
        ) : (
          <button
            className="add-cart-btn w-full color-black"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        )}
      </div>
    );
  };
 
  return (
    <div className="product-card rounded-md border-2 " key={product._id}>
      <div className="product-card-image w-40 h-40">
        <img src={`${process.env.REACT_APP_BACKEND_API}/${product.images[0]}`} alt={product.name} />
      </div>
      <div className="product-card-content align-center w-full">
        <h3 className="text-center">{product.name}</h3>
        <h2 className="product-card-price text-center">{product.price}</h2>
        {renderQuantityControls(product)}
      </div>
    </div>
  );
}
 
export default ProductCard;
 