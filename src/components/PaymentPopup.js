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
  const [loading, setLoading] = useState(false);

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
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        alert('Please fill in all card details');
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
              <div className="text-xs text-slate-400">${bookingDetails?.total}</div>
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
              <div className="text-xs text-slate-400">${(bookingDetails?.total / 2) || 160}</div>
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
              <span>${bookingDetails?.total}</span>
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
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-primary focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-primary focus:outline-none"
                />
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

          <p className="text-xs text-slate-500 text-center mt-4">
            Your payment is secured with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;