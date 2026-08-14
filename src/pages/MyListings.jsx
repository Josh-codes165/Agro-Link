import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useListings } from './ListingsContext';
import '../styles/listings.css';

const TABS = [
  { key: 'active', label: 'Active' },
  { key: 'inactive', label: 'Inactive' },
  { key: 'sold', label: 'Sold' },
];

export default function MyListings() {
  const [activeTab, setActiveTab] = useState('active');
  const { listings } = useListings();
  const navigate = useNavigate();

  const filteredListings = listings.filter(
    (listing) => listing.status?.toLowerCase() === activeTab,
  );

  const statusCounts = {
    active: listings.filter((l) => l.status?.toLowerCase() === 'active').length,
    inactive: listings.filter((l) => l.status?.toLowerCase() === 'inactive')
      .length,
    sold: listings.filter((l) => l.status?.toLowerCase() === 'sold').length,
  };

  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="main-content">
          <header className="page-header">
            <div className="page-header-text">
              <h1>My Listings</h1>
              <p>View and manage all your crop listings</p>
            </div>

            <button
              className="btn-primary"
              onClick={() => navigate('/listings/add')}>
              Add new listing
            </button>
          </header>

          <nav className="tabs">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                className={`tab${activeTab === key ? ' active' : ''}`}
                onClick={() => setActiveTab(key)}>
                {label} ({statusCounts[key]})
              </button>
            ))}
          </nav>

          <section className="listings">
            <div className="listings-container">
              {filteredListings.length === 0 ? (
                <p>No {activeTab} listings yet.</p>
              ) : (
                filteredListings.map((listing) => (
                  <div className="listing-card" key={listing.id}>
                    <div className="listing-left">
                      <div className="listing-img">
                        {listing.imagePreview && (
                          <img
                            src={listing.imagePreview}
                            alt={listing.cropType || listing.title}
                            className="listing-card-image"
                          />
                        )}
                      </div>

                      <div className="listing-card-content">
                        <h4>{listing.cropType || listing.title}</h4>

                        <p className="price">
                          Price: ₦{listing.pricePerKg || listing.price} / kg
                        </p>

                        <p className="location">{listing.location}</p>
                      </div>
                    </div>

                    <div className="listing-right">
                      <div className="listing-card-actions">
                        <h6>{listing.status}</h6>

                        <div className="listing-card-stats">
                          <p className="stats">
                            Views
                            <span>{listing.views || 0}</span>
                          </p>

                          <p className="stats">
                            Requests
                            <span>{listing.requests || 0}</span>
                          </p>

                          <div className="listing-card-btns">
                            <button className="edit-listing">Edit</button>

                            <button className="delete-listing">
                              <EllipsisVertical size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
