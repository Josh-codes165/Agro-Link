import { useState } from "react";
import { Menu, X } from "lucide-react";

import FarmerSidebar from "../components/FarmerSidebar";

import "./FarmerLayout.css";

function FarmerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function openSidebar() {
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="farmer-layout">
      {/* Mobile Header */}
      <header className="mobile-header">
        <button
          type="button"
          className="mobile-sidebar-button"
          onClick={openSidebar}
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>

        <div className="mobile-logo">Ubani</div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <div
        className={`farmer-sidebar-container ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <button
          type="button"
          className="mobile-close-button"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>

        <FarmerSidebar />
      </div>

      {/* Main Content */}
      <main className="farmer-main">{children}</main>
    </div>
  );
}

export default FarmerLayout;
