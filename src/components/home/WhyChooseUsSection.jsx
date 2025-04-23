import React from 'react';

const stats = [
  { value: '10,000+', label: 'Retail Stores' },
  { value: '300+', label: 'Brands Covered' },
  { value: '80+', label: 'Lakh Customers' },
];

const WhyChooseUsSection = () => {
  return (
    <div className="bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
          Why Choose Us
          <span className="text-teal-500">.</span><span className="text-teal-400">.</span><span className="text-teal-300">.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="relative">
              <div className="relative inline-block">
                {/* Subtle background highlight */}
                <div className="absolute -inset-2 -skew-y-3 bg-teal-200 opacity-30 rounded-full"></div>
                <span className="relative text-4xl md:text-5xl font-bold text-teal-600">
                  {stat.value}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection; 