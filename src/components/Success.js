import { useEffect } from "react";
import "./Success.css";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

function Success() {

  const navigate = useNavigate();
  
  useEffect(() => {
    const generateOrderHistory = async () => {
      const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
      const response = await fetch("http://localhost:4000/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: orderDetails.userEmail,
          productId: orderDetails.productId,
          paymentId: orderDetails.paymentId,
          paymentStatus: "success",
        }),
      });
      const data = await response.json();
      console.log(data);
      localStorage.removeItem("orderDetails");
    }
    generateOrderHistory();
  }, []);


  return (
    <div className="success-container">
      <img src="/Success-PNG-HD.png" alt="Success" className="success-image" />
      <h2 className="success-message text-white">Congratulations! Your payment was successful.</h2>
      <button type="submit" className="flex gap-3 mt-6 bg-white text-gray-700 py-2 px-10 text-center rounded-md hover:bg-white focus:outline-none focus:bg-blue-600"
        onClick={() => navigate('/displayUserProducts')}
      > 
        <span className="text-gray-700"><FontAwesomeIcon icon={faArrowLeft} className="h-6" /></span>
        Go Back
      </button>
    </div>
  );
}

export default Success;
