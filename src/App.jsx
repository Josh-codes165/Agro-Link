import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ListingPublished from "./pages/ListingPublished";
import AddListing from "./pages/AddListing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page */}
        <Route path="/" element={<Navigate to="/add-listing" replace />} />

        {/* Main pages */}
        <Route path="/add-listing" element={<AddListing />} />

        <Route path="/listing-published" element={<ListingPublished />} />

        {/* Temporary routes */}
        <Route path="/dashboard" element={<div>Dashboard</div>} />

        <Route path="/my-listings" element={<div>My Listings</div>} />

        {/* Any unknown URL goes to Add Listing */}
        <Route path="*" element={<Navigate to="/add-listing" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
