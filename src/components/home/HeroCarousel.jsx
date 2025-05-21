import React from 'react';
import Slider from 'react-slick';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Import slick carousel CSS files
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HeroCarousel = () => {
  const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    fade: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplaySpeed: 5000,
          speed: 500,
          dots: true,
          fade: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          autoplaySpeed: 5500,
          speed: 400,
          dots: true,
          fade: false,
        }
      }
    ],
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    appendDots: dots => (
      <div style={{ bottom: "12px", zIndex: 10, opacity: 0.9 }}>
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <button className="w-2 h-2 bg-white/70 rounded-full hover:bg-blue-500 focus:outline-none transition-all duration-200"></button>
    )
  };

  const slides = [
    {
      bgImage: 'url("/images/hero-bg-1.jpg")',
      bgFallback: 'bg-gradient-to-r from-gray-900 to-indigo-900',
      imageUrl: '/images/products/ac-2.webp',
      imageFallback: 'https://dummyimage.com/400x300/4366d6/ffffff&text=Maintenance+Repair',
      title: 'Professional Appliance',
      highlight: 'Maintenance & Repair',
      highlightColor: 'text-indigo-300',
      subText: 'Expert technicians for all your appliance repair and maintenance needs',
      badges: ['Same-Day Service', 'Experienced Technicians', '90-Day Warranty'],
      buttonText: 'Book Now',
      buttonLink: '/maintenance-repair',
      buttonColor: 'from-indigo-600 to-blue-600'
    },
    {
      bgImage: 'url("/images/hero-bg-2.jpg")',
      bgFallback: 'bg-gradient-to-r from-gray-900 to-blue-900',
      imageUrl: '/images/products/fridge.webp',
      imageFallback: 'https://dummyimage.com/400x300/0d9488/ffffff&text=Buy+Appliances',
      title: 'Premium Home Appliances',
      highlight: 'Buy New Devices',
      highlightColor: 'text-cyan-300',
      subText: 'Top quality home appliances with professional installation included',
      badges: ['Premium Brands', 'Free Installation', 'Extended Warranty'],
      buttonText: 'Buy Now',
      buttonLink: '/buy-rent',
      buttonColor: 'from-cyan-600 to-blue-600'
    },
    {
      bgImage: 'url("/images/hero-bg-3.jpg")',
      bgFallback: 'bg-gradient-to-r from-gray-900 to-purple-900',
      imageUrl: '/images/products/Washing-machine.webp',
      imageFallback: 'https://dummyimage.com/400x300/6266f1/ffffff&text=Rent+Appliances',
      title: 'Affordable Solutions with',
      highlight: 'Appliance Rentals',
      highlightColor: 'text-yellow-300',
      subText: 'Flexible rental options for all major home appliances with maintenance included',
      badges: ['No Upfront Cost', 'Free Maintenance', 'Flexible Duration'],
      buttonText: 'Book Now',
      buttonLink: '/contact',
      buttonColor: 'from-yellow-600 to-orange-600'
    },
  ];

  return (
    <div className="relative mb-0">
      <Slider {...settings} className="hero-slider">
        {slides.map((slide, index) => (
          <div key={index}>
            <div 
              className="w-full text-white py-4 pb-4 md:py-24 md:pb-6 relative h-[360px] sm:h-[420px] md:h-[600px] flex items-center"
              style={{
                background: slide.bgImage ? slide.bgImage : slide.bgFallback,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70 z-0"></div>
              
              <div className="absolute inset-0 overflow-hidden z-0">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`absolute bg-white rounded-full opacity-30 sm:block ${i > 5 ? 'hidden' : ''}`}
                    style={{
                      width: `${Math.random() * 4 + 1}px`,
                      height: `${Math.random() * 4 + 1}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float-${i % 6} ${8 + Math.random() * 12}s linear infinite`
                    }}
                  />
                ))}
              </div>
              
              <div className="mx-auto max-w-7xl px-3 md:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-20 items-center">
                  <div className="text-center md:text-left order-1">
                    <div className="space-y-2 md:space-y-4 pb-6 md:pb-6">
                      <div className="space-y-0.5 md:space-y-2">
                        <h2 className="text-base md:text-3xl font-light text-gray-200 opacity-90">{slide.title}</h2>
                        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${slide.highlightColor} leading-tight drop-shadow-lg`}>
                          {slide.highlight}
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mx-auto md:mx-0 opacity-95 mt-2 md:mt-2 px-4 md:px-0">
                          {slide.subText}
                        </p>
                      </div>
                      
                      <div className="mt-4 md:mt-8">
                        <Link 
                          to={slide.buttonLink}
                          className={`inline-flex items-center bg-gradient-to-r ${slide.buttonColor} text-white font-bold text-sm md:text-base py-2 md:py-3.5 px-6 md:px-8 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 group border border-indigo-400/20`}
                        >
                          {slide.buttonText}
                          <FiArrowRight className="ml-1.5 md:ml-2 group-hover:translate-x-1 transition-transform duration-300 text-sm md:text-base" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex justify-center items-center order-2 mt-1.5 md:mt-0">
                    <div className="group relative w-full max-w-[130px] xs:max-w-[160px] sm:max-w-[200px] md:max-w-md mx-auto">
                      <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl opacity-70 group-hover:opacity-100 group-hover:bg-indigo-600/30 transition-all duration-500"></div>
                      
                      <div className="relative z-10 bg-gradient-to-br from-white/15 to-white/5 p-0.5 md:p-2 rounded-xl md:rounded-3xl border border-white/30 shadow-xl backdrop-blur-sm transform transition duration-700 group-hover:scale-105 group-hover:rotate-1">
                        <img 
                          src={slide.imageUrl} 
                          alt={slide.highlight} 
                          className="w-full rounded-lg md:rounded-2xl shadow-lg"
                          loading="eager"
                          onError={(e) => { e.target.src = slide.imageFallback; }}
                        />
                        
                        <div className="absolute -top-1 -right-1 md:-top-4 md:-right-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-1.5 py-0.5 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-sm font-medium shadow-lg transform transition-transform duration-500 group-hover:scale-110">
                          Premium
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Add custom CSS for slider dots and animations */}
      <style jsx>{`
        .hero-slider {
          position: relative;
          margin-bottom: 0;
        }
        .hero-slider .slick-slider {
          margin-bottom: 0 !important;
        }
        .hero-slider .slick-dots {
          bottom: 10px;
          margin: 0;
          padding: 0;
          position: absolute;
          line-height: 0;
        }
        .hero-slider .slick-dots li {
          margin: 0;
          width: 10px;
          height: 10px;
          padding: 0;
        }
        .hero-slider .slick-dots li button {
          width: 6px !important;
          height: 6px !important;
          background: white;
          opacity: 0.7;
          border-radius: 50%;
          transition: all 0.3s;
        }
        .hero-slider .slick-dots li button:hover {
          background: #3b82f6;
          opacity: 0.8;
        }
        .hero-slider .slick-dots li.slick-active button {
          background: #3b82f6 !important;
          opacity: 1 !important;
          width: 6px !important;
          height: 6px !important;
        }
        .hero-slider .slick-dots li button:before {
          display: none;
        }
        @media (max-width: 640px) {
          .hero-slider .slick-dots {
            bottom: 4px;
          }
          .hero-slider .slick-dots li {
            width: 8px;
            height: 8px;
          }
          .hero-slider .slick-dots li button {
            width: 4px !important;
            height: 4px !important;
          }
          .hero-slider .slick-dots li.slick-active button {
            width: 4px !important;
            height: 4px !important;
          }
          .hero-slider .slick-track {
            touch-action: pan-y;
          }
          .hero-slider .slick-slide {
            -webkit-tap-highlight-color: transparent;
          }
        }
        @keyframes float-0 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(10px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-10px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-35px) translateX(15px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(-15px); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(-20px); }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel; 