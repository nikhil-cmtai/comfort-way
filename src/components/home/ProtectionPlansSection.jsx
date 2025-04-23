import React from 'react';
import Slider from 'react-slick';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Custom Arrow components for react-slick
const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow" +
      (currentSlide === 0 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
    style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '-25px', // Adjust position as needed
        transform: 'translateY(-50%)', 
        zIndex: 1,
        background: 'white', 
        borderRadius: '50%', 
        padding: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
    }}
  >
    <ArrowLeft size={20} className="text-gray-600" />
  </button>
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
    style={{ 
        position: 'absolute', 
        top: '50%', 
        right: '-25px', // Adjust position as needed
        transform: 'translateY(-50%)',
        zIndex: 1,
        background: 'white', 
        borderRadius: '50%', 
        padding: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
    }}
  >
    <ArrowRight size={20} className="text-gray-600" />
  </button>
);

// Placeholder data - replace with actual images
const protectionPlanItems = [
  { name: 'Air Conditioner', imageUrl: 'https://via.placeholder.com/200x200?text=Air+Conditioner' },
  { name: 'Laptop', imageUrl: 'https://via.placeholder.com/200x200?text=Laptop' },
  { name: 'Mobile', imageUrl: 'https://via.placeholder.com/200x200?text=Mobile' },
  // Add more items for slider
  { name: 'Television', imageUrl: 'https://via.placeholder.com/200x200?text=Television' },
  { name: 'Washing Machine', imageUrl: 'https://via.placeholder.com/200x200?text=Washing+Machine' },
];

const ProtectionPlansSection = () => {
  const settings = {
    dots: false,
    infinite: false, // Set to true if you want infinite loop
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Heading */}
        <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2">
          Protection Plans
        </p>
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Extend the Life of Your Devices
          <span className="text-teal-500">.</span><span className="text-teal-400">.</span><span className="text-teal-300">.</span>
        </h2>
        <p className="text-base text-gray-500 mb-12">
          Protection plans for devices & appliances
        </p>

        {/* Device Slider */}
        <div className="relative px-8"> {/* Added padding for arrows */}
          <Slider {...settings}>
            {protectionPlanItems.map((item, index) => (
              <div key={index} className="px-2 group"> {/* Added padding between slides */} 
                <div className="aspect-w-1 aspect-h-1 bg-blue-100 rounded-lg flex items-center justify-center p-4 mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  {/* Placeholder for image */}
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="max-h-40 object-contain mix-blend-multiply" // mix-blend-multiply might help if images have white backgrounds
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {item.name}
                </h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProtectionPlansSection; 