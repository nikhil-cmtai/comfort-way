import React, { useState } from 'react';
import { FiShield, FiCheckSquare, FiDollarSign, FiTool, FiHome, FiZap, FiUsers, FiPlus, FiMinus, FiAirplay, FiRefreshCw } from 'react-icons/fi';
import protectionBanner from '/images/products/protectionBanner.webp';

// Predefined plans
const bhkPlans = [
  {
    bhk: '1 BHK',
    original: 9999,
    discount: 40,
    price: 5999,
    features: [
      'All appliances covered',
      'Unlimited repairs',
      'Free service visits',
      'Genuine parts guarantee',
      'Priority support',
    ],
    icon: <FiHome className="w-10 h-10 text-indigo-600" />,
    highlight: false,
  },
  {
    bhk: '2 BHK',
    original: 12999,
    discount: 40,
    price: 7799,
    features: [
      'All appliances covered',
      'Unlimited repairs',
      'Free service visits',
      'Genuine parts guarantee',
      'Priority support',
      'Annual maintenance check',
    ],
    icon: <FiUsers className="w-10 h-10 text-blue-600" />,
    highlight: true, // Most popular
  },
  {
    bhk: '3 BHK',
    original: 15999,
    discount: 40,
    price: 9599,
    features: [
      'All appliances covered',
      'Unlimited repairs',
      'Free service visits',
      'Genuine parts guarantee',
      'Priority support',
      'Annual maintenance check',
      'AC deep cleaning',
    ],
    icon: <FiZap className="w-10 h-10 text-purple-600" />,
    highlight: false,
  },
  {
    bhk: '4 BHK',
    original: 19999,
    discount: 40,
    price: 11999,
    features: [
      'All appliances covered',
      'Unlimited repairs',
      'Free service visits',
      'Genuine parts guarantee',
      'Priority support',
      'Annual maintenance check',
      'AC deep cleaning',
      'Dedicated relationship manager',
    ],
    icon: <FiShield className="w-10 h-10 text-yellow-500" />,
    highlight: false,
  },
];


const appliances = [
  { name: 'AC', category: 'ac', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1499 },
  { name: 'Air Purifier', category: 'air-purifier', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1299 },
  { name: 'Chopper', category: 'chopper', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1199 },
  { name: 'Blender', category: 'blender', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1099 },
  { name: 'Iron', category: 'iron', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1099 },
  { name: 'Geyser', category: 'geyser', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1099 },
  { name: 'Boiler', category: 'boiler', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1099 },
  { name: 'Juicer', category: 'juicer', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1099 },
  { name: 'Microwave', category: 'microwave', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1099 },
  { name: 'Washing Machine', category: 'washing-machine', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1099 },
  { name: 'Chimney', category: 'chimney', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1099 },
  { name: 'Hob', category: 'hob', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1099 },
  { name: 'Water Purifier', category: 'water-purifier', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1099 },
  { name: 'Refrigerator', category: 'refrigerator', icon: <FiAirplay className="w-5 h-5" />, pricePerUnit: 1099 },
];

// Plan duration options
const durations = [
  { id: 1, name: '1 Year', multiplier: 1 },
  { id: 2, name: '2 Years', multiplier: 1.8 },
  { id: 3, name: '3 Years', multiplier: 2.5 },
];

export default function ProtectionPlans() {
  // Custom plan state
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);
  const [applianceSelections, setApplianceSelections] = useState(
    appliances.reduce((acc, appliance) => {
      acc[appliance.category] = 0;
      return acc;
    }, {})
  );

  // Handle appliance quantity change
  const handleApplianceChange = (category, change) => {
    setApplianceSelections(prev => {
      const newValue = Math.max(0, prev[category] + change);
      return { ...prev, [category]: newValue };
    });
  };

  // Calculate custom plan price
  const calculateCustomPlanPrice = () => {
    const basePrice = Object.entries(applianceSelections).reduce((total, [category, quantity]) => {
      const appliance = appliances.find(a => a.category === category);
      return total + (appliance?.pricePerUnit * quantity || 0);
    }, 0);
    
    return {
      basePrice,
      finalPrice: Math.round(basePrice * selectedDuration.multiplier),
      originalPrice: Math.round(basePrice * selectedDuration.multiplier * 1.4) // 40% off calculation
    };
  };

  const customPricing = calculateCustomPlanPrice();
  const hasSelectedAppliances = Object.values(applianceSelections).some(qty => qty > 0);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      {/* Hero Section - Maintenance Style */}
      <section
        className="relative w-full h-[250px] sm:h-[320px] md:h-[420px] flex items-center justify-center text-center shadow"
        style={{
          backgroundImage: `url(${protectionBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight text-white drop-shadow-lg">Home Protection Plans</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto text-white drop-shadow mb-2">Protect all your home appliances with one simple, affordable plan. Peace of mind for your entire home!</p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">All Appliances Covered</span>
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">Unlimited Repairs</span>
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">Priority Support</span>
          </div>
        </div>
      </section>

      {/* Tab Selection for Plan Types */}
      <section className="pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-4">Choose Your Protection Plan</h2>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">Select from our ready-made home plans or build your custom plan for specific appliances.</p>
            
            <div className="bg-white rounded-full p-1 shadow-lg mb-12 flex">
              <a href="#residential-plans" className="px-6 py-2 text-sm md:text-base rounded-full text-white bg-blue-600 font-medium">Residential Plans</a>
              <a href="#custom-plan" className="px-6 py-2 text-sm md:text-base rounded-full text-gray-700 hover:bg-blue-50 transition font-medium">Custom Plan Builder</a>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Plans Section */}
      <section id="residential-plans" className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-4">Residential Home Plans</h2>
          <p className="text-lg text-gray-600 text-center mb-12 sm:mb-14 max-w-2xl mx-auto">One plan covers all your appliances. Unlimited repairs, free service visits, and more. Select your home type below:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 items-stretch">
            {bhkPlans.map((plan, idx) => {
              const maxFeatures = 4;
              const showMore = plan.features.length > maxFeatures;
              return (
                <div key={plan.bhk}
                  className={`relative bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col border-2 transition-all duration-300 overflow-hidden group ${plan.highlight ? 'border-blue-600 scale-105 z-10 shadow-2xl' : 'border-transparent'} hover:scale-105 hover:border-indigo-500`}
                  style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)'}}
                >
                  {/* Gradient Top Bar */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                  {/* Most Popular Badge */}
                  {plan.highlight && (
                    <div className="absolute top-2 left-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-20 uppercase tracking-wider animate-bounce">Most Popular</div>
                  )}
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow">40% OFF</div>
                  <div className="p-6 text-center border-b border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-white/80">
                    <div className="inline-block p-2 rounded-full bg-indigo-100 mb-3 shadow-lg" style={{boxShadow: '0 0 24px 0 rgba(99,102,241,0.15)'}}>
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1 tracking-wide uppercase">{plan.bhk}</h3>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-base text-gray-400 line-through font-medium">₹{plan.original.toLocaleString()}</span>
                      <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow">₹{plan.price.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-600">Covers all appliances in your {plan.bhk} home</p>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Features:</h4>
                    <ul className="space-y-2 mb-4 flex-grow">
                      {plan.features.slice(0, maxFeatures).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <FiCheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-xs">{feature}</span>
                        </li>
                      ))}
                      {showMore && (
                        <li className="text-indigo-500 text-xs font-semibold ml-6">+ more</li>
                      )}
                    </ul>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-indigo-100 to-blue-100 border-t border-indigo-100">
                    <a href={`/contact?plan=${plan.bhk}`} className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-blue-700 transition-all text-base">
                      Get Started
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Plan Builder Section */}
      <section id="custom-plan" className="py-14 sm:py-20 bg-gradient-to-r from-indigo-50 to-blue-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-4">Build Your Custom Protection Plan</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">Select exactly what appliances you need covered and for how long.</p>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-indigo-200">
            <div className="p-8 md:p-10">
              {/* Duration Selection */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-800 mb-4">1. Select Plan Duration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {durations.map(duration => (
                    <button
                      key={duration.id}
                      onClick={() => setSelectedDuration(duration)}
                      className={`relative py-4 px-6 rounded-xl text-center transition-all ${
                        selectedDuration.id === duration.id
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <h4 className="text-lg font-bold">{duration.name}</h4>
                      {duration.id > 1 && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Save {((1 - duration.multiplier/duration.id) * 100).toFixed(0)}%
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {/* Sexy 2-card custom plan builder */}
              <CustomPlanSexyBuilder appliances={appliances} selectedDuration={selectedDuration} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ComfortWay Protection Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">Why Choose ComfortWay Protection?</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            <div className="flex-1 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center group border-t-4 border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-transparent hover:bg-gradient-to-br hover:from-blue-200 hover:to-indigo-200">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <FiTool className="w-10 h-10 text-indigo-500" />
              </span>
              <h3 className="font-bold text-xl mb-2 text-gray-800">All Appliances</h3>
              <p className="text-gray-600 text-base">Covers ACs, refrigerators, washing machines, microwaves, water purifiers, and more.</p>
            </div>
            <div className="flex-1 bg-gradient-to-br from-green-100 to-indigo-100 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center group border-t-4 border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-transparent hover:bg-gradient-to-br hover:from-green-200 hover:to-indigo-200">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <FiCheckSquare className="w-10 h-10 text-green-600" />
              </span>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Unlimited Repairs</h3>
              <p className="text-gray-600 text-base">No cap on the number of repairs. We fix it, no questions asked.</p>
            </div>
            <div className="flex-1 bg-gradient-to-br from-yellow-100 to-indigo-100 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center group border-t-4 border-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-transparent hover:bg-gradient-to-br hover:from-yellow-200 hover:to-indigo-200">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <FiShield className="w-10 h-10 text-yellow-500" />
              </span>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Genuine Parts</h3>
              <p className="text-gray-600 text-base">Only genuine parts used for every repair and service.</p>
            </div>
            <div className="flex-1 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center group border-t-4 border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-transparent hover:bg-gradient-to-br hover:from-purple-200 hover:to-blue-200">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <FiUsers className="w-10 h-10 text-purple-600" />
              </span>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Priority Support</h3>
              <p className="text-gray-600 text-base">Get faster response and priority scheduling for all your service needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Modern Stepper */}
      <section className="py-14 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between">
            {/* Step 1 */}
            <div className="flex-1 group flex flex-col items-center text-center bg-white rounded-2xl border border-indigo-100 shadow-md px-6 py-8 mx-0 md:mx-2 transition-all duration-300 hover:shadow-xl hover:border-blue-400 hover:scale-105">
              <div className="relative mb-4">
                <span className="absolute -top-4 -left-4 bg-gradient-to-br from-indigo-500 to-blue-400 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">1</span>
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 shadow group-hover:scale-110 transition-transform duration-300">
                  <FiShield className="w-7 h-7 text-indigo-600" />
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-1 text-gray-800">Choose Your Plan</h3>
              <p className="text-gray-500 text-sm">Select the perfect protection plan for your home or build a custom one for specific appliances.</p>
            </div>
            {/* Step 2 */}
            <div className="flex-1 group flex flex-col items-center text-center bg-white rounded-2xl border border-indigo-100 shadow-md px-6 py-8 mx-0 md:mx-2 transition-all duration-300 hover:shadow-xl hover:border-blue-400 hover:scale-105">
              <div className="relative mb-4">
                <span className="absolute -top-4 -left-4 bg-gradient-to-br from-blue-400 to-green-400 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">2</span>
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-green-100 shadow group-hover:scale-110 transition-transform duration-300">
                  <FiCheckSquare className="w-7 h-7 text-blue-600" />
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-1 text-gray-800">Get Covered Instantly</h3>
              <p className="text-gray-500 text-sm">Your coverage starts immediately—no paperwork, no hassle.</p>
            </div>
            {/* Step 3 */}
            <div className="flex-1 group flex flex-col items-center text-center bg-white rounded-2xl border border-indigo-100 shadow-md px-6 py-8 mx-0 md:mx-2 transition-all duration-300 hover:shadow-xl hover:border-blue-400 hover:scale-105">
              <div className="relative mb-4">
                <span className="absolute -top-4 -left-4 bg-gradient-to-br from-green-400 to-indigo-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">3</span>
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-100 to-indigo-100 shadow group-hover:scale-110 transition-transform duration-300">
                  <FiHome className="w-7 h-7 text-green-600" />
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-1 text-gray-800">Enjoy Peace of Mind</h3>
              <p className="text-gray-500 text-sm">Relax knowing your appliances are protected by ComfortWay experts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Maintenance Style */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 hover:border-indigo-300 transition-colors duration-300">
              <div className="p-6 sm:p-8">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600 flex-shrink-0">
                    <FiShield className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-indigo-700 mb-3">What appliances are covered under the plan?</h4>
                    <p className="text-gray-600 text-base">All major home appliances including ACs, refrigerators, washing machines, microwaves, water purifiers, and more are covered. You can select specific appliances with our custom plan builder.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 hover:border-indigo-300 transition-colors duration-300">
              <div className="p-6 sm:p-8">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600 flex-shrink-0">
                    <FiCheckSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-indigo-700 mb-3">Is there a limit on the number of repairs?</h4>
                    <p className="text-gray-600 text-base">No, you get unlimited repairs for all covered appliances during your plan period. No hidden charges or caps.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 hover:border-indigo-300 transition-colors duration-300">
              <div className="p-6 sm:p-8">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600 flex-shrink-0">
                    <FiDollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-indigo-700 mb-3">Can I customize my protection plan?</h4>
                    <p className="text-gray-600 text-base">Yes! Our custom plan builder allows you to select exactly which appliances you want covered and how many units of each. You can also choose the plan duration that works best for you.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 hover:border-indigo-300 transition-colors duration-300">
              <div className="p-6 sm:p-8">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600 flex-shrink-0">
                    <FiTool className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-indigo-700 mb-3">How do I request a repair or service?</h4>
                    <p className="text-gray-600 text-base">Simply contact us via phone, WhatsApp, or our website. Our team will schedule a technician visit at your convenience.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 hover:border-indigo-300 transition-colors duration-300">
              <div className="p-6 sm:p-8">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600 flex-shrink-0">
                    <FiHome className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-indigo-700 mb-3">Is the plan available in my city?</h4>
                    <p className="text-gray-600 text-base">Currently, ComfortWay Protection Plans are available across Mumbai. For other cities, please contact us for updates.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CustomPlanSexyBuilder({ appliances, selectedDuration }) {
  const [selectedAppliance, setSelectedAppliance] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);

  // Add item to right card
  const handleAdd = () => {
    if (!selectedAppliance || quantity < 1) return;
    const existing = items.find(i => i.category === selectedAppliance);
    let newItems;
    if (existing) {
      newItems = items.map(i =>
        i.category === selectedAppliance ? { ...i, quantity: i.quantity + quantity } : i
      );
    } else {
      const product = appliances.find(a => a.category === selectedAppliance);
      newItems = [
        ...items,
        { category: selectedAppliance, name: product.name, price: product.pricePerUnit, quantity }
      ];
    }
    setItems(newItems);
    setSelectedAppliance("");
    setQuantity(1);
  };

  // Remove item
  const handleRemove = (cat) => {
    setItems(items.filter(i => i.category !== cat));
  };

  // Total
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const finalPrice = Math.round(total * selectedDuration.multiplier);
  const originalPrice = Math.round(total * selectedDuration.multiplier * 1.4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Card: Select & Add */}
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col justify-center border border-indigo-100">
        <h4 className="text-lg font-bold text-indigo-700 mb-4">Add Appliance</h4>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Appliance</label>
        <select
          value={selectedAppliance}
          onChange={e => setSelectedAppliance(e.target.value)}
          className="w-full rounded-lg border border-gray-200 py-2 px-3 text-base mb-4 focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">-- Select Appliance --</option>
          {appliances.map(item => (
            <option key={item.category} value={item.category}>{item.name}</option>
          ))}
        </select>
        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          className="w-full rounded-lg border border-gray-200 py-2 px-3 text-base mb-4 focus:ring-2 focus:ring-indigo-200"
          placeholder="Enter quantity"
        />
        <button
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2 rounded-lg font-semibold text-lg shadow hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 mt-2"
          onClick={handleAdd}
          disabled={!selectedAppliance || quantity < 1}
        >
          Add
        </button>
      </div>
      {/* Right Card: Invoice/summary */}
      <div className="bg-indigo-50 rounded-2xl shadow-inner p-8 flex flex-col border border-indigo-100">
        <h4 className="text-lg font-bold text-indigo-700 mb-4">Selected Appliances</h4>
        {items.length === 0 ? (
          <div className="text-gray-400 text-center py-10">No appliances added yet.</div>
        ) : (
          <ul className="mb-4 divide-y divide-indigo-100">
            {items.map(i => (
              <li key={i.category} className="flex items-center justify-between py-2 group">
                <div>
                  <span className="font-semibold text-gray-800">{i.name}</span>
                  <span className="ml-2 text-xs text-gray-500">x{i.quantity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-indigo-700">₹{i.price * i.quantity}</span>
                  <button
                    className="ml-2 text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded transition-all border border-transparent hover:border-red-200"
                    onClick={() => handleRemove(i.category)}
                  >Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center justify-between text-lg font-bold text-indigo-800 border-t pt-3 mt-auto">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-gray-600">Original Price</span>
          <span className="font-medium line-through text-gray-500">₹{originalPrice}</span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="font-bold text-gray-800">Final Price</span>
          <span className="font-bold text-indigo-600">₹{finalPrice}</span>
        </div>
        <button className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">Book Custom Plan</button>
      </div>
    </div>
  );
} 