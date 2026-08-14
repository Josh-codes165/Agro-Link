import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ListingsProvider } from './pages/ListingsContext';
import Dashboard from './pages/DashboardLayout';
import MyListings from './pages/MyListings';
import AddListing from './pages/AddListing';

function App() {
  return (
    <ListingsProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/listings" element={<MyListings />} />
          <Route path="/listings/add" element={<AddListing />} />
        </Routes>
      </Router>
    </ListingsProvider>
  );
}

export default App;
