import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Home = () => {
  return (
    <div className="bg-background-dark text-white min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/40 via-background-dark/20 to-background-dark z-10"></div>
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1D5Su8ffQg77Iij4teARKODZ5d4nUgIBWLUZ3E-YHGDpDHXTRGsWVbPGHVyto6iL5TyV2ldm13q1HGDE1-E5LDQV-_JFovqfPZT9IevnkRUAwnJ6zLkE5sVFYCrPnd7w9D4s9ebAzp81l2fq_zpq8eybbxXWkB7mWoXs3a4-oh3vDln3POwZpGBR6D_7EaqBqYuPAqJQwtKf5CaS7OXTziSXyBGL0rzb7RQM5FBjSss5bv0A4wigEqoDUN9o87KEKrBzhLRR24gGf')`
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter mb-6">
            Welcome to Aura
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Beyond the ordinary. See the world through a different lens. Capture moments that define your journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/photoshoots">
              <button className="w-full sm:w-auto px-10 py-4 bg-primary text-white text-lg font-bold rounded-xl hover:scale-105 transition-transform duration-200 shadow-xl shadow-primary/20">
                Book Now
              </button>
            </Link>
            <button className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20">
              View Portfolio
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <span className="material-symbols-outlined text-white animate-bounce text-3xl">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* Specialties Section */}
      <div className="w-full px-0 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Our Specialties</h2>
          <a className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all" href="#">
            Explore All Services <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 hover:border-primary transition-all duration-300">
            <div className="mb-6 p-3 rounded-lg bg-primary/10 text-primary w-fit">
              <span className="material-symbols-outlined text-3xl">photo_camera</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Photoshoots</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Professional studio and on-location sessions tailored to your vision.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 hover:border-primary transition-all duration-300">
            <div className="mb-6 p-3 rounded-lg bg-primary/10 text-primary w-fit">
              <span className="material-symbols-outlined text-3xl">inventory_2</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Gear Rentals</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Access high-end cinema and photography equipment for your next project.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 hover:border-primary transition-all duration-300">
            <div className="mb-6 p-3 rounded-lg bg-primary/10 text-primary w-fit">
              <span className="material-symbols-outlined text-3xl">shutter_speed</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Studio Space</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Premium creative environments equipped with the latest lighting tech.
            </p>
          </div>

          {/* Card 4 */}
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 hover:border-primary transition-all duration-300">
            <div className="mb-6 p-3 rounded-lg bg-primary/10 text-primary w-fit">
              <span className="material-symbols-outlined text-3xl">favorite</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Weddings</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Timeless memories captured with an artistic and cinematic touch.
            </p>
          </div>
        </div>
      </div>

      {/* High Impact CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="w-full px-6 lg:px-10">
          <div className="rounded-3xl overflow-hidden relative p-12 lg:p-20 flex flex-col items-center text-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[120px] rounded-full"></div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight text-white">
                Ready to capture your story?
              </h2>
              <p className="text-lg md:text-xl text-white/70 mb-12">
                Join the elite community of creators and visionaries. Our team of experts is ready to bring your imagination to life.
              </p>
              <Link to="/photoshoots">
                <button className="bg-primary hover:bg-primary/90 text-white px-12 py-5 rounded-xl text-lg font-bold transition-all shadow-2xl shadow-primary/30">
                  Book Your Session
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-20">
        <div className="w-full px-0 py-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-primary size-6">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Aura</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Elite photography services and equipment rentals for the modern creator. Based in New York, serving globally.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Services</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a className="hover:text-primary transition-colors" href="#">Portraits</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Fashion Editorial</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Commercial</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Wedding Packages</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Rental</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a className="hover:text-primary transition-colors" href="#">Camera Bodies</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Prime Lenses</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Lighting Gear</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Studio Booking</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary text-white" 
                placeholder="Email address" 
                type="email"
              />
              <button className="bg-primary text-white p-2 rounded-lg">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2024 Aura Photography. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;