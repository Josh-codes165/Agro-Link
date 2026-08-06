import "../styles/Dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>🌱 UBANI</h2>

        <ul>
          <li>🏠 Dashboard</li>
          <li>🌾 Crops</li>
          <li>📦 Inventory</li>
          <li>📈 Analytics</li>
          <li>⚙️ Settings</li>
        </ul>
      </aside>

      <main className="main-content">
  <h1>Welcome back, Chinedu 👋</h1>
  <p>Here's what's happening on your farm today.</p>

  <div className="cards">
    <div className="card">
      <h3>Total Farms</h3>
      <h2>12</h2>
    </div>

    <div className="card">
      <h3>Active Crops</h3>
      <h2>8</h2>
    </div>

    <div className="card">
      <h3>Revenue</h3>
      <h2>$4,250</h2>
    </div>

    <div className="card">
  <h3>Pending Orders</h3>
  <p>15</p>
</div>

<div className="recent-activities">
  <h2>Recent Activities</h2>

  <div className="activity">
    <p>🌱 New crop added</p>
    <span>Tomatoes added to your farm</span>
  </div>

  <div className="activity">
    <p>📦 Order completed</p>
    <span>50 bags of maize sold</span>
  </div>

  <div className="activity">
    <p>💰 Revenue updated</p>
    <span>Farm sales increased today</span>
  </div>
</div>
  </div>
</main>
    </div>
  );
}

export default Dashboard;