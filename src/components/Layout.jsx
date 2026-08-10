import { NavLink, Outlet } from "react-router-dom";
import {
  FiHome,
  FiClipboard,
  FiInbox,
  FiPackage,
  FiMessageCircle,
  FiCreditCard,
  FiBarChart2,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import "../styles/Dashboard.css";

function Layout() {
  return (
    <div className="dashboard">

      {/* =========================
          SIDEBAR
      ========================= */}
      <aside className="sidebar">

        <h2 className="logo">Ubani</h2>

        <ul>

          <li>
            <NavLink to="/" className="nav-link">
              <FiHome />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/listings" className="nav-link">
              <FiClipboard />
              <span>My Listings</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/requests" className="nav-link">
              <FiInbox />
              <span>Buyer Requests</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className="nav-link">
              <FiPackage />
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

          <li>
            <button
              type="button"
              className="nav-link logout-link"
              onClick={() => {
                localStorage.removeItem("farmerProfile");
                window.location.href = "/";
              }}
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </li>

        </ul>

      </aside>

      {/* =========================
          MAIN PAGE AREA
      ========================= */}
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;