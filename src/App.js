import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import LoginForm from "./Components/LoginForm/LoginForm";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Order from "./Components/Order/Order"; // Import the Order component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />{" "}
          {/* Add the Order route */}
          <Route path="/" element={<LoginForm />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
