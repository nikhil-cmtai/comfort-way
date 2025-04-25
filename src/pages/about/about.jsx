import React from 'react';
import { FiZap, FiTool, FiShoppingCart, FiRefreshCw, FiUsers, FiAward } from 'react-icons/fi'; // Example icons

const About = () => {
  // Placeholder content - Replace with your actual company details
  // const companyName = "ComfortWay Electric Services"; // Company name now hardcoded in H1
  const missionStatement = "To provide reliable, efficient, and affordable electric solutions through expert repair, quality sales, and convenient rentals.";
  const story = "Founded in [Year], ComfortWay Electric Services started with a simple goal: to keep our community powered and productive. We saw a need for dependable electric equipment services – from quick repairs to accessible rentals and trustworthy sales. Over the years, we've grown into a leading provider, known for our technical expertise, commitment to customer satisfaction, and a wide range of electric solutions tailored to meet diverse needs.";
  const services = [
    {
      icon: <FiTool className="w-12 h-12 text-blue-600 mb-4" />,
      title: "Expert Electric Repair",
      description: "Fast, reliable repairs for a wide range of electric equipment. Our certified technicians diagnose and fix issues efficiently to minimize downtime."
    },
    {
      icon: <FiShoppingCart className="w-12 h-12 text-blue-600 mb-4" />,
      title: "Quality Equipment Sales",
      description: "Offering a curated selection of new and certified pre-owned electric equipment from trusted brands. Find the right tools for your job."
    },
    {
      icon: <FiRefreshCw className="w-12 h-12 text-blue-600 mb-4" />,
      title: "Convenient Rentals",
      description: "Flexible rental options for short-term projects or trying before you buy. Get access to the equipment you need, when you need it."
    }
  ];
  const values = [
    {
      icon: <FiAward className="w-10 h-10 text-blue-600 mb-3" />,
      title: "Reliability",
      description: "Count on us for dependable service and equipment that performs."
    },
    {
      icon: <FiZap className="w-10 h-10 text-blue-600 mb-3" />,
      title: "Efficiency",
      description: "We work quickly and effectively to get you back up and running."
    },
    {
      icon: <FiUsers className="w-10 h-10 text-blue-600 mb-3" />,
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We listen and provide tailored solutions."
    },
     {
      icon: <FiTool className="w-10 h-10 text-blue-600 mb-3" />,
      title: "Expertise",
      description: "Years of experience and technical know-how in electric equipment."
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* --- Hero Section --- */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 sm:py-32 text-center shadow-lg relative overflow-hidden">
         {/* Optional: Add subtle background pattern or shapes */}
         <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
         <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">About ComfortWay</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">{missionStatement}</p>
        </div>
      </section>

      {/* --- Our Story Section --- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{story}</p>
        </div>
      </section>

      {/* --- What We Do Section --- */}
      <section className="py-16 sm:py-24 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12 sm:mb-16">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center items-center mb-4">
                  {service.icon} {/* Icon color already updated */} 
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Why Choose Us / Our Values Section --- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12 sm:mb-16">Why Choose Us?</h2>
          {/* Updated grid to handle 4 items cleanly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
                 <div className="flex justify-center items-center mb-4">
                   {value.icon} {/* Icon color updated */} 
                 </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Call to Action Section --- */}
      <section className="py-16 sm:py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Whether you need a quick repair, new equipment, or a flexible rental, we have the solution.</p>
          <div className="space-x-4">
             <a href="/contact" /* Link to Contact Page */
               className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              Contact Us
            </a>
             <a href="/services" /* Link to Services/Products Page */
               className="inline-block bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-900 transition duration-300">
              Browse Services
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;