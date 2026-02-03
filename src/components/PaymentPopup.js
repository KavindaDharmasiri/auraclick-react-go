import React, { useState } from 'react';
import toast from "react-hot-toast";

const PaymentPopup = ({ isOpen, onClose, bookingDetails, isPhotoshoot = false }) => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [fullPayment, setFullPayment] = useState(true);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? ' / ' + v.substring(2, 4) : '');
    }
    return v;
  };

  const validateCard = () => {
    const newErrors = {};
    
    if (!cardDetails.name.trim()) {
      newErrors.name = 'Cardholder name is required';
    }
    
    const cardNumber = cardDetails.number.replace(/\s/g, '');
    if (!cardNumber) {
      newErrors.number = 'Card number is required';
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.number = 'Invalid card number';
    }
    
    if (!cardDetails.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\s\/\s\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = 'Invalid expiry format (MM / YY)';
    }
    
    if (!cardDetails.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardDetails.cvv.length < 3 || cardDetails.cvv.length > 4) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setCardDetails({...cardDetails, [field]: formattedValue});
    
    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
  };

  const allTimeSlots = [
    { id: 1, time: '09:00 - 11:00' },
    { id: 2, time: '11:00 - 13:00' },
    { id: 3, time: '13:00 - 15:00' },
    { id: 4, time: '15:00 - 17:00' },
    { id: 5, time: '17:00 - 19:00' },
    { id: 6, time: '19:00 - 21:00' }
  ];

  if (!isOpen) return null;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'credit_card' },
    { id: 'paypal', name: 'PayPal', icon: 'account_balance_wallet' },
    { id: 'apple', name: 'Apple Pay', icon: 'phone_iphone' },
    { id: 'google', name: 'Google Pay', icon: 'account_balance_wallet' }
  ];

  const handlePayment = async () => {
    if (isPhotoshoot) {
      if (!bookingDetails?.serviceType || !bookingDetails?.subService) {
        toast.error('Please select a service first');
        return;
      }
    } else {
      if (!bookingDetails?.timeSlots || bookingDetails.timeSlots.length === 0) {
        toast.error('Please select at least one time slot');
        return;
      }
    }
    
    if (selectedPayment === 'card') {
      if (!validateCard()) {
        return;
      }
    }
    
    setLoading(true);
    try {
      let payload, apiUrl;
      
      if (isPhotoshoot) {
        payload = {
          fullPayment,
          paymentType: selectedPayment.toUpperCase(),
          paymentAmount: fullPayment ? bookingDetails.total : bookingDetails.total / 2,
          bookingDate: bookingDetails.date,
          serviceType: bookingDetails.serviceType,
          subService: bookingDetails.subService,
          duration: bookingDetails.durationKey,
          location: bookingDetails.location
        };
        apiUrl = 'http://localhost:5555/api/bookings/photoshootBooking/setBooking';
      } else {
        payload = {
          fullPayment,
          paymentType: selectedPayment.toUpperCase(),
          paymentAmount: fullPayment ? bookingDetails.total : bookingDetails.total / 2,
          bookingDate: bookingDetails.date,
          timeSlot: bookingDetails.timeSlotIds || [],
          studioId: bookingDetails.studioId
        };
        apiUrl = 'http://localhost:5555/api/bookings/studioBooking/setBooking';
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      // Wait 2 seconds for loading effect
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (data.statusCode === 'SUCCESS') {
        toast.success('Booking confirmed successfully!');
        resetAndClose();
      } else {
        toast.error('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment failed. Please try again.');
    }
    setLoading(false);
  };

  const resetAndClose = () => {
    setSelectedPayment('card');
    setFullPayment(true);
    setCardDetails({ number: '', expiry: '', cvv: '', name: '' });
    setErrors({});
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={resetAndClose}
    >
      <div 
        className="bg-slate-900 rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold">Complete Payment</h2>
          <button 
            onClick={resetAndClose}
            className="size-8 rounded-lg flex items-center justify-center hover:bg-slate-800"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Payment Amount Options */}
        <div className="p-6 border-b border-slate-800">
          <h3 className="font-bold mb-4">Payment Amount</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFullPayment(true)}
              className={`p-3 rounded-xl border text-center ${
                fullPayment
                  ? 'border-primary bg-primary/10'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="text-sm font-bold">Full Payment</div>
              <div className="text-xs text-slate-400">LKR {bookingDetails?.total}</div>
            </button>
            <button
              onClick={() => setFullPayment(false)}
              className={`p-3 rounded-xl border text-center ${
                !fullPayment
                  ? 'border-primary bg-primary/10'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="text-sm font-bold">Half Payment</div>
              <div className="text-xs text-slate-400">LKR {(bookingDetails?.total / 2) || 160}</div>
            </button>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="p-6 border-b border-slate-800">
          <h3 className="font-bold mb-4">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">{isPhotoshoot ? 'Service' : 'Studio'}</span>
              <span>{isPhotoshoot ? bookingDetails?.service : bookingDetails?.studio}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Duration</span>
              <span>{bookingDetails?.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date</span>
              <span>{bookingDetails?.date}</span>
            </div>
            {isPhotoshoot ? (
              <div className="flex justify-between">
                <span className="text-slate-400">Location</span>
                <span>{bookingDetails?.location}</span>
              </div>
            ) : (
              <div className="flex justify-between">
                <span className="text-slate-400">Time Slots</span>
                <span>{bookingDetails?.timeSlots?.length || 0} selected</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-primary pt-2 border-t border-slate-800">
              <span>Total</span>
              <span>LKR {bookingDetails?.total}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <h3 className="font-bold mb-4">Payment Method</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 ${
                  selectedPayment === method.id
                    ? 'border-primary bg-primary/10'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <span className="material-symbols-outlined text-primary">{method.icon}</span>
                <span className="text-sm font-medium">{method.name}</span>
              </button>
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
                    value={cardDetails.name}
                    onChange={(e) => handleCardInputChange('name', e.target.value)}
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
                      value={cardDetails.number}
                      onChange={(e) => handleCardInputChange('number', e.target.value)}
                      className={`w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 pr-12 focus:ring-primary focus:border-primary text-gray-900 dark:text-white ${
                        errors.number ? 'border-red-500' : 'border-gray-300 dark:border-slate-700'
                      }`}
                      placeholder="0000 0000 0000 0000" 
                      type="text"
                      maxLength="19"
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
                    value={cardDetails.expiry}
                    onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                    className={`w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 focus:ring-primary focus:border-primary text-gray-900 dark:text-white ${
                      errors.expiry ? 'border-red-500' : 'border-gray-300 dark:border-slate-700'
                    }`}
                    placeholder="MM / YY" 
                    type="text"
                    maxLength="7"
                  />
                  {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">CVV</label>
                  <div className="relative">
                    <input 
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                      className={`w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 focus:ring-primary focus:border-primary text-gray-900 dark:text-white ${
                        errors.cvv ? 'border-red-500' : 'border-gray-300 dark:border-slate-700'
                      }`}
                      placeholder="***" 
                      type="password"
                      maxLength="4"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-slate-400 text-lg cursor-help" title="3-digit security code on the back of your card">help</span>
                  </div>
                  {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Other Payment Methods */}
          {selectedPayment !== 'card' && (
            <div className="mb-6 p-4 rounded-xl bg-slate-800 text-center">
              <span className="material-symbols-outlined text-primary text-2xl mb-2 block">
                {paymentMethods.find(m => m.id === selectedPayment)?.icon}
              </span>
              <p className="text-sm text-slate-400">
                You'll be redirected to {paymentMethods.find(m => m.id === selectedPayment)?.name} to complete payment
              </p>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={loading || (isPhotoshoot ? !bookingDetails?.serviceType : (bookingDetails?.timeSlots?.length === 0))}
            className={`w-full py-4 mt-4 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 ${
              loading || (bookingDetails?.timeSlots?.length === 0)
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : (
              <>
                Pay LKR {fullPayment ? bookingDetails?.total : (bookingDetails?.total / 2) || 160}
                <span className="material-symbols-outlined">lock</span>
              </>
            )}
          </button>

          <p className="text-xs text-slate-500 text-center mt-4">
            Your payment is secured with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;