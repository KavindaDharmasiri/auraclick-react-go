import React from 'react';
import { Link } from 'react-router-dom';

const ManageBookings = () => {
  const bookings = [
    { id: 1, client: 'Emma Thompson', service: 'Outdoor Portrait', date: 'Oct 28, 2023', time: '10:00 AM', status: 'confirmed', payment: 'paid' },
    { id: 2, client: 'David Chen', service: 'Studio Session', date: 'Oct 30, 2023', time: '2:00 PM', status: 'pending', payment: 'partial' },
    { id: 3, client: 'The Millers', service: 'Wedding Package', date: 'Nov 04, 2023', time: '12:00 PM', status: 'confirmed', payment: 'paid' },
    { id: 4, client: 'Marcus James', service: 'Street Photography', date: 'Oct 25, 2023', time: '4:30 PM', status: 'completed', payment: 'paid' }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Bookings</h1>
          <p className="text-slate-400">Track and manage all photography bookings</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          New Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-sm text-slate-400 mb-2">Total Bookings (Month)</h3>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold">128</span>
            <span className="text-green-400 text-sm">+12%</span>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-sm text-slate-400 mb-2">Pending Confirmations</h3>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold">14</span>
            <span className="text-red-400 text-sm">-5%</span>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-sm text-slate-400 mb-2">Monthly Revenue</h3>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold">$12,450</span>
            <span className="text-green-400 text-sm">+8%</span>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-400">Date & Time</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-400">Client Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-400">Service Type</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-400">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-400">Payment</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-700/50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold">{booking.date}</div>
                    <div className="text-sm text-slate-400">{booking.time}</div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{booking.client}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">camera</span>
                    {booking.service}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                    booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {booking.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined ${
                      booking.payment === 'paid' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {booking.payment === 'paid' ? 'check_circle' : 'error'}
                    </span>
                    {booking.payment === 'paid' ? 'Paid' : 'Partial'}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:bg-primary/10 px-3 py-1 rounded-lg font-semibold">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;