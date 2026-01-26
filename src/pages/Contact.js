import React from 'react';
import Navigation from '../components/Navigation';

const Contact = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-900 dark:text-white min-h-screen">
      <Navigation />
      
      <main className="w-full px-0 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
              Ready to bring your vision to life? Let's discuss your project and create something extraordinary together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-8 border border-gray-300 dark:border-white/10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Service Interest</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                    <option>Photoshoot Session</option>
                    <option>Gear Rental</option>
                    <option>Studio Booking</option>
                    <option>Wedding Photography</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Message</label>
                  <textarea 
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#2b2839] border-none text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-gray-900 dark:text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-200">
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-8 border border-gray-300 dark:border-white/10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold">Studio Location</p>
                      <p className="text-gray-600 dark:text-slate-400 text-sm">123 Creative Ave, New York, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">call</span>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold">Phone</p>
                      <p className="text-gray-600 dark:text-slate-400 text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">mail</span>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold">Email</p>
                      <p className="text-gray-600 dark:text-slate-400 text-sm">hello@auraphotography.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-8 border border-gray-300 dark:border-white/10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-400">Monday - Friday</span>
                    <span className="text-gray-900 dark:text-white">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-400">Saturday</span>
                    <span className="text-gray-900 dark:text-white">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-400">Sunday</span>
                    <span className="text-gray-900 dark:text-white">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
