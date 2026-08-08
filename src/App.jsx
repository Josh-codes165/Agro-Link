import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import BuyerRequests from "./pages/BuyerRequests";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* My Listings */}
          <Route path="listings" element={<Crops />} />

          {/* Buyer Requests */}
          <Route
            path="buyer-requests"
            element={<BuyerRequests />}
          />

          {/* Orders */}
          <Route path="orders" element={<Orders />} />

          {/* Messages */}
          <Route path="messages" element={<Messages />} />

          {/* Payments */}
          <Route path="payments" element={<Payments />} />

          {/* Market Insights */}
          <Route
            path="market-insights"
            element={<Analytics />}
          />

          {/* Profile */}
          <Route path="profile" element={<Profile />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;