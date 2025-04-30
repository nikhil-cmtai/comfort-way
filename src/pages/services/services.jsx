import React from 'react';
import { FiTool, FiShoppingCart, FiRefreshCw, FiCheckCircle, FiPhone, FiShield, FiHome, FiZap, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Service categories with beautiful icons and modern styling
const serviceCategories = [
  {
    id: 'repair',
    name: 'Maintenance & Repair',
    icon: <FiTool className="w-8 h-8" />,
    color: 'from-blue-600 to-indigo-500',
    description: 'Expert repair services for all your home appliances',
    image: '/images/products/repair-hero.webp',
  },
  {
    id: 'buy',
    name: 'Buy New Appliances',
    icon: <FiShoppingCart className="w-8 h-8" />,
    color: 'from-green-500 to-teal-500',
    description: 'Quality appliances from top brands with installation',
    image: '/images/products/buy-hero.webp',
  },
  {
    id: 'rent',
    name: 'Appliance Rentals',
    icon: <FiRefreshCw className="w-8 h-8" />,
    color: 'from-orange-500 to-amber-500',
    description: 'Flexible rental options for short or long term needs',
    image: '/images/products/rent-hero.webp',
  },
  {
    id: 'protection',
    name: 'Protection Plans',
    icon: <FiShield className="w-8 h-8" />,
    color: 'from-purple-600 to-indigo-600',
    description: 'Comprehensive coverage for all your home appliances',
    image: '/images/products/protection-hero.webp',
  }
];

// Featured services with detailed information
const featuredServices = [
  {
    title: "AC Services",
    icon: <FiZap className="w-16 h-16 text-blue-600" />,
    image: "/images/products/ac-2.webp",
    services: [
      "AC Installation & Setup",
      "Repair & Troubleshooting",
      "Gas Filling & Cooling Check",
      "Deep Cleaning & Jet Service",
      "Annual Maintenance Contracts"
    ],
    link: "/maintenance-repair/ac"
  },
  {
    title: "Refrigerator Services",
    icon: <FiHome className="w-16 h-16 text-indigo-600" />,
    image: "/images/products/Refrigerator.webp",
    services: [
      "Cooling System Repair",
      "Compressor Repair & Replacement",
      "Gas Refilling & Leakage Fix",
      "Thermostat & Sensor Calibration",
      "Door Alignment & Sealing"
    ],
    link: "/maintenance-repair/refrigerator"
  },
  {
    title: "Washing Machine Services",
    icon: <FiRefreshCw className="w-16 h-16 text-teal-600" />,
    image: "/images/products/Washing-machine.webp",
    services: [
      "Installation & Setup",
      "Motor & Pump Repair",
      "Spin & Agitator Fix",
      "Water Inlet & Drainage Issues",
      "Noise Troubleshooting"
    ],
    link: "/maintenance-repair/washing-machine"
  }
];

// Protection plan highlights
const protectionPlans = [
  {
    title: "1 BHK Plan",
    price: "₹5,999",
    originalPrice: "₹9,999",
    features: [
      "All appliances covered",
      "Unlimited repairs",
      "Free service visits",
      "Genuine parts guarantee"
    ]
  },
  {
    title: "2 BHK Plan",
    price: "₹7,799",
    originalPrice: "₹12,999",
    features: [
      "All appliances covered",
      "Unlimited repairs",
      "Free service visits",
      "Genuine parts guarantee",
      "Priority support"
    ],
    popular: true
  },
  {
    title: "3 BHK Plan",
    price: "₹9,599",
    originalPrice: "₹15,999",
    features: [
      "All appliances covered",
      "Unlimited repairs",
      "Free service visits",
      "Genuine parts guarantee",
      "Priority support",
      "Annual maintenance check"
    ]
  }
];

// Gallery images for service work
const galleryImages = [
  { src: '/images/gallery/Image1.jpeg', alt: 'Technician repairing AC' },
  { src: '/images/gallery/Image2.jpeg', alt: 'Washing machine service' },
  { src: '/images/gallery/Image3.jpeg', alt: 'Geyser installation' },
  { src: '/images/gallery/Image4.jpeg', alt: 'Chimney cleaning' },
  { src: '/images/gallery/Image5.jpeg', alt: 'Hob Burner & Ignition Service' },
  { src: '/images/gallery/Image6.jpeg', alt: 'Microwave Repair & Cleaning' },
  { src: '/images/gallery/Image7.jpeg', alt: 'Refrigerator Gas & Cooling Repair' },
  { src: '/images/gallery/Image8.jpeg', alt: 'Water Purifier Filter Change' },
];

const Services = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Animated Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 right-20 w-60 h-60 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-10 left-20 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider mb-6 animate-fadeIn">ALL YOUR COMFORT SOLUTIONS</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight leading-tight animate-fadeInUp" style={{textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>
              Premium Services for <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">Home Appliances</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-white/90 mb-12 max-w-3xl mx-auto animate-fadeInUp animation-delay-200">
              From repairs and maintenance to new purchases and protection plans - all your appliance needs covered under one roof by certified experts
            </p>
            <div className="flex flex-wrap justify-center gap-5 animate-fadeInUp animation-delay-400">
              <a href="#categories" className="bg-white text-indigo-600 hover:text-indigo-800 font-medium py-3 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                Explore Services
              </a>
              <a href="/contact" className="bg-transparent text-white border-2 border-white hover:bg-white/10 font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Contact Us
              </a>
            </div>
          </div>
        </div>
        
        {/* Wave design at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-white">
            <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,101.3C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Service Categories Section - updated to be sexier */}
      <section id="categories" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-indigo-100 rounded-full text-indigo-600 text-sm font-medium tracking-wider mb-2">OUR SERVICES</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              What We <span className="text-indigo-600">Offer</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for all your home appliance needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-7xl mx-auto">
            {serviceCategories.map((category, index) => (
              <div 
                key={category.id}
                className="relative flex flex-col group bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
                style={{animationDelay: `${index * 100}ms`}}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-80"></div>
                
                {/* Image at top position */}
                <div className="relative h-52 overflow-hidden rounded-t-3xl">
                  <img 
                    src={category.image || `https://dummyimage.com/600x400/cbd5e1/4338ca&text=${category.name}`} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://dummyimage.com/600x400/cbd5e1/4338ca&text=${category.name}`;
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Category tag */}
                  <div className={`absolute top-3 right-3 bg-gradient-to-r ${category.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
                    {category.id.toUpperCase()}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-grow p-6 flex flex-col relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent text-center mb-2">{category.name}</h3>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mb-4 group-hover:w-3/4 transition-all duration-700"></div>
                  <p className="text-gray-600 text-center text-sm mb-6">{category.description}</p>
                  
                  <Link 
                    to={`/${category.id}`} 
                    className="mt-auto flex items-center justify-center text-white font-medium px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transform group-hover:scale-105 transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-lg"
                  >
                    <span className="relative z-10">Discover Services</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    
                    {/* Ripple effect */}
                    <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section - updated to be sexier */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-indigo-100 rounded-full text-indigo-600 text-sm font-medium tracking-wider mb-2">POPULAR SERVICES</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Most <span className="text-indigo-600">Requested</span> Services
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Expert solutions for your most essential home appliances
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {featuredServices.map((service, index) => (
              <div 
                key={index}
                className="flex flex-col bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-3 group h-full relative overflow-hidden"
                style={{animationDelay: `${index * 100}ms`}}
              >
                {/* Glass morphism effect card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-90"></div>
                
                {/* Image with overlay */}
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://dummyimage.com/600x400/cbd5e1/4338ca&text=${service.title}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Service title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300 mb-1 text-shadow">
                      {service.title}
                    </h3>
                    <div className="w-16 h-0.5 bg-white/60 group-hover:w-24 transition-all duration-500"></div>
                  </div>
                </div>

                <div className="p-7 flex-grow flex flex-col relative z-10">
                  <ul className="space-y-3 mb-8">
                    {service.services.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300" style={{transitionDelay: `${i * 50}ms`}}>
                        <div className="mt-1 text-green-500 flex-shrink-0 bg-green-100 rounded-full p-1.5 shadow group-hover:shadow-md transition-shadow duration-300">
                          <FiCheckCircle className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={service.link} 
                    className="mt-auto flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transform group-hover:scale-105 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">Explore All Services</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    
                    {/* Ripple effect */}
                    <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protection Plans Section - updated to be sexier */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-40 left-10 w-80 h-80 bg-indigo-100 rounded-full opacity-40 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-100 rounded-full opacity-40 blur-3xl animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-purple-100 rounded-full opacity-30 blur-2xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-indigo-100 rounded-full text-indigo-600 text-sm font-medium tracking-wider mb-2">PROTECTION PLANS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="text-indigo-600">Comprehensive</span> Coverage
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete peace of mind with our premium protection plans
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {protectionPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-3 group ${plan.popular ? 'md:scale-105 z-10 ring-2 ring-indigo-500' : ''}`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                {/* Card backdrop gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-90"></div>
                
                {/* Plan badge ribbon */}
                <div className={`absolute top-6 -left-6 rotate-[-45deg] py-1 w-28 text-center text-xs uppercase tracking-wider font-bold shadow-md ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700'}`}>
                  {plan.popular ? 'Most Popular' : 'Basic'}
                </div>
                
                {/* Discount Badge */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-2 group-hover:rotate-0 transition-transform duration-300">40% OFF</div>
                
                <div className={`p-6 text-center relative z-10 ${plan.popular ? 'pt-8' : 'pt-8'}`}>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3">{plan.title}</h3>
                  <div className="flex flex-col items-center justify-center gap-1 mb-4">
                    <span className="text-sm text-gray-400 line-through">{plan.originalPrice}</span>
                    <span className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-xs text-gray-500">Annual Plan</span>
                  </div>
                  
                  <div className="w-16 h-0.5 bg-gradient-to-r from-indigo-300 to-blue-300 mx-auto mb-4 group-hover:w-24 transition-all duration-500"></div>
                  
                  <div className="bg-gray-50 py-3 px-2 rounded-xl mb-4">
                    <ul className="space-y-2 text-left">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{transitionDelay: `${i * 50}ms`}}>
                          <div className="mt-0.5 text-green-500 flex-shrink-0 bg-green-100 rounded-full p-0.5 shadow">
                            <FiCheckCircle className="w-3 h-3" />
                          </div>
                          <span className="text-gray-700 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a 
                    href="/protection-plans" 
                    className={`inline-block w-full py-3 px-6 rounded-xl font-medium shadow-md transition-all duration-300 relative overflow-hidden ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:shadow-indigo-200/50 transform group-hover:scale-105' 
                        : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-100 group-hover:border-indigo-300'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center text-sm">
                      Get Protected
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    
                    {/* Ripple effect */}
                    <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a 
              href="/protection-plans" 
              className="group relative inline-flex items-center bg-white text-indigo-600 font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 hover:border-indigo-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                View All Protection Plans
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="absolute inset-0 h-full w-0 bg-indigo-50 transition-all duration-500 ease-out group-hover:w-full -z-1"></span>
            </a>
          </div>
        </div>
        
        {/* Add animations for background elements */}
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2.5s infinite;
          }
          .animate-pulse-slow {
            animation: pulse 6s ease-in-out infinite;
          }
          .animate-pulse-slow-delay {
            animation: pulse 6s ease-in-out 3s infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .text-shadow {
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .-z-1 {
            z-index: -1;
          }
          .animate-float-1 {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-2 {
            animation: float 6s ease-in-out 2s infinite;
          }
          .animate-float-3 {
            animation: float 6s ease-in-out 4s infinite;
          }
        `}</style>
      </section>

      {/* Service Process Section - sexy update */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-500 rounded-full"></div>
          <div className="absolute top-40 right-20 w-60 h-60 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-indigo-100 rounded-full text-indigo-600 text-sm font-medium tracking-wider mb-2">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="text-indigo-600">Simple</span> Process
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A hassle-free journey to get your appliances working perfectly
            </p>
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto mb-20">
            {/* Animated Connecting Line */}
            <div className="hidden md:block absolute top-24 left-[10%] right-[10%] h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-green-500 rounded-full z-0">
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
            </div>
            
            {/* Step 1 */}
            <div className="group flex flex-col items-center text-center md:w-1/3 z-10 mb-16 md:mb-0 transition-all duration-500 hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 border-4 border-white animate-float-1">
                  <div className="absolute inset-2 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-50 rounded-full blur-lg transform scale-105 animate-pulse-slow"></div>
                  <span className="relative">1</span>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-400 rounded-full animate-ping opacity-20 group-hover:opacity-30"></div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs border border-gray-100 hover:shadow-xl transition-all duration-500 relative overflow-hidden group-hover:border-indigo-100">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-600"></div>
                
                {/* Icon */}
                <div className="mb-4 text-indigo-600 bg-indigo-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto shadow-inner transform group-hover:rotate-6 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">Book a Service</h3>
                <div className="h-0.5 w-12 bg-gradient-to-r from-indigo-500 to-blue-500 mb-4 mx-auto group-hover:w-1/2 transition-all duration-500"></div>
                <p className="text-gray-600 text-sm">Schedule online or call our customer service team for assistance</p>
                
                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-indigo-50 rounded-tl-2xl -z-1 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-bottom-right"></div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="group flex flex-col items-center text-center md:w-1/3 z-10 mb-16 md:mb-0 md:mt-16 transition-all duration-500 hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 border-4 border-white animate-float-2">
                  <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-teal-400 opacity-50 rounded-full blur-lg transform scale-105 animate-pulse-slow"></div>
                  <span className="relative">2</span>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-blue-400 rounded-full animate-ping opacity-20 group-hover:opacity-30 animation-delay-1000"></div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs border border-gray-100 hover:shadow-xl transition-all duration-500 relative overflow-hidden group-hover:border-blue-100">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-teal-500"></div>
                
                {/* Icon */}
                <div className="mb-4 text-blue-600 bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto shadow-inner transform group-hover:rotate-6 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Visit</h3>
                <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-teal-500 mb-4 mx-auto group-hover:w-1/2 transition-all duration-500"></div>
                <p className="text-gray-600 text-sm">Our certified technician arrives at your location within the scheduled time</p>
                
                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-50 rounded-tl-2xl -z-1 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-bottom-right"></div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="group flex flex-col items-center text-center md:w-1/3 z-10 transition-all duration-500 hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 border-4 border-white animate-float-3">
                  <div className="absolute inset-2 bg-gradient-to-r from-teal-400 to-green-400 opacity-50 rounded-full blur-lg transform scale-105 animate-pulse-slow"></div>
                  <span className="relative">3</span>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-green-400 rounded-full animate-ping opacity-20 group-hover:opacity-30 animation-delay-2000"></div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs border border-gray-100 hover:shadow-xl transition-all duration-500 relative overflow-hidden group-hover:border-green-100">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-500"></div>
                
                {/* Icon */}
                <div className="mb-4 text-green-600 bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto shadow-inner transform group-hover:rotate-6 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">Problem Solved</h3>
                <div className="h-0.5 w-12 bg-gradient-to-r from-teal-500 to-green-500 mb-4 mx-auto group-hover:w-1/2 transition-all duration-500"></div>
                <p className="text-gray-600 text-sm">Get your appliance fixed with guaranteed satisfaction and warranty</p>
                
                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-green-50 rounded-tl-2xl -z-1 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-bottom-right"></div>
              </div>
            </div>
          </div>
          
          {/* Gallery Section - Improved Layout */}
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Our <span className="text-indigo-600">Work</span> in Action
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 aspect-square bg-white border border-gray-100 group relative transform hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={e => { e.target.src = '/images/placeholder.png'; }} 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                    <p className="text-white text-sm font-medium text-center">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - sexy update */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 right-20 w-60 h-60 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-10 left-20 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm mb-8">
              <FiStar className="w-10 h-10 text-yellow-300" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Ready for <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">Premium Service</span> Experience?
            </h2>
            
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Let our experts handle your appliance needs with guaranteed satisfaction
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="/contact" 
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-white text-indigo-600 hover:text-indigo-800 font-bold rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="absolute w-0 h-0 transition-all duration-700 ease-out bg-indigo-100 rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                <Link to="/contact">
                <span className="relative">Book a Service</span>
                </Link>
                <svg className="w-6 h-6 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
              <a 
                href="tel:+919967157463" 
                className="flex items-center gap-2 bg-transparent text-white border-2 border-white hover:bg-white/10 font-medium py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <FiPhone className="w-5 h-5" /> 
                Call Now
              </a>
            </div>
            
            <div className="mt-12 pt-12 border-t border-white/20 flex flex-wrap justify-center gap-10 text-white/70">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="w-5 h-5 text-green-300" />
                <span>Certified Technicians</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="w-5 h-5 text-green-300" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="w-5 h-5 text-green-300" />
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 