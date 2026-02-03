import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../rangeSlider.css';

const GearRentals = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [cartCount, setCartCount] = useState(2);
  const [categories, setCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [gearItems, setGearItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(true);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 1000]);
  const visibleCategories = categories.slice(0, 4);
  const hiddenCategories = categories.slice(4);

  useEffect(() => {
    // Initialize theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    loadData();
  }, []);

  useEffect(() => {
    console.log("Selected category changed to:", selectedCategory);
    filterBrandsByCategory();
  }, [selectedCategory, allBrands]);

  const filterGear = async (category = selectedCategory, brands = selectedBrands, priceMin = priceRange[0], priceMax = priceRange[1], page = 0) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: '9'
      });
      console.log("Filtering gear with params:", { category, brands, priceMin, priceMax, page });
      
      if (category) params.append('category', category);
      if (brands.length > 0) {
        brands.forEach(brand => params.append('brands', brand));
      }
      if (priceMin > 50) params.append('minPrice', priceMin);
      if (priceMax < 1000) params.append('maxPrice', priceMax);
      
      const endpoint = `http://localhost:5555/api/gear/filter?${params}`;
      console.log('Filter endpoint:', endpoint);
      
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log('Filter response:', data);
      setGearItems(data.content || data);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || page);
    } catch (error) {
      console.error('Failed to filter gear:', error);
    }
  };

  const filterBrandsByCategory = () => {
    if (!allBrands.length) {
      console.log('No brands data available to filter.');
      setBrands([]);
      return;
    }
    console.log('Filtering brands for category:', selectedCategory);
    if (!selectedCategory) {
      // Show all brands when no category is selected
      setBrands(allBrands.map(brand => brand.name));
      return;
    }
    
    const filteredBrands = allBrands.filter(brand => 
      brand.category?.name === selectedCategory || brand.categoryName === selectedCategory
    );
    
    setBrands(filteredBrands.map(brand => brand.name));
    setSelectedBrands([]);
  };

  const loadData = async () => {
    try {
      const [categoriesRes, brandsRes, gearRes] = await Promise.all([
        fetch('http://localhost:5555/api/settings/categories'),
        fetch('http://localhost:5555/api/settings/brands'),
        fetch('http://localhost:5555/api/gear')
      ]);

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        console.log('Categories loaded:', categoriesData);
        setCategories(categoriesData.map(cat => cat.name));
      }

      if (brandsRes.ok) {
        const brandsData = await brandsRes.json();
        console.log('Brands loaded:', brandsData);
        setAllBrands(brandsData);
      }

      if (gearRes.ok) {
        const gearData = await gearRes.json();
        console.log('Initial gear data:', gearData);
        // Set initial gear data to see if there's any gear at all
        setGearItems(gearData.content || gearData);
        setTotalPages(gearData.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandToggle = (brand) => {
    const newBrands = selectedBrands.includes(brand) 
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    filterGear(selectedCategory, newBrands, priceRange[0], priceRange[1]);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'In Stock': 'bg-green-500 text-gray-900 dark:text-white',
      'Available': 'bg-green-500 text-gray-900 dark:text-white',
      'Low Stock': 'bg-amber-500 text-gray-900 dark:text-white',
      'Out on Rent': 'bg-red-500 text-gray-900 dark:text-white',
      'Fully Booked': 'bg-red-500 text-gray-900 dark:text-white',
      'Unavailable': 'bg-gray-500 text-gray-900 dark:text-white'
    };
    
    return (
      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1 ${statusStyles[status] || 'bg-gray-500 text-gray-900 dark:text-white'}`}>
        {!['Out on Rent', 'Fully Booked', 'Unavailable'].includes(status) && <span className="size-1.5 bg-white rounded-full animate-pulse"></span>}
        {status}
      </span>
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
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-900 dark:text-white min-h-screen">
      <Navigation />

      <main className="w-full px-0 py-8">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h1 className="text-slate-900 dark:text-gray-900 dark:text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight">Rent Professional Gear</h1>
            <p className="text-slate-500 dark:text-[#a19db9] text-lg font-normal">Premium equipment for your next shoot. Available for local pickup in NYC or priority delivery.</p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap bg-slate-100 dark:bg-[#2b2839]/30 p-1.5 rounded-2xl relative">
            {visibleCategories.map((category) => (
              <div 
                key={category}
                onClick={() => {
                  console.log("Selected category:", category);
                  setSelectedCategory(category);
                  console.log("Filtering gear for category:", selectedCategory);
                  filterGear(category, selectedBrands, priceRange[0], priceRange[1]);
                }}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-6 cursor-pointer transition-colors ${
                  selectedCategory === category 
                    ? 'bg-primary shadow-lg shadow-primary/20' 
                    : 'bg-transparent hover:bg-slate-200 dark:hover:bg-[#2b2839]'
                }`}
              >
                <p className={`text-sm font-bold ${selectedCategory === category ? 'text-white' : 'text-slate-600 dark:text-[#a19db9]'}`}>
                  {category}
                </p>
              </div>
            ))}
            {hiddenCategories.length > 0 && (
              <div className="relative">
                <button 
                  onClick={() => setShowMoreCategories(!showMoreCategories)}
                  className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 bg-transparent hover:bg-slate-200 dark:hover:bg-[#2b2839] cursor-pointer transition-colors"
                >
                  <span className="text-sm font-bold text-slate-600 dark:text-[#a19db9]">More</span>
                  <span className="material-symbols-outlined text-sm text-slate-600 dark:text-[#a19db9]">expand_more</span>
                </button>
                {showMoreCategories && (
                  <div className="absolute top-12 right-0 bg-white dark:bg-[#2b2839] border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg z-10 min-w-[150px]">
                    {hiddenCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowMoreCategories(false);
                          filterGear(category, selectedBrands, priceRange[0], priceRange[1]);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 first:rounded-t-xl last:rounded-b-xl ${
                          selectedCategory === category ? 'text-primary bg-primary/10' : 'text-slate-700 dark:text-white'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
            <div className="flex flex-col gap-6 bg-slate-50 dark:bg-transparent p-6 lg:p-0 rounded-2xl">
              <div>
                <h3 className="text-slate-900 dark:text-gray-900 dark:text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Filters
                </h3>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between group cursor-pointer px-3 py-2 rounded-xl bg-primary/10 dark:bg-[#2b2839]" onClick={() => setShowBrands(!showBrands)}>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary dark:text-gray-900 dark:text-white text-[20px]">sell</span>
                      <p className="text-primary dark:text-gray-900 dark:text-white text-sm font-bold">Brands</p>
                    </div>
                    <span className="material-symbols-outlined text-primary dark:text-gray-900 dark:text-white text-[18px]">{showBrands ? 'expand_less' : 'expand_more'}</span>
                  </div>
                  {showBrands && (
                    <div className="px-3 py-2 space-y-1 max-h-60 overflow-y-auto">
                      {brands.map((brand) => (
                        <label key={brand} className="flex items-center gap-x-3 py-2 cursor-pointer">
                          <input 
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandToggle(brand)}
                            className="h-5 w-5 rounded border-slate-300 dark:border-[#3f3b54] border-2 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0" 
                            type="checkbox"
                          />
                          <p className="text-slate-700 dark:text-gray-900 dark:text-white text-sm font-medium">{brand}</p>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3 px-3 py-2 mb-2 hover:bg-slate-100 dark:hover:bg-[#2b2839] rounded-xl cursor-pointer transition-colors" onClick={() => setShowPriceRange(!showPriceRange)}>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-500 dark:text-[#a19db9] text-[20px]">payments</span>
                    <p className="text-slate-700 dark:text-[#a19db9] text-sm font-medium">Price Range</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-500 dark:text-[#a19db9] text-[18px]">{showPriceRange ? 'expand_less' : 'expand_more'}</span>
                </div>
                {showPriceRange && (
                  <div className="px-3">
                    <div className="mb-4">
                      <div className="relative">
                        <div className="h-2 bg-slate-200 dark:bg-[#3f3b54] rounded-full relative">
                          <div 
                            className="absolute h-2 bg-primary rounded-full"
                            style={{
                              left: `${((priceRange[0] - 50) / (1000 - 50)) * 100}%`,
                              right: `${100 - ((priceRange[1] - 50) / (1000 - 50)) * 100}%`
                            }}
                          />
                        </div>
                        <div className="relative -mt-2">
                          <input 
                            type="range" 
                            min="50" 
                            max="1000" 
                            value={priceRange[0]} 
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (val <= priceRange[1] - 10) {
                                const newRange = [val, priceRange[1]];
                                setPriceRange(newRange);
                                filterGear(selectedCategory, selectedBrands, newRange[0], newRange[1]);
                              }
                            }}
                            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-thumb"
                          />
                          <input 
                            type="range" 
                            min="50" 
                            max="1000" 
                            value={priceRange[1]} 
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (val >= priceRange[0] + 10) {
                                const newRange = [priceRange[0], val];
                                setPriceRange(newRange);
                                filterGear(selectedCategory, selectedBrands, newRange[0], newRange[1]);
                              }
                            }}
                            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-thumb"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-500">${priceRange[0]}</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">${priceRange[1]}</span>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedBrands([]);
                  setPriceRange([50, 1000]);
                  filterGear('', [], 50, 1000, 0);
                }}
                className="w-full mt-4 flex items-center justify-center overflow-hidden rounded-xl h-11 px-4 bg-slate-200 dark:bg-[#2b2839] text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-300 dark:hover:bg-[#3f3b54] transition-colors"
              >
                <span className="truncate">Reset All Filters</span>
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {gearItems.map((item) => {
                const isUnavailable = ['Out on Rent', 'Fully Booked', 'Unavailable'].includes(item.status);
                return (
                  <div key={item.id} className={`group bg-white dark:bg-[#1a1630] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#2b2839] hover:border-primary dark:hover:border-primary/50 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5 ${isUnavailable ? 'opacity-80' : ''}`}>
                    <div className="relative aspect-[4/3] bg-slate-100 dark:bg-[#25213b]">
                      {item.images && item.images.length > 0 ? (
                        <img 
                          className={`w-full h-full object-cover ${isUnavailable ? 'grayscale' : ''}`}
                          src={item.images[0]}
                          alt={item.name}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-6xl text-slate-300">photo_camera</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {getStatusBadge(item.status)}
                      </div>
                      {isUnavailable && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">{item.status}</span>
                        </div>
                      )}
                      {!isUnavailable && (
                        <div className="absolute top-4 right-4">
                          <button className="size-8 bg-black/20 backdrop-blur-md rounded-full text-gray-900 dark:text-white flex items-center justify-center hover:bg-primary transition-colors">
                            <span className="material-symbols-outlined text-[18px]">favorite</span>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col gap-4">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${isUnavailable ? 'text-gray-600 dark:text-slate-400' : 'text-primary'}`}>
                            {item.category}
                          </span>
                          {item.condition && (
                            <span className="text-slate-400 dark:text-[#a19db9] text-xs font-medium">{item.condition}</span>
                          )}
                        </div>
                        <h3 className={`text-lg font-bold leading-tight transition-colors ${isUnavailable ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-gray-900 dark:text-white group-hover:text-primary'}`}>
                          {item.name}
                        </h3>
                        <p className="text-slate-500 dark:text-[#a19db9] text-sm mt-1">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-[#2b2839]">
                        <div>
                          <p className="text-slate-400 dark:text-[#a19db9] text-[10px] font-bold uppercase tracking-tighter">Daily Rate</p>
                          <p className="text-slate-900 dark:text-gray-900 dark:text-white text-xl font-black">
                            ${item.rentalPrice}<span className="text-sm font-normal text-[#a19db9]">/day</span>
                          </p>
                        </div>
                        <button 
                          onClick={() => !isUnavailable && navigate(`/gear/${item.id}`)}
                          className={`rounded-xl h-10 px-4 font-bold text-sm transition-transform flex items-center gap-2 ${
                            isUnavailable 
                              ? 'bg-slate-200 dark:bg-[#2b2839] text-gray-600 dark:text-slate-400 cursor-not-allowed' 
                              : 'bg-primary hover:bg-primary/90 text-gray-900 dark:text-white active:scale-95'
                          }`}
                          disabled={isUnavailable}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isUnavailable ? 'schedule' : 'add'}
                          </span>
                          {isUnavailable ? 'Waitlist' : 'Rent'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <button 
                  onClick={() => currentPage > 0 && filterGear(selectedCategory, selectedBrands, priceRange[0], priceRange[1], currentPage - 1)}
                  disabled={currentPage === 0}
                  className="size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#2b2839] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-[#3f3b54] disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button 
                      key={i}
                      onClick={() => filterGear(selectedCategory, selectedBrands, priceRange[0], priceRange[1], i)}
                      className={`size-10 flex items-center justify-center rounded-xl font-bold ${
                        i === currentPage 
                          ? 'bg-primary text-white' 
                          : 'bg-slate-100 dark:bg-[#2b2839] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-[#3f3b54]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => currentPage < totalPages - 1 && filterGear(selectedCategory, selectedBrands, priceRange[0], priceRange[1], currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                  className="size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#2b2839] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-[#3f3b54] disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-[#2b2839] py-12 px-6 lg:px-20 bg-slate-50 dark:bg-background-dark">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary dark:text-gray-900 dark:text-white">
              <div className="size-6">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold">Aura</h2>
            </div>
            <p className="text-slate-500 dark:text-[#a19db9] text-sm">Professional photography services and equipment rental platform for the modern creative.</p>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-gray-900 dark:text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-[#a19db9]">
              <li><a className="hover:text-primary transition-colors" href="#">How it works</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Gear Insurance</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-gray-900 dark:text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-[#a19db9]">
              <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Safety Guide</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-gray-900 dark:text-white font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input className="flex-1 rounded-xl bg-white dark:bg-[#2b2839] border border-slate-200 dark:border-none text-sm px-4 h-10 focus:ring-1 focus:ring-primary outline-none" placeholder="Email address"/>
              <button className="bg-primary text-gray-900 dark:text-white rounded-xl px-4 text-xs font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-[#2b2839] flex flex-wrap justify-between gap-4 text-xs text-slate-400 dark:text-[#a19db9]">
          <p>© 2024 Aura Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary" href="#">Privacy Policy</a>
            <a className="hover:text-primary" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GearRentals;
