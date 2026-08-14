import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/Dashboard.css';

function BuyerRequests() {
  const farmerName = localStorage.getItem('farmerName') || 'Farmer';

  const storageKey = `buyerRequests_${farmerName}`;

  // New farmers start with no buyer requests
  const defaultRequests = [];

  const [requests, setRequests] = useState(() => {
    const savedRequests = localStorage.getItem(storageKey);

    if (!savedRequests) {
      return defaultRequests;
    }

    try {
      const parsedRequests = JSON.parse(savedRequests);

      return Array.isArray(parsedRequests) ? parsedRequests : defaultRequests;
    } catch {
      return defaultRequests;
    }
  });

  // Save requests separately for each farmer
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(requests));
  }, [requests, storageKey]);

  // Accept request
  const handleAccept = (index) => {
    setRequests((currentRequests) =>
      currentRequests.map((request, requestIndex) =>
        requestIndex === index
          ? {
              ...request,
              status: 'Accepted',
            }
          : request,
      ),
    );
  };

  // Decline request
  const handleDecline = (index) => {
    setRequests((currentRequests) =>
      currentRequests.map((request, requestIndex) =>
        requestIndex === index
          ? {
              ...request,
              status: 'Declined',
            }
          : request,
      ),
    );
  };

  // Request statistics
  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === 'Pending',
  ).length;

  const acceptedRequests = requests.filter(
    (request) => request.status === 'Accepted',
  ).length;

  const declinedRequests = requests.filter(
    (request) => request.status === 'Declined',
  ).length;

  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="main-content">
          <div className="buyer-requests-page">
            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="page-header">
              <div>
                <h1>Buyer Requests</h1>

                <p className="page-subtitle">
                  Manage requests from buyers interested in your crops.
                </p>
              </div>
            </div>

            {/* =========================
                SUMMARY CARDS
            ========================= */}

            <div className="cards">
              <div className="card">
                <h3>Total Requests</h3>

                <h2>{totalRequests}</h2>

                <p>All buyer requests</p>
              </div>

              <div className="card">
                <h3>Pending</h3>

                <h2>{pendingRequests}</h2>

                <p>Waiting for response</p>
              </div>

              <div className="card">
                <h3>Accepted</h3>

                <h2>{acceptedRequests}</h2>

                <p>Successful requests</p>
              </div>

              <div className="card">
                <h3>Declined</h3>

                <h2>{declinedRequests}</h2>

                <p>Declined requests</p>
              </div>
            </div>

            {/* =========================
                REQUESTS TABLE
            ========================= */}

            <div className="recent-activities buyer-requests-card">
              <div className="section-header">
                <div>
                  <h2>Recent Buyer Requests</h2>

                  <p className="table-subtitle">
                    Review and respond to requests from buyers.
                  </p>
                </div>

                <span className="listing-count">
                  {totalRequests} {totalRequests === 1 ? 'request' : 'requests'}
                </span>
              </div>

              {/* =========================
                  TABLE
              ========================= */}

              <div className="table-wrapper">
                <table className="crop-table">
                  <thead>
                    <tr>
                      <th>Buyer</th>
                      <th>Crop</th>
                      <th>Quantity</th>
                      <th>Offer Price</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="empty-state">
                          <strong>No buyer requests yet</strong>
                          <br />
                          Requests from buyers will appear here.
                        </td>
                      </tr>
                    ) : (
                      requests.map((request, index) => (
                        <tr key={request.id || index}>
                          {/* BUYER */}

                          <td>
                            <strong>{request.buyer || 'Unknown Buyer'}</strong>
                          </td>

                          {/* CROP */}

                          <td>{request.crop || '-'}</td>

                          {/* QUANTITY */}

                          <td>{request.quantity || '-'}</td>

                          {/* PRICE */}

                          <td>{request.price || '-'}</td>

                          {/* DATE */}

                          <td>{request.date || '-'}</td>

                          {/* STATUS */}

                          <td>
                            {request.status === 'Accepted' && (
                              <span className="status-active">Accepted</span>
                            )}

                            {request.status === 'Pending' && (
                              <span className="status-pending">Pending</span>
                            )}

                            {request.status === 'Declined' && (
                              <span className="status-inactive">Declined</span>
                            )}
                          </td>

                          {/* ACTIONS */}

                          <td>
                            {request.status === 'Pending' ? (
                              <div className="request-actions">
                                <button
                                  type="button"
                                  className="accept-btn"
                                  onClick={() => handleAccept(index)}>
                                  Accept
                                </button>

                                <button
                                  type="button"
                                  className="delete-btn"
                                  onClick={() => handleDecline(index)}>
                                  Decline
                                </button>
                              </div>
                            ) : (
                              <span className="action-complete">Completed</span>
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

export default BuyerRequests;
