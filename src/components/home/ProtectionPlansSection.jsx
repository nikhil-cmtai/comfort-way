import React, { useState, useEffect } from 'react';
import { FiCheckSquare, FiHome, FiShield, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { fetchProtectionData, selectProtectionData, selectProtectionLoading, selectProtectionError } from '../../features/slices/protectionSlice';
import { useSelector, useDispatch } from 'react-redux';

const customPlan = {
  title: 'Custom Plan',
  desc: 'Tailored protection for offices, shops, or unique homes. Get a quote for your custom needs.',
  features: [
    'Flexible coverage',
    'All appliance types',
    'Priority support',
    'Custom pricing',
  ],
  icon: <FiShield className="w-8 h-8 text-indigo-600" />, 
};

const ProtectionPlansSection = () => {
  const dispatch = useDispatch();
  const protectionData = useSelector(selectProtectionData);
  const loading = useSelector(selectProtectionLoading);
  const error = useSelector(selectProtectionError);
  const [planType, setPlanType] = useState('home');


  useEffect(() => {
    dispatch(fetchProtectionData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading - styled like other sections */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Protection Plans
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            One simple plan covers all your appliances with unlimited repairs, free service visits, and priority support
          </p>
        </div>
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            className={`px-6 py-2 rounded-full font-semibold text-base transition-all duration-200 border-2 ${planType === 'home' ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'}`}
            onClick={() => setPlanType('home')}
          >
            Home
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold text-base transition-all duration-200 border-2 ${planType === 'custom' ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'}`}
            onClick={() => setPlanType('custom')}
          >
            Custom
          </button>
        </div>
        {/* Plans Layout */}
        {planType === 'home' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-10">
            {protectionData.slice(0, 3).map((plan, idx) => {
              const maxFeatures = 3;
              const showMore = plan.features.length > maxFeatures;
              return (
                <div key={plan.bhk}
                  className={`relative bg-white/80 backdrop-blur-xl rounded-xl shadow-lg flex flex-col border transition-all duration-500 overflow-hidden group animate-fadeInUp ${plan.highlight ? 'border-blue-600 scale-105 z-10 shadow-xl' : 'border-transparent'} hover:scale-105 hover:border-indigo-500 hover:shadow-xl`}
                  style={{
                    boxShadow: '0 4px 20px 0 rgba(31, 38, 135, 0.15)',
                    animationDelay: plan.delay,
                    transformOrigin: 'center bottom'
                  }}
                >
                  {/* Gradient Top Bar with animated shimmer */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                  
                  {/* Most Popular Badge with pulse animation */}
                  {plan.highlight && (
                    <div className="absolute top-2 left-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-md z-20 uppercase tracking-wider animate-pulse">Most Popular</div>
                  )}
                  
                  {/* Discount Badge */}
                  <div className="absolute top-2 right-3 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm group-hover:bg-green-200 transition-colors duration-300">40% OFF</div>
                  
                  <div className="p-4 text-center border-b border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-white/80 transition-all duration-300 group-hover:from-indigo-100/80 group-hover:to-white">

                    <h3 className="text-lg font-bold text-gray-800 mb-1 tracking-wide uppercase">{plan.bhk}</h3>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="text-sm text-gray-400 line-through font-medium">₹{plan.original.toLocaleString()}</span>
                      <span className="text-xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300" style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, '--tw-gradient-from': '#4f46e5', '--tw-gradient-to': '#3b82f6', '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)'}}>
                        ₹{plan.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Covers all appliances in your {plan.bhk} home</p>
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Features:</h4>
                    <ul className="space-y-2 mb-3 flex-grow">
                      {plan.features.slice(0, maxFeatures).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-1.5 opacity-90 hover:opacity-100 transition-opacity duration-300 group-hover:translate-x-0.5 transform transition-transform ease-in-out" style={{transitionDelay: `${featureIndex * 0.1}s`}}>
                          <FiCheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {showMore && (
                        <li className="text-indigo-500 text-sm font-semibold ml-5 group-hover:translate-x-1 transform transition-transform duration-300">+ more</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-indigo-100 to-blue-100 border-t border-indigo-100 transition-all duration-300 group-hover:from-indigo-200 group-hover:to-blue-200">
                    <a href={`/contact?plan=${plan.bhk}`} className="block w-full text-center bg-gradient-to-r text-white font-medium py-2 px-4 rounded-full shadow-md hover:shadow-lg group-hover:scale-105 transition-all duration-500" style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, '--tw-gradient-from': '#4f46e5', '--tw-gradient-to': '#3b82f6', '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)'}}>
                      Get Started
                    </a>
                  </div>

                  {/* Corner shine effect on hover */}
                  <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center mb-10">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-xl shadow-lg flex flex-col border border-indigo-200 transition-all duration-500 overflow-hidden group animate-fadeInUp max-w-md w-full">
              <div className="p-6 text-center border-b border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-white/80">
                <div className="inline-block p-3 rounded-full bg-indigo-100 mb-3 shadow-md">
                  {customPlan.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{customPlan.title}</h3>
                <p className="text-gray-600 mb-3">{customPlan.desc}</p>
                <ul className="space-y-2 mb-3">
                  {customPlan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FiCheckSquare className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-gradient-to-r from-indigo-100 to-blue-100 border-t border-indigo-100">
                <a href="/home-protection" className="block w-full text-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-500">
                  Get Custom Quote
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* View All Button with hover effects - styled like other sections */}
        <div className="mt-8 text-center">
          <Link 
            to="/home-protection" 
            className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 text-sm"
          >
            <span className="relative z-10">View All</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProtectionPlansSection; 