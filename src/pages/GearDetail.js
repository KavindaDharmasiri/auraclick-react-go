import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const GearDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState('daily');

  // Mock gear data - in real app this would come from API
  const gearItem = {
    id: 1,
    name: 'Sony Alpha a7R V',
    category: 'Mirrorless',
    description: '61MP Full-Frame, 8K Video, AI Focus',
    fullDescription: 'The Sony Alpha a7R V is a high-resolution full-frame mirrorless camera that delivers exceptional image quality with its 61MP back-illuminated Exmor R CMOS sensor. Perfect for professional photography and videography.',
    price: { daily: 149, weekly: 750, monthly: 2500 },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYlHJJDU-jH4U4Ai9anVzjYajO9Ym52D2rrTpdsgjksahExXEc-PlCSXJ6OZix3sFeEZM99dbbJ84Rv8jaP6DI8ZtdNf5MuW8I6dro7Qoy8RYbd0iYco5jx6fkAEMA8galBdkzg-wP3henLMpHs5DLppduox2sROY41isSzSJloJhm9lpEyv6ivsxi3cUKNJTACWzEq-vnDkMUMzfWtqRm_yWOzfVfMA-mPPkLYJczsV66d5NJPCSIoBJIZ3CggA0ThWsOMO8oHVN-',
    status: 'Available',
    condition: 'New',
    tags: ['E-MOUNT', '4K/60P'],
    specs: [
      { label: 'Resolution', value: '61MP' },
      { label: 'Video', value: '8K/24p, 4K/60p' },
      { label: 'Mount', value: 'Sony E-mount' },
      { label: 'ISO Range', value: '100-32000' },
      { label: 'Weight', value: '723g' }
    ]
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', { 
      item: gearItem, 
      quantity, 
      duration: selectedDuration,
      price: gearItem.price[selectedDuration] * quantity
    });
    // Add to cart logic here
  };

  const getDurationLabel = (duration) => {
    switch(duration) {
      case 'daily': return 'per day';
      case 'weekly': return 'per week';
      case 'monthly': return 'per month';
      default: return 'per day';
    }
  };

  return (
    <div className="bg-background-dark text-white min-h-screen">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <button onClick={() => navigate('/gear-rentals')} className="hover:text-primary">
            Gear Rentals
          </button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-white">{gearItem.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800">
              <img 
                src={gearItem.image} 
                alt={gearItem.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                  {gearItem.category}
                </span>
                <span className="text-green-500 text-xs font-bold flex items-center gap-1">
                  <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  {gearItem.status}
                </span>
              </div>
              <h1 className="text-4xl font-black mb-4">{gearItem.name}</h1>
              <p className="text-slate-400 text-lg mb-6">{gearItem.fullDescription}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {gearItem.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-slate-800 rounded-full text-xs font-bold text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-xl font-bold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {gearItem.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rental Options */}
            <div className="bg-slate-800/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Rental Options</h3>
              
              {/* Duration Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3">Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(gearItem.price).map(([duration, price]) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        selectedDuration === duration
                          ? 'bg-primary text-white'
                          : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                    >
                      <div className="font-bold capitalize">{duration}</div>
                      <div className="text-sm opacity-80">${price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="size-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="size-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t border-slate-700 pt-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">
                    {quantity}x {gearItem.name} ({getDurationLabel(selectedDuration)})
                  </span>
                  <span className="font-bold">
                    ${(gearItem.price[selectedDuration] * quantity).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    ${(gearItem.price[selectedDuration] * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GearDetail;