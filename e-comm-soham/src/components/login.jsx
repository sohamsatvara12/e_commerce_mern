import React, { useState } from "react";
import SectionHeading from "./subComponents/SectionHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../css/form.css";
import { useAuth } from "../store/store"; 

function Login() {
  const navigate = useNavigate();
  const { setTokenInLS, setUser } = useAuth(); 
  const [passwordDisplay, setPasswordDisplay] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    console.log(loginForm);
    try {
      if (isValid()) {

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/login`, loginForm);
        if (response.status === 200) {
          const { token, user } = response.data;
          setTokenInLS(token);
          localStorage.setItem("user", JSON.stringify({ id: user.id, name: user.name, token: token }));
          const storedUser = JSON.parse(localStorage.getItem("user"));
          setUser(storedUser);
        
          toast.success("User logged in successfully");
          setLoginForm({
            email: "",
            password: "",
          });
          navigate("/");
        } else if(response.status === 404){
          toast.error("User not found");
        }
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  function isValid() {
    const validEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
    if (loginForm.email === "") {
      toast.error("Email is required");
      return false;
    } else if (!validEmail.test(loginForm.email)) {
      toast.error("Invalid Email");
      return false;
    }

    const validPassword = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
    if (loginForm.password === "") {
      toast.error("Password is required");
      return false;
    } else if (!validPassword.test(loginForm.password)) {
      toast.error("Invalid Password");
      return false;
    }
    return true;
  }

  return (
    <div className="page-width">
      <div className="flex flex-col items-center">
        <SectionHeading innerContent="login" outerContent="here" />

        <form className="form max-w-sm mx-auto flex flex-col" onSubmit={handleLoginFormSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              className="!bg-white !text-[#0078AD] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
              placeholder="name@flowbite.com"
              value={loginForm.email}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <div className="password-container">
              <input
                type={passwordDisplay ? "text" : "password"}
                name="password"
                className="!bg-white !text-[#0078AD] border border-gray-300 text-sm rounded-lg p-2.5 w-full"
                value={loginForm.password}
                onChange={handleFormChange}
                required
              />
              <FontAwesomeIcon
                icon={passwordDisplay ? faEyeSlash : faEye}
                className="password-display-toggler"
                onClick={() => setPasswordDisplay(!passwordDisplay)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mx-auto !text-[#0078AD] !bg-white block rounded-lg py-1.5 px-2.5"
          >
            Submit
          </button>
        </form>

        <Link to="/register" className="mt-5">
          Not part of our family?
          <span className="underline text-black rounded-md px-3 py-2 ml-2 hover:bg-[#0078AD] hover:text-white">
            Register Here
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
