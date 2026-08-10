import { createContext, useContext, useState, useEffect } from 'react';

const ListingsContext = createContext(null);
const STORAGE_KEY = 'ubani_listings';

let nextId = 1;

function loadInitialListings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    nextId = parsed.reduce((max, l) => Math.max(max, l.id + 1), 1);
    return parsed;
  } catch (err) {
    console.error('Failed to load listings from localStorage', err);
    return [];
  }
}
export function ListingsProvider({ children }) {
  const [listings, setListings] = useState(loadInitialListings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  }, [listings]);

  const addListing = (formData) => {
    setListings((prev) => [
      ...prev,
      {
        id: nextId++,
        title: formData.cropType,
        price: formData.pricePerKg,
        location: `${formData.city}, ${formData.state}`,
        status: 'Active',
        views: 0,
        requests: 0,
        ...formData,
      },
    ]);
  };

  return (
    <ListingsContext.Provider value={{ listings, addListing }}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error('useListings must be used inside a ListingsProvider');
  }
  return context;
}
