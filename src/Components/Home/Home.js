import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "../Profile/Profile.css"; // Import the CSS for the sidebar

function Home() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(sessionStorage.getItem("cart")) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://localhost:7246/api/Book", {
          method: "GET",
          headers: {
            accept: "text/plain",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error("Failed to fetch books");
        }
      } catch (error) {
        console.error("An error occurred while fetching books", error);
      }
    };

    fetchBooks();
  }, []);

  const addToCart = (book) => {
    const updatedCart = [...cart, book];
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-content">
          <div
            className="sidebar-item active"
            onClick={() => navigate("/home")}
          >
            Home
          </div>
          <div className="sidebar-item" onClick={() => navigate("/cart")}>
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
        <h1>Books</h1>
        <div className="book-list">
          {books.map((book) => (
            <div key={book.bookId} className="book-item">
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <p>{book.description}</p>
              <p>Price: ${book.price}</p>
              <button onClick={() => addToCart(book)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
