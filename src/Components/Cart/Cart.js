import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import "../Profile/Profile.css"; // Import the CSS for the sidebar

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (bookId) => {
    const updatedCart = cart.filter((book) => book.bookId !== bookId);
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuy = () => {
    navigate("/order", { state: { cart } });
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-item" onClick={() => navigate("/home")}>
            Home
          </div>
          <div
            className="sidebar-item active"
            onClick={() => navigate("/cart")}
          >
            Cart
          </div>
          <div className="sidebar-item" onClick={() => navigate("/profile")}>
            Profile
          </div>
          <div
            className="sidebar-item"
            onClick={() => {
              sessionStorage.clear();
              navigate("/login");
            }}
          >
            Signout
          </div>
        </div>
      </div>
      <div className="content">
        <h1>Cart</h1>
        <div className="cart-list">
          {cart.map((book) => (
            <div key={book.bookId} className="cart-item">
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <p>Price: ${book.price}</p>
              <button onClick={() => removeFromCart(book.bookId)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <button onClick={handleBuy} className="buy-btn">
          Buy
        </button>
      </div>
    </div>
  );
}

export default Cart;
