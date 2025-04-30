import React from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Custom Arrow components for react-slick
const LogoArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow absolute top-1/2 -left-2 md:left-0 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 border border-gray-200" +
      (currentSlide === 0 ? " slick-disabled opacity-50 cursor-not-allowed" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    <ChevronLeft size={20} className="text-gray-600" />
  </button>
);

const LogoArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow absolute top-1/2 -right-2 md:right-0 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 border border-gray-200" +
      (currentSlide === slideCount - props.slidesToShow ? " slick-disabled opacity-50 cursor-not-allowed" : "") // Disable when last slide is visible
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - props.slidesToShow ? true : false}
    type="button"
  >
    <ChevronRight size={20} className="text-gray-600" />
  </button>
);

// Partner logos
const partners = [
  { name: 'Amazon', logoUrl: 'https://dummyimage.com/300x100/000000/ffffff&text=Amazon' },
  { name: 'Croma', logoUrl: 'https://dummyimage.com/300x100/1a75ff/ffffff&text=Croma' },
  { name: 'Vijay Sales', logoUrl: 'https://dummyimage.com/300x100/e60000/ffffff&text=Vijay+Sales' },
  { name: 'ICICI Bank', logoUrl: 'https://dummyimage.com/300x100/ff8000/ffffff&text=ICICI+Bank' },
  { name: 'Delta', logoUrl: 'https://dummyimage.com/300x100/4d4dff/ffffff&text=Delta' },
  { name: 'LG', logoUrl: 'https://dummyimage.com/300x100/cc0099/ffffff&text=LG' },
  { name: 'Samsung', logoUrl: 'https://dummyimage.com/300x100/006600/ffffff&text=Samsung' },
  { name: 'Voltas', logoUrl: 'https://dummyimage.com/300x100/6600cc/ffffff&text=Voltas' },
  // Additional partners to fill the slider
  { name: 'Haier', logoUrl: 'https://dummyimage.com/300x100/996633/ffffff&text=Haier' },
  { name: 'Godrej', logoUrl: 'https://dummyimage.com/300x100/009999/ffffff&text=Godrej' },
];

const PartnersSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    prevArrow: <LogoArrowLeft />,
    nextArrow: <LogoArrowRight />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        }
      },
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
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      }
    ]
  };

  return (
    <div className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Partners
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
        </div>

        {/* Full-width Partner Logo Slider */}
        <div className="relative px-4 md:px-8">
          <Slider {...settings} className="partners-slider">
            {partners.map((partner, index) => (
              <div key={index} className="px-1">
                <div className="flex justify-center items-center h-20">
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    className="max-h-12 max-w-full object-contain filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/150x50/f1f5f9/6366f1/?text=${partner.name}`;
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
