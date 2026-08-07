import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MyListings from './pages/MyListings';
import AddListing from './pages/AddListing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listings" element={<MyListings />} />
        <Route path="/listings/add" element={<AddListing />} />
      </Routes>
    </Router>
  );
}

export default App;
