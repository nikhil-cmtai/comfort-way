import React from 'react';
import { FiShield, FiCheckSquare, FiDollarSign, FiTool } from 'react-icons/fi';

const ProtectionPlans = () => {

  // Placeholder data - Replace with actual plan details
  const plans = [
    {
      icon: <FiShield className="w-12 h-12 text-blue-600 mb-4" />,
      name: "Basic Coverage",
      price: "Starts at $9.99/mo",
      description: "Essential protection against common defects and malfunctions.",
      features: [
        "Standard parts warranty",
        "Labor coverage for manufacturing defects",
        "Phone support"
      ],
      idealFor: "Light users, basic equipment"
    },
    {
      icon: <FiCheckSquare className="w-12 h-12 text-green-600 mb-4" />,
      name: "Extended Pro",
      price: "Starts at $19.99/mo",
      description: "Comprehensive coverage including accidental damage and extended support.",
      features: [
        "Includes Basic Coverage",
        "Accidental damage protection (limits apply)",
        "Priority repair service",
        "Annual preventative maintenance check"
      ],
      idealFor: "Frequent users, valuable equipment"
    },
    {
      icon: <FiDollarSign className="w-12 h-12 text-yellow-500 mb-4" />,
      name: "Business Fleet Plan",
      price: "Custom Quote",
      description: "Tailored protection for businesses with multiple pieces of equipment.",
      features: [
        "Covers multiple units under one plan",
        "On-site repair options",
        "Dedicated account manager",
        "Customizable coverage levels"
      ],
      idealFor: "Businesses, contractors"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* --- Hero Section --- */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 sm:py-28 text-center shadow-lg relative overflow-hidden">
         <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
         <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Equipment Protection Plans</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">Secure your investment with our comprehensive protection plans for peace of mind.</p>
        </div>
      </section>

      {/* --- Plan Details Section --- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-4">Choose Your Plan</h2>
          <p className="text-lg text-gray-600 text-center mb-12 sm:mb-16 max-w-2xl mx-auto">We offer a range of plans to fit your needs and budget, ensuring your equipment stays operational.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col hover:border-blue-500 transition-all duration-300">
                <div className="p-8 text-center border-b bg-gray-50">
                   <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
                      {plan.icon}
                   </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-xl font-bold text-blue-700 mb-3">{plan.price}</p>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Features include:</h4>
                  <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <FiCheckSquare className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                   <p className="text-xs text-gray-500 italic mt-auto pt-4">Ideal for: {plan.idealFor}</p>
                </div>
                 <div className="p-6 bg-gray-50 border-t">
                   <a href="/contact?plan=" /* Link to contact/quote page */
                      className="block w-full text-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                     {plan.price === 'Custom Quote' ? 'Get a Quote' : 'Select Plan'}
                   </a>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Why Protect Section --- */}
      <section className="py-16 sm:py-20 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Why Invest in Protection?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
               <FiTool className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
               <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Minimize Downtime</h3>
                  <p className="text-gray-600 text-sm">Get priority repairs and reduce the time your equipment is out of service.</p>
               </div>
            </div>
            <div className="flex items-start gap-4">
               <FiDollarSign className="w-10 h-10 text-green-500 flex-shrink-0 mt-1" />
               <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Control Costs</h3>
                  <p className="text-gray-600 text-sm">Avoid unexpected, high repair bills with predictable plan payments.</p>
               </div>
            </div>
            <div className="flex items-start gap-4">
               <FiShield className="w-10 h-10 text-yellow-500 flex-shrink-0 mt-1" />
               <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Extend Equipment Life</h3>
                  <p className="text-gray-600 text-sm">Included maintenance helps keep your equipment running optimally for longer.</p>
               </div>
            </div>
             <div className="flex items-start gap-4">
               <FiCheckSquare className="w-10 h-10 text-purple-500 flex-shrink-0 mt-1" />
               <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Peace of Mind</h3>
                  <p className="text-gray-600 text-sm">Focus on your work knowing your essential tools are covered.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProtectionPlans; 