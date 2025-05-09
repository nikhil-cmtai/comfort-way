import React, { useState } from 'react';
import { FiFilter, FiArrowRight, FiCheckCircle, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Category filters
const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'popular', label: 'Popular' },
  { id: 'kitchen', label: 'Kitchen', items: ['refrigerator', 'microwave', 'juicer', 'blender', 'chopper', 'chimney', 'hob'] },
  { id: 'cooling', label: 'Cooling', items: ['ac', 'refrigerator'] },
  { id: 'water', label: 'Water', items: ['water-purifier', 'geyser', 'boiler'] },
];

const services = [
  { id: 'ac', label: 'AC', img: '/images/products/ac-2.webp', desc: 'AC Repair, Installation & Service', popular: true  },
  { id: 'ro', label: 'RO', img: '/images/products/Water-purifier.webp', desc: 'Water Purifier Filter Change', popular: true },
  { id: 'electrician', label: 'Electrician', img: '/images/products/electrician.webp', desc: 'Electrician Service & Repair' },
  { id: 'plumbing', label: 'Plumbing', img: '/images/products/plumbing.webp', desc: 'Plumbing Service & Repair' },
  { id: 'home-appliances', label: 'Home Appliances', img: '/images/products/home-appliances.jpeg', desc: 'Home Appliance Repair & Maintenance' },
  { id: 'kitchen-appliances', label: 'Kitchen Appliances', img: '/images/products/kitchen-appliances.webp', desc: 'Kitchen Appliance Repair & Maintenance' },
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

        {/* Enhanced Services Grid with Animation and Hover Effects */}
        <div className="grid grid-cols-3 justify-center gap-6 md:gap-8">
          {filteredServices.map((service, index) => (
            <Link
              to={`/maintenance-repair/${service.category}`}
              key={index}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col p-0 hover:-translate-y-2 cursor-pointer overflow-hidden max-w-xs w-full mx-auto min-h-[340px]"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ textDecoration: 'none' }}
            >
              {/* Badge */}
              {service.popular && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow">
                    POPULAR
                  </div>
                </div>
              )}
              {/* Card Image */}
              <img
                src={service.img}
                alt={service.label}
                className="w-full h-48 object-cover rounded-t-2xl"
                onError={e => { e.target.src = '/images/placeholder.png'; }}
              />
              {/* Card Content */}
              <div className="flex flex-col flex-1 px-4 py-4">
                <h3 className="font-bold text-xl text-center mt-2 mb-1 text-gray-900">
                  {service.label}
                </h3>
                <p className="text-gray-500 text-center text-sm mb-4">
                  {service.desc}
                </p>
                <div className="mt-auto text-center">
                  <div className={`flex items-center justify-center text-indigo-600 font-medium text-base transition-all duration-300 ${hoverIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
                  >
                    Book Service
                    <FiArrowRight className="ml-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-indigo-50 rounded-tl-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
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