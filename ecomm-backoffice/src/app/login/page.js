"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./Input";
import Button from "./Button";
import "@/css/login.css";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Correct import for useRouter
import axios from "axios";
import { toast } from "react-toastify";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log(formData);

    try {
      if (formData.email.trim() === "") {
        toast.error("Please enter your email");
        return false;
      }
      if (formData.password.trim() === "") {
        toast.error("Please enter your password");
        return false;
      }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, formData);
        if (response.status === 200) {
          toast.success("User logged in successfully");
          setFormData({
            email: "",
            password: "",
          });
          router.push('/dashboard');
        } else if (response.status === 404) {
          toast.error("User not found");
        }
  
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  }



  return (
    <div className="login-container bg-blue-900 h-screen w-screen flex">
      <div className="login-logo bg-white h-full w-1/2 flex justify-center items-center max-md:hidden">
        <img src="/images/login.svg" className="mx-auto" alt="Login" />
      </div>

      <div className="form-container w-1/2 flex flex-col justify-center items-center max-md:w-full max-md:mx-0 flex-1 max-sm:m-5 max-sm:p-0">
        <div className="sign-in-form bg-white rounded-lg font-bold text-3xl flex flex-col gap-5 items-center justify-center p-10 max-sm:p-3">
          <h2 className="title mb-4 text-blue-900 bg-white rounded-lg px-4 py-2 text-lg text-center">Welcome to <span className="max-md:block"> Admin Dashboard</span></h2>
          <Input
            type="email"
            placeholder="Email"
            icon={faEnvelope}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            placeholder="Password"
            icon={faKey}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            value="Login"
            className="login-btn solid"
            color="white"
            bgColor="blue-900"
            onClickFunction={handleFormSubmit} 
          />
        </div>
      </div>
    </div>

    
  );
}

export default Login;
