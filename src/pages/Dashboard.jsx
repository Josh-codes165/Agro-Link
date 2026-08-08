import { useState } from "react";
import "../styles/Dashboard.css";

import {
  FiBell,
  FiSearch,
  FiChevronDown,
  FiUser,
} from "react-icons/fi";

function Dashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleAddListing = () => {
    alert("Add New Listing clicked!");
  };

  const handleViewAll = () => {
    alert("Showing all listings...");
  };

  return (
    <main className="main-content">

      {/* =========================
          TOP BAR
      ========================= */}
      <div className="topbar">

        <div>
          <h4>Dashboard</h4>
        </div>

        <div className="topbar-right">

          {/* Search */}
          {showSearch && (
            <input
              type="text"
              className="search-box"
              placeholder="Search..."
              autoFocus
            />
          )}

          <FiSearch
            className="top-icon"
            onClick={() => setShowSearch(!showSearch)}
          />

          {/* Notification */}
          <FiBell className="top-icon" />

          {/* Profile */}
          <div
            className="profile"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="avatar">
              <FiUser />
            </div>

            <span>Chinedu</span>

            <FiChevronDown />
          </div>

          {showProfile && (
            <div className="profile-menu">
              <p>My Profile</p>
              <p>Settings</p>
              <p>Log Out</p>
            </div>
          )}

        </div>
      </div>


      {/* =========================
          WELCOME SECTION
      ========================= */}
      <section className="welcome-section">
        <h1>Welcome back, Chinedu 👋</h1>

        <p>
          Here's what's happening on your farm today.
        </p>
      </section>


      {/* =========================
          SUMMARY CARDS
      ========================= */}
      <section className="cards">

        {/* Card 1 */}
        <div className="card">
          <h3>Total Listings</h3>

          <h2>25</h2>

          <p>Active Listings</p>
        </div>


        {/* Card 2 */}
        <div className="card">
          <h3>Total Views</h3>

          <h2>259</h2>

          <p>+50% this week</p>
        </div>


        {/* Card 3 */}
        <div className="card">
          <h3>Requests</h3>

          <h2>9</h2>

          <p>Buyer Requests</p>
        </div>


        {/* Card 4 */}
        <div className="card">
          <h3>Orders</h3>

          <h2>5</h2>

          <p>Ongoing Orders</p>
        </div>

      </section>


      {/* =========================
          BOTTOM DASHBOARD
      ========================= */}
      <section className="dashboard-bottom">

        {/* =========================
            TOTAL LISTINGS
        ========================= */}
        <div className="recent-activities">

          <div className="section-header">

            <h2>Total Listings</h2>

            <button
              className="view-all"
              onClick={handleViewAll}
            >
              View all
            </button>

          </div>


          {/* Listings Table */}
          <table className="crop-table">

            <thead>
              <tr>
                <th>Crop</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Views</th>
              </tr>
            </thead>


            <tbody>

              {/* Tomatoes */}
              <tr>
                <td>Tomatoes</td>
                <td>700kg</td>
                <td>$1000</td>

                <td>
                  <span className="status-active">
                    Active
                  </span>
                </td>

                <td>15</td>
              </tr>


              {/* Cucumbers */}
              <tr>
                <td>Cucumbers</td>
                <td>200kg</td>
                <td>$500</td>

                <td>
                  <span className="status-active">
                    Active
                  </span>
                </td>

                <td>65</td>
              </tr>


              {/* Maize */}
              <tr>
                <td>Maize</td>
                <td>500kg</td>
                <td>$2500</td>

                <td>
                  <span className="status-inactive">
                    Inactive
                  </span>
                </td>

                <td>70</td>
              </tr>


              {/* Cassava */}
              <tr>
                <td>Cassava</td>
                <td>250kg</td>
                <td>$7600</td>

                <td>
                  <span className="status-inactive">
                    Inactive
                  </span>
                </td>

                <td>25</td>
              </tr>

            </tbody>

          </table>


          {/* Add Listing Button */}
          <button
            className="add-btn"
            onClick={handleAddListing}
          >
            Add New Listing
          </button>

        </div>


        {/* =========================
            MARKET PRICE UPDATES
        ========================= */}
        <div className="market-card">

          <h2>Market Price Updates</h2>


          {/* Tomatoes */}
          <div className="market-item">

            <h4>Tomatoes</h4>

            <p>$150–800/kg</p>

            <span className="up">
              +12%
            </span>

          </div>


          {/* Maize */}
          <div className="market-item">

            <h4>Maize</h4>

            <p>$350–500/kg</p>

            <span className="down">
              -17%
            </span>

          </div>


          {/* Cucumbers */}
          <div className="market-item">

            <h4>Cucumbers</h4>

            <p>$250–450/kg</p>

            <span className="down">
              -7%
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Dashboard;