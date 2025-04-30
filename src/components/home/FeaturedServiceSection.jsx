import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const featuredServices = [
  { name: 'AC Jet Service', imageUrl: '/images/products/jet-service.webp', desc: 'High-pressure cleaning for max cooling', badge: 'Popular', link: '/maintenance-repair/ac' },
  { name: 'Gas Refilling', imageUrl: '/images/products/ac-gas-filling.webp', desc: 'Restore cooling efficiency instantly', badge: 'Best Value', link: '/maintenance-repair/ac' },
  { name: 'AC Installation', imageUrl: '/images/gallery/Image9.jpeg', desc: 'Expert, hassle-free setup', badge: 'New', link: '/maintenance-repair/ac' },
  { name: 'AC Maintenance', imageUrl: '/images/products/ac-maintain.webp', desc: 'Keep your AC running like new', link: '/maintenance-repair/ac' },
];

const FeaturedServiceSection = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Air Conditioner Services
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional AC services to keep your air conditioner running efficiently all year round
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {featuredServices.map((service, index) => (
            <Link 
              to={service.link}
              key={index}
              className="group relative flex flex-col items-center overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:border-indigo-200 h-full hover:translate-y-[-5px]"
              style={{ textDecoration: 'none' }}
            >
              {/* Colored Top Border Accent */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              
              {/* Background Pattern (subtle) */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-white pointer-events-none"></div>
              
              {/* Badge */}
              {service.badge && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20 uppercase tracking-wider">
                  {service.badge}
                </span>
              )}
              
              {/* Content Container */}
              <div className="flex flex-col items-center p-6 w-full h-full relative z-10">
                {/* Image */}
                <div className="w-full h-40 rounded-xl overflow-hidden mb-5 shadow-md group-hover:shadow-lg group-hover:scale-[1.02] transition-all duration-300 relative z-20">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = '/images/placeholder.png'; }}
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 mb-2 text-center transition-colors duration-300">
                  {service.name}
                </h3>
                
                <p className="text-sm text-gray-500 text-center mb-4">{service.desc}</p>
                
                {/* Action Button */}
                <div className="mt-auto w-full">
                  <div className="flex items-center justify-center text-indigo-600 font-medium text-sm py-2 rounded-md group-hover:text-indigo-700 transition-colors duration-300">
                    Book Service
                    <FiArrowRight className="ml-1 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-indigo-50 rounded-tl-full transform scale-0 group-hover:scale-100 transition-transform duration-500 z-10"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedServiceSection; 