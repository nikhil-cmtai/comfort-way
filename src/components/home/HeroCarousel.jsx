import React from 'react';
import Slider from 'react-slick';

// Import slick carousel CSS files
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HeroCarousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    appendDots: dots => (
      <div style={{ bottom: "20px" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 bg-white rounded-full opacity-50 hover:opacity-75 slick-active:opacity-100 transition-opacity duration-200"></div>
    )
  };

  const slides = [
    {
      bgColor: 'bg-indigo-900', // Matching the image color
      imagePlaceholderColor: 'bg-gray-300', // Placeholder for the appliance image
      title: 'Say Goodbye to Repair Expenses with',
      highlight: 'Extended Warranty',
      highlightColor: 'text-yellow-400',
    },
    // Add more slide objects here for a real carousel
    {
      bgColor: 'bg-teal-700',
      imagePlaceholderColor: 'bg-gray-400',
      title: 'Keep Your Devices Running Smoothly',
      highlight: 'Expert AMC Plans',
      highlightColor: 'text-cyan-300',
    },
  ];

  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className={`w-full ${slide.bgColor} text-white py-8 md:py-12`}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image Placeholder */} 
                <div className="flex justify-center items-center">
                  <div className={`w-48 h-36 md:w-64 md:h-40 ${slide.imagePlaceholderColor} rounded-lg flex items-center justify-center text-gray-600`}>
                     (Image Placeholder)
                  </div>
                </div>
                {/* Text Content */}
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-light mb-2">{slide.title}</h2>
                  <h1 className={`text-4xl md:text-5xl font-bold ${slide.highlightColor}`}>{slide.highlight}</h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel; 