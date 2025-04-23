import React from 'react';

const ServiceRequestBanner = () => {
  // Placeholder background - replace with actual image if needed
  const backgroundStyle = {
    backgroundColor: '#1a202c', // Dark background similar to image
    // backgroundImage: 'url(/path/to/your/image.jpg)', // Uncomment and set path if using an image
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
  };

  return (
    <div 
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={backgroundStyle}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          <span className="block text-yellow-400">RAISE SERVICE REQUEST</span>
          <span className="block text-white mt-1">FOR COVERED DEVICES</span>
        </h2>
        {/* Optional: Add a button here if needed */}
        {/* <button className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Request Service
        </button> */}
      </div>
    </div>
  );
};

export default ServiceRequestBanner; 