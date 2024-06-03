'use client';


import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faStore } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

import Loader from "@/components/Loader"; 

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(false);
  const loading = useSelector((state) => state.loading.value);

  return (
    <html lang="en">
      <body>
        <div className={`bg-blue-900 min-h-screen ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex items-center">
            <button onClick={() => setShowNav(!showNav)}>
              <FontAwesomeIcon icon={faBars} className="w-5 text-white md:hidden flex justify-start p-4" />
            </button>
            <Link href="/dashboard" className="flex text-white items-center gap-3 md:hidden ">
              <FontAwesomeIcon icon={faStore} className=" text-white" />
              <span>ECommerce Admin</span>
            </Link>
          </div>
          <div className="flex">
            <Nav show={showNav} toggleNav={setShowNav} />
            <div className="bg-white flex-grow rounded-md max-sm:m-2 max-md:m-2 mt-2 mr-2 mb-2 p-4 w-screen h-screen max-md:p-2">
              {children}
            </div>
          </div>
        
          {loading && <Loader />} {/* Display Loader component based on loading state */}
        </div>
      </body>
    </html>
  );
};

export default Layout;
