import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Import useParams
import { FiShoppingCart, FiRefreshCw, FiTag, FiCheckCircle, FiArrowLeft, FiCpu, FiSettings, FiZap } from 'react-icons/fi';

// Placeholder data - Reuse the same data source as the Devices page for now.
// In a real app, you might fetch this specific item by ID from an API.
const devices = [
  { id: 'drill-xyz', category: 'Power Tools', name: "Electric Drill XYZ", image: "https://via.placeholder.com/600x400/E0E0E0/808080?text=Electric+Drill+Large", description: "A highly versatile and powerful electric drill suitable for a wide range of materials including wood, metal, and plastic. Features variable speed control and ergonomic design for comfortable extended use.", price: "$159.99", specs: ["18V Lithium-Ion Battery", "Variable Speed (0-1500 RPM)", "1/2-Inch Keyless Chuck", "LED Work Light", "Weight: 3.5 lbs"] },
  { id: 'sander-pro', category: 'Power Tools', name: "Orbital Sander Pro", image: "https://via.placeholder.com/600x400/E0E0E0/808080?text=Sander+Large", description: "Achieve ultra-smooth finishes with this professional-grade orbital sander. Features efficient dust collection system and comfortable grip.", price: "$89.50", specs: ["3.0 Amp Motor", "12,000 OPM (Orbits Per Minute)", "Hook-and-Loop Pad System", "Dust-Sealed Switch", "Low Vibration Design"] },
  { id: 'circular-saw-7', category: 'Power Tools', name: "7-Inch Circular Saw", image: "https://via.placeholder.com/600x400/E0E0E0/808080?text=Circular+Saw+Large", description: "Cut through tough materials with ease using this robust 7-inch circular saw. Features adjustable bevel and depth settings for precise cuts.", price: "$120.00", specs: ["15 Amp Motor", "5500 RPM Blade Speed", "Max Cut Depth: 2-3/8 inches at 90°", "Bevel Capacity: 56°", "Electric Brake"] },
  { id: 'gen-ind-5k', category: 'Generators', name: "Industrial Generator 5kW", image: "https://via.placeholder.com/600x400/E0E0E0/808080?text=Generator+5kW+Large", description: "Heavy-duty 5000-watt generator designed for demanding job sites and reliable emergency backup power. Features multiple outlets and durable frame.", price: "$2499.00", specs: ["5000 Running Watts / 6250 Starting Watts", "OHV Engine with Low-Oil Shutdown", "4 x 120V GFCI Outlets, 1 x 120/240V Twist-Lock Outlet", "8-Hour Runtime at 50% Load", "Wheel Kit Included"] },
  { id: 'gen-port-2k', category: 'Generators', name: "Portable Inverter Generator 2kW", image: "https://via.placeholder.com/600x400/E0E0E0/808080?text=Portable+Gen+Large", description: "Ultra-quiet and lightweight inverter generator providing clean power for sensitive electronics. Ideal for camping, RVs, and tailgating.", price: "$650.00", specs: ["2000 Starting Watts / 1600 Running Watts", "Inverter Technology (Clean Power)", "Parallel Capable", "Eco-Throttle System", "Weight: 46 lbs"] },
  { id: 'lift-scis-19', category: 'Heavy Equipment', name: "Scissor Lift 19ft", image: "https://via.placeholder.com/600x400/E0E0E0/808080?text=Scissor+Lift+Large", description: "Electric scissor lift providing a stable aerial platform up to 19 feet working height. Suitable for indoor and outdoor use on firm, level surfaces.", rentalRate: "$250/day", specs: ["Working Height: 19 ft (5.8 m)", "Platform Capacity: 500 lbs (227 kg)", "Non-Marking Tires", "Battery Powered", "Compact Dimensions"] },
  { id: 'mixer-con-5cu', category: 'Heavy Equipment', name: "Concrete Mixer 5 cu ft", image: "https://via.placeholder.com/600x400/E0E0E0/808080?text=Concrete+Mixer+Large", description: "Durable and portable 5 cubic foot capacity concrete mixer. Ideal for mixing concrete, stucco, and mortar for small to medium-sized projects.", rentalRate: "$100/day", specs: ["Capacity: 5 cu ft", "Motor: 0.5 HP Electric", "Steel Drum", "Portable with Wheels", "Easy Tilting Mechanism"] },
];

const DeviceDetail = () => {
  const { itemId } = useParams(); // Get the item ID from the URL

  // Find the device matching the ID
  const device = devices.find(d => d.id === itemId);

  // Handle device not found
  if (!device) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <FiCpu className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">Device Not Found</h1>
          <p className="text-gray-500 mb-6">Sorry, we couldn't find the device you're looking for.</p>
          <Link
            to="/devices"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiArrowLeft className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Back to All Devices
          </Link>
        </div>
      </div>
    );
  }

  // Device found, render details
  return (
    <div className="bg-white">
      {/* Optional Breadcrumbs or Back Link */}    
      <div className="bg-gray-100 py-3">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <Link to="/devices" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-700">
              <FiArrowLeft className="mr-2 h-4 w-4"/>
              Back to Devices
           </Link>
         </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Section */}
          <div>
            <img 
              src={device.image} 
              alt={device.name} 
              className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-200"
            />
            {/* Add thumbnail gallery here if needed */}
          </div>

          {/* Details Section */}
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded mb-2">{device.category}</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">{device.name}</h1>
            
            {/* Price / Rate */}
            <div className="mb-6">
              {device.price && (
                 <p className="text-3xl font-bold text-blue-700">{device.price}</p>
              )}
               {device.rentalRate && (
                 <p className="text-2xl font-bold text-blue-700">{device.rentalRate} <span className="text-lg font-normal text-gray-600">/ day</span></p>
               )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{device.description}</p>
            </div>

            {/* Specifications */}
            {device.specs && device.specs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Specifications</h2>
                <ul className="space-y-2">
                  {device.specs.map((spec, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                      <FiSettings className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
               {device.price && (
                 <button
                   type="button"
                   className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                   onClick={() => alert(`Add ${device.name} to cart! (Placeholder)`)} // Replace with actual cart logic
                 >
                   <FiShoppingCart className="w-5 h-5"/>
                   Buy Now
                 </button>
               )}
               {device.rentalRate && (
                 <button
                   type="button"
                   className={`flex-1 inline-flex justify-center items-center gap-2 px-6 py-3 border shadow-sm text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${device.price ? 'border-indigo-600 text-indigo-700 bg-indigo-50 hover:bg-indigo-100' : 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'}`}
                    onClick={() => alert(`Initiate rental for ${device.name}! (Placeholder)`)} // Replace with actual rental logic
                 >
                    <FiRefreshCw className="w-5 h-5"/>
                   Rent This Item
                 </button>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetail; 