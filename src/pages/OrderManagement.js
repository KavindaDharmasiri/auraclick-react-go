import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingSlip, setViewingSlip] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiService.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiService.put(`/orders/${orderId}/status`, { status: newStatus });
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'processing': return 'bg-blue-500/20 text-blue-400';
      case 'shipped': return 'bg-purple-500/20 text-purple-400';
      case 'delivered': return 'bg-green-600/20 text-green-300';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      case 'rejected': return 'bg-red-600/20 text-red-500';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) return <div className="p-8">Loading orders...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-gray-600 dark:text-slate-400">Manage gear rental orders and status</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Order #</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Total</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-700/50">
                <td className="px-6 py-4 font-mono text-sm">{order.orderNumber}</td>
                <td className="px-6 py-4">{order.user?.firstName} {order.user?.lastName}</td>
                <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">LKR {order.totalAmount?.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                    {order.status?.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {order.status === 'PENDING' && order.paymentSlip ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewingSlip(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        View Slip
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'PAID')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'REJECTED')}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  ) : order.status === 'PENDING' ? (
                    <span className="text-yellow-500 text-sm">Awaiting slip</span>
                  ) : (
                    <select
                      value={order.status || ''}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm"
                    >
                      <option value="PAID">Paid</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Slip Modal */}
      {viewingSlip && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setViewingSlip(null)}>
          <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div>
                <h2 className="text-xl font-bold">Payment Slip - {viewingSlip.orderNumber}</h2>
                <p className="text-sm text-gray-400 mt-1">Customer: {viewingSlip.user?.firstName} {viewingSlip.user?.lastName}</p>
              </div>
              <button onClick={() => setViewingSlip(null)} className="text-gray-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6">
              {viewingSlip.paymentSlip?.fileName?.endsWith('.pdf') ? (
                <iframe
                  src={`data:application/pdf;base64,${viewingSlip.paymentSlip.fileBase64}`}
                  className="w-full h-[600px] border border-slate-700 rounded"
                  title="Payment Slip"
                />
              ) : (
                <img
                  src={`data:image/jpeg;base64,${viewingSlip.paymentSlip.fileBase64}`}
                  alt="Payment Slip"
                  className="w-full rounded"
                />
              )}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    updateOrderStatus(viewingSlip.id, 'PAID');
                    setViewingSlip(null);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                >
                  Approve Payment
                </button>
                <button
                  onClick={() => {
                    updateOrderStatus(viewingSlip.id, 'REJECTED');
                    setViewingSlip(null);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                >
                  Reject Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;