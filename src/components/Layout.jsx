import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
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
              🏠 Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/listings" className="nav-link">
              📋 My Listings
            </NavLink>
          </li>

          <li>
            <NavLink to="/requests" className="nav-link">
              📨 Buyer Requests
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className="nav-link">
              📦 Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/messages" className="nav-link">
              💬 Messages
            </NavLink>
          </li>

          <li>
            <NavLink to="/payments" className="nav-link">
              💳 Payments
            </NavLink>
          </li>

          <li>
            <NavLink to="/market-insights" className="nav-link">
              📊 Market Insights
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className="nav-link">
              👤 Profile
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" className="nav-link">
              ⚙️ Settings
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
    🚪 Logout
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