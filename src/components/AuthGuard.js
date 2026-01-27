import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthGuard = ({ children, requireAuth = true, requireRole = null }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Only check authentication if we actually need it
      if (requireAuth || requireRole) {
        if (authService.isAuthenticated()) {
          try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
          } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
          }
        }
      } else {
        // For login/signup pages, just check if token exists without API call
        if (authService.isAuthenticated()) {
          const storedUser = authService.getUser();
          setUser(storedUser);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [requireAuth, requireRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Require authentication but user not logged in
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  // Don't require authentication but user is logged in (login/signup pages)
  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }

  // Require specific role
  if (requireRole && user && user.role.toLowerCase() !== requireRole.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard;