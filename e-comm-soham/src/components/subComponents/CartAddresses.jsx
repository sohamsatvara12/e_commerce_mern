import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


import SectionHeading from "./SectionHeading";
function CartAddresses({addresses, setAddresses}) {

  const [address, setAddress] = useState(null);
  const [showAddress, setShowAddress] = useState(false);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find(address => address.is_default === true);
      if (defaultAddress) {
        setAddress(defaultAddress);
        setShowAddress(true);
      }
    }
  }, [addresses]);

      function toggleAddAddressForm(){
        setShowAddress(!showAddress);
      }

  return (

<div className="delivery-address">
  <div className="delivery-heading-container flex gap-5 items-center">
  <SectionHeading innerContent="Delivery Address" align="left" />
  <FontAwesomeIcon icon={faPlus} className="circle-border" onClick={toggleAddAddressForm}/>
  </div>

<div className="addresses-container">
{/* {showAddress && address && ( */}
        <div className="address">
          <h3>Default Address:</h3>
          {/* <p>{address.receiver_name}</p>
          <p>{address.receiver_phone}</p>
          <p>{address.receiver_address}</p> */}
        </div>
      {/* )} */}
    </div>
  </div>

  )
}

export default CartAddresses;
