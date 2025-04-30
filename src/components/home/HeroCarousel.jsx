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
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    appendDots: dots => (
      <div style={{ bottom: "25px", zIndex: 10 }}>
        <ul className="flex justify-center gap-3"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <button className="w-4 h-4 bg-white rounded-full opacity-70 hover:opacity-90 focus:opacity-100 transition-opacity duration-200 border-2 border-indigo-500/40"></button>
    )
  };

  const slides = [
    {
      bgImage: 'url("/images/hero-bg-1.jpg")', // Replace with actual image path
      bgFallback: 'bg-gradient-to-r from-gray-900 to-indigo-900',
      imageUrl: '/images/products/ac-2.webp', // Replace with actual image
      imageFallback: 'https://dummyimage.com/400x300/4366d6/ffffff&text=Maintenance+Repair',
      title: 'Professional Appliance',
      highlight: 'Maintenance & Repair',
      highlightColor: 'text-indigo-300',
      subText: 'Expert technicians for all your appliance repair and maintenance needs',
      badges: ['Same-Day Service', 'Experienced Technicians', '90-Day Warranty']
    },
    {
      bgImage: 'url("/images/hero-bg-2.jpg")', // Replace with actual image path
      bgFallback: 'bg-gradient-to-r from-gray-900 to-blue-900',
      imageUrl: '/images/products/fridge.webp', // Replace with actual image
      imageFallback: 'https://dummyimage.com/400x300/0d9488/ffffff&text=Buy+Appliances',
      title: 'Premium Home Appliances',
      highlight: 'Buy New Devices',
      highlightColor: 'text-cyan-300',
      subText: 'Top quality home appliances with professional installation included',
      badges: ['Premium Brands', 'Free Installation', 'Extended Warranty']
    },
    {
      bgImage: 'url("/images/hero-bg-3.jpg")', // Replace with actual image path
      bgFallback: 'bg-gradient-to-r from-gray-900 to-purple-900',
      imageUrl: '/images/products/Washing-machine.webp', // Replace with actual image
      imageFallback: 'https://dummyimage.com/400x300/6266f1/ffffff&text=Rent+Appliances',
      title: 'Affordable Solutions with',
      highlight: 'Appliance Rentals',
      highlightColor: 'text-yellow-300',
      subText: 'Flexible rental options for all major home appliances with maintenance included',
      badges: ['No Upfront Cost', 'Free Maintenance', 'Flexible Duration']
    },
  ];

  return (
    <div className="relative">
      <Slider {...settings} className="hero-slider">
        {slides.map((slide, index) => (
          <div key={index}>
            <div 
              className="w-full text-white py-16 md:py-24 relative h-[500px] md:h-[600px] flex items-center"
              style={{
                background: slide.bgImage ? slide.bgImage : slide.bgFallback,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Enhanced dark overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70 z-0"></div>
              
              {/* Add animated particles in background */}
              <div className="absolute inset-0 overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute bg-white rounded-full opacity-30"
                    style={{
                      width: `${Math.random() * 5 + 2}px`,
                      height: `${Math.random() * 5 + 2}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float-${i % 6} ${10 + Math.random() * 15}s linear infinite`
                    }}
                  />
                ))}
              </div>
              
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                  {/* Image with enhanced animation */} 
                  <div className="flex justify-center items-center order-2 md:order-1">
                    <div className="group relative">
                      {/* Enhanced background glow effect */}
                      <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl opacity-70 group-hover:opacity-100 group-hover:bg-indigo-600/30 transition-all duration-500"></div>
                      
                      {/* Image with improved styling */}
                      <div className="relative z-10 bg-gradient-to-br from-white/15 to-white/5 p-2 rounded-3xl border border-white/30 shadow-2xl backdrop-blur-sm transform transition duration-700 group-hover:scale-105 group-hover:rotate-1">
                        <img 
                          src={slide.imageUrl} 
                          alt={slide.highlight} 
                          className="w-full max-w-md rounded-2xl shadow-lg"
                          onError={(e) => { e.target.src = slide.imageFallback; }}
                        />
                        
                        {/* Enhanced floating badge */}
                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg transform transition-transform duration-500 group-hover:scale-110">
                          Premium Services
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Content with enhanced animations */}
                  <div className="text-center md:text-left order-1 md:order-2">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-light text-gray-200 opacity-90">{slide.title}</h2>
                        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${slide.highlightColor} leading-tight drop-shadow-lg`}>
                          {slide.highlight}
                        </h1>
                        <p className="text-lg text-gray-300 max-w-xl mx-auto md:mx-0 opacity-95">
                          {slide.subText}
                        </p>
                      </div>
                      
                      {/* Enhanced Feature Badges */}
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {slide.badges.map((badge, i) => (
                          <div key={i} className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 group-hover:bg-white/30 transition-colors duration-300">
                            <FiCheckCircle className="text-green-400 mr-2" />
                            <span className="text-sm font-medium text-white">{badge}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Enhanced Call to Action Button */}
                      <div className="mt-8">
                        <Link 
                          to="/maintenance-repair" 
                          className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 group border border-indigo-400/20"
                        >
                          Book Now
                          <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
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
        .hero-slider .slick-dots li.slick-active button {
          opacity: 1 !important;
          transform: scale(1.2);
          background: linear-gradient(to right, #4f46e5, #3b82f6);
        }
        .hero-slider .slick-dots li button:before {
          display: none;
        }
        @keyframes float-0 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-50px) translateX(20px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(-20px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-70px) translateX(30px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-40px) translateX(-30px); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-60px) translateX(10px); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-50px) translateX(-40px); }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel; 