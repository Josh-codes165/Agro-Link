import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// Dashboard
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

// Dashboard pages
import Crops from "./pages/Crops";
import BuyerRequests from "./pages/BuyerRequests";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Listing pages
import AddListing from "./pages/AddListing";
import ListingPublished from "./pages/ListingPublished";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Dashboard layout */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />

          {/* Dashboard pages */}
          <Route path="listings" element={<Crops />} />
          <Route path="requests" element={<BuyerRequests />} />
          <Route path="orders" element={<Orders />} />
          <Route path="messages" element={<Messages />} />
          <Route path="payments" element={<Payments />} />
          <Route path="market-insights" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />

          {/* Listing management */}
          <Route path="add-listing" element={<AddListing />} />
          <Route path="listing-published" element={<ListingPublished />} />
        </Route>

        {/* Direct listing routes */}
        <Route path="/add-listing" element={<AddListing />} />
        <Route
          path="/listing-published"
          element={<ListingPublished />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;