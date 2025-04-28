import React from 'react';
import { FiUsers, FiAward, FiCheckCircle, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import about from '/images/about-banner.jpg';
import about2 from '/images/gallery/Image1.jpeg';


const whyChoose = [
  {
    icon: <FiUsers className="w-10 h-10 text-indigo-600 mb-4" />, title: 'Expert Technicians', desc: 'Certified, experienced, and background-checked professionals.'
  },
  {
    icon: <FiAward className="w-10 h-10 text-green-600 mb-4" />, title: 'Affordable Pricing', desc: 'Transparent, competitive rates for all services.'
  },
  {
    icon: <FiCalendar className="w-10 h-10 text-purple-600 mb-4" />, title: 'Trusted Since 2012', desc: 'Serving Mumbai with pride and reliability for over a decade.'
  },
];

export default function About() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
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
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight text-white drop-shadow-lg">About ComfortWay</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto text-white drop-shadow mb-2">Mumbai's Most Trusted Home Appliance Service</p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">Expert Repair</span>
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">Certified Technicians</span>
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">Since 2012</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
          {/* Image with floating effect */}
          <div className="relative w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
            <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl bg-gradient-to-br from-indigo-200 to-blue-100 blur-2xl opacity-40 z-0"></div>
            <img src={about2} alt="About ComfortWay" className="relative z-10 rounded-3xl shadow-2xl border-4 border-white object-cover w-full h-72 md:h-96" />
          </div>
          {/* Content Card */}
          <div className="w-full md:w-1/2 bg-white rounded-3xl shadow-2xl p-8 md:-ml-16 relative z-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 flex items-center">
              <span className="border-l-4 border-indigo-500 pl-4">Who We Are</span>
            </h2>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              We Build The Invention That Can Change The World!
            </h3>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Best Electrical Appliances Installation, Plumbing & Maintenance Service Providers in Mumbai.
            </p>
            <p className="text-base text-gray-600 mb-3">
              If you are looking for the best Home Appliances Repairing & Plumbing Service company in Mumbai then COMFORT WAY is the leading company which provides complete repairing and maintenance services like Air Conditioner Repairing, Geyser Repairing, Refrigerator Repairing, Washing Machine Repairing, Microwave Oven Repairing, Ro Water Purifier and Plumbing in Mumbai at the most affordable rates.
            </p>
            <p className="text-base text-gray-600">
              With the latest advancements in the home appliance and electronics goods sector in recent times you need the experts in the field to stay up to date with the latest technology and provide the best repairing and maintenance services. We have been in the field of home appliance repairing and plumbing since long. It is the rich experience we have that provides us with a distinct edge over our competitors in the field.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="group bg-gradient-to-br from-indigo-100 to-blue-50 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center border-t-4 border-indigo-400 relative overflow-hidden transition-transform duration-500 hover:scale-105" data-aos="fade-up" data-aos-delay="100">
            <div className="mb-5 flex items-center justify-center">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 shadow-lg">
                <FiTrendingUp className="w-8 h-8 text-white" />
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Our Vision</h3>
            <p className="text-base text-gray-600">To be Mumbai's most trusted and innovative home service provider, empowering every home with comfort and reliability.</p>
            {/* Glow effect */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-blue-100 rounded-full blur-2xl opacity-40 z-0"></div>
          </div>
          {/* Mission Card */}
          <div className="group bg-gradient-to-br from-green-100 to-blue-50 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center border-t-4 border-green-400 relative overflow-hidden transition-transform duration-500 hover:scale-105" data-aos="fade-up" data-aos-delay="250">
            <div className="mb-5 flex items-center justify-center">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-400 shadow-lg">
                <FiCheckCircle className="w-8 h-8 text-white" />
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">Our Mission</h3>
            <p className="text-base text-gray-600">Delivering expert appliance repair, installation, and maintenance with honesty, speed, and care—every single time.</p>
            {/* Glow effect */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-green-200 to-blue-100 rounded-full blur-2xl opacity-40 z-0"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">Why Choose Us?</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {whyChoose.map((item, idx) => (
              <div key={item.title} className={`flex-1 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center group border-t-4 ${idx === 0 ? 'border-blue-400' : idx === 1 ? 'border-green-400' : 'border-purple-400'} transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-transparent hover:bg-gradient-to-br hover:from-blue-200 hover:to-indigo-200`}>
                {item.icon}
                <h3 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Experience ComfortWay?</h2>
          <p className="text-base md:text-lg text-indigo-100 mb-8">Book a service or get in touch with our team for the best appliance repair, installation, and maintenance in Mumbai.</p>
          <a href="/contact" className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-50 transition text-lg">Contact Us</a>
        </div>
      </section>
    </div>
  );
}