import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="text-primary size-8">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Aura
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link 
              to="/photoshoots" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/photoshoots' 
                  ? 'text-primary' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              Bookings
            </Link>
            <Link 
              to="/gear-rentals" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/gear-rentals' 
                  ? 'text-primary' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              Gear Rentals
            </Link>
            <Link 
              to="/studio" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/studio' 
                  ? 'text-primary' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              Studio Bookings
            </Link>
            <Link 
              to="/weddings" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/weddings' 
                  ? 'text-primary' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              Planning
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/contact' 
                  ? 'text-primary' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Sign In Button */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <button className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">shopping_cart</span>
                <span className="absolute -top-1 -right-1 size-5 bg-primary text-[10px] flex items-center justify-center rounded-full text-white font-bold">2</span>
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-200">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;