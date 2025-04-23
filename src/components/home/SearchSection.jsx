import React, { useState } from 'react';
import { MapPin, ChevronDown, Search } from 'lucide-react';

const SearchSection = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Mumbai');

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad'
  ];

  const backgroundStyle = {
    backgroundColor: '#0D9488', // Teal-600
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2399F6E4' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
  };

  return (
    <div className="relative py-16 md:py-24" style={backgroundStyle}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
          Expert Care For Your Devices
        </h2>

        <div className="bg-white rounded-full shadow-lg p-1 flex items-center space-x-1 max-w-2xl mx-auto">
          {/* Location Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center px-4 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-200"
            >
              <MapPin className="text-orange-500 mr-2" size={18} />
              <span className="font-medium text-sm mr-1">{selectedLocation}</span>
              <ChevronDown className={`transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`} size={16} />
            </button>

            {/* Dropdown Menu */}
            {isLocationOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 rounded-lg bg-gray-900 shadow-lg p-1 z-10 space-y-1">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setIsLocationOpen(false);
                    }}
                    className="block w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-300 self-center"></div>

          {/* Device Input */}
          <input
            type="text"
            placeholder="Select a device"
            className="flex-grow px-3 py-2 text-sm text-gray-700 placeholder-gray-500 bg-transparent focus:outline-none focus:ring-0 border-none"
          />

          {/* Search Button */}
          <button 
            className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
            aria-label="Search devices"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
      </div>
    </div>
  );
};

export default SearchSection; 