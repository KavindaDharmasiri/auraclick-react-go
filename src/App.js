import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Home from './pages/Home';
import PhotoshootBookings from './pages/PhotoshootBookings';
import GearRentals from './pages/GearRentals';
import GearDetail from './pages/GearDetail';
import StudioBookings from './pages/StudioBookings';
import WeddingPlanning from './pages/WeddingPlanning';
import AIBooking from './pages/AIBooking';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';

function App() {
  const [userType, setUserType] = useState('customer');

  useEffect(() => {
    const type = localStorage.getItem('userType') || 'customer';
    setUserType(type);
    
    // Listen for localStorage changes
    const handleStorageChange = () => {
      const newType = localStorage.getItem('userType') || 'customer';
      setUserType(newType);
    };
    
    // Custom event listener for manual localStorage updates
    const handleUserTypeChange = () => {
      const newType = localStorage.getItem('userType') || 'customer';
      setUserType(newType);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userTypeChanged', handleUserTypeChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userTypeChanged', handleUserTypeChange);
    };
  }, []);

  // Customer UI Routes
  if (userType === 'customer') {
    return (
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/photoshoots" element={<PhotoshootBookings />} />
            <Route path="/gear-rentals" element={<GearRentals />} />
            <Route path="/gear/:id" element={<GearDetail />} />
            <Route path="/studio" element={<StudioBookings />} />
            <Route path="/weddings" element={<WeddingPlanning />} />
            <Route path="/ai-booking" element={<AIBooking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    );
  }

  // Admin UI Routes with Sidebar
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<AdminDashboard />} />
          <Route path="/admin/inventory" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/analytics" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<AdminDashboard />} />
          <Route path="/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;