import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageBookings = () => {
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    revenue: 0,
    totalBookingsChange: '+0%',
    pendingBookingsChange: '+0%',
    revenueChange: '+0%'
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    bookingType: 'PHO',
    fromDate: '2026-01-01',
    toDate: '2026-12-31',
    bookingStatus: 'PENDING',
    pageNumber: 0,
    pageSize: 10
  });

  const fetchMetrics = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/bookings/admin/metrics');
      const data = await response.json();
      if (data.statusCode === 'SUCCESS') {
        setMetrics(data.data);
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/bookings/admin/getBookingTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters)
      });
      const data = await response.json();
      if (data.statusCode === 'SUCCESS') {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
    setLoading(false);
  };

  const updateBookingStatus = async (bookingId, bookingStatus, paymentStatus) => {
    try {
      const response = await fetch('http://localhost:5555/api/bookings/admin/updateStatuses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          bookingStatus,
          paymentStatus
        })
      });
      const data = await response.json();
      if (data.statusCode === 'SUCCESS') {
        fetchBookings(); // Refresh bookings
        fetchMetrics(); // Refresh metrics
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchBookings();
  }, [filters]);

  const handleStatusChange = (bookingId, currentBookingStatus, currentPaymentStatus, type, newValue) => {
    const bookingStatus = type === 'booking' ? newValue : currentBookingStatus;
    const paymentStatus = type === 'payment' ? newValue : currentPaymentStatus;
    updateBookingStatus(bookingId, bookingStatus, paymentStatus);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Bookings</h1>
          <p className="text-gray-600 dark:text-slate-400">Track and manage all photography bookings</p>
        </div>
        <button className="bg-primary text-gray-900 dark:text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          New Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-sm text-gray-600 dark:text-slate-400 mb-2">Total Bookings (Month)</h3>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold">{metrics.totalBookings}</span>
            <span className={`text-sm ${
              metrics.totalBookingsChange.startsWith('+') ? 'text-green-400' : 'text-red-400'
            }`}>{metrics.totalBookingsChange}</span>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-sm text-gray-600 dark:text-slate-400 mb-2">Pending Confirmations</h3>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold">{metrics.pendingBookings}</span>
            <span className={`text-sm ${
              metrics.pendingBookingsChange.startsWith('+') ? 'text-green-400' : 'text-red-400'
            }`}>{metrics.pendingBookingsChange}</span>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-sm text-gray-600 dark:text-slate-400 mb-2">Monthly Revenue</h3>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold">${metrics.revenue}</span>
            <span className={`text-sm ${
              metrics.revenueChange.startsWith('+') ? 'text-green-400' : 'text-red-400'
            }`}>{metrics.revenueChange}</span>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Date & Time</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Client Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Service Type</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Payment</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-400">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-400">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold">{new Date(booking.bookingDate).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600 dark:text-slate-400">{booking.duration}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{booking.customerName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">camera</span>
                      {booking.service}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={booking.bookingStatus}
                      onChange={(e) => handleStatusChange(
                        booking.bookingId,
                        booking.bookingStatus,
                        booking.paymentStatus,
                        'booking',
                        e.target.value
                      )}
                      className={`px-3 py-1 rounded-full text-xs font-bold border-none outline-none cursor-pointer ${
                        booking.bookingStatus === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' :
                        booking.bookingStatus === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={booking.paymentStatus}
                      onChange={(e) => handleStatusChange(
                        booking.bookingId,
                        booking.bookingStatus,
                        booking.paymentStatus,
                        'payment',
                        e.target.value
                      )}
                      className="flex items-center gap-2 bg-transparent border-none outline-none cursor-pointer"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Partial">Partial</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:bg-primary/10 px-3 py-1 rounded-lg font-semibold">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
