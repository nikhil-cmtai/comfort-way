import React from 'react';
import { FiTool, FiShoppingCart, FiRefreshCw, FiCheckCircle, FiPhone } from 'react-icons/fi'; // Example icons

const Services = () => {

  // Placeholder data for services - expand with more detail
  const serviceDetails = [
    {
      icon: <FiTool className="w-16 h-16 text-blue-600 mb-6" />,
      title: "Expert Electric Repair Services",
      shortDescription: "Fast, reliable repairs to minimize your downtime.",
      points: [
        "Diagnostics for all major electric equipment brands",
        "Component-level repairs for cost-effectiveness",
        "Preventative maintenance programs",
        "Emergency repair services available",
        "Certified and experienced technicians"
      ],
      link: "/contact?service=repair" // Example link to contact form with pre-fill
    },
    {
      icon: <FiShoppingCart className="w-16 h-16 text-blue-600 mb-6" />,
      title: "Quality Equipment Sales",
      shortDescription: "Durable and efficient electric equipment from top brands.",
      points: [
        "Wide selection of new electric tools and machinery",
        "Certified pre-owned equipment options",
        "Consultation to help you choose the right equipment",
        "Competitive pricing and financing options",
        "Warranty and after-sales support"
      ],
      link: "/shop" // Example link to shop page
    },
    {
      icon: <FiRefreshCw className="w-16 h-16 text-blue-600 mb-6" />,
      title: "Flexible Equipment Rentals",
      shortDescription: "Get the equipment you need, exactly when you need it.",
      points: [
        "Daily, weekly, and monthly rental periods",
        "Large inventory of well-maintained equipment",
        "Delivery and pickup services available",
        "Operator training for select equipment",
        "Ideal for short-term projects or try-before-you-buy"
      ],
      link: "/rentals" // Example link to rentals page
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* --- Hero Section --- */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 sm:py-28 text-center shadow-lg relative overflow-hidden">
         <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
         <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Our Services</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">Comprehensive electric solutions including repair, sales, and rentals to power your projects.</p>
        </div>
      </section>

      {/* --- Detailed Services Section --- */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {serviceDetails.map((service, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12 lg:gap-16 bg-white p-8 md:p-10 rounded-lg shadow-lg overflow-hidden`}>
                {/* Icon & Title (Left/Right) */}
                <div className="md:w-1/3 text-center flex flex-col items-center">
                  {service.icon}
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">{service.title}</h2>
                  <p className="text-gray-600 mb-6 md:mb-0">{service.shortDescription}</p>
                </div>

                {/* Description & Points (Right/Left) */}
                <div className="md:w-2/3">
                  <ul className="space-y-3 mb-6">
                    {service.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
                        <FiCheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={service.link}
                     className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800 transition duration-200">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Call to Action Section --- */}
      <section className="py-16 sm:py-20 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <FiPhone className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Have Questions or Need a Specific Service?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Our team is ready to assist you. Contact us today to discuss your electric equipment needs.</p>
          <a href="/contact" /* Link to Contact Page */
             className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Get in Touch
          </a>
        </div>
      </section>

    </div>
  );
};

export default Services; 