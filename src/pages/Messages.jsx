import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/Dashboard.css';

function Messages() {
  const farmerName = localStorage.getItem('farmerName') || 'Farmer';
  const storageKey = `messages_${farmerName}`;

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(storageKey);
    if (!savedMessages) return [];
    try {
      return JSON.parse(savedMessages);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="main-content">
          <div className="messages-page">
            <div className="page-header">
              <div>
                <h1>Messages</h1>
                <p className="page-subtitle">
                  Communicate with buyers and manage your conversations.
                </p>
              </div>
            </div>

            <div className="cards messages-summary">
              <div className="card">
                <h3>Total Messages</h3>
                <h2>{messages.length}</h2>
                <p>All your messages</p>
              </div>
            </div>

            <div className="recent-activities messages-card">
              <div className="section-header">
                <div>
                  <h2>Recent Messages</h2>
                  <p className="table-subtitle">
                    View messages from your buyers.
                  </p>
                </div>
                <span className="listing-count">
                  {messages.length}{' '}
                  {messages.length === 1 ? 'message' : 'messages'}
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="messages-empty-state">
                  <strong>No messages yet</strong>
                  <p>Messages from your buyers will appear here.</p>
                </div>
              ) : (
                <div className="messages-list">
                  {messages.map((message, index) => (
                    <div className="message-item" key={index}>
                      <div className="message-content">
                        <p>
                          <strong>{message.buyer}</strong>
                        </p>
                        <span>{message.message}</span>
                      </div>
                      {message.date && <small>{message.date}</small>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Messages;
