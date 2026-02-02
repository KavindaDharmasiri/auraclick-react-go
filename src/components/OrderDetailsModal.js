import React from 'react';

const OrderDetailsModal = ({ order, onClose, getStatusColor }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#111418] rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold">Order Details</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-500">Order Number</label>
              <p className="text-lg font-mono">{order.orderNumber}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-500">Order Date</label>
              <p className="text-lg">{new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-500">Customer</label>
            <p className="text-lg">{order.user?.firstName} {order.user?.lastName}</p>
            <p className="text-sm text-slate-500">{order.user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-500">Order Items</label>
            <div className="mt-2 space-y-2">
              {order.orderItems?.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <p className="font-medium">{item.gear?.name}</p>
                    <p className="text-sm text-slate-500">Qty: {item.quantity} × {item.duration} days</p>
                  </div>
                  <p className="font-semibold">LKR {item.totalPrice?.toLocaleString()}</p>
                </div>
              )) || <p className="text-slate-500">No items found</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-500">Payment Method</label>
              <p className="text-lg">{order.payment?.cardType} ending {order.payment?.cardLast4}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-500">Transaction ID</label>
              <p className="text-lg font-mono">{order.payment?.transactionId}</p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Subtotal:</span>
              <span>LKR {order.subtotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Service Fee:</span>
              <span>LKR {order.serviceFee?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Tax:</span>
              <span>LKR {order.tax?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold border-t border-slate-200 dark:border-slate-700 pt-2">
              <span>Total:</span>
              <span>LKR {order.totalAmount?.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-500">Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
              {order.status?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;