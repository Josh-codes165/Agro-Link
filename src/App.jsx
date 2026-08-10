import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Dashboard
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

// Existing dashboard pages
import Crops from "./pages/Crops";
import BuyerRequests from "./pages/BuyerRequests";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Listing feature
import { ListingsProvider } from "./pages/ListingsContext";
import MyListings from "./pages/MyListings";
import AddListing from "./pages/AddListing";

function App() {
  return (
    <ListingsProvider>
      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Dashboard layout */}
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />

            {/* Existing dashboard pages */}
            <Route path="listings" element={<Crops />} />
            <Route path="requests" element={<BuyerRequests />} />
            <Route path="orders" element={<Orders />} />
            <Route path="messages" element={<Messages />} />
            <Route path="payments" element={<Payments />} />
            <Route path="market-insights" element={<Analytics />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />

            {/* Listing management */}
            <Route path="my-listings" element={<MyListings />} />
            <Route path="listings/add" element={<AddListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ListingsProvider>
  );
}

export default App;