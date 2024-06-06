import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || { cart: [] };

  const handleOrder = async () => {
    const userId = sessionStorage.getItem("userId"); // Get userId from session storage
    const totalAmount = cart.reduce((total, book) => total + book.price, 0);
    const orderDate = new Date().toISOString();
    const status = "Available";

    const requestBody = {
      userId,
      orderDate,
      totalAmount,
      status,
    };

    try {
      const response = await fetch("https://localhost:7246/api/Order", {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Order done");
        navigate("/home");
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("An error occurred while creating the order", error);
    }
  };

  return (
    <div className="order-container">
      <h1>Order Summary</h1>
      <div className="order-list">
        {cart.map((book) => (
          <div key={book.bookId} className="order-item">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>Price: ${book.price}</p>
          </div>
        ))}
      </div>
      <button onClick={handleOrder} className="order-btn">
        Order
      </button>
    </div>
  );
}

export default Order;
