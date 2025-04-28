import React from 'react';

const featuredServices = [
  { name: 'AC Jet Service', imageUrl: '/images/products/jet-service.webp', desc: 'High-pressure cleaning for max cooling', badge: 'Popular' },
  { name: 'Gas Refilling', imageUrl: '/images/products/ac-gas-filling.webp', desc: 'Restore cooling efficiency instantly', badge: 'Best Value' },
  { name: 'AC Installation', imageUrl: '/images/gallery/Image9.jpeg', desc: 'Expert, hassle-free setup', badge: 'New' },
  { name: 'AC Maintenance', imageUrl: '/images/products/ac-maintain.webp', desc: 'Keep your AC running like new' },
];

const FeaturedServiceSection = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-3">
          Air Conditioner Services
          <span className="text-teal-500">.</span><span className="text-teal-400">.</span><span className="text-teal-300">.</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mx-auto mb-10 rounded-full opacity-80"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredServices.map((service, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl border border-indigo-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center p-4 group hover:scale-105 hover:border-blue-400 cursor-pointer"
            >
              {/* Badge */}
              {service.badge && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow z-10 uppercase tracking-wider animate-pulse">
                  {service.badge}
                </span>
              )}
              {/* Image with gradient border accent */}
              <div className="w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-4 relative flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-t-lg" />
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-300"
                  onError={e => { e.target.src = '/images/placeholder.png'; }}
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-blue-700 mb-1 text-center transition-colors duration-300">
                {service.name}
              </h3>
              {service.desc && (
                <p className="text-xs md:text-sm text-gray-500 text-center mt-1">{service.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedServiceSection; 