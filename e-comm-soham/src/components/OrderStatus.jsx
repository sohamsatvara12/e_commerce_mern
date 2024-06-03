import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function OrderStatus() {
  const [paymentStatus, setPaymentStatus] = useState(false);
  const { order_id } = useParams(); // Extract order_id from the URL path

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        if (window.location.href.includes('success')) {
          setPaymentStatus(true);
          const response = await axios.put(`${process.env.REACT_APP_BACKEND_API}/crud/checkout/${order_id}`, { paymentStatus: true });
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error updating payment status:', error);
      }
    };

    fetchPaymentStatus();
  }, [order_id]); // Include order_id in the dependency array to re-run effect when it changes

  return (
    <div className='p-8  '>
      {paymentStatus ? <h2 className='underline underline-offset-2 text-themeColor mb-20'>Your payment is successful</h2> : <h2>Your payment is cancelled</h2>}
      <Link to='/' className='bg-themeColor p-4 mt-10 text-whiet rounded-3xl text-white'>Go Back to Home Page</Link>
    </div>
  );
}

export default OrderStatus;
