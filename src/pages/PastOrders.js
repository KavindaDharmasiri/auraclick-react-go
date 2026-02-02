import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import jsPDF from 'jspdf';

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('progress');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        // Sort orders: PAID first, then by date descending
        const sortedOrders = data.sort((a, b) => {
          if (a.status === 'PAID' && b.status !== 'PAID') return -1;
          if (a.status !== 'PAID' && b.status === 'PAID') return 1;
          return new Date(b.orderDate) - new Date(a.orderDate);
        });
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const isInProgress = (status) => {
    const completedStatuses = ['DELIVERED', 'CANCELLED', 'REJECTED'];
    return !completedStatuses.includes(status?.toUpperCase());
  };

  const inProgressOrders = orders.filter(order => isInProgress(order.status));
  const pastOrders = orders.filter(order => !isInProgress(order.status));

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'bg-green-500/20 text-green-600';
      case 'processing': return 'bg-blue-500/20 text-blue-600';
      case 'shipped': return 'bg-purple-500/20 text-purple-600';
      case 'delivered': return 'bg-green-600/20 text-green-700';
      case 'cancelled': return 'bg-red-500/20 text-red-600';
      case 'rejected': return 'bg-red-600/20 text-red-700';
      default: return 'bg-gray-500/20 text-gray-600';
    }
  };

  const generatePDF = (order) => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.text('AURA PHOTOGRAPHY', 20, 30);
    pdf.setFontSize(16);
    pdf.text('Order Receipt', 20, 45);
    
    // Order Info
    pdf.setFontSize(12);
    pdf.text(`Order #: ${order.orderNumber}`, 20, 65);
    pdf.text(`Date: ${new Date(order.orderDate).toLocaleDateString()}`, 20, 75);
    pdf.text(`Status: ${order.status}`, 20, 85);
    
    // Customer Info
    pdf.text(`Customer: ${order.user?.firstName} ${order.user?.lastName}`, 20, 105);
    pdf.text(`Email: ${order.user?.email}`, 20, 115);
    
    // Items
    pdf.text('Items:', 20, 135);
    let yPos = 145;
    order.orderItems?.forEach((item, index) => {
      pdf.text(`${index + 1}. ${item.gear?.name}`, 25, yPos);
      pdf.text(`Qty: ${item.quantity}`, 25, yPos + 10);
      pdf.text(`Price: LKR ${item.price?.toLocaleString()}`, 25, yPos + 20);
      yPos += 35;
    });
    
    // Total
    pdf.text(`Total Amount: LKR ${order.totalAmount?.toLocaleString()}`, 20, yPos + 20);
    
    // Save
    pdf.save(`order-${order.orderNumber}.pdf`);
  };

  const renderOrders = (ordersList, emptyMessage) => {
    if (ordersList.length === 0) {
      return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-3">receipt_long</span>
          <p className="text-slate-600 dark:text-slate-400">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {ordersList.map((order) => (
          <div key={order.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Order #{order.orderNumber}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {order.status?.toUpperCase()}
                </span>
                <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  LKR {order.totalAmount?.toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-medium text-slate-900 dark:text-white mb-3">Items ({order.orderItems?.length || 0})</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {order.orderItems?.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="size-12 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">photo_camera</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white text-sm">{item.gear?.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      LKR {item.price?.toLocaleString()}
                    </p>
                  </div>
                ))}
                {order.orderItems?.length > 4 && (
                  <div className="flex items-center justify-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      +{order.orderItems.length - 4} more items
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* PDF Download Button for DELIVERED orders */}
            {order.status?.toUpperCase() === 'DELIVERED' && (
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                <button
                  onClick={() => generatePDF(order)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Download Receipt
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Orders</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Track and view your order history</p>
          </div>
          <Link 
            to="/gear-rentals" 
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl mb-8">
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'progress'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            In Progress ({inProgressOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'past'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Past Orders ({pastOrders.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'progress' ? (
          renderOrders(inProgressOrders, "No orders in progress")
        ) : (
          renderOrders(pastOrders, "No past orders")
        )}
      </div>
    </div>
  );
};

export default PastOrders;