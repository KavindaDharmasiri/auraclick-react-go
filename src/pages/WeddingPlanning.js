import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';

const WeddingPlanning = () => {
  const [selectedPackage, setSelectedPackage] = useState('Platinum');
  const [formData, setFormData] = useState({
    partner1: '',
    partner2: '',
    email: '',
    weddingDate: '',
    guestCount: '50-150 guests',
    vision: ''
  });

  const portfolioItems = [
    {
      title: 'The Italian Dream',
      location: 'Lake Como, Italy',
      category: 'Destination',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfm-PfQuOTgcbQpcmjhShe88ppfqFhZOl27wN_ooryUAM9FYoQuH8U3ryPfLtxm2Ec1qOVBZvUzvcMHtUmsIGtg1f8B4P1c0wAKEZxKB6rPG2-9Hh_UQX-o1NXkutB0kmclaWK5G29VGZDCLBe0R7DX3u-yNg9g-e8PfZ8qLb98x76RSCtUL_NwrQkrGyZXH3s7zv8LTCwGHok4GROG8VtPGJMt9-HkJNik5B_BjwUrIwNUroB1y4qjeYCSt8lIyn9lOrPc4l0egNa'
    },
    {
      title: 'Timeless Elegance',
      location: 'The Plaza Hotel, NYC',
      category: 'City Luxury',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi_PR8XZY241oZfL1eIDy5UyWiysKIkRkAoX1AukTIsqCmIdE0p5da7sEmkb4heNhl1I7aNK46NstTeB2jngd-luTbpUJGwhSyl78DgWamK6CGhk727CRJrht8Z-cJNkuYyjRLxFReAIVbgQv3CNk6TIw_wbv34_e1xB6597-dX3cP7ZQHFu9o85J3SUE29oVdtVbHQwBGxkylpzP-YpYUPLWutrOClyMLZryhxrJjotq_XuAPtjhhX1YdJ7J0E-5MbyS820QOx44x'
    },
    {
      title: 'Coastal Romance',
      location: 'Malibu Coast, California',
      category: 'Romantic',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtU0oMeZJx2D5myns-m9osIUxekimTjBgt4MQhmZESj9vO5iN_9KgxdlCzzA_uJmNHFT_2amjAbn_AI7zQ6IzpJoFLf22GkeXoY3B-ERM-wxSAMJJxwX1jTYDO4oVtgkNN3F67DEWgCnnnhTfdT0GKFMSI_kB0i_Ol4KFSDhkfB70RtpdXFu5vzjMuaMNirTUWE2tdt8_mofksYUb--fEOrT96nue581OOPMV0c_yDGCuP30FLWpe9Ya9uctUcXOMuNtHme-pqLaYI'
    }
  ];

  const packages = [
    {
      name: 'Gold',
      type: 'Essential',
      price: '$4,500',
      features: [
        'Partial Planning (3 months before)',
        'Vendor Management',
        '8-hour day-of coordination',
        'Timeline development'
      ]
    },
    {
      name: 'Platinum',
      type: 'Full Service',
      price: '$8,200',
      popular: true,
      features: [
        'Full-year Planning & Design',
        'Unlimited Consultations',
        'Venue scouting & Selection',
        'Full event production & styling',
        'Unlimited day-of coordination'
      ]
    },
    {
      name: 'Bespoke',
      type: 'Tailored',
      price: 'Contact for Pricing',
      features: [
        'Destination Wedding Planning',
        'Multi-day event logistics',
        'Guest travel & VIP concierge',
        'Exclusive venue access'
      ]
    }
  ];

  const timelineSteps = [
    {
      icon: 'forum',
      title: 'Initial Consultation',
      description: 'We meet to discuss your aesthetic, budget, and non-negotiables to build a framework for your day.',
      active: true
    },
    {
      icon: 'palette',
      title: 'Curation & Design',
      description: 'Our designers create custom mood boards and source vendors that align with your unique style.',
      active: false
    },
    {
      icon: 'event_available',
      title: 'Vendor Coordination',
      description: 'We handle the contracts, site visits, and logistical details so you can focus on the fun parts.',
      active: false
    },
    {
      icon: 'celebration',
      title: 'The Big Day',
      description: 'Seamless execution from sunrise to the final dance, ensuring every moment is perfect.',
      active: false
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-background-dark text-white min-h-screen">
      <Navigation />
      
      <main className="w-full px-0 py-12 space-y-24">
        {/* Hero Section */}
        <section className="relative rounded-[2.5rem] overflow-hidden min-h-[580px] flex flex-col items-center justify-center text-center p-8" style={{
          backgroundImage: 'radial-gradient(at 0% 0%, rgba(50, 17, 212, 0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%)'
        }}>
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
              backgroundImage: 'linear-gradient(rgba(19, 16, 34, 0.4) 0%, rgba(19, 16, 34, 1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBdswBscuYee4GGVJgGuRSGMzk4MGTYxSf-ceQF30LJsld0_ilY4SGnmUvDz0zfIko4MbaYadaTOSjC1BcRiPvuh37zw2_NZQoz6Ok3ScZqZRuSUzRqZk8EgvPwF03hKACQIPPe3wV35YIYA1hnTe319X8eK4ujRrSynccr3Lt0cs5w1WL4Cm9ZSW5J6Ypa8QKEwJo5OMjNAmVh2juQGDoQNxL-ajUfmBMNUKn_ueNQCVrKQslYgUKSPxDnJm88yt-0m7GKyYbQg4p")'
            }}
          ></div>
          <div className="relative z-10 max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-4">
              <span className="material-symbols-outlined text-purple-400 text-lg">auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-200">AI-Powered Wedding Planning</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              Design Your Dream Wedding<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">With Intelligent Magic.</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
              Merge your personal vision with Aura's proprietary AI to curate every aesthetic detail, from bespoke color palettes to cinematic lighting.
            </p>
            <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-4">
              <Link to="/ai-booking">
                <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl text-base font-bold transition-all flex items-center gap-2 shadow-2xl shadow-primary/40">
                  Start Your Vision
                  <span className="material-symbols-outlined">colors_spark</span>
                </button>
              </Link>
              <button className="bg-white/3 backdrop-blur-md px-10 py-4 rounded-xl text-base font-bold transition-all flex items-center gap-2 border border-white/10 hover:bg-white/10">
                View Packages
              </button>
            </div>
          </div>
        </section>

        {/* AI Dream Wedding Planner */}
        <section className="relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">AI Dream Wedding Planner</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Describe the atmosphere of your perfect day and watch our AI weave together a cohesive visual experience.</p>
          </div>
          <div className="relative bg-background-dark/80 border border-white/5 rounded-2xl p-8 lg:p-12" style={{
            background: 'rgba(19, 16, 34, 0.8)',
            borderRadius: '1.5rem',
            position: 'relative'
          }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Describe Your Vision</label>
                  <div className="relative group">
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600 min-h-[200px] text-white" 
                      placeholder="e.g., 'A romantic tropical sunset on a secluded beach with gold accents and wild orchids' or 'A vintage English garden party with pastel hydrangeas and fairy lights'"
                    ></textarea>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-slate-500 uppercase font-bold">850 chars left</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold text-slate-500 mr-2 self-center">Quick Styles:</span>
                  <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium hover:border-primary transition-colors">Bohemian Chic</button>
                  <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium hover:border-primary transition-colors">Modern Minimalist</button>
                  <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium hover:border-primary transition-colors">Classic Romance</button>
                  <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium hover:border-primary transition-colors">Industrial Edge</button>
                </div>
                <Link to="/ai-booking">
                  <button className="w-full bg-gradient-to-r from-primary to-purple-400 hover:opacity-90 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]">
                    <span className="material-symbols-outlined">auto_fix_high</span>
                    Visualize Your Day
                  </button>
                </Link>
              </div>
              <div className="lg:col-span-7 space-y-8">
                <div className="bg-white/3 backdrop-blur-md rounded-2xl p-8 h-full flex flex-col border border-primary/20">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="size-2 rounded-full bg-purple-400 animate-pulse"></div>
                      <h4 className="font-bold text-xl">Visual Theme Preview</h4>
                    </div>
                    <span className="text-xs text-slate-500 italic">Waiting for your description...</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1">
                    <div className="col-span-2 space-y-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Suggested Palette</p>
                      <div className="flex h-12 rounded-xl overflow-hidden border border-white/10">
                        <div className="flex-1 bg-slate-800"></div>
                        <div className="flex-1 bg-slate-700"></div>
                        <div className="flex-1 bg-slate-600"></div>
                        <div className="flex-1 bg-slate-500"></div>
                        <div className="flex-1 bg-slate-400"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Floral Concept</p>
                          <div className="aspect-square rounded-xl bg-white/5 flex items-center justify-center border border-dashed border-white/10">
                            <span className="material-symbols-outlined text-slate-600 scale-150">local_florist</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lighting Style</p>
                          <div className="aspect-square rounded-xl bg-white/5 flex items-center justify-center border border-dashed border-white/10">
                            <span className="material-symbols-outlined text-slate-600 scale-150">light_mode</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 space-y-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Moodboard Piece</p>
                      <div className="aspect-[3/4] rounded-xl bg-white/5 flex flex-col items-center justify-center border border-dashed border-white/10 gap-3 p-4 text-center">
                        <span className="material-symbols-outlined text-slate-600 scale-150">image</span>
                        <span className="text-[10px] text-slate-500">Theme imagery will generate here</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Slider Section */}
        <section>
          <div className="flex items-end justify-between px-2 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Recent Celebrations</h2>
              <p className="text-slate-400 mt-2">Browse our latest masterpieces across the globe.</p>
            </div>
            <div className="flex gap-2">
              <button className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {portfolioItems.map((item, index) => (
              <div key={index} className="flex-none w-[400px] group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold">
                    {item.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-slate-400">{item.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Wedding Planning Packages */}
        <section>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight">Planning Packages</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Select a service level that matches your vision. Every package includes full access to our AI Planning Suite.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={pkg.name}
                className={`p-8 rounded-3xl flex flex-col border transition-colors group relative overflow-hidden ${
                  pkg.popular 
                    ? 'bg-primary/10 border-2 border-primary transform md:-translate-y-4' 
                    : 'bg-white/3 backdrop-blur-md border-white/5 hover:border-primary/50'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <span className="text-primary font-bold text-sm tracking-widest uppercase">{pkg.type}</span>
                  <h3 className="text-3xl font-bold mt-2">{pkg.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className={pkg.name === 'Bespoke' ? 'text-2xl font-black' : 'text-4xl font-black'}>
                      {pkg.price}
                    </span>
                    {pkg.name !== 'Bespoke' && <span className="text-slate-500 font-medium">/ event</span>}
                  </div>
                </div>
                <ul className="space-y-4 flex-1">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center gap-3 ${pkg.popular ? '' : 'text-slate-300'}`}>
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      <span>{feature.includes('Planning') ? feature.replace('Planning', 'Planning & AI Assist') : feature.includes('Full-year') ? 'Full Planning & Design Suite' : feature.includes('Unlimited Consultations') ? 'Unlimited AI Moodboard Prints' : feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setSelectedPackage(pkg.name)}
                  className={`w-full mt-10 py-4 rounded-xl font-bold transition-all ${
                    pkg.popular 
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20' 
                      : 'border border-white/10 hover:bg-white/5'
                  }`}
                >
                  {pkg.name === 'Bespoke' ? 'Inquire Now' : `Select ${pkg.name}`}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">Your Journey with Us</h2>
            <p className="text-slate-400 text-lg mb-10">
              We believe planning should be as beautiful as the wedding day itself. Here is how we bring your vision to life using our hybrid AI-human process.
            </p>
            <div className="space-y-12 relative">
              <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary to-primary/10"></div>
              <div className="relative pl-16">
                <div className="absolute left-0 size-12 rounded-full bg-primary flex items-center justify-center text-white z-10 shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined">auto_fix_high</span>
                </div>
                <h4 className="text-xl font-bold">AI Design Generation</h4>
                <p className="text-slate-400 mt-1">Start by defining your vision in our AI engine. We use these results as the blueprint for our physical styling.</p>
              </div>
              <div className="relative pl-16">
                <div className="absolute left-0 size-12 rounded-full bg-background-dark border border-white/10 flex items-center justify-center text-slate-400 z-10">
                  <span className="material-symbols-outlined">palette</span>
                </div>
                <h4 className="text-xl font-bold">Curation & Design</h4>
                <p className="text-slate-400 mt-1">Our designers refine AI outputs into custom mood boards and source real-world vendors that match the aesthetic.</p>
              </div>
              <div className="relative pl-16">
                <div className="absolute left-0 size-12 rounded-full bg-background-dark border border-white/10 flex items-center justify-center text-slate-400 z-10">
                  <span className="material-symbols-outlined">event_available</span>
                </div>
                <h4 className="text-xl font-bold">Logistics & Execution</h4>
                <p className="text-slate-400 mt-1">We handle the contracts, site visits, and technical details to ensure the dream is fully realizable.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="space-y-4">
              <img 
                className="w-full h-72 object-cover rounded-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyRa2B0hVFBNAx-Wum6A1wTa8YKhGQ6c6Z9z3NLYvSgy0xkWXCC4ovWPiKHnf2kWkf4bE5TNAs2tnOiHIyqf8jfEdh6BlGUqT57i9fGeBRQYS83HbYeIvMIFxsEutDYnq8CkwTnD7YK7hXrZmh2RV6na8DMxYMUW2aQ4b1vhqANSHsTLVRZLwbgCDzfkoA-xwB8-Rw55QtzpbRq5FlWakDUTUsOamWAUhkU5Gjo5uzJLCqBT4hfAmOjWxpflQNvL7La64sVOnkMJ6o"
                alt="Bride and groom holding hands detail"
              />
              <img 
                className="w-full h-96 object-cover rounded-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR9COLK5BiH7VnH-OBnNVVE5_9Z-hnybOVUCv5vdVnbJny-8HSvLQ32Xtb1wQB7Bpklf-rYr4PdTYJ7g9R_YCQE0e99_fr6zB1pF6PUcxGXulbz56qMkF5dBLVbSJVydHZhJEefm64ZMF8FI-prbtFDQwSok_j8myerQe3d5JQfjDsPO-aYZDQ0P7-7nbbDGFG-Yq15CgEgvlasZDE9U6oIEiZGovXJQLANpISr_sfJUZFNQQoVEmFzkNtHQEEghysSni33FvJhNwk"
                alt="Elegant wedding invitations on silk cloth"
              />
            </div>
            <div className="space-y-4 pt-12">
              <img 
                className="w-full h-96 object-cover rounded-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZB8zlPqteTLktNqLNpnCafUWRBlfSC8Z8i_q_kIl6YFh4PZxMlIgvcBRDL5GWcMXN_dzaq0LjnWpRPE1jj2VOnTHktQlXo42X7Zt8rbKga0zD4r7R6FD7po8QeNwX3UealvK4EfvKf36knBn9cXg5kMbyEo0fCwJ-jYw-WZFe_SVf3-WEoTguWFrV05Bk9enXLQwQcx5iQ-EdBbExdPDBB4OzwkpKA2QxT9jmlGXu_4u7SNO5dbLh-3bhvu7yui9j41xj3BScOb28"
                alt="Champagne glasses toast at wedding reception"
              />
              <img 
                className="w-full h-72 object-cover rounded-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvrai385YelzR8zUEKkzdspH1NSd182Rbnm6f1tJWQZy3ei1NAeHFp8wsttSGZZqpmMQrWcq3P6N-AxbgJagkOL777zas6LQtevWsROkibEsbSvzzDcl17BiSoCgiKVe0ejW_gDPRX069n4-Wis5WgPu1YhHT6-L53FxQEn8N5TVKubPbmedECahNW12KjLgLhR8ZhFbE59iMWcqHaNx7Dab8rl9C6ULBOHrd3_WGQwnHp0Dhc2FoYWkueeCQbLrZH6t8chjFc8Pjt"
                alt="Wedding rings on floral background"
              />
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="max-w-4xl mx-auto bg-white/3 backdrop-blur-md rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 bg-primary flex flex-col justify-between text-white">
              <div>
                <h2 className="text-3xl font-black mb-4">Let's start planning.</h2>
                <p className="text-white/80 leading-relaxed">
                  Fill out the form to schedule your initial consultation. We'll include your AI vision report in our first meeting.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined">call</span>
                  <span className="font-semibold">+1 (800) AURA-WDG</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined">mail</span>
                  <span className="font-semibold">hello@aura-planning.com</span>
                </div>
                <div className="flex gap-4 pt-4">
                  <div className="size-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">share</span>
                  </div>
                  <div className="size-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-12 bg-background-dark/50">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Partner 1</label>
                    <input 
                      className="w-full bg-white/5 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary text-white" 
                      placeholder="Full Name" 
                      type="text"
                      name="partner1"
                      value={formData.partner1}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Partner 2</label>
                    <input 
                      className="w-full bg-white/5 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary text-white" 
                      placeholder="Full Name" 
                      type="text"
                      name="partner2"
                      value={formData.partner2}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input 
                    className="w-full bg-white/5 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary text-white" 
                    placeholder="email@example.com" 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Wedding Date</label>
                    <input 
                      className="w-full bg-white/5 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary text-white" 
                      type="date"
                      name="weddingDate"
                      value={formData.weddingDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Guest Count</label>
                    <select 
                      className="w-full bg-white/5 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary text-white"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                    >
                      <option>0-50 guests</option>
                      <option>50-150 guests</option>
                      <option>150-300 guests</option>
                      <option>300+ guests</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Vision</label>
                  <textarea 
                    className="w-full bg-white/5 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary text-white" 
                    placeholder="Tell us about your dream day..." 
                    rows="4"
                    name="vision"
                    value={formData.vision}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WeddingPlanning;