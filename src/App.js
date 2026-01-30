import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
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
import AuthGuard from './components/AuthGuard';

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
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthGuard requireAuth={false}><Login /></AuthGuard>} />
              <Route path="/signup" element={<AuthGuard requireAuth={false}><Signup /></AuthGuard>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/photoshoots" element={<AuthGuard><PhotoshootBookings /></AuthGuard>} />
              <Route path="/gear-rentals" element={<AuthGuard><GearRentals /></AuthGuard>} />
              <Route path="/gear/:id" element={<AuthGuard><GearDetail /></AuthGuard>} />
              <Route path="/studio" element={<AuthGuard><StudioBookings /></AuthGuard>} />
              <Route path="/weddings" element={<AuthGuard><WeddingPlanning /></AuthGuard>} />
              <Route path="/ai-booking" element={<AuthGuard><AIBooking /></AuthGuard>} />
              <Route path="/cart" element={<AuthGuard><Cart /></AuthGuard>} />
              <Route path="/admin" element={<AuthGuard requireRole="admin"><AdminDashboard /></AuthGuard>} />
              <Route path="/admin/*" element={<AuthGuard requireRole="admin"><AdminDashboard /></AuthGuard>} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    );
  }

  // Admin UI Routes with Sidebar
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<AuthGuard requireRole="admin"><AdminDashboard /></AuthGuard>} />
            <Route path="/admin" element={<AuthGuard requireRole="admin"><AdminDashboard /></AuthGuard>} />
            <Route path="/admin/bookings" element={<AuthGuard requireRole="admin"><AdminDashboard /></AuthGuard>} />
            <Route path="/admin/inventory" element={<AuthGuard requireRole="admin"><AdminDashboard /></AuthGuard>} />
            <Route path="/admin/users" element={<AuthGuard requireRole="admin"><AdminDashboard /></AuthGuard>} />
            <Route path="/admin/analytics" element={<AuthGuard requireRole="admin"><AdminDashboard /></AuthGuard>} />
            <Route path="/admin/settings" element={<AuthGuard requireRole="admin"><AdminDashboard /></AuthGuard>} />
            <Route path="/*" element={<AuthGuard requireRole="admin"><AdminDashboard /></AuthGuard>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;