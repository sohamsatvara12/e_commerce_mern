import React, { useEffect } from "react";
import { useAuth } from "../../store/store.js";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
   logout();
  }, []);

  return <Navigate to="/login" />;
};

export default Logout;
