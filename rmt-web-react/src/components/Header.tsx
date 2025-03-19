// Header.tsx
import React from "react";
import "../CSS/header.css";

const Header = () => {
  return (
    <div className="header">
      <h1>Dashboard</h1>
      <div className="user-info">
        <span>Welcome, User</span>
      </div>
    </div>
  );
};

export default Header;
