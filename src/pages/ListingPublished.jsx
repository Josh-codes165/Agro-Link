import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Sprout,
  Banknote,
  Weight,
  MapPin,
  Tag,
  CalendarDays,
  Check,
} from 'lucide-react';

import DashboardLayout from '../components/DashboardLayout';

import '../styles/ListingPublished.css';

const cropImages = {
  Tomatoes: '/images/Tomatoes.jpg',
  Cabbage: '/images/Cabbage.jpg',
  Cassava: '/images/Cassava.jpg',
  Maize: '/images/Maize.jpg',
  Potato: '/images/Potato.jpg',
};

function formatDate(dateValue) {
  if (!dateValue) return '';

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function ListingPublished() {
  const navigate = useNavigate();
  const location = useLocation();

  const [listing, setListing] = useState(location.state?.listing || null);

  useEffect(() => {
    if (listing) return;

    const savedListing = localStorage.getItem('ubaniListing');

    if (savedListing) {
      try {
        setListing(JSON.parse(savedListing));
      } catch (error) {
        console.error('Could not read saved listing:', error);
      }
    }
  }, [listing]);

  const displayListing = listing || {
    produceName: 'Tomatoes',
    quantity: '100',
    unit: 'kg',
    price: '20000',
    location: 'Enugu, Enugu State',
    pricePerKg: '200',
    image: cropImages.Tomatoes,
    listedOn: '2026-08-08',
  };

  const quantity = Number(displayListing.quantity) || 0;

  const totalPrice = Number(displayListing.price) || 0;

  const calculatedPricePerKg =
    quantity > 0 ? Math.round(totalPrice / quantity) : 0;

  const pricePerKg = displayListing.pricePerKg || calculatedPricePerKg;

  const listingImage =
    displayListing.image ||
    cropImages[displayListing.produceName] ||
    cropImages.Tomatoes;

  const listedDate = formatDate(
    displayListing.listedOn || displayListing.availableFrom,
  );

  return (
    <DashboardLayout>
      <section className="listing-published">
        <div className="published-success">
          <div className="success-icon">
            <Check size={72} strokeWidth={1.8} />
          </div>

          <h1>Listing published successfully!</h1>

          <p>
            Your {(displayListing.produceName || 'listing').toLowerCase()} is
            now live and visible to
            <br />
            verified buyers
          </p>
        </div>

        <div className="published-card">
          <div className="published-image-container">
            <img
              src={listingImage}
              alt={displayListing.produceName}
              className="published-image"
              onError={(event) => {
                event.currentTarget.src = cropImages.Tomatoes;
              }}
            />
          </div>

          <div className="published-details">
            <div className="published-detail">
              <div className="detail-icon">
                <Sprout size={27} />
              </div>

              <div>
                <span className="detail-title">Crop type</span>

                <strong>{displayListing.produceName}</strong>
              </div>
            </div>

            <div className="published-detail">
              <div className="detail-icon">
                <Banknote size={27} />
              </div>

              <div>
                <span className="detail-title">Total price</span>

                <strong>{totalPrice.toLocaleString()}</strong>
              </div>
            </div>

            <div className="published-detail">
              <div className="detail-icon">
                <Weight size={27} />
              </div>

              <div>
                <span className="detail-title">Quantity</span>

                <strong>
                  {displayListing.quantity} {displayListing.unit}
                </strong>
              </div>
            </div>

            <div className="published-detail">
              <div className="detail-icon">
                <MapPin size={27} />
              </div>

              <div>
                <span className="detail-title">Location</span>

                <strong>{displayListing.location}</strong>
              </div>
            </div>

            <div className="published-detail">
              <div className="detail-icon">
                <Tag size={27} />
              </div>

              <div>
                <span className="detail-title">Price per Kg</span>

                <strong>{Number(pricePerKg).toLocaleString()}</strong>
              </div>
            </div>

            <div className="published-detail">
              <div className="detail-icon">
                <CalendarDays size={27} />
              </div>

              <div>
                <span className="detail-title">Available from</span>

                <strong>{listedDate}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="whats-next">
          <h2>What's next?</h2>

          <p>You can view your listing details or create another listing</p>
        </div>

        <div className="published-actions">
          <button
            className="action-button primary"
            onClick={() => {
              localStorage.removeItem('ubaniListing');
              navigate('/listings');
            }}>
            View my Listings
          </button>
          <button
            className="action-button secondary"
            onClick={() => navigate('/listings/add')}>
            Add another listing
          </button>
          <button
            className="action-button secondary"
            onClick={() => navigate('/dashboard')}>
            Go to dashboard
          </button>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default ListingPublished;
