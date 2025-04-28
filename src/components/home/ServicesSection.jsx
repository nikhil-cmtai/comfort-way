import React from 'react';

// Placeholder data - replace with actual icons/images later
const services = [
  { name: 'AC', category: 'ac', img: '/images/products/ac-2.webp', desc: 'AC Repair, Installation & Service' },
  { name: 'Air Purifier', category: 'air-purifier', img: '/images/products/Air-purifier.webp', desc: 'Air Purifier Cleaning & Repair' },
  { name: 'Chopper', category: 'chopper', img: '/images/products/Chopper.webp', desc: 'Chopper Blade & Motor Service' },
  { name: 'Blender', category: 'blender', img: '/images/products/Blender.webp', desc: 'Blender Repair & Maintenance' },
  { name: 'Iron', category: 'iron', img: '/images/products/Iron.webp', desc: 'Iron Plate & Wiring Fix' },
  { name: 'Geyser', category: 'geyser', img: '/images/products/Geyser.webp', desc: 'Geyser Installation & Repair' },
  { name: 'Boiler', category: 'boiler', img: '/images/products/Boiler.webp', desc: 'Boiler Service & Repair' },
  { name: 'Juicer', category: 'juicer', img: '/images/products/Juicer.webp', desc: 'Juicer Motor & Blade Service' },
  { name: 'Microwave', category: 'microwave', img: '/images/products/Microwave.webp', desc: 'Microwave Repair & Cleaning' },
  { name: 'Washing Machine', category: 'washing-machine', img: '/images/products/Washing-machine.webp', desc: 'Washing Machine Service' },
  { name: 'Chimney', category: 'chimney', img: '/images/products/Chimney.webp', desc: 'Chimney Cleaning & Repair' },
  { name: 'Hob', category: 'hob', img: '/images/products/Hob.webp', desc: 'Hob Burner & Ignition Service' },
  { name: 'Water Purifier', category: 'water-purifier', img: '/images/products/Water-purifier.webp', desc: 'Water Purifier Filter Change' },
  { name: 'Refrigerator', category: 'refrigerator', img: '/images/products/Refrigerator.webp', desc: 'Refrigerator Gas & Cooling Repair' },
];

const ServicesSection = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
          Explore Our Services
          <span className="text-teal-500">.</span><span className="text-teal-400">.</span><span className="text-teal-300">.</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl border border-indigo-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center p-5 hover:scale-105 hover:border-blue-400 cursor-pointer"
            >
              {/* Service Image */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center mb-3 shadow group-hover:shadow-lg transition-all duration-300 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={e => { e.target.src = '/images/placeholder.png'; }}
                />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-blue-700 mb-1 text-center transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 text-center mt-1">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection; 