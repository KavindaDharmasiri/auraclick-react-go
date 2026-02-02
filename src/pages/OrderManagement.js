import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
      case 'processing': return 'bg-blue-500/20 text-blue-400';
      case 'shipped': return 'bg-purple-500/20 text-purple-400';
      case 'delivered': return 'bg-green-600/20 text-green-300';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
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
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">${order.totalAmount?.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                    {order.status?.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;