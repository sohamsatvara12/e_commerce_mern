import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../store/store";

function AddressInputForm({ isOpen, onClose, user_id, editAddress, isLoading, setIsLoading, fetchAddresses }) {
  const { setDeliveryAddress } = useAuth();
  
  const initialAddressState = {
    user_id: user_id,
    receiver_name: "",
    receiver_phone: "",
    building_name: "",
    building_number: "",
    building_address: "",
    city: "",
    state: "",
    country: "",
    landmark: "",
    pincode: "",
    isdefault: false,
  };

  const [address, setAddress] = useState(initialAddressState);

  useEffect(() => {
    if (editAddress) {
      setAddress(editAddress);
    } else {
      setAddress(initialAddressState);
    }
    return () => {
      setAddress(initialAddressState);
    };
  }, [editAddress, user_id]);


  const handleAddressChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAddress({
      ...address,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSaveAddress = async () => {
    try {
      console.log("Address sent:", address);
      let response;
      setIsLoading(true);
      if (editAddress) {
        response = await axios.put(
          `${process.env.REACT_APP_BACKEND_API}/crud/address/${address.address_id}`,
          address
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API}/crud/address`,
          address
        );
      }

      if (response.status === 200) {
        console.log("Address saved:", address);
        setDeliveryAddress(address);
        setIsLoading(false);
        toast.success(editAddress ? "Address updated" : "Address saved");
        fetchAddresses();
        onClose();
      } else {
        console.error("Error saving address:", response.data.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error saving address:", error);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setAddress({
      user_id: user_id,
      receiver_name: "",
      receiver_phone: "",
      building_name: "",
      building_number: "",
      building_address: "",
      city: "",
      state: "",
      country: "",
      landmark: "",
      pincode: "",
      isdefault: false,
    });
    onClose();
  };

  return (
    <div className="address-form flex flex-col gap-2 w-full h-full justify-between pointer-events-auto outline-0">
      <h2 className="rounded-md text-black font-semibold text-xl w-fit">{editAddress ? "Edit address" : "Add new address"}</h2>

      <input
        type="text"
        placeholder="Receiver's Name"
        value={address.receiver_name}
        name="receiver_name"
        onChange={handleAddressChange}
        className="address-input"
      />
      <input
        type="text"
        placeholder="Receiver's Phone"
        value={address.receiver_phone}
        name="receiver_phone"
        onChange={handleAddressChange}
        className="address-input"
      />
      <input
        type="text"
        placeholder="Building Name"
        value={address.building_name}
        name="building_name"
        onChange={handleAddressChange}
        className="address-input"
      />
      <input
        type="text"
        placeholder="Building Number"
        value={address.building_number}
        name="building_number"
        onChange={handleAddressChange}
        className="address-input"
      />
      <input
        type="text"
        placeholder="Building Address"
        value={address.building_address}
        name="building_address"
        onChange={handleAddressChange}
        className="address-input"
      />
      <input
        type="text"
        placeholder="City"
        value={address.city}
        name="city"
        onChange={handleAddressChange}
        className="address-input"
      />
      <input
        type="text"
        placeholder="State"
        value={address.state}
        name="state"
        onChange={handleAddressChange}
        className="address-input"
      />
      <input
        type="text"
        placeholder="Country"
        value={address.country}
        name="country"
        onChange={handleAddressChange}
        className="address-input"
      />
      <input
        type="text"
        placeholder="Landmark"
        value={address.landmark}
        name="landmark"
        onChange={handleAddressChange}
        className="address-input"
      />
      <input
        type="text"
        placeholder="Pincode"
        value={address.pincode}
        name="pincode"
        onChange={handleAddressChange}
        className="address-input"
      />

      <div className="flex items-center mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          name="isdefault"
          checked={address.isdefault}
          onChange={handleAddressChange}
          className="w-4 h-4 p-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-black">Make it my default address</label>
      </div>

      <button
        onClick={handleSaveAddress}
        className="save-address-btn bg-[#0078ad] px-2 py-2 text-white rounded-xl mt-5"
      >
        {editAddress ? "Update Address" : "Save address"}
      </button>
    </div>
  );
}

export default AddressInputForm;