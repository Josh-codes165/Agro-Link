import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import "../styles/listings.css";

const TABS = [
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
  { key: "sold", label: "Sold" },
];

const listings = [
  {
    id: 1,
    title: "Listing Title 1",
    price: 100,
    location: "Enugu, Enugu",
    status: "Active",
    views: 10,
    requests: 10,
  },
];

export default function MyListings() {
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      <header className="page-header">
        <div className="page-header-text">
          <h1>My Listings</h1>
          <p>View and manage all your crop listings</p>
        </div>
        <button onClick={() => navigate("/listings/add")} className="btn-primary">Add new listing</button>
      </header>

      <nav className="tabs">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            className={`tab${activeTab === key ? " active" : ""}`}
            data-tab={key}
            onClick={() => setActiveTab(key)}
          >
            {label} <span></span>
          </button>
        ))}
      </nav>

      <section className="listings">
        <div className="listings-container">
          {listings.map((listing) => (
            <div className="listing-card" key={listing.id}>
              <div className="listing-card-content">
                <h2>{listing.title}</h2>
                <p>Price: ${listing.price}</p>
                <p>{listing.location} Status</p>
              </div>
              <div className="listing-card-actions">
                <h6>{listing.status}</h6>
                <div className="listing-card-stats">
                  <p><span>{listing.views}</span> Views</p>
                  <p><span>{listing.requests}</span> Request</p>
                </div>
                <div className="listing-card-btns">
                  <button className="edit-listing">Edit</button>
                  <button className="delete-listing">
                    <EllipsisVertical size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
