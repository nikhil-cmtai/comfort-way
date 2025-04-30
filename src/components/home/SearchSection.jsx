import React, { useState } from 'react';
import { FiSearch, FiSettings, FiArrowRight, FiClock, FiShield } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SearchSection = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const popularDevices = [
    { name: 'AC', icon: '❄️', category: 'ac' },
    { name: 'Refrigerator', icon: '🧊', category: 'refrigerator' },
    { name: 'Washing Machine', icon: '🧺', category: 'washing-machine' },
    { name: 'Microwave', icon: '🔥', category: 'microwave' },
    { name: 'Water Purifier', icon: '💧', category: 'water-purifier' },
  ];

  // Enhanced background with animated gradient
  const backgroundStyle = {
    background: 'linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    position: 'relative',
    marginTop: '-5px', // Ensure no gap with the hero
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      // Convert search input to kebab case for URL
      const searchTerm = searchInput.trim().toLowerCase().replace(/\s+/g, '-');
      navigate(`/maintenance-repair/${searchTerm}`);
    }
  };

  const handleDeviceClick = (deviceCategory) => {
    navigate(`/maintenance-repair/${deviceCategory}`);
  };

  return (
    <div className="relative py-16 md:py-24 overflow-hidden" style={backgroundStyle}>
      {/* Background pattern overlay with better visuals */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: '60px 60px',
        }}></div>
      </div>

      {/* Enhanced floating decorative elements with subtle animation */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-indigo-300 opacity-10 rounded-full blur-2xl animate-float-slow"></div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Expert Care For Your Devices
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Find qualified technicians for all your home appliance needs in just a few clicks
          </p>
        </div>

        {/* Enhanced Search Form with better shadows and animations */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20 max-w-4xl mx-auto transform transition-all hover:shadow-indigo-500/20">
          {/* Device Input with enhanced animation - Full Width */}
          <div className="relative w-full mb-6">
            <label className="block text-left text-blue-100 text-sm font-medium mb-1.5 ml-1">Search for any device</label>
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="What device needs service? (AC, Refrigerator, etc.)"
                className="w-full px-4 py-4 text-white placeholder-blue-200/70 bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-300/50 border border-white/20 rounded-xl transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FiSettings className="text-blue-300 animate-spin-slow" size={18} />
              </div>
            </div>
          </div>

          {/* Popular Devices Section with enhanced buttons */}
          <div className="mb-8">
            <div className="text-left text-blue-100 text-sm font-medium mb-3 ml-1">Popular Devices:</div>
            <div className="flex flex-wrap gap-2">
              {popularDevices.map((device) => (
                <button 
                  key={device.name}
                  onClick={() => handleDeviceClick(device.category)}
                  className="flex items-center px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full border border-white/20 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <span className="mr-2 text-lg">{device.icon}</span>
                  {device.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Button with enhanced hover effects */}
          <button 
            onClick={handleSearch}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-medium flex items-center justify-center shadow-lg gap-2 group focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <FiSearch size={18} className={`transition-all duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
            <span>Find Service</span>
            <FiArrowRight className={`transition-all duration-300 ${isButtonHovered ? 'translate-x-1' : ''}`} />
          </button>
        </div>

        {/* Service Guarantee Badges with enhanced icons and animations */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10">
          <div className="flex items-center text-white group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
              <FiSearch className="text-blue-300" size={20} />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-blue-100">Service For</div>
              <div className="font-bold">All Major Appliances</div>
            </div>
          </div>
          
          <div className="flex items-center text-white group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
              <FiClock className="text-blue-300" size={20} />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-blue-100">Response Time</div>
              <div className="font-bold">Within 2 Hours</div>
            </div>
          </div>
          
          <div className="flex items-center text-white group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
              <FiShield className="text-blue-300" size={20} />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-blue-100">Service Warranty</div>
              <div className="font-bold">90 Days Guaranteed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SearchSection; 