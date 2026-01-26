import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const GearRentals = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Cameras');
  const [selectedBrands, setSelectedBrands] = useState(['Sony']);
  const [cartCount, setCartCount] = useState(2);

  const categories = ['Cameras', 'Lenses', 'Lighting', 'Audio', 'Accessories'];
  const brands = ['Sony', 'Canon', 'Nikon', 'RED Digital'];

  const gearItems = [
    {
      id: 1,
      name: 'Sony Alpha a7R V',
      category: 'Mirrorless',
      description: '61MP Full-Frame, 8K Video, AI Focus',
      price: 149,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYlHJJDU-jH4U4Ai9anVzjYajO9Ym52D2rrTpdsgjksahExXEc-PlCSXJ6OZix3sFeEZM99dbbJ84Rv8jaP6DI8ZtdNf5MuW8I6dro7Qoy8RYbd0iYco5jx6fkAEMA8galBdkzg-wP3henLMpHs5DLppduox2sROY41isSzSJloJhm9lpEyv6ivsxi3cUKNJTACWzEq-vnDkMUMzfWtqRm_yWOzfVfMA-mPPkLYJczsV66d5NJPCSIoBJIZ3CggA0ThWsOMO8oHVN-',
      status: 'Available',
      condition: 'New',
      tags: ['E-MOUNT', '4K/60P']
    },
    {
      id: 2,
      name: 'Canon EOS R5',
      category: 'Mirrorless',
      description: '45MP Full-Frame, 8K Raw, IBIS',
      price: 125,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI-xyTmpiOf0e94YwnEAZO-qGigKtXCG8BWRD8kNFzIngyRWNxnAJ12nij-ZxVE4xZ3yVCBKbJ0S93iOrW12FkgbbgsFJv96rWzCWBzTNeNTTJJy_fQZm4hCwy0iFOZmcfZhpuLtgQo-EaNsiPZmQtqcWR7gdCdoGE5G8UJ7Q02aTbpCmYkTzT60dZ20oaXaD0Y9wJWYFRi6AtciUJPUM_94Xny_PoF0aqzrLSuZtEpeWrQRVQX_iHjOnCoPhELjgQdLMGbcQBacxC',
      status: 'Available',
      condition: 'Popular',
      tags: ['RF-MOUNT', 'LOG-3']
    },
    {
      id: 3,
      name: 'Nikon Z9 Body',
      category: 'Mirrorless',
      description: '45.7MP, 120 fps Stills, 8K/60p',
      price: 195,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm2Rcn1ClLKzbvgvMg8x44dec62JscVz5G0vwLUpnBRBT0q8g4S3xPxAwjw2J85olAiFidai-rbDzsQ3ktDZD9mrVxGyueNitKxKKHSLETMDClb730SwwYfrtPH2-PnbhjTpzXWLAjI9ZWzKS84LoBTW_o391spYKgZ-_xz2gwdskrtHk1SH8ZCvokNS3HRLRmJDzLiEQ9qLP2yUOHvQ1s_gmQ96kotOjJyK3lMCART5B7PvI02YanE9YPFQChVKAr9QdIkQ3xw4Ht',
      status: 'Low Stock',
      condition: 'Pro',
      tags: ['Z-MOUNT', 'WEATHER SEALED']
    },
    {
      id: 4,
      name: 'RED KOMODO 6K',
      category: 'Cinema',
      description: 'Super 35 Sensor, Global Shutter',
      price: 350,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlw4tElAJ0yZe6NSRBAEwRJggXDfQ_cNxKBTaaXWFC7qTV7a2clKfxN9BQHgpiHBt79CLTfDvvH_ZPp1Ye4U_ExlqxU7AFaxsf8BqCmwS1U9nzNVEhHeldsuawJ0Mp5g6CeBeaHMiyUv-d86Pp0ca-iGAYmJIseTsEh-T8DdaojkvqTxI4o2LSYBSsYySnoNc5amZugPHqrIhldVaRFYf9CzhXmXYO6dHtYHYydIhdbsqR1GBuyLDyYtvWlB1RKoLDRD1A_dfdEP4u',
      status: 'Available',
      condition: 'Premium',
      tags: ['RF/PL', 'RAW']
    },
    {
      id: 5,
      name: 'Sony FX6',
      category: 'Cinema',
      description: '4K Full-Frame, 15+ Stops Range',
      price: 220,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5IlRUPMeQqqiNfiuqPrNnQc2ebhMZTRjW7zdDPb1KciJSNnRAdqpVi5xbowRVKXuM8MYkas5cBuHWf1QRvLp1hzO5EkDMWoQCsTkGbaX7gwTkyg7BMypTeIA-ClU_wF_EhzgwF8NVSoOvT8vpYISHaJpqI2R4WGMGhafu1RqH_sT0MCgvK78lgNXVAYNivl01WdaX8CQsQeKPEQpvJZhye9zufbNLRp8cK4HO46FJ8xyKpaFgmlMbUi8vh7Bq7YHHEw211Uw7LQnH',
      status: 'Available',
      condition: 'Top Rated',
      tags: ['E-MOUNT', 'SDI/XLR']
    },
    {
      id: 6,
      name: 'Sony Alpha a7 IV',
      category: 'Mirrorless',
      description: '33MP Full-Frame, 4K/60p',
      price: 85,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj9wqkxbZj5GhVTZSQAodzOeaHEIVigH3sUbIvncc1sz4BZuPUyu9klDtbmPvxG4Dpl3WmJd0Zi7dGEeVCpnU8NNcrdcbw2Afe9oAVz2x8FwPgazwzdEjfaj8gREuHwNfX7BVFtM4GizsqbriPsAae8xVgcl_cHbmWrPXTS6E5dko0eWVFWPde_KK7dNNj5-aF5Acgi9wZ4GzBE1qcIYL3baQlCeeUK62reedx_s7dVpYrxQyVBUQy3vlxWvZ-972ZnIzf1hqChg77',
      status: 'Fully Booked',
      condition: '',
      tags: ['E-MOUNT']
    }
  ];

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Available': 'bg-green-500 text-white',
      'Low Stock': 'bg-amber-500 text-white',
      'Fully Booked': 'bg-red-500 text-white'
    };
    
    return (
      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1 ${statusStyles[status]}`}>
        {status !== 'Fully Booked' && <span className="size-1.5 bg-white rounded-full animate-pulse"></span>}
        {status}
      </span>
    );
  };

  return (
    <div className="bg-background-dark text-white min-h-screen">
      <Navigation />

      <main className="w-full px-0 py-8">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h1 className="text-slate-900 dark:text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight">Rent Professional Gear</h1>
            <p className="text-slate-500 dark:text-[#a19db9] text-lg font-normal">Premium equipment for your next shoot. Available for local pickup in NYC or priority delivery.</p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap bg-slate-100 dark:bg-[#2b2839]/30 p-1.5 rounded-2xl">
            {categories.map((category) => (
              <div 
                key={category}
                onClick={() => setSelectedCategory(category)}
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
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
            <div className="flex flex-col gap-6 bg-slate-50 dark:bg-transparent p-6 lg:p-0 rounded-2xl">
              <div>
                <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Filters
                </h3>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between group cursor-pointer px-3 py-2 rounded-xl bg-primary/10 dark:bg-[#2b2839]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary dark:text-white text-[20px]">sell</span>
                      <p className="text-primary dark:text-white text-sm font-bold">Brands</p>
                    </div>
                    <span className="material-symbols-outlined text-primary dark:text-white text-[18px]">expand_less</span>
                  </div>
                  <div className="px-3 py-2 space-y-1">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-x-3 py-2 cursor-pointer">
                        <input 
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="h-5 w-5 rounded border-slate-300 dark:border-[#3f3b54] border-2 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0" 
                          type="checkbox"
                        />
                        <p className="text-slate-700 dark:text-white text-sm font-medium">{brand}</p>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex items-center gap-3 px-3 py-2 mb-2 hover:bg-slate-100 dark:hover:bg-[#2b2839] rounded-xl cursor-pointer transition-colors">
                  <span className="material-symbols-outlined text-slate-500 dark:text-[#a19db9] text-[20px]">payments</span>
                  <p className="text-slate-700 dark:text-[#a19db9] text-sm font-medium">Price Range</p>
                </div>
                <div className="px-3">
                  <div className="h-1 w-full bg-slate-200 dark:bg-[#3f3b54] rounded-full relative">
                    <div className="absolute left-1/4 right-0 h-1 bg-primary rounded-full"></div>
                    <div className="absolute left-1/4 -top-1.5 size-4 bg-primary border-2 border-white dark:border-background-dark rounded-full shadow-md"></div>
                    <div className="absolute right-0 -top-1.5 size-4 bg-primary border-2 border-white dark:border-background-dark rounded-full shadow-md"></div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <span className="text-xs font-bold text-slate-500">$50</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">$500+</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 flex items-center justify-center overflow-hidden rounded-xl h-11 px-4 bg-slate-200 dark:bg-[#2b2839] text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-300 dark:hover:bg-[#3f3b54] transition-colors">
                <span className="truncate">Reset All Filters</span>
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {gearItems.map((item) => (
                <div key={item.id} className={`group bg-white dark:bg-[#1a1630] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#2b2839] hover:border-primary dark:hover:border-primary/50 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5 ${item.status === 'Fully Booked' ? 'opacity-80' : ''}`}>
                  <div className="relative aspect-[4/3] bg-slate-100 dark:bg-[#25213b]">
                    <img 
                      className={`w-full h-full object-cover ${item.status === 'Fully Booked' ? 'grayscale' : ''}`}
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {getStatusBadge(item.status)}
                    </div>
                    {item.status === 'Fully Booked' && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-sm uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">Fully Booked</span>
                      </div>
                    )}
                    {item.status !== 'Fully Booked' && (
                      <div className="absolute top-4 right-4">
                        <button className="size-8 bg-black/20 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">favorite</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.status === 'Fully Booked' ? 'text-slate-400' : 'text-primary'}`}>
                          {item.category}
                        </span>
                        {item.condition && (
                          <span className="text-slate-400 dark:text-[#a19db9] text-xs font-medium">{item.condition}</span>
                        )}
                      </div>
                      <h3 className={`text-lg font-bold leading-tight transition-colors ${item.status === 'Fully Booked' ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white group-hover:text-primary'}`}>
                        {item.name}
                      </h3>
                      <p className="text-slate-500 dark:text-[#a19db9] text-sm mt-1">{item.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className={`px-2 py-1 rounded text-[10px] font-bold ${item.status === 'Fully Booked' ? 'bg-slate-100 dark:bg-[#2b2839] text-slate-400' : 'bg-slate-100 dark:bg-[#2b2839] text-slate-600 dark:text-[#a19db9]'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-[#2b2839]">
                      <div>
                        <p className="text-slate-400 dark:text-[#a19db9] text-[10px] font-bold uppercase tracking-tighter">Daily Rate</p>
                        <p className="text-slate-900 dark:text-white text-xl font-black">
                          ${item.price}<span className="text-sm font-normal text-[#a19db9]">/day</span>
                        </p>
                      </div>
                      <button 
                        onClick={() => item.status !== 'Fully Booked' && navigate(`/gear/${item.id}`)}
                        className={`rounded-xl h-10 px-4 font-bold text-sm transition-transform flex items-center gap-2 ${
                          item.status === 'Fully Booked' 
                            ? 'bg-slate-200 dark:bg-[#2b2839] text-slate-400 cursor-not-allowed' 
                            : 'bg-primary hover:bg-primary/90 text-white active:scale-95'
                        }`}
                        disabled={item.status === 'Fully Booked'}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {item.status === 'Fully Booked' ? 'schedule' : 'add'}
                        </span>
                        {item.status === 'Fully Booked' ? 'Waitlist' : 'Rent'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center items-center gap-4">
              <button className="size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#2b2839] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-[#3f3b54]">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex gap-2">
                <button className="size-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold">1</button>
                <button className="size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#2b2839] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-[#3f3b54] font-medium">2</button>
                <button className="size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#2b2839] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-[#3f3b54] font-medium">3</button>
                <span className="text-slate-500 py-2">...</span>
                <button className="size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#2b2839] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-[#3f3b54] font-medium">8</button>
              </div>
              <button className="size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#2b2839] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-[#3f3b54]">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-[#2b2839] py-12 px-6 lg:px-20 bg-slate-50 dark:bg-background-dark">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary dark:text-white">
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
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-[#a19db9]">
              <li><a className="hover:text-primary transition-colors" href="#">How it works</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Gear Insurance</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-[#a19db9]">
              <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Safety Guide</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input className="flex-1 rounded-xl bg-white dark:bg-[#2b2839] border border-slate-200 dark:border-none text-sm px-4 h-10 focus:ring-1 focus:ring-primary outline-none" placeholder="Email address"/>
              <button className="bg-primary text-white rounded-xl px-4 text-xs font-bold">Join</button>
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