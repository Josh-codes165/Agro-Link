import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/Dashboard.css'

function Orders() {
  const farmerName = localStorage.getItem('farmerName') || 'Farmer';
  const storageKey = `orders_${farmerName}`;

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem(storageKey);
    if (!savedOrders) return [];
    try {
      return JSON.parse(savedOrders);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(orders));
  }, [orders, storageKey]);

  const totalOrders = orders.length;
  const ongoingOrders = orders.filter(
    (order) => order.status === 'Ongoing',
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === 'Completed',
  ).length;

  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="main-content">
          <div className="orders-page">
            <div className="page-header">
              <div>
                <h1>Orders</h1>
                <p className="page-subtitle">
                  Manage and keep track of your farm orders.
                </p>
              </div>
            </div>

            <div className="cards orders-summary">
              <div className="card">
                <h3>Total Orders</h3>
                <h2>{totalOrders}</h2>
                <p>All farm orders</p>
              </div>
              <div className="card">
                <h3>Ongoing</h3>
                <h2>{ongoingOrders}</h2>
                <p>Orders in progress</p>
              </div>
              <div className="card">
                <h3>Completed</h3>
                <h2>{completedOrders}</h2>
                <p>Successfully completed</p>
              </div>
            </div>

            <div className="recent-activities orders-card">
              <div className="section-header">
                <div>
                  <h2>Recent Orders</h2>
                  <p className="table-subtitle">
                    View and track orders from your buyers.
                  </p>
                </div>
                <span className="listing-count">
                  {totalOrders} {totalOrders === 1 ? 'order' : 'orders'}
                </span>
              </div>

              <div className="table-wrapper">
                <table className="crop-table">
                  <thead>
                    <tr>
                      <th>Crop</th>
                      <th>Buyer</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="empty-state">
                          <strong>No orders yet</strong>
                          <br />
                          Orders from your buyers will appear here.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{order.crop}</strong>
                          </td>
                          <td>{order.buyer}</td>
                          <td>{order.quantity}</td>
                          <td>{order.amount}</td>
                          <td>
                            {order.status === 'Ongoing' && (
                              <span className="status-pending">Ongoing</span>
                            )}
                            {order.status === 'Completed' && (
                              <span className="status-active">Completed</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Orders;
