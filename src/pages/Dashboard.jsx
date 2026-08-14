import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/Dashboard.css';

import { FiBell, FiSearch, FiChevronDown, FiUser } from 'react-icons/fi';

function Dashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // =========================
  // GET SAVED PROFILE
  // =========================

  const getSavedProfile = () => {
    try {
      const saved = localStorage.getItem('farmerProfile');

      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }

    return {
      name: '',
      farm: '',
      location: '',
      role: 'Farmer',
    };
  };

  const savedProfile = getSavedProfile();

  // =========================
  // PROFILE DATA
  // =========================

  const [profileData, setProfileData] = useState(savedProfile);

  useEffect(() => {
    const updateProfile = () => {
      try {
        const saved = localStorage.getItem('farmerProfile');

        if (saved) {
          setProfileData(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };

    updateProfile();

    window.addEventListener('storage', updateProfile);

    return () => {
      window.removeEventListener('storage', updateProfile);
    };
  }, []);

  const currentName = profileData?.name?.trim() || 'Farmer';

  const currentRole = profileData?.role?.trim() || 'Farmer';

  const currentAccountText = `${currentRole} Account`;

  // =========================
  // GET THIS FARMER'S LISTINGS
  // =========================

  const storageKey = `crops_${currentName}`;

  const [crops, setCrops] = useState(() => {
    const savedCrops = localStorage.getItem(storageKey);

    if (!savedCrops) {
      return [];
    }

    try {
      const parsedCrops = JSON.parse(savedCrops);

      return Array.isArray(parsedCrops) ? parsedCrops : [];
    } catch {
      return [];
    }
  });

  // =========================
  // UPDATE LISTINGS
  // =========================

  useEffect(() => {
    const updateCrops = () => {
      const savedCrops = localStorage.getItem(storageKey);

      if (!savedCrops) {
        setCrops([]);
        return;
      }

      try {
        const parsedCrops = JSON.parse(savedCrops);

        setCrops(Array.isArray(parsedCrops) ? parsedCrops : []);
      } catch {
        setCrops([]);
      }
    };

    updateCrops();

    window.addEventListener('storage', updateCrops);

    return () => {
      window.removeEventListener('storage', updateCrops);
    };
  }, [storageKey]);

  // =========================
  // DASHBOARD STATISTICS
  // =========================

  const totalListings = crops.length;

  const totalViews = crops.reduce((total, crop) => {
    const views = Number(crop.views);

    return total + (Number.isFinite(views) ? views : 0);
  }, 0);

  const totalRequests = crops.reduce((total, crop) => {
    const requests = Number(crop.requests);

    return total + (Number.isFinite(requests) ? requests : 0);
  }, 0);

  // =========================
  // ORDERS
  // =========================

  const ordersKey = `orders_${currentName}`;

  const [orders, setOrders] = useState(0);

  useEffect(() => {
    const updateOrders = () => {
      const savedOrders = localStorage.getItem(ordersKey);

      if (!savedOrders) {
        setOrders(0);
        return;
      }

      try {
        const parsedOrders = JSON.parse(savedOrders);

        if (Array.isArray(parsedOrders)) {
          setOrders(parsedOrders.length);
          return;
        }

        if (parsedOrders && typeof parsedOrders === 'object') {
          if (Array.isArray(parsedOrders.orders)) {
            setOrders(parsedOrders.orders.length);
            return;
          }

          const count = Number(parsedOrders.count);

          setOrders(Number.isFinite(count) ? count : 0);

          return;
        }

        const numberValue = Number(parsedOrders);

        setOrders(Number.isFinite(numberValue) ? numberValue : 0);
      } catch {
        const numberValue = Number(savedOrders);

        setOrders(Number.isFinite(numberValue) ? numberValue : 0);
      }
    };

    updateOrders();

    window.addEventListener('storage', updateOrders);

    return () => {
      window.removeEventListener('storage', updateOrders);
    };
  }, [ordersKey]);

  // =========================
  // DASHBOARD
  // =========================

  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="main-content">
          {/* TOP BAR */}

          <div className="topbar">
            <div className="topbar-left">
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
                onClick={() => setShowProfile(!showProfile)}>
                <div className="avatar">
                  <FiUser />
                </div>

                <span>{currentName}</span>

                <FiChevronDown />
              </div>

              {/* PROFILE DROPDOWN */}

              {showProfile && (
                <div className="profile-menu">
                  <div className="profile-menu-header">
                    <div className="profile-menu-avatar">
                      <FiUser />
                    </div>

                    <div>
                      <strong>{currentName}</strong>

                      <span>{currentAccountText}</span>
                    </div>
                  </div>

                  <div className="profile-menu-divider"></div>

                  <NavLink to="/profile" onClick={() => setShowProfile(false)}>
                    My Profile
                  </NavLink>

                  <NavLink to="/settings" onClick={() => setShowProfile(false)}>
                    Settings
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          {/* WELCOME SECTION */}

          <section className="welcome-section">
            <h1>Welcome back, {currentName} 👋</h1>

            <p>Here's what's happening on your farm today.</p>
          </section>

          {/* SUMMARY CARDS */}

          <section className="cards">
            <div className="card">
              <h3>Total Listings</h3>

              <h2>{totalListings}</h2>

              <p>Active Listings</p>
            </div>

            <div className="card">
              <h3>Total Views</h3>

              <h2>{totalViews}</h2>

              <p>Total Listing Views</p>
            </div>

            <div className="card">
              <h3>Requests</h3>

              <h2>{totalRequests}</h2>

              <p>Buyer Requests</p>
            </div>

            <div className="card">
              <h3>Orders</h3>

              <h2>{orders}</h2>

              <p>Ongoing Orders</p>
            </div>
          </section>

          {/* BOTTOM DASHBOARD */}

          <section className="dashboard-bottom">
            {/* TOTAL LISTINGS */}

            <div className="recent-activities">
              <div className="section-header">
                <h2>Total Listings</h2>

                <NavLink to="/listings" className="view-all">
                  View all
                </NavLink>
              </div>

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
                  {crops.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          textAlign: 'center',
                        }}>
                        No listings added yet.
                      </td>
                    </tr>
                  ) : (
                    crops.slice(0, 4).map((crop, index) => (
                      <tr key={crop.id || index}>
                        <td>{crop.name}</td>

                        <td>{crop.quantity}</td>

                        <td>{crop.price}</td>

                        <td>
                          <span
                            className={
                              crop.status === 'Active'
                                ? 'status-active'
                                : 'status-inactive'
                            }>
                            {crop.status}
                          </span>
                        </td>

                        <td>{crop.views || 0}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <NavLink to="/listings" className="add-btn">
                Add New Listing
              </NavLink>
            </div>

            {/* MARKET PRICE UPDATES */}

            <div className="market-card">
              <h2>Market Price Updates</h2>

              <div className="market-item">
                <h4>Tomatoes</h4>

                <p>₦150–800/kg</p>

                <span className="up">+12%</span>
              </div>

              <div className="market-item">
                <h4>Maize</h4>

                <p>₦350–500/kg</p>

                <span className="down">-17%</span>
              </div>

              <div className="market-item">
                <h4>Cucumbers</h4>

                <p>₦250–450/kg</p>

                <span className="down">-7%</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
