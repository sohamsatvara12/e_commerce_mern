import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AuthProvider } from './store/store'; 
import { useAuth } from './store/store'; 

import Header from "./components/Header.jsx";
import Login from "./components/login.jsx";
import Register from "./components/Register.jsx";
import HomePage from "./components/HomePage.jsx";
import Cart from "./components/Cart.jsx";
import OrderReview from "./components/OrderReview.jsx";
import Logout from "./components/subComponents/logout.jsx";
import Loader from "./components/subComponents/Loader.jsx"
import OrderStatus from "./components/OrderStatus.jsx";
function App() {

  const {isLoading}  = useAuth();
  return (


    <Router>
      <div className="app">

      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/:status/:order_id" element={<OrderStatus />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading ? <Loader /> : null}
      </div>
      

    </Router>

  );
}

export default App;
