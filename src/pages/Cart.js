import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import authService from '../services/authService';

const Cart = () => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [cardData, setCardData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState('processing'); // processing, success, error
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const response = await authService.apiCall('http://localhost:5555/api/cart');
      if (response.ok) {
        const items = await response.json();
        setCartItems(items);
      }
    } catch (error) {
      console.error('Failed to load cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Cards (Visa/Master)', icon: 'credit_card' },
    { id: 'upay', name: 'UPay Wallet', logo: 'UPay' },
    { id: 'sampath', name: 'Sampath Vishwa', logo: 'SAMPATH' },
    { id: 'combank', name: 'ComBank Online', logo: 'COMBANK' },
    { id: 'hnb', name: 'HNB Momo', logo: 'HNB' },
    { id: 'other', name: 'Other Banks', icon: 'account_balance' }
  ];

  // Calculate totals from loaded cart items
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const serviceFee = subtotal * 0.03;
  const tax = 0;
  const total = subtotal + serviceFee + tax;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <Navigation />
        <main className="w-full px-6 lg:px-10 py-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading cart...</p>
          </div>
        </main>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format and limit inputs
    if (name === 'number') {
      // Remove all non-digits and limit to 16 digits
      const digits = value.replace(/\D/g, '').slice(0, 16);
      // Add spaces every 4 digits
      formattedValue = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    } else if (name === 'expiry') {
      // Remove all non-digits and limit to 4 digits
      const digits = value.replace(/\D/g, '').slice(0, 4);
      // Add slash after 2 digits
      if (digits.length >= 2) {
        formattedValue = digits.slice(0, 2) + '/' + digits.slice(2);
      } else {
        formattedValue = digits;
      }
    } else if (name === 'cvv') {
      // Only digits, limit to 3
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    } else if (name === 'name') {
      // Only letters and spaces, limit to 50 characters
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50);
    }
    
    setCardData({
      ...cardData,
      [name]: formattedValue
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateCardData = () => {
    const newErrors = {};
    
    if (!cardData.name.trim()) {
      newErrors.name = 'Cardholder name is required';
    } else if (cardData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!cardData.number.trim()) {
      newErrors.number = 'Card number is required';
    } else {
      const digits = cardData.number.replace(/\s/g, '');
      if (digits.length !== 16) {
        newErrors.number = 'Card number must be exactly 16 digits';
      }
    }
    
    if (!cardData.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = 'Invalid expiry format (MM/YY)';
    } else {
      const [month, year] = cardData.expiry.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiry = 'Invalid month (01-12)';
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiry = 'Card has expired';
      }
    }
    
    if (!cardData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (cardData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be exactly 3 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processPayment = async () => {
    try {
      setProcessing(true);
      setShowPaymentModal(true);
      setPaymentStep('processing');
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Process order
      const orderData = {
        cartItems: cartItems.map(item => ({
          gearId: item.gear.id,
          quantity: item.quantity,
          duration: item.duration,
          price: item.totalPrice
        })),
        paymentMethod: selectedPayment,
        cardDetails: selectedPayment === 'card' ? {
          last4: cardData.number.slice(-4),
          cardType: 'VISA'
        } : null,
        totalAmount: total,
        subtotal: subtotal,
        serviceFee: serviceFee,
        tax: tax
      };
      
      const response = await authService.apiCall('http://localhost:5555/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (response.ok) {
        setPaymentStep('success');
        // Clear cart after successful order
        setTimeout(() => {
          setCartItems([]);
          // Trigger cart count update in navigation
          window.dispatchEvent(new Event('cartUpdated'));
        }, 2000);
      } else {
        throw new Error('Order processing failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStep('error');
    } finally {
      setProcessing(false);
    }
  };

  // Check if payment form is complete
  const isPaymentFormComplete = () => {
    if (cartItems.length === 0) return false;
    
    // Only enable for card payments
    if (selectedPayment === 'card') {
      return cardData.name.trim() && 
             cardData.number.replace(/\s/g, '').length === 16 && 
             cardData.expiry.trim() && 
             cardData.cvv.length === 3;
    }
    
    // Disable for all other payment methods
    return false;
  };

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    if (selectedPayment === 'card') {
      if (!validateCardData()) {
        return;
      }
    }
    
    processPayment();
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navigation />
      
      <main className="w-full px-6 lg:px-10 py-10">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 max-w-6xl mx-auto">
          <Link to="/cart" className="text-gray-600 dark:text-slate-400 text-sm font-medium hover:underline">Cart</Link>
          <span className="text-gray-600 dark:text-slate-400 text-sm material-symbols-outlined scale-75">chevron_right</span>
          <Link to="#" className="text-gray-600 dark:text-slate-400 text-sm font-medium hover:underline">Information</Link>
          <span className="text-gray-600 dark:text-slate-400 text-sm material-symbols-outlined scale-75">chevron_right</span>
          <span className="text-gray-900 dark:text-white text-sm font-bold">Payment</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Left Column: Payment Details */}
          <div className="flex-1">
            <h1 className="text-gray-900 dark:text-white tracking-tight text-3xl font-extrabold mb-8">Secure Checkout</h1>
            
            {/* Payment Methods */}
            <div className="mb-10">
              <h2 className="text-gray-900 dark:text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Select Payment Method
              </h2>
              <p className="text-gray-600 dark:text-slate-400 text-sm mb-6">Choose from international cards or local Sri Lankan bank portals.</p>
              
              {/* Payment Method Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center justify-center gap-2 text-center ${
                      selectedPayment === method.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-300 dark:border-slate-700 hover:border-primary'
                    }`}
                  >
                    {method.icon ? (
                      <span className="material-symbols-outlined text-3xl text-primary">{method.icon}</span>
                    ) : (
                      <div className={`h-8 w-16 rounded flex items-center justify-center font-bold text-[10px] text-gray-900 dark:text-white ${
                        method.id === 'upay' ? 'bg-slate-700' :
                        method.id === 'sampath' ? 'bg-orange-600' :
                        method.id === 'combank' ? 'bg-blue-800' :
                        method.id === 'hnb' ? 'bg-blue-600' : 'bg-slate-700'
                      }`}>
                        {method.logo}
                      </div>
                    )}
                    <span className="text-sm font-medium">{method.name}</span>
                  </div>
                ))}
              </div>

              {/* Card Details Form */}
              {selectedPayment === 'card' && (
                <div className="bg-gray-100 dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Cardholder Name</label>
                      <input 
                        name="name"
                        value={cardData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 focus:ring-primary focus:border-primary text-gray-900 dark:text-white ${
                          errors.name ? 'border-red-500' : 'border-gray-300 dark:border-slate-700'
                        }`}
                        placeholder="John Doe" 
                        type="text"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="md:col-span-2 relative">
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Card Number</label>
                      <div className="relative">
                        <input 
                          name="number"
                          value={cardData.number}
                          onChange={handleInputChange}
                          className={`w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 pr-12 focus:ring-primary focus:border-primary text-gray-900 dark:text-white ${
                            errors.number ? 'border-red-500' : 'border-gray-300 dark:border-slate-700'
                          }`}
                          placeholder="0000 0000 0000 0000" 
                          type="text"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <div className="w-8 h-5 bg-slate-200 rounded text-[6px] flex items-center justify-center font-bold text-black">VISA</div>
                        </div>
                      </div>
                      {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Expiry Date</label>
                      <input 
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleInputChange}
                        className={`w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 focus:ring-primary focus:border-primary text-gray-900 dark:text-white ${
                          errors.expiry ? 'border-red-500' : 'border-gray-300 dark:border-slate-700'
                        }`}
                        placeholder="MM / YY" 
                        type="text"
                      />
                      {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">CVV</label>
                      <div className="relative">
                        <input 
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleInputChange}
                          className={`w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 focus:ring-primary focus:border-primary text-gray-900 dark:text-white ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300 dark:border-slate-700'
                          }`}
                          placeholder="***" 
                          type="password"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-slate-400 text-lg cursor-help" title="3-digit security code on the back of your card">help</span>
                      </div>
                      {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-gray-200 dark:border-slate-700 mb-8">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <span className="material-symbols-outlined text-green-500">verified_user</span>
                SSL Secure
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <span className="material-symbols-outlined text-blue-500">lock</span>
                PCI-DSS Compliant
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <span className="material-symbols-outlined text-primary">security</span>
                Verified by Visa
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 sticky top-28">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-8">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-slate-400">Your cart is empty</p>
                    <Link to="/gear-rentals" className="text-primary hover:underline text-sm mt-2 inline-block">
                      Browse gear rentals
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div 
                        className="size-16 rounded-lg bg-center bg-cover flex-shrink-0 border border-slate-700" 
                        style={{ 
                          backgroundImage: item.gear.images && item.gear.images.length > 0 
                            ? `url('http://localhost:5555${item.gear.images[0]}')`
                            : 'none',
                          backgroundColor: item.gear.images && item.gear.images.length > 0 ? 'transparent' : '#374151'
                        }}
                      >
                        {(!item.gear.images || item.gear.images.length === 0) && (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-gray-500">photo_camera</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold line-clamp-1">{item.gear.name}</p>
                        <p className="text-xs text-gray-600 dark:text-slate-400">
                          {item.duration} • Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold mt-1">LKR {item.totalPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-slate-700 mb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400">
                  <span>Service Fee (3%)</span>
                  <span>LKR {serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400">
                  <span>Tax (VAT)</span>
                  <span>LKR {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-dashed border-gray-200 dark:border-slate-700">
                  <span>Total</span>
                  <div className="text-right">
                    <p>LKR {total.toLocaleString()}</p>
                    <p className="text-[10px] font-normal text-slate-500 uppercase tracking-widest mt-1">~ USD {(total / 300).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={!isPaymentFormComplete() || processing}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group ${
                  isPaymentFormComplete() && !processing
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/20 cursor-pointer'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-lg">lock</span>
                {processing ? 'Processing...' : `Pay LKR ${total.toLocaleString()}`}
                {!processing && (
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                )}
              </button>
              <p className="text-[10px] text-center text-gray-600 dark:text-slate-400 mt-4 leading-relaxed px-2">
                By clicking Pay Now, you agree to Aura's Terms of Service and Booking Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Payment Processing Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-full max-w-md mx-4">
            {paymentStep === 'processing' && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Processing Payment</h3>
                <p className="text-gray-600 dark:text-slate-400">Please wait while we process your payment...</p>
              </div>
            )}
            
            {paymentStep === 'success' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-3xl text-green-600">check_circle</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Payment Successful!</h3>
                <p className="text-gray-600 dark:text-slate-400 mb-6">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
                <button 
                  onClick={() => {
                    setShowPaymentModal(false);
                    window.location.href = '/';
                  }}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            )}
            
            {paymentStep === 'error' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-3xl text-red-600">error</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Payment Failed</h3>
                <p className="text-gray-600 dark:text-slate-400 mb-6">There was an error processing your payment. Please try again.</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white font-bold py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setShowPaymentModal(false);
                      handlePayment();
                    }}
                    className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
