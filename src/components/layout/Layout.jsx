import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Sidebar isOpen={sidebarOpen} />
      <div className={`main-content ${!sidebarOpen ? 'full-width' : ''}`}>
        <div className="navbar-top">
          <button
            className="btn btn-link text-dark p-0"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FaBars size={24} />
          </button>
          <h5 className="mb-0 ms-3">BookShelf Management System</h5>
        </div>
        <div className="content-wrapper">
          <Outlet />
        </div>
        <footer className="footer">
          © 2025 BookShelf — Book Inventory Management System
        </footer>
      </div>
    </div>
  );
};

export default Layout;