import React, { useState } from 'react';
import Navigation from '../components/Navigation';

const AIBooking = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    sessionType: 'portrait',
    selectedPackage: 'pro',
    aiPrompt: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navigation />
      
      <main className="max-w-7xl mx-auto flex h-screen">
        {/* Left Pane: Booking Form (60%) */}
        <div className="w-3/5 overflow-y-auto p-10 flex flex-col gap-8 border-r border-gray-700">
          {/* Page Heading */}
          <div className="flex flex-col gap-3">
            <p className="text-white text-5xl font-black leading-tight">Configure Session</p>
            <p className="text-gray-400 text-lg">Fine-tune the technical details of your photoshoot.</p>
          </div>
          
          {/* Form Section */}
          <div className="grid grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <p className="text-white text-base font-medium">Full Name</p>
              <input 
                className="w-full rounded-xl text-white border border-gray-600 bg-gray-800 h-14 placeholder:text-gray-400 px-4 focus:ring-2 focus:ring-blue-500" 
                placeholder="John Doe" 
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </label>
            
            <label className="flex flex-col gap-2">
              <p className="text-white text-base font-medium">Email Address</p>
              <input 
                className="w-full rounded-xl text-white border border-gray-600 bg-gray-800 h-14 placeholder:text-gray-400 px-4 focus:ring-2 focus:ring-blue-500" 
                placeholder="john@aura.ai" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </label>
          </div>
          
          <div className="flex justify-between items-center mt-auto py-8">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white font-medium">
              Cancel
            </button>
            <button className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700">
              Next Step: Schedule
            </button>
          </div>
        </div>
        
        {/* Right Pane: AI Assistant Panel (40%) */}
        <div className="w-2/5 bg-gray-800 overflow-y-auto p-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h3 className="text-white text-xl font-bold">AI Creative Assistant</h3>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-600">
            <p className="text-gray-400 text-sm mb-4">Describe the vibe you want to achieve.</p>
            <textarea 
              className="w-full rounded-xl bg-gray-800 border-gray-600 text-white p-4 h-32" 
              placeholder="e.g. Bohemian sunset vibe with neon accents..."
              value={formData.aiPrompt}
              onChange={(e) => setFormData({...formData, aiPrompt: e.target.value})}
            />
            <button 
              className="mt-4 bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700"
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIBooking;