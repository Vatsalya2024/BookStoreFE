import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = sessionStorage.getItem("token");
      const username = sessionStorage.getItem("username");

      if (!token || !username) {
        // Redirect to login if no token or username is found
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("https://localhost:7246/api/User", {
          method: "GET",
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const loggedInUser = data.find((user) => user.username === username);
          if (loggedInUser) {
            setUserInfo({
              username: loggedInUser.username,
              email: loggedInUser.email,
            });
          } else {
            console.error("Logged-in user not found");
          }
        } else {
          console.error(`Failed to fetch user info: ${response.status}`);
        }
      } catch (error) {
        console.error("An error occurred while fetching user info", error);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleSignout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-item" onClick={() => navigate("/home")}>
            Home
          </div>
          <div className="sidebar-item">Orders</div>
          <div className="sidebar-item active">Profile</div>
          <div className="sidebar-item" onClick={handleSignout}>
            Signout
          </div>
        </div>
      </div>
      <div className="content">
        <div className="profile-header">
          <img src="https://via.placeholder.com/100" alt="Profile" />
        </div>
        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userInfo.username}
              readOnly
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
