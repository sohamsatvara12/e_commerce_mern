import React , {useEffect} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping , faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../store/store"
function Header() {

  const {token,shortlistedProducts} = useAuth();

  return (
    
    <header className="header  bg-[#0078AD] text-white">
      <div className="page-width">
        <div className="header-inner flex justify-between items-center py-5">

      <div className="logo header-left w-25">
        <Link to="/">
          <img src="/images/header-jiomart-logo.svg" alt="" />
        </Link>
      </div>
      <div className="header-right flex gap-10">

        <Link to="/cart">Cart({shortlistedProducts.length})</Link>
        <Link to={token ? "/logout" : "/login"}>{token ? "Logout" : "Login"}</Link>
      </div>
      </div>

    </div>
    </header>

  );
}

export default Header;
