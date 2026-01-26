import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Cart = () => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [cardData, setCardData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });

  const paymentMethods = [
    { id: 'card', name: 'Cards (Visa/Master)', icon: 'credit_card' },
    { id: 'upay', name: 'UPay Wallet', logo: 'UPay' },
    { id: 'sampath', name: 'Sampath Vishwa', logo: 'SAMPATH' },
    { id: 'combank', name: 'ComBank Online', logo: 'COMBANK' },
    { id: 'hnb', name: 'HNB Momo', logo: 'HNB' },
    { id: 'other', name: 'Other Banks', icon: 'account_balance' }
  ];

  const orderItems = [
    {
      name: 'Aura Platinum Package',
      description: '6-hour session • Wedding Shoot',
      price: 125000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU2tdDGJiLZTMoNGk6KcsX2Wj8pYxN9_xGsfk_LvBxF-42xzDZGgtr8zqyxFCd2LERay_cGYkgirbX_Z9f59jrGeaiw2QYJkzJGt1EsTVPtTobhxdsRd2OSrd9V_n9k5tU3VbSpjpGh_mTTFM-rwB59gsC4GtXc5ouMLsvQAjjtqx9oq8cPv_lc0sPDDNBV_FNo-CwavivutiCRukSpzTMXQt5RH-gd7T-BNBkMAW-tHHmYPKMuY8vXTyvUZKGt652Nv4rfGmYEyLh'
    },
    {
      name: 'Pro Lighting Kit Rental',
      description: 'Full Day • 3 Point Lighting',
      price: 12500,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrh1diHvO4WzkIre8t0noQjujkIcgve7ef7aKhASMU2enesa6nTXPUbQRdMNhsHvWqgst7MtXzwdKzxRGM5gt7LvSQxhZA_Wx_kHie4NST88YCzRQGENkbnzkClZLy5h0yatdl_4i_uMLZ9CSadAf3wnS59SyOK7skO6LvOZczgb4K3e5R0u29wsQcXGYlejKeof9riE1NtGoHl5Ks5KvNatHxu_CB71nbELoLw35hb1wDbow4uc99zIR1WCffRRS8QTzPbKiUzDON'
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const serviceFee = subtotal * 0.03;
  const tax = 0;
  const total = subtotal + serviceFee + tax;

  const handleInputChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = () => {
    console.log('Processing payment:', { selectedPayment, cardData, total });
  };

  return (
    <div className="bg-background-dark text-white min-h-screen">
      <Navigation />
      
      <main className="w-full px-6 lg:px-10 py-10">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 max-w-6xl mx-auto">
          <Link to="/cart" className="text-slate-400 text-sm font-medium hover:underline">Cart</Link>
          <span className="text-slate-400 text-sm material-symbols-outlined scale-75">chevron_right</span>
          <Link to="#" className="text-slate-400 text-sm font-medium hover:underline">Information</Link>
          <span className="text-slate-400 text-sm material-symbols-outlined scale-75">chevron_right</span>
          <span className="text-white text-sm font-bold">Payment</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Left Column: Payment Details */}
          <div className="flex-1">
            <h1 className="text-white tracking-tight text-3xl font-extrabold mb-8">Secure Checkout</h1>
            
            {/* Payment Methods */}
            <div className="mb-10">
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Select Payment Method
              </h2>
              <p className="text-slate-400 text-sm mb-6">Choose from international cards or local Sri Lankan bank portals.</p>
              
              {/* Payment Method Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center justify-center gap-2 text-center ${
                      selectedPayment === method.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-slate-800 hover:border-primary'
                    }`}
                  >
                    {method.icon ? (
                      <span className="material-symbols-outlined text-3xl text-primary">{method.icon}</span>
                    ) : (
                      <div className={`h-8 w-16 rounded flex items-center justify-center font-bold text-[10px] text-white ${
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
                <div className="bg-white/5 p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Cardholder Name</label>
                      <input 
                        name="name"
                        value={cardData.name}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary text-white" 
                        placeholder="John Doe" 
                        type="text"
                      />
                    </div>
                    <div className="md:col-span-2 relative">
                      <label className="block text-sm font-semibold mb-2">Card Number</label>
                      <div className="relative">
                        <input 
                          name="number"
                          value={cardData.number}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border-slate-700 rounded-xl px-4 py-3 pr-12 focus:ring-primary focus:border-primary text-white" 
                          placeholder="0000 0000 0000 0000" 
                          type="text"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <div className="w-8 h-5 bg-slate-200 rounded text-[6px] flex items-center justify-center font-bold text-black">VISA</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                      <input 
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary text-white" 
                        placeholder="MM / YY" 
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">CVV</label>
                      <div className="relative">
                        <input 
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary text-white" 
                          placeholder="***" 
                          type="password"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg cursor-help" title="3-digit security code on the back of your card">help</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-800 mb-8">
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
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-800 sticky top-28">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-8">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div 
                      className="size-16 rounded-lg bg-center bg-cover flex-shrink-0 border border-slate-700" 
                      style={{ backgroundImage: `url('${item.image}')` }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.description}</p>
                      <p className="text-sm font-bold mt-1">LKR {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 pt-6 border-t border-slate-700 mb-6">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Subtotal</span>
                  <span>LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Service Fee (3%)</span>
                  <span>LKR {serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Tax (VAT)</span>
                  <span>LKR {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-dashed border-slate-700">
                  <span>Total</span>
                  <div className="text-right">
                    <p>LKR {total.toLocaleString()}</p>
                    <p className="text-[10px] font-normal text-slate-500 uppercase tracking-widest mt-1">~ USD {(total / 300).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span className="material-symbols-outlined text-lg">lock</span>
                Pay LKR {total.toLocaleString()}
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed px-2">
                By clicking Pay Now, you agree to Aura's Terms of Service and Booking Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;