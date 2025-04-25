import React from 'react';
import { FiShoppingCart, FiRefreshCw, FiTag } from 'react-icons/fi'; // Example icons

// Placeholder data - Replace with actual product/rental data fetching and rendering
const itemsForSale = [
  { id: 1, name: "Electric Drill XYZ", price: "$159.99", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Electric+Drill", description: "Powerful and versatile drill for various tasks." },
  { id: 2, name: "Industrial Generator", price: "$2499.00", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Generator", description: "Heavy-duty generator for reliable power supply." },
  { id: 3, name: "Welding Machine Pro", price: "$850.00", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Welder", description: "Professional grade welding machine for precision work." },
];

const itemsForRent = [
  { id: 4, name: "Scissor Lift", rate: "$250/day", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Scissor+Lift", description: "Stable aerial work platform for various heights." },
  { id: 5, name: "Concrete Mixer", rate: "$100/day", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Concrete+Mixer", description: "Efficiently mix concrete for small to medium projects." },
  { id: 6, name: "Pressure Washer", rate: "$75/day", image: "https://via.placeholder.com/300x200/E0E0E0/808080?text=Pressure+Washer", description: "High-pressure cleaning for various surfaces." },
];


const BuyRent = () => {
  return (
    <div className="bg-gray-50">
      {/* --- Hero Section --- */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 sm:py-28 text-center shadow-lg relative overflow-hidden">
         <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
         <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Buy or Rent Equipment</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">Find the perfect electric equipment for your needs, available for purchase or flexible rental.</p>
        </div>
      </section>

      {/* --- Items for Sale Section --- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12 sm:mb-16 flex items-center justify-center gap-3">
            <FiShoppingCart className="w-8 h-8 text-blue-600" />
            <span>Equipment For Sale</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {itemsForSale.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{item.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                     <span className="text-lg font-bold text-blue-700">{item.price}</span>
                     <a href={`/product/${item.id}`} /* Link to product detail page */
                        className="inline-flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 transition duration-200">
                        <FiTag className="w-4 h-4"/>
                        View Details
                     </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
           {/* Optional: Add a button to view all sale items */}
           <div className="text-center mt-12">
             <a href="/shop" /* Link to full shop/sale page */
                className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
               View All Sale Items
             </a>
           </div>
        </div>
      </section>

      {/* --- Items for Rent Section --- */}
      <section className="py-16 sm:py-24 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12 sm:mb-16 flex items-center justify-center gap-3">
             <FiRefreshCw className="w-8 h-8 text-blue-600" />
             <span>Equipment For Rent</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {itemsForRent.map((item) => (
               <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                 <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                 <div className="p-6 flex flex-col flex-grow">
                   <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                   <p className="text-gray-600 text-sm mb-4 flex-grow">{item.description}</p>
                   <div className="flex items-center justify-between mt-auto">
                      <span className="text-lg font-bold text-blue-700">{item.rate}</span>
                      <a href={`/rental/${item.id}`} /* Link to rental detail page */
                         className="inline-flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 transition duration-200">
                         <FiTag className="w-4 h-4"/>
                         View Details
                      </a>
                   </div>
                 </div>
               </div>
            ))}
          </div>
            {/* Optional: Add a button to view all rental items */}
            <div className="text-center mt-12">
              <a href="/rentals" /* Link to full rentals page */
                 className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                View All Rental Items
              </a>
            </div>
        </div>
      </section>

    </div>
  );
};

export default BuyRent; 