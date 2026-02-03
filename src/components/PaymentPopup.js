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
  const [cardErrors, setCardErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const allTimeSlots = [
    { id: 1, time: '09:00 - 11:00' },
    { id: 2, time: '11:00 - 13:00' },
    { id: 3, time: '13:00 - 15:00' },
    { id: 4, time: '15:00 - 17:00' },
    { id: 5, time: '17:00 - 19:00' },
    { id: 6, time: '19:00 - 21:00' }
  ];

  const validateCard = () => {
    const errors = {};
    
    // Card number validation (16 digits)
    const cardNumber = cardDetails.number.replace(/\s/g, '');
    if (!cardNumber || cardNumber.length !== 16 || !/^\d{16}$/.test(cardNumber)) {
      errors.number = 'Card number must be 16 digits';
    }
    
    // Expiry validation (MM/YY format)
    if (!cardDetails.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
      errors.expiry = 'Enter valid expiry (MM/YY)';
    } else {
      const [month, year] = cardDetails.expiry.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        errors.expiry = 'Card has expired';
      }
    }
    
    // CVV validation (3 digits)
    if (!cardDetails.cvv || !/^\d{3}$/.test(cardDetails.cvv)) {
      errors.cvv = 'CVV must be 3 digits';
    }
    
    // Name validation
    if (!cardDetails.name.trim() || cardDetails.name.trim().length < 2) {
      errors.name = 'Enter valid cardholder name';
    }
    
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
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
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'credit_card' },
    { id: 'paypal', name: 'PayPal', icon: 'account_balance_wallet' },
    { id: 'apple', name: 'Apple Pay', icon: 'phone_iphone' },
    { id: 'google', name: 'Google Pay', icon: 'account_balance_wallet' }
  ];

  const handlePayment = async () => {
    if (isPhotoshoot) {
      if (!bookingDetails?.serviceType || !bookingDetails?.subService) {
        alert('Please select a service first');
        return;
      }
    } else {
      if (!bookingDetails?.timeSlots || bookingDetails.timeSlots.length === 0) {
        alert('Please select at least one time slot');
        return;
      }
    }
    
    if (selectedPayment === 'card') {
      if (!validateCard()) {
        toast.error('Please fix card details errors');
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
    setCardErrors({});
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={resetAndClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-track-slate-200 dark:scrollbar-track-slate-800 scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Complete Payment</h2>
          <button 
            onClick={resetAndClose}
            className="size-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-900 dark:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Payment Amount Options */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Payment Amount</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFullPayment(true)}
              className={`p-3 rounded-xl border text-center ${
                fullPayment
                  ? 'border-primary bg-primary/10'
                  : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
              }`}
            >
              <div className="text-sm font-bold text-gray-900 dark:text-white">Full Payment</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">${bookingDetails?.total}</div>
            </button>
            <button
              onClick={() => setFullPayment(false)}
              className={`p-3 rounded-xl border text-center ${
                !fullPayment
                  ? 'border-primary bg-primary/10'
                  : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
              }`}
            >
              <div className="text-sm font-bold text-gray-900 dark:text-white">Half Payment</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">${(bookingDetails?.total / 2) || 160}</div>
            </button>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">{isPhotoshoot ? 'Service' : 'Studio'}</span>
              <span className="text-gray-900 dark:text-white">{isPhotoshoot ? bookingDetails?.service : bookingDetails?.studio}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Duration</span>
              <span className="text-gray-900 dark:text-white">{bookingDetails?.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Date</span>
              <span className="text-gray-900 dark:text-white">{bookingDetails?.date}</span>
            </div>
            {isPhotoshoot ? (
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Location</span>
                <span className="text-gray-900 dark:text-white">{bookingDetails?.location}</span>
              </div>
            ) : (
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Time Slots</span>
                <span className="text-gray-900 dark:text-white">{bookingDetails?.timeSlots?.length || 0} selected</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-primary pt-2 border-t border-slate-200 dark:border-slate-800">
              <span>Total</span>
              <span>${bookingDetails?.total}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Payment Method</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 ${
                  selectedPayment === method.id
                    ? 'border-primary bg-primary/10'
                    : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
                }`}
              >
                <span className="material-symbols-outlined text-primary">{method.icon}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{method.name}</span>
              </button>
            ))}
          </div>

          {/* Card Details Form */}
          {selectedPayment === 'card' && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    setCardDetails({...cardDetails, number: formatted});
                    if (cardErrors.number) setCardErrors({...cardErrors, number: ''});
                  }}
                  maxLength={19}
                  className={`w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border focus:outline-none text-gray-900 dark:text-white placeholder-slate-500 ${
                    cardErrors.number ? 'border-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-primary'
                  }`}
                />
                {cardErrors.number && <p className="text-red-500 text-xs mt-1">{cardErrors.number}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => {
                      const formatted = formatExpiry(e.target.value);
                      setCardDetails({...cardDetails, expiry: formatted});
                      if (cardErrors.expiry) setCardErrors({...cardErrors, expiry: ''});
                    }}
                    maxLength={5}
                    className={`w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border focus:outline-none text-gray-900 dark:text-white placeholder-slate-500 ${
                      cardErrors.expiry ? 'border-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-primary'
                    }`}
                  />
                  {cardErrors.expiry && <p className="text-red-500 text-xs mt-1">{cardErrors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setCardDetails({...cardDetails, cvv: value});
                      if (cardErrors.cvv) setCardErrors({...cardErrors, cvv: ''});
                    }}
                    maxLength={3}
                    className={`w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border focus:outline-none text-gray-900 dark:text-white placeholder-slate-500 ${
                      cardErrors.cvv ? 'border-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-primary'
                    }`}
                  />
                  {cardErrors.cvv && <p className="text-red-500 text-xs mt-1">{cardErrors.cvv}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => {
                    setCardDetails({...cardDetails, name: e.target.value});
                    if (cardErrors.name) setCardErrors({...cardErrors, name: ''});
                  }}
                  className={`w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border focus:outline-none text-gray-900 dark:text-white placeholder-slate-500 ${
                    cardErrors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-primary'
                  }`}
                />
                {cardErrors.name && <p className="text-red-500 text-xs mt-1">{cardErrors.name}</p>}
              </div>
            </div>
          )}

          {/* Other Payment Methods */}
          {selectedPayment !== 'card' && (
            <div className="mb-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
              <span className="material-symbols-outlined text-primary text-2xl mb-2 block">
                {paymentMethods.find(m => m.id === selectedPayment)?.icon}
              </span>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You'll be redirected to {paymentMethods.find(m => m.id === selectedPayment)?.name} to complete payment
              </p>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={loading || (isPhotoshoot ? !bookingDetails?.serviceType : (bookingDetails?.timeSlots?.length === 0))}
            className={`w-full py-4 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 ${
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
                Pay ${fullPayment ? bookingDetails?.total : (bookingDetails?.total / 2) || 160}
                <span className="material-symbols-outlined">lock</span>
              </>
            )}
          </button>

          <p className="text-xs text-slate-600 dark:text-slate-500 text-center mt-4">
            Your payment is secured with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;