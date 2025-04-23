import React from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Custom Arrow components for react-slick (simple arrows for logo slider)
const LogoArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 border border-gray-200" +
      (currentSlide === 0 ? " slick-disabled opacity-50 cursor-not-allowed" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    <ChevronLeft size={18} className="text-gray-500" />
  </button>
);

const LogoArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 border border-gray-200" +
      (currentSlide === slideCount - props.slidesToShow ? " slick-disabled opacity-50 cursor-not-allowed" : "") // Disable when last slide is visible
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - props.slidesToShow ? true : false}
    type="button"
  >
    <ChevronRight size={18} className="text-gray-500" />
  </button>
);

// Placeholder data - replace with actual logo images and links
const partners = [
  { name: 'Amazon', logoUrl: 'https://via.placeholder.com/150x50/000000/FFFFFF/?text=Amazon' },
  { name: 'Croma', logoUrl: 'https://via.placeholder.com/150x50/333333/FFFFFF/?text=Croma' },
  { name: 'Vijay Sales', logoUrl: 'https://via.placeholder.com/150x50/FF0000/FFFFFF/?text=Vijay+Sales' },
  { name: 'ICICI Bank', logoUrl: 'https://via.placeholder.com/150x50/FF6600/FFFFFF/?text=ICICI+Bank' },
  { name: 'Delta', logoUrl: 'https://via.placeholder.com/150x50/0000FF/FFFFFF/?text=Delta' },
  // Add more partners if needed
  { name: 'Partner 6', logoUrl: 'https://via.placeholder.com/150x50/cccccc/000000/?text=Partner+6' },
];

const PartnersSection = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    prevArrow: <LogoArrowLeft />,
    nextArrow: <LogoArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          arrows: false, // Hide arrows on very small screens
        }
      }
    ]
  };

  return (
    <div className="py-16 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2">
            Spotlight
          </p>
          <h2 className="text-3xl font-semibold text-gray-900">
            Our Partners
            <span className="text-teal-500">.</span><span className="text-teal-400">.</span><span className="text-teal-300">.</span>
          </h2>
        </div>

        {/* Partner Logo Slider */}
        <div className="relative mb-16 px-8"> {/* Added padding for arrows */}
          <Slider {...settings}>
            {partners.map((partner, index) => (
              <div key={index} className="px-4">
                <div className="flex justify-center items-center h-16">
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    className="max-h-10 max-w-full object-contain grayscale hover:grayscale-0 transition duration-300 ease-in-out"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Call to Action Section */}
        <div className="bg-stone-50 p-8 rounded-lg text-center shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Want to partner with us?
          </h3>
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors"
          >
            KNOW MORE
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
