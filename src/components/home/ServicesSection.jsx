import React from 'react';

// Placeholder data - replace with actual icons/images later
const services = [
  { name: 'AC Extended Warranty', iconBg: 'bg-blue-100', iconPlaceholder: 'AC', new: true },
  { name: 'AC Repair & Service', iconBg: 'bg-blue-100', iconPlaceholder: 'AC' },
  { name: 'Television Extended Warranty', iconBg: 'bg-blue-100', iconPlaceholder: 'TV' },
  { name: 'Refrigerator Extended Warranty', iconBg: 'bg-blue-100', iconPlaceholder: 'Fridge' },
  { name: 'Water Purifier Repair & Service', iconBg: 'bg-blue-100', iconPlaceholder: 'WP' },
  { name: 'Room Cooler Extended Warranty', iconBg: 'bg-blue-100', iconPlaceholder: 'Cooler' },
  { name: 'Washing Machine Extended Warranty', iconBg: 'bg-blue-100', iconPlaceholder: 'WM' },
  { name: 'Mobile Extended Warranty', iconBg: 'bg-blue-100', iconPlaceholder: 'Mobile' },
  { name: 'Laptop Complete Care', iconBg: 'bg-blue-100', iconPlaceholder: 'Laptop' },
  { name: 'Microwave Extended Warranty', iconBg: 'bg-blue-100', iconPlaceholder: 'MW' },
];

const ServicesSection = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
          Explore Our Services
          <span className="text-teal-500">.</span><span className="text-teal-400">.</span><span className="text-teal-300">.</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-10">
          {services.map((service, index) => (
            <div key={index} className="text-center group relative">
              {service.new && (
                <span className="absolute -top-2 -left-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white z-10">
                  New
                </span>
              )}
              <div className={`mx-auto h-20 w-20 rounded-full ${service.iconBg} flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow duration-200`}>
                {/* Placeholder for actual icon/image */} 
                <span className="text-xl font-medium text-blue-600">{service.iconPlaceholder}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {service.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection; 