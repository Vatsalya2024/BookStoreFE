import React from "react";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-item">Home</div>
          <div className="sidebar-item">Orders</div>
          <div className="sidebar-item active">Profile</div>
          <div className="sidebar-item">Signout</div>
        </div>
      </div>
      <div className="content">
        <div className="profile-header">
          <img src="https://via.placeholder.com/100" alt="Profile" />
        </div>
        <form>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
