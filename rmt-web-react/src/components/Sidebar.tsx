// Sidebar.tsx
import React from "react";
import "../CSS/sidebar.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header"></div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/create-patient">Create Patient</Link>
          </li>
          <li>
            <Link to="/patients">Patients List</Link>
          </li>
          <li>
            <Link to="/create-glove">Create Glove</Link>
          </li>
          <li>
            <Link to="/assign-glove">Assign Glove</Link>
          </li>
          <li>
            <Link to="/appointments">Appointments</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
