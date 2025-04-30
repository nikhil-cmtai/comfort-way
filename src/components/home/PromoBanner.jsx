import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const PromoBanner = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 background-animate rounded-2xl shadow-xl overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-4 h-4 bg-white/20 rounded-full" 
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float-${i} ${6 + Math.random() * 4}s ease-in-out infinite`
                }}
              />
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center px-6 py-10 md:py-8 relative z-10">
            <div className="md:w-3/4 text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Limited Time Offer!</h3>
              <p className="text-indigo-100 text-lg">
                Get 40% off on all protection plans this summer. Book now and stay cool!
              </p>
            </div>
            <div className="md:w-1/4 flex justify-center md:justify-end">
              <Link to="/home-protection" className="inline-flex items-center bg-white text-indigo-700 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 group">
                Book Now
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      
      {/* CSS for animated gradient and particles */}
      <style jsx>{`
        .background-animate {
          background-size: 400%;
          animation: gradient 15s ease infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float-0 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-10px); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(15px); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(-15px); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(5px); }
        }
        
        @keyframes float-5 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(-20px); }
        }
      `}</style>
    </div>
  );
};

export default PromoBanner; 