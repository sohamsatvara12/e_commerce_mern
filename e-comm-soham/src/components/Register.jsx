import React, { useState } from "react";
import SectionHeading from "./subComponents/SectionHeading";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../css/form.css";
import Label from "./subComponents/label"

function Register() {
  const navigate = useNavigate();
  const [RegisterForm, setRegisterForm] = useState({
    name:"",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    console.log(RegisterForm);
    if (isValid()) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/register`, RegisterForm);
        toast.success(response.data);
      } catch (error) {
        console.error("Error registering user:", error);
        toast.error("An error occurred while registering. Please try again later.");
        return false;
      }
    }
  };
  
  

  function isValid() {

    const validEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (RegisterForm.email === "") {
      toast.error("Email is required");
      return false;
    }else if(!validEmail.test(RegisterForm.email) ){
      toast.error("Invalid Email");
      return false;
    }

    const validPassword = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
    if (RegisterForm.password === "") {
      toast.error("Password is required");
      return false;
    }else if(!validPassword.test(RegisterForm.password)){
      toast.error("Invalid Password");
      return false;
    }

    const validPhone = /^\d{10}$/;
    if (RegisterForm.phone === "") {
      toast.error("Phone is required");
      return false;
    }else if(!validPhone.test(RegisterForm.phone)){
      toast.error("Invalid Phone Number");
      return false;
    }

    const validAddress = /^[a-zA-Z0-9 ]+$/;
    if (RegisterForm.address === "") {
      toast.error("Address is required");
      return false;
    }else if(!validAddress.test(RegisterForm.address)){
      toast.error("Invalid Address");
      return false;
    }
    return true;
  }

  return (
    <div className="flex flex-col items-center">
      <SectionHeading innerContent="Register" outerContent="here" />

      <form className="form max-w-sm mx-auto flex flex-col text-black" onSubmit={handleRegisterForm}>

        <div className="mb-5">
          <Label htmlFor="" labelContent="Your name" />
          <input
            type="name"
            id="name"
            className="!bg-white text-[#0078AD] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please enter your name"
            value={RegisterForm.name}
            onChange={(e) =>
              setRegisterForm({ ...RegisterForm, name: e.target.value })
            }
            
          />
        </div>
        <div className="mb-5">
          <Label htmlFor="email" labelContent="Your email" />
          <input
            type="email"
            id="email"
            className="!bg-white text-[#0078AD] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            value={RegisterForm.email}
            onChange={(e) =>
              setRegisterForm({ ...RegisterForm, email: e.target.value })
            }
            
          />
        </div>
        <div className="mb-5">
        <Label htmlFor="password" labelContent="Your password" />

          <input
            type="password"
            id="password"
            className="!bg-white text-[#0078AD] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={RegisterForm.password}
            onChange={(e) =>
              setRegisterForm({ ...RegisterForm, password: e.target.value })
            }
            
          />
        </div>
        <div className="mb-5">
        <Label htmlFor="phone" labelContent="Your phone" />
          <input
            type="text"
            id="phone"
            className="!bg-white text-[#0078AD] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={RegisterForm.phone}
            onChange={(e) =>
              setRegisterForm({ ...RegisterForm, phone: e.target.value })
            }
            maxLength={10}
            
          />
        </div>
        <div className="mb-5">
        <Label htmlFor="address" labelContent="Your address" />

          <input
            type="text"
            id="address"
            className="!bg-white text-[#0078AD] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={RegisterForm.address}
            onChange={(e) =>
              setRegisterForm({ ...RegisterForm, address: e.target.value })
            }
            
          />
        </div>

        <button
          type="submit"
          className="mx-auto !text-[#0078AD] !bg-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <Link to="/login" className="mt-5">
        Already registered ?
        <span className="underline text-black rounded-md px-3 py-2 ml-2 hover:bg-[#0078AD] hover:text-white">
          Login Here
        </span>
      </Link>
    </div>
  );
}

export default Register;
