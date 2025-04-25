import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router
import { FiCpu, FiSearch, FiChevronRight } from 'react-icons/fi'; // Example icons

// Placeholder data - Replace with actual device data, potentially fetched or grouped by category
const devices = [
  // Example Category: Power Tools
  { id: 'drill-xyz', category: 'Power Tools', name: "Electric Drill XYZ", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Electric+Drill", description: "Versatile drill for home and professional use.", price: "$159.99" },
  { id: 'sander-pro', category: 'Power Tools', name: "Orbital Sander Pro", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Sander", description: "Smooth finishing for wood surfaces.", price: "$89.50" },
  { id: 'circular-saw-7', category: 'Power Tools', name: "7-Inch Circular Saw", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Circular+Saw", description: "Powerful saw for straight cuts in various materials.", price: "$120.00" },
  // Example Category: Generators
  { id: 'gen-ind-5k', category: 'Generators', name: "Industrial Generator 5kW", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Generator+5kW", description: "Reliable power for job sites and emergencies.", price: "$2499.00" },
  { id: 'gen-port-2k', category: 'Generators', name: "Portable Inverter Generator 2kW", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Portable+Generator", description: "Quiet and lightweight power for camping and tailgating.", price: "$650.00" },
  // Example Category: Heavy Equipment
  { id: 'lift-scis-19', category: 'Heavy Equipment', name: "Scissor Lift 19ft", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Scissor+Lift+19ft", description: "Electric scissor lift for aerial work.", rentalRate: "$250/day" }, // Note: Can show rent/buy info
  { id: 'mixer-con-5cu', category: 'Heavy Equipment', name: "Concrete Mixer 5 cu ft", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Concrete+Mixer", description: "Portable mixer for concrete and mortar.", rentalRate: "$100/day" },
  // Add more devices/categories as needed
];

// Helper to group devices by category
const devicesByCategory = devices.reduce((acc, device) => {
  const category = device.category || 'Other';
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(device);
  return acc;
}, {});

const Devices = () => {
  // Basic search state (optional)
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCategories = Object.entries(devicesByCategory)
    .map(([category, items]) => {
      const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { category, items: filteredItems };
    })
    .filter(group => group.items.length > 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* --- Hero Section --- */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 sm:py-28 text-center shadow-lg relative overflow-hidden">
         <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
         <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Our Devices</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">Explore our wide range of electric equipment available for sale and rent.</p>
          {/* Optional Search Bar */}
           <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full bg-white bg-opacity-90 border border-transparent rounded-md py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-opacity-100 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 sm:text-sm"
                  placeholder="Search devices..."
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
        </div>
      </section>

      {/* --- Devices List/Grid Section --- */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          {filteredCategories.length > 0 ? (
             <div className="space-y-16">
              {filteredCategories.map(({ category, items }) => (
                 <div key={category}>
                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-3 flex items-center gap-3">
                     <FiCpu className="w-7 h-7 text-blue-600" /> { /* Example category icon */}
                     <span>{category}</span>
                   </h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                     {items.map((item) => (
                       <Link key={item.id} to={`/devices/${item.id}`} className="block group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                         <div className="h-48 overflow-hidden">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                         </div>
                         <div className="p-5">
                           <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate group-hover:text-blue-600">{item.name}</h3>
                           <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden">{item.description}</p>
                           <div className="flex justify-between items-center mt-2">
                             <span className="text-base font-bold text-blue-700">
                                {item.price ? item.price : item.rentalRate}
                             </span>
                             <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:underline">
                               View <FiChevronRight className="ml-1 w-4 h-4"/>
                             </span>
                           </div>
                         </div>
                       </Link>
                     ))}
                   </div>
                 </div>
               ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No Devices Found</h3>
              <p className="mt-1 text-sm text-gray-500">No devices matched your search term "{searchTerm}". Try searching for something else.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Devices;