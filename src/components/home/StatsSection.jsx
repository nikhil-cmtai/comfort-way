import React, { useEffect, useRef, useState } from 'react';
import { FiUsers, FiTool, FiStar, FiSmile, FiClock, FiCheck, FiShield, FiAward } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const stats = [
  {
    label: 'Happy Customers',
    value: 150,
    icon: <FiSmile className="w-10 h-10" />,
    color: 'from-indigo-600 to-blue-600',
    description: 'Customers trust us for quality service',
  },
  {
    label: 'Appliances Repaired',
    value: 1500,
    icon: <FiTool className="w-10 h-10" />,
    color: 'from-blue-600 to-cyan-600',
    description: 'Expert repairs across all brands',
  },
  {
    label: '5-Star Reviews',
    value: 135,
    icon: <FiStar className="w-10 h-10" />,
    color: 'from-amber-500 to-orange-600',
    description: 'Consistently rated excellent',
  },
  {
    label: 'Expert Technicians',
    value: 60,
    icon: <FiUsers className="w-10 h-10" />,
    color: 'from-purple-600 to-pink-600',
    description: 'Certified professionals',
  },
];

const highlights = [
  {
    icon: <FiClock className="w-6 h-6 text-blue-600" />,
    title: 'Fast Response',
    description: 'Expert repairs completed within 48 hours for all major appliances.',
  },
  {
    icon: <FiCheck className="w-6 h-6 text-green-600" />,
    title: 'Quality Guaranteed',
    description: 'All services backed by our 100% satisfaction guarantee policy.',
  },
  {
    icon: <FiShield className="w-6 h-6 text-indigo-600" />,
    title: '90-Day Warranty',
    description: 'Every repair includes a comprehensive 90-day warranty coverage.',
  },
  {
    icon: <FiAward className="w-6 h-6 text-amber-600" />,
    title: 'Best Price Promise',
    description: 'Competitive pricing with no hidden costs or surprise fees.',
  },
];

const formatNumber = (num) => num.toLocaleString();

const useCountUpOnView = (end, duration = 1200, trigger) => {
  const [count, setCount] = useState(0);
  const frame = useRef();

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [end, duration, trigger]);
  return count;
};

const StatsSection = () => {
  const sectionRef = useRef();
  const [inView, setInView] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const counts = stats.map((stat) => useCountUpOnView(stat.value, 1500, inView));

  return (
    <section ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">
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
          <span className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">Trusted by thousands</span>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Our Impact in Numbers</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto my-5"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            At ComfortWay, we take pride in our service excellence. Here's how we've made a difference:
          </p>
        </div>
        
        {/* Main stats - styled cards with animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="relative group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100"
              style={{transitionDelay: `${idx * 100}ms`}}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Animated glow effect */}
              <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${stat.color} opacity-0 blur-3xl transition-opacity duration-700 ${hoverIndex === idx ? 'opacity-10' : ''}`}></div>
              
              {/* Circular icon container with gradient background */}
              <div className={`w-16 h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 text-white transform group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto`}>
                {stat.icon}
              </div>
              
              <div className="relative z-10 text-center">
                <div className={`text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {formatNumber(counts[idx])}+
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">{stat.label}</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">{stat.description}</p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-indigo-100 to-transparent opacity-30 transform rotate-45 translate-x-4 -translate-y-4"></div>
            </div>
          ))}
        </div>
        
        {/* Why Customers Trust Us - Complete Redesign with modern aesthetic */}
        <div className="mt-16 md:mt-24 relative z-10">
          {/* Section header with larger, more impactful typography */}
          <div className="text-center mb-16">
            <div className="inline-block bg-indigo-600 text-white px-5 py-1 rounded-full uppercase text-xs font-bold tracking-wider mb-4 shadow-md transform hover:scale-105 transition-transform">Unmatched Quality</div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Why Customers Trust Us</h3>
            <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto my-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Mumbai's leading appliance service provider with thousands of satisfied customers across the city.
            </p>
          </div>
          
          {/* Modern card layout with visual flair */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group h-full"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 h-full relative">
                    {/* Colored top accent */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-t-2xl"></div>
                    
                    {/* Card content with consistent height */}
                    <div className="p-8 flex flex-col h-full">
                      {/* Icon container */}
                      <div className="flex-shrink-0 mx-auto mb-6">
                        <div className="relative flex items-center justify-center w-20 h-20">
                          {/* Decorative background for icon */}
                          <div className="absolute inset-0 bg-indigo-100 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl"></div>
                          <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                            {React.cloneElement(item.icon, { className: "w-10 h-10" })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Title with consistent spacing */}
                      <div className="mb-4 flex-shrink-0">
                        <h4 className="text-xl font-bold text-gray-800 text-center">
                          {item.title}
                        </h4>
                        <div className="h-0.5 w-10 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mt-2 group-hover:w-3/4 transition-all duration-500"></div>
                      </div>
                      
                      {/* Description with uniform height */}
                      <div className="flex-grow flex items-center justify-center">
                        <p className="text-gray-600 text-center text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Testimonial quote for added impact */}
            <div className="mt-16 text-center">
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 md:p-10 shadow-xl relative">
                <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-6">
                  <svg width="90" height="90" viewBox="0 0 24 24" fill="none" className="text-indigo-300 opacity-50">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179m10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <p className="italic text-lg md:text-xl text-gray-700 mb-6">
                  "<span className="font-semibold">ComfortWay's service is simply exceptional</span>. Their technicians arrived on time, identified the issue quickly, and fixed my AC within an hour. Highly recommended!"
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <span className="text-indigo-700 font-bold">RS</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800">Rahul Sharma</p>
                    <p className="text-sm text-gray-600">Mumbai, Maharashtra</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced action button with strong CTA */}
            <div className="mt-14 text-center">
              <button className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="absolute w-0 h-0 transition-all duration-700 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                <Link to="/services">
                <span className="relative">Explore Our Services</span>
                </Link>
                <svg className="w-6 h-6 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Dynamic background pattern */}
        <div className="absolute inset-0 opacity-5 -z-5 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: '60px 60px',
          }}></div>
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
  );
};

export default StatsSection; 