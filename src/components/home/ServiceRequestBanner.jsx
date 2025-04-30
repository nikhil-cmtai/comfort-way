import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const ServiceRequestBanner = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 background-animate"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/5 rounded-full mix-blend-overlay blur-3xl"></div>
        <div className="absolute top-40 right-40 w-48 h-48 bg-white/10 rounded-full mix-blend-overlay blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Raise Service Request for Your Devices
          </h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Quick response from our certified technicians for all your maintenance needs
          </p>
          <Link 
            to="/maintenance-repair" 
            className="inline-flex items-center bg-white text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 group"
          >
            Request Service
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
      
      {/* CSS for animated gradient */}
      <style jsx>{`
        .background-animate {
          background-size: 400%;
          animation: gradient 15s ease infinite;
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceRequestBanner; 