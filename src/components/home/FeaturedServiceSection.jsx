import React from 'react';
import { ArrowRight } from 'lucide-react';

// Placeholder data - replace with actual images and links
const featuredServices = [
  { name: 'AC Jet service', imageUrl: 'https://via.placeholder.com/300x200?text=AC+Jet+Service' },
  { name: 'Gas Refilling', imageUrl: 'https://via.placeholder.com/300x200?text=Gas+Refilling' },
  { name: 'Annual Service Plans', imageUrl: 'https://via.placeholder.com/300x200?text=Service+Plans' },
  // Add more services if needed for scrolling/carousel
];

const FeaturedServiceSection = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900">
            Air Conditioner Services
            <span className="text-teal-500">.</span><span className="text-teal-400">.</span><span className="text-teal-300">.</span>
          </h2>
          {/* Simple Arrow Button - Enhance later if making a carousel */}
          <button className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100">
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Service Cards Container - Use flex for horizontal layout */}
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
          {featuredServices.map((service, index) => (
            <div key={index} className="flex-shrink-0 w-72 group">
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-200">
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">
                {service.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper style to hide scrollbar (optional)
const style = document.createElement('style');
style.innerHTML = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;
document.head.appendChild(style);


export default FeaturedServiceSection; 