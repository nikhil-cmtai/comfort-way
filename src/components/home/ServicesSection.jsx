import React, { useState } from 'react';
import { FiFilter, FiArrowRight, FiCheckCircle, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Placeholder data - replace with actual icons/images later
const services = [
  { name: 'AC', category: 'ac', img: '/images/products/ac-2.webp', desc: 'AC Repair, Installation & Service', popular: true },
  { name: 'Air Purifier', category: 'air-purifier', img: '/images/products/Air-purifier.webp', desc: 'Air Purifier Cleaning & Repair' },
  { name: 'Chopper', category: 'chopper', img: '/images/products/Chopper.webp', desc: 'Chopper Blade & Motor Service' },
  { name: 'Blender', category: 'blender', img: '/images/products/Blender.webp', desc: 'Blender Repair & Maintenance' },
  { name: 'Iron', category: 'iron', img: '/images/products/Iron.webp', desc: 'Iron Plate & Wiring Fix' },
  { name: 'Geyser', category: 'geyser', img: '/images/products/Geyser.webp', desc: 'Geyser Installation & Repair', popular: true },
  { name: 'Boiler', category: 'boiler', img: '/images/products/Boiler.webp', desc: 'Boiler Service & Repair' },
  { name: 'Juicer', category: 'juicer', img: '/images/products/Juicer.webp', desc: 'Juicer Motor & Blade Service' },
  { name: 'Microwave', category: 'microwave', img: '/images/products/Microwave.webp', desc: 'Microwave Repair & Cleaning', popular: true },
  { name: 'Washing Machine', category: 'washing-machine', img: '/images/products/Washing-machine.webp', desc: 'Washing Machine Service', popular: true },
  { name: 'Chimney', category: 'chimney', img: '/images/products/Chimney.webp', desc: 'Chimney Cleaning & Repair' },
  { name: 'Hob', category: 'hob', img: '/images/products/Hob.webp', desc: 'Hob Burner & Ignition Service' },
  { name: 'Water Purifier', category: 'water-purifier', img: '/images/products/Water-purifier.webp', desc: 'Water Purifier Filter Change', popular: true },
  { name: 'Refrigerator', category: 'refrigerator', img: '/images/products/Refrigerator.webp', desc: 'Refrigerator Gas & Cooling Repair', popular: true },
];

// Category filters
const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'popular', label: 'Popular' },
  { id: 'kitchen', label: 'Kitchen', items: ['refrigerator', 'microwave', 'juicer', 'blender', 'chopper', 'chimney', 'hob'] },
  { id: 'cooling', label: 'Cooling', items: ['ac', 'refrigerator'] },
  { id: 'water', label: 'Water', items: ['water-purifier', 'geyser', 'boiler'] },
];

const ServicesSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoverIndex, setHoverIndex] = useState(null);

  // Filter services based on selected category
  const filteredServices = services.filter(service => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'popular') return service.popular;
    const category = categories.find(cat => cat.id === activeFilter);
    return category && category.items && category.items.includes(service.category);
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Gradient Text */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mb-4">
            Explore Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional repair and maintenance services for all your home appliances, delivered by certified technicians
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              {activeFilter === category.id && <FiCheckCircle className="inline mr-1" />}
              {category.label}
            </button>
          ))}
        </div>

        {/* Enhanced Services Grid with Animation and Hover Effects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {filteredServices.map((service, index) => (
            <Link
              to={`/maintenance-repair/${service.category}`}
              key={index}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center p-5 hover:-translate-y-2 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ textDecoration: 'none' }}
            >
              {/* Colored corner accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
              
              {/* Background glow effect on hover */}
              <div className={`absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
              
              {/* Service Image with enhanced container */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-white to-indigo-50 flex items-center justify-center mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 overflow-hidden border border-indigo-100 p-1">
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={e => { e.target.src = '/images/placeholder.png'; }}
                />
              </div>
              
              {/* Popular badge styled to match the screenshot exactly */}
              {service.popular && (
                <div className="absolute top-0 right-0 z-10">
                  <div className="bg-orange-500 text-white text-xs font-bold py-1 px-4 flex items-center rounded-bl-lg">
                    <span className="text-white mr-1">★</span>
                    Popular
                  </div>
                </div>
              )}
              
              <h3 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-indigo-700 mb-2 text-center transition-colors duration-300">
                {service.name}
              </h3>
              
              <p className="text-xs md:text-sm text-gray-500 text-center mb-3">{service.desc}</p>
              
              {/* Action button that appears on hover */}
              <div className={`mt-auto flex items-center justify-center text-indigo-600 font-medium text-sm transition-all duration-300 ${
                hoverIndex === index ? 'opacity-100' : 'opacity-0'
              }`}>
                Book Now
                <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
        
        {/* View All Services Button */}
        <div className="mt-12 text-center">
          <Link 
            to="/maintenance-repair"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            View All Services
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection; 