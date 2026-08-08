import { NavLink, Outlet } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiUsers,
  FiShoppingCart,
  FiMessageCircle,
  FiCreditCard,
  FiBarChart2,
  FiUser,
  FiSettings,
} from "react-icons/fi";

import "../styles/Dashboard.css";

function Layout() {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2 className="logo">UBANI</h2>

        <ul>

          <li>
            <NavLink to="/" className="nav-link">
              <FiHome />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/listings" className="nav-link">
              <FiGrid />
              <span>My Listings</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/buyer-requests" className="nav-link">
              <FiUsers />
              <span>Buyer Requests</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className="nav-link">
              <FiShoppingCart />
              <span>Orders</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/messages" className="nav-link">
              <FiMessageCircle />
              <span>Messages</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/payments" className="nav-link">
              <FiCreditCard />
              <span>Payments</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/market-insights" className="nav-link">
              <FiBarChart2 />
              <span>Market Insights</span>
            </NavLink>
          </li>

          <hr />

          <li>
            <NavLink to="/profile" className="nav-link">
              <FiUser />
              <span>Profile</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" className="nav-link">
              <FiSettings />
              <span>Settings</span>
            </NavLink>
          </li>

        </ul>

      </aside>

      {/* Page Content */}
      <Outlet />

    </div>
  );
}

export default Layout;