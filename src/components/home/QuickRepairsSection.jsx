import React from 'react';

// Placeholder data - replace with actual images
const quickRepairItems = [
  { name: 'Water Purifier', imageUrl: 'https://via.placeholder.com/200x200?text=Water+Purifier' },
  { name: 'Refrigerator', imageUrl: 'https://via.placeholder.com/200x200?text=Refrigerator' },
  { name: 'Washing Machine', imageUrl: 'https://via.placeholder.com/200x200?text=Washing+Machine' },
];

const QuickRepairsSection = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Heading */}
        <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2">
          Quick Repairs
        </p>
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Device Repair Starts at ₹ 199
          <span className="text-teal-500">.</span><span className="text-teal-400">.</span><span className="text-teal-300">.</span>
        </h2>
        <p className="text-base text-gray-500 mb-12">
          Hassle-free service at your doorstep
        </p>

        {/* Device Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {quickRepairItems.map((item, index) => (
            <div key={index} className="group">
              <div className="aspect-w-1 aspect-h-1 bg-blue-100 rounded-lg flex items-center justify-center p-4 mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                {/* Placeholder for image */}
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="max-h-40 object-contain mix-blend-multiply" // mix-blend-multiply might help if images have white backgrounds
                />
              </div>
              <h3 className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickRepairsSection; 