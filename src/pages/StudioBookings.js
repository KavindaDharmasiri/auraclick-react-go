import React, { useState } from 'react';
import Navigation from '../components/Navigation';

const StudioBookings = () => {
  const [selectedStudio, setSelectedStudio] = useState('Cyc Wall');
  const [selectedDate, setSelectedDate] = useState(7);
  const [selectedTime, setSelectedTime] = useState('11:00 - 15:00');

  const studios = [
    {
      name: 'Main Hall',
      description: '1,200 sq ft • High Ceilings',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABq0KAmAaaRPVcIRYqKkLpZq9Z_h1ZHQetsd4ROe4An875HB7wjE6wt-0eVH02QLSDfUe5NlTdguLz9EDVrOE9UenrhIp0B3Ry8g_8cIV1u_kCteoaKV9GqlZ0GvDLjl5KlQl_Blkmd1ZXtOWx87E4nQin7aG1QI0P_C8epdFZJHHIxzd0XWev0OZbNVQ4Rc9q9RB3BLauF3-gSkUON46KclvtGg7p300a1Wf5GT7woFL7iJ4C_stqBeKkPPKAsqQHcOGrNerIZqmh',
      badge: 'Premium',
      hourly: 120,
      halfDay: 400,
      fullDay: 750
    },
    {
      name: 'Cyc Wall',
      description: 'Infinite White • Corner Cove',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyGkt5evhjY0yZvIhHNuptGcYcw2eOig9eq4Pyw-BXHpYNNp9OJGEEL-dvD5Z-szbZ7MmfY3FSAUH7qLnS3e7r0jteNnAcC_p9fmPefQvgA6eBV06u4PpSqn0M-miiouyvhLvKN9S-_IJb-yxtB99BCrphfU0IKjwK7T4Kql0CkUSQCNDPkMhAEctVYEvaM-HMyBbd47gJpPjPp76YkrKP2QAlVd8KQWk4BysYn2Q4bin26chWL68cKGG-wzBS0LfCa1nndf8MIaU4',
      badge: 'Selected',
      hourly: 95,
      halfDay: 320,
      fullDay: 600
    },
    {
      name: 'Boudoir Suite',
      description: 'Natural Light • Vintage Decor',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3vitJeboCNwjzlhuBovgq8Cq83WO3s5nfGN8oIw0Ypq8_CD_wvR4k8l8r53mvLUMLixoyY_x9Y82FzreD9UXOZzTYkSt5_WfQRQOFf9rj2p2VxYZUhTVcxUOk8dy0A_i0G68SCmnvRR2xlM3bKSqEphQo4BMLV4Qxd47VxcuGa4Xv2-cwkrUStLO7DTVUgnSSQQsUNKJEXWVh6EAVbBuIZZESXazojak64wI8lLWaNaL9PDOZfPrWCkV-FZC7mwXA4NaeABCQOy-A',
      badge: 'Intimate',
      hourly: 85,
      halfDay: 280,
      fullDay: 500
    }
  ];

  const timeSlots = [
    { time: '09:00 - 11:00', available: true },
    { time: '11:00 - 15:00', available: true, selected: true },
    { time: '15:00 - 19:00', available: true },
    { time: '19:00 - 21:00', available: false }
  ];

  const equipment = [
    { icon: 'light_mode', name: 'Lighting', description: '2x Profoto D2 500w' },
    { icon: 'border_all', name: 'Grip', description: '4x C-Stands, Sandbags' },
    { icon: 'background_replace', name: 'Backdrops', description: 'Black, White, Grey Paper' },
    { icon: 'wifi', name: 'Connectivity', description: 'Gigabit Fiber WiFi' }
  ];

  return (
    <div className="bg-background-dark text-white min-h-screen">
      <Navigation />
      
      <main className="w-full px-0 py-10">
        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Studio Bookings</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Reserve high-end photography spaces for your next project. All studios include standard grip and lighting equipment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Studio Selection & Info */}
          <div className="lg:col-span-8 space-y-12">
            {/* Studio Gallery */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Our Studio Spaces</h2>
                <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                  View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {studios.map((studio, index) => (
                  <div 
                    key={studio.name}
                    className={`group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer ${
                      selectedStudio === studio.name ? 'border-2 border-primary' : 'bg-slate-200'
                    }`}
                    onClick={() => setSelectedStudio(studio.name)}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                      style={{
                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), url('${studio.image}')`
                      }}
                    ></div>
                    {selectedStudio === studio.name && (
                      <div className="absolute top-4 right-4 bg-primary size-6 rounded-full flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 p-5 w-full">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-2 inline-block ${
                        studio.badge === 'Premium' ? 'bg-primary text-white' :
                        studio.badge === 'Selected' ? 'bg-white/20 backdrop-blur-md text-white' :
                        'bg-primary/50 backdrop-blur-md text-white'
                      }`}>
                        {studio.badge}
                      </span>
                      <p className="text-white text-xl font-bold leading-tight">{studio.name}</p>
                      <p className="text-slate-300 text-xs mt-1">{studio.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing Table */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-6">Pricing & Rates</h2>
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Space</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Hourly Rate</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Half Day (4h)</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Full Day (8h)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {studios.map((studio) => (
                      <tr 
                        key={studio.name}
                        className={`hover:bg-slate-800/30 transition-colors ${
                          selectedStudio === studio.name ? 'bg-primary/5' : ''
                        }`}
                      >
                        <td className={`px-6 py-5 ${
                          selectedStudio === studio.name ? 'font-bold' : 'font-semibold'
                        }`}>{studio.name}</td>
                        <td className="px-6 py-5 text-center">${studio.hourly}</td>
                        <td className="px-6 py-5 text-center text-primary font-bold">
                          ${studio.halfDay} <span className="text-[10px] text-green-500">Save 15%</span>
                        </td>
                        <td className="px-6 py-5 text-center">${studio.fullDay}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Included Equipment */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-6">Included Equipment</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {equipment.map((item) => (
                  <div key={item.name} className="p-4 rounded-xl bg-slate-800/50 flex flex-col gap-3">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                    <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Availability Calendar */}
              <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <p className="font-bold">May 2024</p>
                  <div className="flex gap-2">
                    <button className="size-8 rounded-lg flex items-center justify-center hover:bg-slate-700">
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button className="size-8 rounded-lg flex items-center justify-center hover:bg-slate-700">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <span key={day} className="text-[10px] font-bold text-slate-400 uppercase">{day}</span>
                  ))}
                  {[28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((date) => (
                    <button 
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`aspect-square text-xs rounded-lg ${
                        date < 1 ? 'text-slate-400 cursor-not-allowed' :
                        selectedDate === date ? 'bg-primary text-white font-bold shadow-lg shadow-primary/40' :
                        date === 10 ? 'relative flex items-center justify-center hover:bg-primary/20' :
                        'hover:bg-primary/20'
                      }`}
                      disabled={date < 1}
                    >
                      {date}
                      {date === 10 && (
                        <div className="absolute bottom-1 size-1 bg-red-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Available Slots (May {selectedDate})</p>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button 
                        key={slot.time}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium ${
                          !slot.available ? 'bg-slate-700 text-slate-400 line-through cursor-not-allowed border-none' :
                          selectedTime === slot.time ? 'bg-primary text-white font-bold border border-primary' :
                          'border border-slate-700 hover:border-primary hover:bg-primary/5'
                        }`}
                        disabled={!slot.available}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-primary text-white rounded-2xl p-6 shadow-xl shadow-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined">receipt_long</span>
                  <h3 className="font-bold">Booking Summary</h3>
                </div>
                <div className="space-y-3 mb-6 border-b border-white/10 pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-80">Studio</span>
                    <span className="font-bold">{selectedStudio}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-80">Duration</span>
                    <span className="font-bold">4 Hours (Half Day)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-80">Date</span>
                    <span className="font-bold">May {selectedDate}, 2024</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-xs opacity-70">Total Amount</p>
                    <p className="text-3xl font-black">
                      ${studios.find(s => s.name === selectedStudio)?.halfDay || 320}.00
                    </p>
                  </div>
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded">Tax included</span>
                </div>
                <button className="w-full py-4 bg-white text-primary font-black rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                  Reserve Now
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>

              {/* Map/Location */}
              <div className="rounded-2xl overflow-hidden h-40 relative group">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD65Cm2PUTueHsm9kAJMu7VVbHxYFkZco-MK5IeGQVevoxip5EEFxVzZkL3JaEwi55tf4jcutf4N7QkO8QrnbTsOFEOybYUjDT5ZUc06I5ex67HxfS4n3Kmif9dsLwmPwvlnmuT2Q2hq7hfeibZMrSq7vyjftCHr_lGkfTU-KUSMolYc10IPrlI_qRSBw39AAMp3lBm8E1hc8WEA98UI2jVxZH1PZ5FGduoralG3JxqO6iuHVNXSTgWe7tj4m1BrMGXnECzGSkv2pac')"
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">directions</span> Get Directions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudioBookings;