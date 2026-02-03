import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import PaymentPopup from '../components/PaymentPopup';

const PhotoshootBookings = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('Urban Techwear');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('H2');
  const [selectedLocation, setSelectedLocation] = useState('STUDIO');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const themes = [
    { name: 'Ethereal Forest', icon: 'forest' },
    { name: 'Urban Techwear', icon: 'precision_manufacturing' },
    { name: 'Golden Hour Minimalist', icon: 'wb_twilight' }
  ];

  const colorPalette = [
    { color: '#0F172A', name: 'Obsidian' },
    { color: '#8B5CF6', name: 'Vivid Violet' },
    { color: '#EC4899', name: 'Neon Pink' },
    { color: '#3B82F6', name: 'Electric Blue' },
    { color: '#F8FAFC', name: 'Mist' }
  ];

  const services = [
    {
      service: 'SS',
      subService: 'PORTRAIT',
      title: 'Portrait Session',
      price: '$250',
      duration: '2 Hours',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATpBFel0J0-gMpMrSicrFrtaEjpRGmxkDelZymk2UXfFtuPHUnqJEqNnhksHMNpRY0fF_fMLUew00-PcaFntVs7RRbyV7asbMiyhF_e8nRhAveLoNfdzpp-ImXIkl98jvVghtqEDDuT2kPdgN2sh3zds9srSvpAGDRp5Lh9DDcwSZnA4_ix8dtgxd0m59_DrWsbaO2zXpsKIAMSpAfbnrp7DDK5VkAjbBzl2usMFjwAO3WDuwk2aQyhFqNlSe_chcTzlkSEh6VLPdm',
      popular: true
    },
    {
      service: 'OS',
      subService: 'NATURE',
      title: 'Outdoor Nature',
      price: '$300',
      duration: '3 Hours',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOHWEiM_vgYuIFje690wUSQ9eCUrwHzcFVnBhEyYTcwQD0QSUFfw7tfFHsaVEau_mvBoryGqj8RA7AQURfHIkDn_q2PKdTG9fgiofFHNfVhAINwUNaKKjie1TIakrnhBColYEPTmgF725eqOaUuKtqdFDb6yMupS0lGxlB0AmDa4jaInPnTAMehMDzjOw7CX2FGB5FeO92UO0_J4zufNWfsP8192eObgPUJSCAN0QF_r80L4GgL3E_6C7crxstf6TaDSr2Fe0cJ6iv'
    },
    {
      service: 'COM',
      subService: 'PRODUCT',
      title: 'Commercial Shoot',
      price: '$1,200',
      duration: 'Full Day',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOHWEiM_vgYuIFje690wUSQ9eCUrwHzcFVnBhEyYTcwQD0QSUFfw7tfFHsaVEau_mvBoryGqj8RA7AQURfHIkDn_q2PKdTG9fgiofFHNfVhAINwUNaKKjie1TIakrnhBColYEPTmgF725eqOaUuKtqdFDb6yMupS0lGxlB0AmDa4jaInPnTAMehMDzjOw7CX2FGB5FeO92UO0_J4zufNWfsP8192eObgPUJSCAN0QF_r80L4GgL3E_6C7crxstf6TaDSr2Fe0cJ6iv'
    },
    {
      service: 'EVT',
      subService: 'WEDDING',
      title: 'Event Coverage',
      price: '$800',
      duration: '4 Hours+',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBd7kxQWhJFjo8u2slz51rrPhAEITaGGwScedcWfASj4yQLo1ms8fNLB1pgkViXh_QCxNpnd6rjokeYLJwbSa961lxL_s-1hueyq82M4OTzvVQGeiLKS-xs19yG8BQfPT9S7JUNjqT83uLYWTei0PBdxHha5HnhlFmLJ6JKMRRtOwaKCkQrvtdH66OOSfCIb5sPmprnQL8xuEodIIWDZS91O6ktx7cOfUJUbpmLQLT1ByHtzgYiZ4C5ZuOCeNUpJOK8VPOCZDQXSzq'
    },
    {
      service: 'SS',
      subService: 'FASHION',
      title: 'Fashion Editorial',
      price: '$1,500',
      duration: 'Half Day',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFk0cxrhG5faQUg5dg8tYIsPACMOqW9MCc37n5VfA8DkcBK4vL9L2NEyvYs-31pLQmKkKBc9-spHkwamdLyn9qrhT-bt17dff4VSE6She0z7bY_VHXUWdJDZY4-yrTOyRdRkATmkvaVYOg407tTdS_xla2sbHIJUPdLryHzP2WvdrZephy4G2JMNmD-otwtSk4nEXPmG2qJeyDTrEMAhbawQGVHCaYngjxDsRT-ipcbpEzph6-c9ULJ_nipET7s0hHTr4tS7Ow4XFw'
    }
  ];

  const durations = [
    { key: 'H2', value: '2 Hours (Standard)' },
    { key: 'H4', value: '4 Hours (Half Day)' },
    { key: 'H8', value: '8 Hours (Full Day)' }
  ];

  const categories = [
    { key: 'ALL', label: 'All Services' },
    { key: 'SS', label: 'Studio Sessions' },
    { key: 'OS', label: 'Outdoor Shoots' },
    { key: 'COM', label: 'Commercial' },
    { key: 'EVT', label: 'Events' }
  ];

  const filteredServices = selectedCategory === 'ALL' 
    ? services 
    : services.filter(service => service.service === selectedCategory);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const handleDateClick = (date) => {
    if (date && date >= new Date().setHours(0,0,0,0)) {
      setSelectedDate(date);
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handlePayment = () => {
    if (!selectedService) {
      alert('Please select a service first');
      return;
    }
    setShowPaymentPopup(true);
  };

  const getServicePrice = () => {
    if (!selectedService) return 250;
    const priceStr = selectedService.price.replace('$', '').replace(',', '');
    return parseInt(priceStr);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-900 dark:text-white min-h-screen">
      <Navigation />
      
      <main className="w-full px-0 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-8">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-ai-glow">
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
                <span className="text-xs font-bold uppercase tracking-widest">Enhanced by Aura AI</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-gray-900 dark:text-gray-900 dark:text-white">
                Capture Your Vision. <br/>
                <span className="text-primary">Book a Session.</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-600 dark:text-slate-400 text-lg max-w-xl">
                From cinematic portraits to high-end commercial productions, choose a package or let our AI assist your creative process.
              </p>
            </div>

            {/* AI Creative Assistant */}
            <div className="ai-gradient-border rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
              <div className="bg-white dark:bg-[#1a172e] p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-ai-glow/10 flex items-center justify-center text-ai-glow">
                      <span className="material-symbols-outlined">spark</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 dark:text-white">AI Creative Assistant</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-600 dark:text-slate-400">Powered by Gemini AI</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-ai-glow/10 text-ai-glow rounded-xl text-xs font-bold hover:bg-ai-glow/20 transition-all">
                    <span className="material-symbols-outlined text-sm">auto_stories</span>
                    Generate Moodboard
                  </button>
                </div>

                <div className="relative">
                  <textarea 
                    className="w-full rounded-2xl bg-gray-100 dark:bg-[#2b2839] border-none text-sm focus:ring-2 focus:ring-ai-glow p-5 pr-12 min-h-[100px] text-gray-900 dark:text-gray-900 dark:text-white" 
                    placeholder="Describe your dream shoot (e.g., 'A cyberpunk street vibe with neon lights and rainy reflections')..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <button className="absolute bottom-4 right-4 size-8 bg-ai-glow rounded-lg text-gray-900 dark:text-white flex items-center justify-center hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-600 dark:text-slate-400">AI Suggested Themes</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {themes.map((theme) => (
                      <button 
                        key={theme.name}
                        onClick={() => setSelectedTheme(theme.name)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                          selectedTheme === theme.name 
                            ? 'bg-ai-glow/20 border-ai-glow text-ai-glow border' 
                            : 'bg-gray-200 dark:bg-[#2b2839] text-gray-900 dark:text-gray-900 dark:text-white hover:border-ai-glow border border-transparent'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm text-ai-glow">{theme.icon}</span> 
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-[#2b2839]">
                  <div>
                    <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-600 dark:text-slate-400 block mb-3">Recommended Palette</span>
                    <div className="flex gap-2">
                      {colorPalette.map((color) => (
                        <div 
                          key={color.name}
                          className="size-8 rounded-full border border-gray-300 dark:border-white/10" 
                          style={{ backgroundColor: color.color }}
                          title={color.name}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[10px] text-gray-500 dark:text-gray-600 dark:text-slate-400 italic">
                      "The Urban Techwear palette emphasizes high-contrast synthetics with deep shadows and vibrant accent lights."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Categories */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button 
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === category.key
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-[#2b2839] text-gray-700 dark:text-slate-300 hover:bg-primary/10'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service, index) => (
                <div 
                  key={index} 
                  className={`group relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 dark:bg-[#2b2839] cursor-pointer ${
                    selectedService?.title === service.title ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), transparent), url('${service.image}')`
                    }}
                  ></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex justify-between items-end">
                      <div>
                        {service.popular && (
                          <span className="inline-block px-3 py-1 bg-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">Popular</span>
                        )}
                        <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                        <p className="text-slate-300 text-sm mb-4">Starting at {service.price} • {service.duration}</p>
                      </div>
                      <button className="size-12 rounded-xl bg-white text-primary flex items-center justify-center shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                  {selectedService?.title === service.title && (
                    <div className="absolute top-4 right-4 bg-primary size-6 rounded-full flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="w-full lg:w-[400px]">
            <div className="sticky top-28 bg-gray-50 dark:bg-[#1a172e] rounded-2xl border border-gray-300 dark:border-[#2b2839] p-6 shadow-2xl shadow-primary/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 dark:text-white">Book a Session</h3>
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Instant Booking</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-1 rounded-full bg-primary"></div>
                <div className="flex-1 h-1 rounded-full bg-gray-300 dark:bg-[#2b2839]"></div>
                <div className="flex-1 h-1 rounded-full bg-gray-300 dark:bg-[#2b2839]"></div>
              </div>

              <form className="space-y-6">
                {/* Calendar */}
                <div className="space-y-4">
                  <label className="text-sm font-bold block text-gray-900 dark:text-white">Select Your Date</label>
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-bold text-sm">{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => navigateMonth(-1)}
                        className="size-6 rounded flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#2b2839]"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => navigateMonth(1)}
                        className="size-6 rounded flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#2b2839]"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium border-b border-gray-200 dark:border-[#2b2839] pb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <span key={`day-${index}`} className="text-gray-500 dark:text-slate-400">{day}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {getDaysInMonth(currentMonth).map((date, index) => {
                      const isToday = date && date.toDateString() === new Date().toDateString();
                      const isSelected = date && date.toDateString() === selectedDate.toDateString();
                      const isPast = date && date < new Date().setHours(0,0,0,0);
                      
                      return (
                        <button 
                          key={index}
                          type="button"
                          onClick={() => handleDateClick(date)}
                          disabled={!date || isPast}
                          className={`aspect-square flex items-center justify-center rounded-lg transition-colors text-xs ${
                            !date ? 'invisible' :
                            isPast ? 'text-gray-400 dark:text-slate-400 cursor-not-allowed' :
                            isSelected ? 'bg-primary text-white font-bold' :
                            isToday ? 'bg-primary/20 text-primary font-bold' :
                            'hover:bg-primary/10 text-gray-900 dark:text-white'
                          }`}
                        >
                          {date?.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* AI Applied Theme */}
                <div>
                  <label className="text-sm font-bold block mb-2 text-ai-glow">AI Applied Theme</label>
                  <div className="w-full h-12 flex items-center px-4 rounded-xl bg-ai-glow/5 border border-ai-glow/30 text-xs font-bold text-ai-glow">
                    <span className="material-symbols-outlined text-sm mr-2">check_circle</span>
                    {selectedTheme.toUpperCase()} (Draft)
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="text-sm font-bold block mb-2 text-gray-900 dark:text-white">Duration</label>
                  <select 
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full h-12 rounded-xl bg-gray-100 dark:bg-[#2b2839] border-none text-sm focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                  >
                    {durations.map((duration) => (
                      <option key={duration.key} value={duration.key}>{duration.value}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-bold block mb-2 text-gray-900 dark:text-white">Location Preference</label>
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => setSelectedLocation('STUDIO')}
                      className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${
                        selectedLocation === 'STUDIO'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-300 dark:border-[#2b2839] hover:bg-gray-100 dark:hover:bg-[#2b2839] text-gray-900 dark:text-white'
                      }`}
                    >
                      Studio
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSelectedLocation('ONSITE')}
                      className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${
                        selectedLocation === 'ONSITE'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-300 dark:border-[#2b2839] hover:bg-gray-100 dark:hover:bg-[#2b2839] text-gray-900 dark:text-white'
                      }`}
                    >
                      On-Site
                    </button>
                  </div>
                </div>

                {/* Total and Checkout */}
                <div className="pt-4 border-t border-gray-200 dark:border-[#2b2839]">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-500 dark:text-gray-600 dark:text-slate-400">Total Estimate</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-gray-900 dark:text-white">${getServicePrice()}.00</span>
                  </div>
                  <button 
                    onClick={handlePayment}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 group transition-all" 
                    type="button"
                  >
                    <span>Continue to Payment</span>
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">chevron_right</span>
                  </button>
                  <p className="text-[10px] text-center text-gray-500 dark:text-gray-600 dark:text-slate-400 mt-4 px-4 uppercase tracking-widest font-bold">Secured by Aura Payment Processing</p>
                </div>
              </form>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 dark:border-[#2b2839] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="size-6 bg-slate-400 dark:bg-slate-700 rounded-md flex items-center justify-center text-gray-900 dark:text-white">
              <span className="material-symbols-outlined text-sm">camera</span>
            </div>
            <span className="font-bold text-slate-500 uppercase tracking-tighter">Aura Studios</span>
          </div>
          <div className="flex items-center gap-8 text-gray-600 dark:text-slate-400 text-sm font-medium">
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Refund Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Contact Support</a>
          </div>
          <div className="flex gap-4">
            <div className="size-8 rounded-full bg-slate-100 dark:bg-[#2b2839] flex items-center justify-center text-slate-400 cursor-pointer hover:bg-primary hover:text-gray-900 dark:text-white transition-all">
              <span className="material-symbols-outlined text-lg">public</span>
            </div>
            <div className="size-8 rounded-full bg-slate-100 dark:bg-[#2b2839] flex items-center justify-center text-slate-400 cursor-pointer hover:bg-primary hover:text-gray-900 dark:text-white transition-all">
              <span className="material-symbols-outlined text-lg">videocam</span>
            </div>
          </div>
        </div>
      </footer>
      
      <PaymentPopup 
        isOpen={showPaymentPopup}
        onClose={() => setShowPaymentPopup(false)}
        bookingDetails={{
          service: selectedService?.title || 'Service',
          serviceType: selectedService?.service || 'SS',
          subService: selectedService?.subService || 'PORTRAIT',
          duration: durations.find(d => d.key === selectedDuration)?.value || '2 Hours (Standard)',
          durationKey: selectedDuration,
          date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
          location: selectedLocation,
          total: getServicePrice()
        }}
        isPhotoshoot={true}
      />
    </div>
  );
};

export default PhotoshootBookings;
