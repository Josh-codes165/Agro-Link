import { NavLink, Outlet } from "react-router-dom";
import "../styles/Dashboard.css";

function Layout() {
  return (
    <div className="dashboard">

      {/* ===========================
          SIDEBAR
      =========================== */}

      <aside className="sidebar">

        <h2 className="logo">Ubani</h2>

        <ul>

          {/* Dashboard */}
          <li>
            <NavLink to="/" className="nav-link">
              🏠 Dashboard
            </NavLink>
          </li>

          {/* My Listings */}
          <li>
            <NavLink to="/crops" className="nav-link">
              🌾 My Listings
            </NavLink>
          </li>

          {/* Buyer Requests */}
          <li>
            <NavLink to="/buyer-requests" className="nav-link">
              👥 Buyer Requests
            </NavLink>
          </li>

          {/* Orders */}
          <li>
            <NavLink to="/orders" className="nav-link">
              🛒 Orders
            </NavLink>
          </li>

          {/* Messages */}
          <li>
            <NavLink to="/messages" className="nav-link">
              💬 Messages
            </NavLink>
          </li>

          {/* Payments */}
          <li>
            <NavLink to="/payments" className="nav-link">
              💳 Payments
            </NavLink>
          </li>

          {/* Market Insights */}
          <li>
            <NavLink to="/market-insights" className="nav-link">
              📊 Market Insights
            </NavLink>
          </li>

          <hr />

          {/* Profile */}
          <li>
            <NavLink to="/profile" className="nav-link">
              👤 Profile
            </NavLink>
          </li>

          {/* Settings */}
          <li>
            <NavLink to="/settings" className="nav-link">
              ⚙️ Settings
            </NavLink>
          </li>

          {/* Log Out */}
          <li>
            <NavLink to="/" className="nav-link">
              🚪 Log Out
            </NavLink>
          </li>

        </ul>

      </aside>

      {/* ===========================
          PAGE CONTENT
      =========================== */}

      <Outlet />

    </div>
  );
}

export default Layout;