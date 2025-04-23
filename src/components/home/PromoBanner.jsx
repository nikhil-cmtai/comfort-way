import React from 'react';

const PromoBanner = () => {
  // Replace with the actual path to your banner image
  const bannerImageUrl = 'https://via.placeholder.com/1200x200?text=Promo+Banner+Placeholder';

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100"> {/* Added a light gray background */}
      <div className="max-w-7xl mx-auto">
        <a href="#" className="block shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden"> {/* Added link, shadow, hover effect */}
          <img 
            src={bannerImageUrl} 
            alt="Promotional Banner - Extend the life of your TV" 
            className="w-full h-auto object-contain" // Use object-contain to prevent distortion
          />
        </a>
      </div>
    </div>
  );
};

export default PromoBanner; 