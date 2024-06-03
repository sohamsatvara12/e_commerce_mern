import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toast } from "react-toastify";
import AddressInputForm from "./AddressInputForm"; // Import the form component
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../store/store";
function AddressesList({
  addresses,
  setAddresses,
  onAddNewAddress,
  handleEditAddress,
  fetchAddresses,
  onSetDeliveryAddress
}) {

  const { setDeliveryAddress } = useAuth();

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  const handleAddressDelete = async (address) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/crud/address/${address.address_id}`
      );
      if (response.status === 200) {
        toast.success("Address deleted successfully");
        setAddresses(addresses.filter((addr) => addr.id !== address.id));
      } else {
        toast.error("Failed to delete address: " + address.address_id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetDeliveryAddress = async (address) => { 
    setDeliveryAddress(address);
    onSetDeliveryAddress();
  }

  useEffect(()=>{
    fetchAddresses()
  },[])



  return (
    <div className="p-2">
      <h2 className="py-1 rounded-md text-black font-semibold text-xl w-fit">
        Select Address
      </h2>

      {addresses.length > 0 ? (
        <ul className="flex flex-col">
          {addresses.map((address, index) => (
            <li
              key={index}
              className={`relative address-box border border-themeColor rounded-md mb-2 text-grey-500 p-2 ${
                selectedAddress === address ? "selected" : ""
              }`}
              onClick={() => handleAddressClick(address)}
            >
              <div className="flex items-center gap-2 absolute top-2 right-2">
                <button
                  className="text-base text-themeColor hover:text-gray-800"
                  onClick={() => handleEditAddress(address)}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button
                  className="text-base text-themeColor hover:text-red-500"
                  onClick={() => handleAddressDelete(address)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>

              <p className="mb-2 font-semibold">{address.receiver_name}</p>
              <p className="text-left text-sm">
                {address.building_name},&nbsp;
                {address.building_number},&nbsp;
                {address.building_address},&nbsp;
                {address.city},&nbsp;
                {address.state},&nbsp;
                {address.country},&nbsp;
                {address.landmark} -&nbsp;
                {address.pincode}
              </p>
              <p className="font-semibold">{address.receiver_phone}</p>
              <p
                className={`bg-themeColor py-1 px-2 text-sm text-white rounded-md w-fit transition-all duration-300 ${
                  address.isdefault ? "block" : "hidden"
                }`}
              >
                {address.isdefault ? "Default address" : ""}
              </p>

              {selectedAddress === address ? (
                <button onClick={() => handleSetDeliveryAddress((address))} className="mt-2 text-base bg-themeColor py-2 px-4 rounded-2xl text-white w-full border-2 hover:border-themeColor hover:bg-white hover:text-themeColor">
                  Deliver on this address
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="address mb-5">
          <h3>No Saved Address</h3>
        </div>
      )}

      <button
        onClick={onAddNewAddress}
        className="add-new-address-btn bg-themeColor py-2 px-4 rounded-2xl text-white w-full border-2 hover:border-themeColor hover:bg-white hover:text-themeColor"
      >
        Add New Address
      </button>

    </div>
  );
}

export default AddressesList;
