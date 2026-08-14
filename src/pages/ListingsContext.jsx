import { createContext, useState, useEffect } from 'react';

export const ListingsContext = createContext(null);

const STORAGE_KEY = 'ubani_listings';

let nextId = 1;

function loadInitialListings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    nextId = parsed.reduce((max, item) => Math.max(max, item.id || 0), 0) + 1;

    return parsed;
  } catch (error) {
    console.error('Failed to load listings:', error);
    return [];
  }
}

export function ListingsProvider({ children }) {
  const [listings, setListings] = useState(loadInitialListings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
    } catch (error) {
      console.error('Could not save listings (storage limit likely exceeded):', error);
    }
  }, [listings]);

  const addListing = (listing) => {
    const newListing = {
      id: nextId++,
      cropType: listing.cropType,
      quantity: listing.quantity,
      unit: listing.unit,
      price: listing.price,
      pricePerKg: listing.pricePerKg,
      city: listing.city,
      state: listing.state,
      location: listing.location,
      availableFrom: listing.availableFrom,
      imagePreview: listing.imagePreview,
      status: 'active',
      views: 0,
      requests: 0,
    };

    setListings((prev) => [...prev, newListing]);
  };

  return (
    <ListingsContext.Provider value={{ listings, addListing }}>
      {children}
    </ListingsContext.Provider>
  );
}