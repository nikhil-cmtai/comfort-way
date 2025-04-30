import React, { useEffect } from 'react';
import { FiUsers, FiAward, FiCheckCircle, FiTrendingUp, FiCalendar, FiMapPin, FiPhone, 
         FiMail, FiArrowRight, FiTool, FiSettings, FiTarget, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import about from '/images/about-banner.jpg';
import about2 from '/images/gallery/Image1.jpeg';


// Animation function for scroll effects
const useScrollAnimation = () => {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8);
        
        if (isVisible) {
          el.classList.add('animated');
        }
      });
    };
    
    window.addEventListener('scroll', animateElements);
    animateElements(); // Run once on load
    
    return () => window.removeEventListener('scroll', animateElements);
  }, []);
};

const whyChoose = [
  {
    icon: <FiUsers className="w-10 h-10 text-indigo-600 mb-4" />, 
    title: 'Expert Technicians', 
    desc: 'Certified, experienced, and background-checked professionals.'
  },
  {
    icon: <FiAward className="w-10 h-10 text-green-600 mb-4" />, 
    title: 'Affordable Pricing', 
    desc: 'Transparent, competitive rates for all services.'
  },
  {
    icon: <FiCalendar className="w-10 h-10 text-purple-600 mb-4" />, 
    title: 'Trusted Since 2012', 
    desc: 'Serving Mumbai with pride and reliability for over a decade.'
  },
];

const ourValues = [
  { 
    icon: <FiHeart className="w-8 h-8 text-pink-500" />, 
    title: 'Customer Satisfaction', 
    desc: "We prioritize our customers' needs and strive to exceed expectations." 
  },
  { 
    icon: <FiSettings className="w-8 h-8 text-indigo-500" />, 
    title: 'Technical Excellence', 
    desc: 'We invest in regular training and use advanced techniques.' 
  },
  { 
    icon: <FiTool className="w-8 h-8 text-blue-500" />, 
    title: 'Quality Service', 
    desc: 'We ensure every repair meets our high-quality standards.' 
  },
  { 
    icon: <FiTarget className="w-8 h-8 text-green-500" />, 
    title: 'Reliability', 
    desc: 'We stand behind our work with comprehensive warranties.' 
  }
];

export default function About() {
  // Use our scroll animation hook
  useScrollAnimation();
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section - Enhanced with animated elements */}
      <section
        className="relative w-full h-[250px] sm:h-[320px] md:h-[420px] flex items-center justify-center text-center shadow"
        style={{
          backgroundImage: `url(${about})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition duration-1000 ease-out">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight text-white drop-shadow-lg">About ComfortWay</h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto text-white drop-shadow mb-2">Mumbai's Most Trusted Home Appliance Service</p>
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">Expert Repair</span>
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">Certified Technicians</span>
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">Since 2012</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section - Enhanced to match home page stats */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 -z-10"></div>
        <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl -z-10 animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-200 rounded-full opacity-10 blur-3xl -z-10"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-indigo-500 rounded-full opacity-10"
              style={{
                width: `${Math.random() * 8 + 3}px`,
                height: `${Math.random() * 8 + 3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-${i % 6} ${15 + Math.random() * 20}s linear infinite`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <span className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">Our achievements</span>
            <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Our Impact in Numbers</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto my-5"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              The trust of thousands of customers has made ComfortWay Mumbai's leading appliance service provider.
            </p>
          </div>
          
          {/* Stats grid - Matching home page styling */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <div className="relative group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              
              {/* Animated glow effect */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10"></div>
              
              {/* Circular icon container with gradient background */}
              <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center mb-4 text-white transform group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                <FiCalendar className="w-8 h-8" />
              </div>
              
              <div className="relative z-10 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  10+
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Years Experience</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Serving Mumbai since 2012</p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-indigo-100 to-transparent opacity-30 transform rotate-45 translate-x-4 -translate-y-4"></div>
            </div>
            
            <div className="relative group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out delay-100">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              
              {/* Animated glow effect */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10"></div>
              
              {/* Circular icon container with gradient background */}
              <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-4 text-white transform group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                <FiUsers className="w-8 h-8" />
              </div>
              
              <div className="relative z-10 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  15,000+
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Happy Customers</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Satisfied clients across Mumbai</p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-blue-100 to-transparent opacity-30 transform rotate-45 translate-x-4 -translate-y-4"></div>
            </div>
            
            <div className="relative group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              
              {/* Animated glow effect */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10"></div>
              
              {/* Circular icon container with gradient background */}
              <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-4 text-white transform group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                <FiTool className="w-8 h-8" />
              </div>
              
              <div className="relative z-10 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  50+
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Expert Technicians</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Certified professionals</p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-purple-100 to-transparent opacity-30 transform rotate-45 translate-x-4 -translate-y-4"></div>
            </div>
            
            <div className="relative group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out delay-300">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              
              {/* Animated glow effect */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10"></div>
              
              {/* Circular icon container with gradient background */}
              <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 text-white transform group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto">
                <FiSettings className="w-8 h-8" />
              </div>
              
              <div className="relative z-10 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  1000+
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Monthly Repairs</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Appliances serviced monthly</p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-amber-100 to-transparent opacity-30 transform rotate-45 translate-x-4 -translate-y-4"></div>
            </div>
          </div>
        </div>
        
        {/* Custom animations */}
        <style jsx>{`
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
          .animate-pulse-slow {
            animation: pulse 5s ease-in-out infinite;
          }
          .animate-pulse-slow-delay {
            animation: pulse 5s ease-in-out 2.5s infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </section>

      {/* About Section - Simplified with single card */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Single card with image left, content right */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Image */}
              <div className="w-full md:w-2/5 relative">
                <img 
                  src={about2} 
                  alt="About ComfortWay" 
                  className="w-full h-full object-cover object-center md:h-full min-h-[300px]"
                />
                {/* Floating badges */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-xl z-20 text-sm font-medium">Since 2012</div>
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-xl z-20 text-sm font-medium">Top Rated</div>
              </div>
              
              {/* Right side - Content */}
              <div className="w-full md:w-3/5 p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 flex items-center">
                  <span className="border-l-4 border-indigo-500 pl-4">Who We Are</span>
                </h2>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Mumbai's Premier Home Appliance Care Experts
                </h3>
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  Best Electrical Appliances Installation, Plumbing & Maintenance Service Providers in Mumbai.
                </p>
                <p className="text-base text-gray-600 mb-4">
                  If you are looking for the best Home Appliances Repairing & Plumbing Service company in Mumbai then COMFORT WAY is the leading company which provides complete repairing and maintenance services like Air Conditioner Repairing, Geyser Repairing, Refrigerator Repairing, Washing Machine Repairing, Microwave Oven Repairing, Ro Water Purifier and Plumbing in Mumbai at the most affordable rates.
                </p>
                <p className="text-base text-gray-600 mb-6">
                  With the latest advancements in the home appliance and electronics goods sector in recent times you need the experts in the field to stay up to date with the latest technology and provide the best repairing and maintenance services. We have been in the field of home appliance repairing and plumbing since long. It is the rich experience we have that provides us with a distinct edge over our competitors in the field.
                </p>
                
                {/* Feature badges */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">Trained Technicians</span>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-100">Safety First</span>
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium border border-purple-100">Warranty Support</span>
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium border border-indigo-100">Fast Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section - Greatly Enhanced */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
        <div className="absolute top-1/3 left-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply opacity-70 blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply opacity-70 blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition duration-1000 ease-out">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Vision & Mission</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At ComfortWay, we're driven by a clear vision and mission that guides everything we do. Our commitment to excellence shapes our approach to service delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision Card - Enhanced with better animation */}
            <div className="group bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center border-t-4 border-indigo-400 relative overflow-hidden animate-on-scroll opacity-0 translate-y-10 transition duration-700 ease-out hover:translate-y-[-10px]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="mb-8 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-indigo-200 rounded-full scale-0 group-hover:scale-100 opacity-20 transition-transform duration-500"></div>
                <span className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 shadow-lg group-hover:shadow-indigo-200/50 transition-shadow duration-500">
                  <FiTrendingUp className="w-10 h-10 text-white" />
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Our Vision</h3>
              
              <p className="text-base md:text-lg text-gray-600 mb-6">
                To be Mumbai's most trusted and innovative home service provider, empowering every home with comfort and reliability. We aim to set new industry standards and become the go-to name for all home appliance needs.
              </p>
              
              {/* Strategic objectives */}
              <div className="w-full space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  </div>
                  <p className="text-sm text-left text-gray-600">Become the #1 service provider in Mumbai</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  </div>
                  <p className="text-sm text-left text-gray-600">Expand our services to all of Maharashtra</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  </div>
                  <p className="text-sm text-left text-gray-600">Innovate with technology-driven solutions</p>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-indigo-200 to-blue-100 rounded-full blur-3xl opacity-30 z-0 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
            
            {/* Mission Card - Enhanced with better animation */}
            <div className="group bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center border-t-4 border-green-400 relative overflow-hidden animate-on-scroll opacity-0 translate-y-10 transition duration-700 ease-out delay-150 hover:translate-y-[-10px]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="mb-8 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-green-200 rounded-full scale-0 group-hover:scale-100 opacity-20 transition-transform duration-500"></div>
                <span className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-blue-400 shadow-lg group-hover:shadow-green-200/50 transition-shadow duration-500">
                  <FiCheckCircle className="w-10 h-10 text-white" />
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">Our Mission</h3>
              
              <p className="text-base md:text-lg text-gray-600 mb-6">
                Delivering expert appliance repair, installation, and maintenance with honesty, speed, and care—every single time. We're committed to solving problems efficiently while building lasting customer relationships.
              </p>
              
              {/* Key mission points */}
              <div className="w-full space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-sm text-left text-gray-600">Provide same-day service for urgent repairs</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-sm text-left text-gray-600">Use only high-quality, genuine spare parts</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-sm text-left text-gray-600">Maintain highest standards of customer service</p>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-green-200 to-blue-100 rounded-full blur-3xl opacity-30 z-0 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section - New Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply opacity-70 blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply opacity-70 blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition duration-1000 ease-out">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide our approach to business and ensure we consistently deliver exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ourValues.map((value, idx) => (
              <div 
                key={value.title} 
                className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center overflow-hidden border border-gray-100 animate-on-scroll opacity-0 translate-y-10 transition duration-700 ease-out hover:shadow-2xl hover:translate-y-[-5px]"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="p-4 mb-4 rounded-full bg-gray-50">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
                
                {/* Decorative Corner */}
                <div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full border-8 border-gray-50 z-0"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://dummyimage.com/100x100/eeeeee/cccccc&text=+')] opacity-5 z-0"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition duration-1000 ease-out">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose ComfortWay?</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've built our reputation on reliability, expertise, and outstanding customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoose.map((item, idx) => (
              <div 
                key={item.title} 
                className={`group bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center overflow-hidden border-t-4 ${idx === 0 ? 'border-blue-400' : idx === 1 ? 'border-green-400' : 'border-purple-400'} animate-on-scroll opacity-0 translate-y-10 transition duration-700 ease-out hover:shadow-2xl hover:translate-y-[-10px]`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative mb-6 group-hover:scale-110 transition-transform duration-300">
                  {/* Icon background glow */}
                  <div className={`absolute inset-0 rounded-full blur-lg opacity-30 ${idx === 0 ? 'bg-blue-300' : idx === 1 ? 'bg-green-300' : 'bg-purple-300'}`}></div>
                  {/* Icon */}
                  <div className="relative z-10">
                    {item.icon}
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold mb-3 ${idx === 0 ? 'text-blue-600' : idx === 1 ? 'text-green-600' : 'text-purple-600'}`}>
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-base">{item.desc}</p>
                
                {/* Feature accent */}
                <div className={`w-full h-1 mt-6 rounded-full ${idx === 0 ? 'bg-blue-100' : idx === 1 ? 'bg-green-100' : 'bg-purple-100'} group-hover:${idx === 0 ? 'bg-blue-200' : idx === 1 ? 'bg-green-200' : 'bg-purple-200'} transition-colors duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/5 rounded-full mix-blend-overlay blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="animate-on-scroll opacity-0 translate-x-[-30px] transition duration-1000 ease-out">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Experience ComfortWay?</h2>
                <p className="text-xl text-indigo-100 mb-6">
                  Book a service or get in touch with our team for the best appliance repair, installation, and maintenance in Mumbai.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link to="/contact" className="inline-flex items-center justify-center bg-white text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-50 transition text-lg hover:shadow-xl group">
                    Contact Us
                    <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link to="/maintenance-repair" className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-white/10 transition text-lg">
                    Our Services
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 animate-on-scroll opacity-0 translate-x-[30px] transition duration-1000 ease-out">
                <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm">
                  <FiPhone className="text-white w-8 h-8 mb-2" />
                  <h3 className="text-white font-bold text-xl mb-1">Call Us</h3>
                  <p className="text-indigo-100">+91 9876543210</p>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm">
                  <FiMail className="text-white w-8 h-8 mb-2" />
                  <h3 className="text-white font-bold text-xl mb-1">Email Us</h3>
                  <p className="text-indigo-100">info@comfortway.in</p>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm col-span-2">
                  <FiMapPin className="text-white w-8 h-8 mb-2" />
                  <h3 className="text-white font-bold text-xl mb-1">Visit Us</h3>
                  <p className="text-indigo-100">123 Comfort Street, Mumbai, Maharashtra 400001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Add this CSS for animations to work
const styles = document.createElement('style');
styles.innerHTML = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
  }
  .animate-on-scroll.animated {
    opacity: 1;
    transform: translateY(0);
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  .floating {
    animation: float 4s ease-in-out infinite;
  }
`;
document.head.appendChild(styles);