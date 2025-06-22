// Layout.tsx
import React from "react";
import Sidebar from "./Sidebar"; // Import Sidebar component
import Header from "./Header"; // Import Header component
import "../CSS/layout.css"; // Import CSS for layout styling
import { Outlet } from "react-router-dom"; // Outlet is used to render child routes

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <div className="layout-body">
        <aside>
          <Sidebar />
        </aside>
        <main>
          <Outlet /> {/* The child route components will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
