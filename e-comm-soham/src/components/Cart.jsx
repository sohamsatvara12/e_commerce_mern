import React, { useEffect, useState } from "react";
import { useAuth } from "../store/store";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SectionHeading from "./subComponents/SectionHeading";
import "../css/cart.css";
import Modal from "./subComponents/Modal";
import AddressesList from "./subComponents/AddressesList";
import AddressInputForm from "./subComponents/AddressInputForm";

function Cart() {
  const {
    token,
    user,
    addProductToShortlist,
    increaseProductQuantity,
    decreaseProductQuantity,
    shortlistedProducts,
    isLoading,
    setIsLoading,
    deliveryAddress,
    setDeliveryAddress,
  } = useAuth();

  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [showAddressList, setShowAddressList] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [editAddress, setEditAddress] = useState(null);

  const handleEditAddress = (address) => {
    setEditAddress(address);
    setShowAddressForm(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productIds = shortlistedProducts.map(
          (product) => product.product_id
        );
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/crud/products/${productIds.join(
            ","
          )}`
        );
        console.log(response.data);
        if (response.data) {
          const updatedProducts = response.data.map((product) => ({
            ...product,
            totalPrice:
              product.price *
              shortlistedProducts.find((p) => p.product_id === product.id)
                .product_quantity,
            quantity: shortlistedProducts.find(
              (p) => p.product_id === product.id
            ).product_quantity,
          }));
          setCartProducts(updatedProducts);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    if (shortlistedProducts.length > 0) {
      fetchProducts();
    }
  }, [shortlistedProducts]);

  useEffect(() => {
    let totalPrice = 0;
    for (const product of shortlistedProducts) {
      const cartProduct = cartProducts.find(
        (cartProduct) => cartProduct.id === product.product_id
      );
      const price = cartProduct ? cartProduct.price : 0;
      totalPrice += price * product.product_quantity;
    }
    setTotalPrice(totalPrice);
  }, [cartProducts, shortlistedProducts]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/crud/addresses/${user.id}`
      );
      console.log("Addresses saved:", response.data.addresses);
      if (response.data && response.data.addresses) {
        setAddresses(response.data.addresses);
        return response.data.addresses;
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    const getAddresses = async () => {
      const fetchedAddresses = await fetchAddresses();

      if (fetchedAddresses && fetchedAddresses.length > 0) {
        const defaultAddress = fetchedAddresses.find(
          (address) => address.isdefault === true
        );
        if (!deliveryAddress) {
          setDeliveryAddress(defaultAddress);
        }
      }
    };

    getAddresses();
  }, []);

  const addToCart = (product) => {
    addProductToShortlist(product);
  };

  const increaseQuantity = (product) => {
    increaseProductQuantity(product);
  };

  const decreaseQuantity = (product) => {
    decreaseProductQuantity(product);
  };

  async function handleCheckout() {
    try {
      let products = [];
      for (const cartProduct of cartProducts) {
        products.push({
          product_id: cartProduct.id,
          product_quantity: cartProduct.quantity,
        });
      }

      let orderDetails = {
        user_id: user.id,
        products: products,
        address_id: deliveryAddress.address_id,
      };
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/crud/checkout`,
        orderDetails
      );
      if (response.status === 200) {
        console.log(response.data.payment_url);
        window.location.href = response.data.payment_url;
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);

    }
  }
  return (
    <section className="">
      <div className="page-width ">
        <div className="cart-inner flex  gap-10">
          <div className="cart-container flex flex-col justify-between flex-1 rounded-3xl   shadow-2xl p-4 h-full overflow-auto m-5">
            <h2 className="font-semibold text-3xl">Cart</h2>
            <div className="cart-content bg-white w-full">
              <ul>
                {cartProducts.length === 0 ? (
                  <h2 className="text-center text-2xl">Your cart is empty</h2>
                ) : (
                  <>
                    {cartProducts.map((product, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center  py-4 px-2  "
                      >
                        <div className="flex flex-col items-center w-1/5">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_API}/${product.images[0]}`} 
                            className="w-full h-auto"
                            alt={product.name}
                          />



                          <h3 className="text-center">{product.name}</h3>
                        </div>
                        <div className="w-1/3 flex justify-center items-center">
                          <div className="cartBtn flex w-full justify-evenly items-center">
                            <FontAwesomeIcon
                              icon={faMinus}
                              className="cart-icon"
                              onClick={() => decreaseQuantity(product)}
                            />
                            <h2 className="text-[16px]">{product.quantity}</h2>
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="cart-icon"
                              onClick={() => increaseQuantity(product)}
                            />
                          </div>
                        </div>
                        <div className="w-1/3 text-center">
                          <h4>Price: ${product.totalPrice.toFixed(2)}</h4>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="cart-bill flex-1 shadow-2xl rounded-3xl p-4  h-full  m-5 ">
            <SectionHeading
              innerContent="Payment Details"
              outerContent=""
              align="left"
            />
            <div className="bill-content">
              <h2>Total Price: ${totalPrice.toFixed(2)}</h2>

              {token ? (
                <>
                  <div className="delivery-address">
                    <div className="delivery-heading-container flex gap-2 items-center">
                      <SectionHeading
                        innerContent="Delivery Address"
                        align="left"
                      />
                      <FontAwesomeIcon
                        icon={faPencil}
                        className="circle-border text-themeColor"
                        onClick={() => setShowAddressList(true)}
                      />
                    </div>

                    <div className="addresses-container">
                      {deliveryAddress ? (
                        <div className="address">
                          <p>{deliveryAddress.receiver_name}</p>
                          <div className="text-left">
                            {deliveryAddress.building_name} &nbsp;
                            {deliveryAddress.building_number} &nbsp;
                            {deliveryAddress.building_address} &nbsp;
                            {deliveryAddress.city} &nbsp;
                            {deliveryAddress.state} &nbsp;
                            {deliveryAddress.country} &nbsp;
                            {deliveryAddress.landmark} &nbsp;
                            {deliveryAddress.pincode} &nbsp;
                          </div>

                          <p>Phone: {deliveryAddress.receiver_phone}</p>
                        </div>
                      ) : (
                        <div className="address">
                          <h3>No Saved Address</h3>
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    to={token ? "/cart" : "/login"}
                    className="block mt-10 bg-[#0078AD] rounded-2xl px-5 py-2 text-white"
                    onClick={handleCheckout}
                  >
                    Proceed for Payment
                  </Link>
                </>
              ) : (
                <Link
                  to={token ? "/order-review" : "/login"}
                  className="block mt-10 bg-[#0078AD] rounded-2xl px-5 py-2 text-white"
                >
                  Login First
                </Link>
              )}
            </div>
          </div>

          <Modal
            show={showAddressList}
            onClose={() => {
              setShowAddressList(false);
              setShowAddressForm(false);
              setEditAddress(null)
            }}
            opacity={50}
            position="right"
            popupClass="address_list_container"
          >
            <AddressesList
              fetchAddresses={fetchAddresses}
              addresses={addresses}
              setAddresses={setAddresses}
              onAddNewAddress={() => {
                setShowAddressForm(true);
              }}
              onSetDeliveryAddress={() => {
                setShowAddressList(false);
              }}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              setEditAddress={setEditAddress}
              handleEditAddress={handleEditAddress}
            />
          </Modal>

          <Modal
            show={showAddressForm}
            onClose={() => {
              setShowAddressForm(false);
              setShowAddressList(true);
              setEditAddress(null)
            }}
            position="right"
            opacity={60}
            popupClass="address_form_container"
          >
            <AddressInputForm
              onClose={() => {
                setShowAddressForm(false);
                setShowAddressList(true);
              }}
              editAddress={editAddress}
              user_id={user.id}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              fetchAddresses={fetchAddresses}
              showAddressForm={showAddressForm}
            />
          </Modal>
        </div>
      </div>
    </section>
  );
}

export default Cart;
