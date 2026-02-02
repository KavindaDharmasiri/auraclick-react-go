import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navigation from '../components/Navigation';

const GearDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState('daily');
  const [gearItem, setGearItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGearDetail();
  }, [id]);

  const loadGearDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5555/api/gear/${id}`);
      if (response.ok) {
        const data = await response.json();
        setGearItem(data);
      }
    } catch (error) {
      console.error('Failed to load gear detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPrice = () => {
    if (!gearItem) return 0;
    switch(selectedDuration) {
      case 'weekly': return gearItem.rentalPrice * 6;
      case 'monthly': return gearItem.rentalPrice * 25;
      default: return gearItem.rentalPrice;
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5555/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          gearId: gearItem.id,
          quantity: quantity,
          duration: selectedDuration,
          totalPrice: getCurrentPrice() * quantity
        })
      });
      
      if (response.ok) {
        toast.success('Item added to cart!');
      } else {
        toast.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const getDurationLabel = (duration) => {
    switch(duration) {
      case 'daily': return 'per day';
      case 'weekly': return 'per week';
      case 'monthly': return 'per month';
      default: return 'per day';
    }
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

  if (!gearItem) {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Gear not found</h2>
            <button onClick={() => navigate('/gear-rentals')} className="bg-primary text-white px-6 py-3 rounded-xl">
              Back to Rentals
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400 mb-8">
          <button onClick={() => navigate('/gear-rentals')} className="hover:text-primary">
            Gear Rentals
          </button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-gray-900 dark:text-white">{gearItem.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800">
              {gearItem.images && gearItem.images.length > 0 ? (
                <img 
                  src={gearItem.images[0]} 
                  alt={gearItem.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-slate-400">photo_camera</span>
                </div>
              )}
            </div>
          </div>

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
              <p className="text-gray-600 dark:text-slate-400 text-lg mb-6">{gearItem.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-gray-600 dark:text-slate-400">Brand</span>
                  <span className="font-semibold">{gearItem.brand}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-gray-600 dark:text-slate-400">Model</span>
                  <span className="font-semibold">{gearItem.model}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-gray-600 dark:text-slate-400">Condition</span>
                  <span className="font-semibold">{gearItem.condition}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-gray-600 dark:text-slate-400">Available</span>
                  <span className="font-semibold">{gearItem.stock} units</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Rental Options</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3">Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedDuration('daily')}
                    className={`p-3 rounded-xl text-center transition-all ${
                      selectedDuration === 'daily'
                        ? 'bg-primary text-gray-900 dark:text-white'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <div className="font-bold">Daily</div>
                    <div className="text-sm opacity-80">${gearItem.rentalPrice}</div>
                  </button>
                  <button
                    onClick={() => setSelectedDuration('weekly')}
                    className={`p-3 rounded-xl text-center transition-all ${
                      selectedDuration === 'weekly'
                        ? 'bg-primary text-gray-900 dark:text-white'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <div className="font-bold">Weekly</div>
                    <div className="text-sm opacity-80">${(gearItem.rentalPrice * 6).toFixed(0)}</div>
                  </button>
                  <button
                    onClick={() => setSelectedDuration('monthly')}
                    className={`p-3 rounded-xl text-center transition-all ${
                      selectedDuration === 'monthly'
                        ? 'bg-primary text-gray-900 dark:text-white'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <div className="font-bold">Monthly</div>
                    <div className="text-sm opacity-80">${(gearItem.rentalPrice * 25).toFixed(0)}</div>
                  </button>
                </div>
              </div>

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
                    onClick={() => setQuantity(Math.min(gearItem.stock, quantity + 1))}
                    disabled={quantity >= gearItem.stock}
                    className="size-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-slate-400">
                    {quantity}x {gearItem.name} ({getDurationLabel(selectedDuration)})
                  </span>
                  <span className="font-bold">
                    ${(getCurrentPrice() * quantity).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    ${(getCurrentPrice() * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-gray-900 dark:text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
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