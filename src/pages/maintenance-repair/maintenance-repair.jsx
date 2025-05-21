import React, { useEffect } from 'react';
import { FiArrowRight, FiStar, FiShield, FiTruck, FiThumbsUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import maintenance from '/images/maintenance-banner.jpg';  
import { fetchCategoryData, selectCategoryData, selectCategoryLoading, selectCategoryError } from '../../features/slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';

const galleryImages = [
  { src: '/images/gallery/Image1.jpeg', alt: 'Technician repairing AC' },
  { src: '/images/gallery/Image2.jpeg', alt: 'Washing machine service' },
  { src: '/images/gallery/Image3.jpeg', alt: 'Geyser installation' },
  { src: '/images/gallery/Image4.jpeg', alt: 'Chimney cleaning' },
  { src: '/images/gallery/Image5.jpeg', alt: 'Hob Burner & Ignition Service' },
  { src: '/images/gallery/Image6.jpeg', alt: 'Microwave Repair & Cleaning' },
  { src: '/images/gallery/Image7.jpeg', alt: 'Refrigerator Gas & Cooling Repair' },
  { src: '/images/gallery/Image8.jpeg', alt: 'Water Purifier Filter Change' },
  
];


const MaintenanceRepair = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoryData);
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  // Fix: Add hoverIndex state for card hover animation
  const [hoverIndex, setHoverIndex] = React.useState(null);

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  return (
    <div className="bg-gray-50">
      {/* --- 1. Hero Banner --- */}
      <section
        className="relative w-full h-[250px] sm:h-[320px] md:h-[420px] flex items-center justify-center text-center shadow"
        style={{
          backgroundImage: `url(${maintenance})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight text-white drop-shadow-lg">Expert Maintenance & Repair</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto text-white drop-shadow mb-2">Bringing Your Appliances Back to Life with Professional Care</p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">Home Appliances</span>
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">Certified Technicians</span>
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium shadow">Fast Service</span>
          </div>
        </div>
      </section>

      {/* --- 2. Introduction Section --- */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Our Repair Services?</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              At ComfortWay, we understand that your home appliances are essential to your daily life. When they break down, it disrupts your routine and causes unnecessary stress. That's why we offer comprehensive maintenance and repair services for all major home appliances, delivered by certified professionals who prioritize quality, reliability, and customer satisfaction.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mt-4">
              Our technicians undergo rigorous training and stay updated with the latest technology to handle even the most complex repair needs. Whether it's a malfunctioning AC, a leaking water purifier, or a refrigerator that's not cooling properly, our experts arrive equipped with the knowledge, tools, and genuine parts to resolve your issues efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <div className="bg-indigo-50 p-6 rounded-xl text-center">
              <FiShield className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">90-Day Warranty</h3>
              <p className="text-gray-600 text-sm">All our repairs come with a 90-day warranty for your peace of mind</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl text-center">
              <FiStar className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">4.9/5 Rating</h3>
              <p className="text-gray-600 text-sm">Highly rated service with over 10,000+ satisfied customers</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl text-center">
              <FiTruck className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Same-Day Service</h3>
              <p className="text-gray-600 text-sm">Quick response with same-day service options available</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl text-center">
              <FiThumbsUp className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Best Price</h3>
              <p className="text-gray-600 text-sm">Competitive pricing with no hidden charges or surprise fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. Services Grid (Big Cards) --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Premium Appliance Repair Services</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our comprehensive range of repair and maintenance services for all your home appliances. Click on any device to schedule a service request.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-6 md:gap-8">
          {categories.map((item, index) => (
            <Link
              to={`/maintenance-repair/${item.name}`}  
              key={item.id || item.name || index}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col p-0 hover:-translate-y-2 cursor-pointer overflow-hidden max-w-xs w-full mx-auto min-h-[340px]"
              style={{ textDecoration: 'none' }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Badge */}
              {item.popular && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow">
                    POPULAR
                  </div>
                </div>
              )}
              {/* Card Image */}
              <img
                src={item.img}
                alt={item.label || item.name}
                className="w-auto h-48 object-contain rounded-t-2xl"
                onError={e => { e.target.src = '/images/placeholder.png'; }}
              />
              {/* Card Content */}
              <div className="flex flex-col flex-1 px-4 py-4">
                <h3 className="font-bold text-xl text-center mt-2 mb-1 text-gray-900">
                  {item.label || item.name}
                </h3>
                <p className="text-gray-500 text-center text-sm mb-4">
                  {item.desc}
                </p>
                <div className="mt-auto text-center">
                  <div className={`flex items-center justify-center text-indigo-600 font-medium text-base transition-all duration-300 ${hoverIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
                  >
                    Book Service
                    <FiArrowRight className="ml-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-indigo-50 rounded-tl-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </Link>
          ))}
          </div>
        </div>
      </section>

      {/* --- 4. Our Process Section --- */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Expert Repair Process</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a structured approach to ensure every repair is handled efficiently, professionally, and to your complete satisfaction.
            </p>
          </div>
          
          {/* Process Flow - Enhanced */}
          <div className="relative mb-20">
            {/* Connecting Line */}
            <div className="absolute hidden md:block top-1/2 left-0 right-0 h-1 bg-indigo-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 relative z-10 hover:shadow-2xl transition-shadow duration-300">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">1</div>
                <div className="mt-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">Book a Service</h3>
                  <p className="text-gray-600">Select your appliance and schedule a service appointment at your preferred time and location.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 relative z-10 hover:shadow-2xl transition-shadow duration-300">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">2</div>
                <div className="mt-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">Professional Diagnosis</h3>
                  <p className="text-gray-600">Our certified technician will diagnose the issue and provide a detailed explanation with a fixed price quote.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 relative z-10 hover:shadow-2xl transition-shadow duration-300">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">3</div>
                <div className="mt-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">Expert Repair</h3>
                  <p className="text-gray-600">With your approval, we'll repair your appliance using genuine parts and specialized tools for lasting results.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 relative z-10 hover:shadow-2xl transition-shadow duration-300">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">4</div>
                <div className="mt-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">Quality Assurance</h3>
                  <p className="text-gray-600">We thoroughly test the appliance to ensure optimal performance before completing the service.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Gallery Section - Improved Layout */}
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            Our <span className="text-indigo-600">Work</span> in Action
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-square bg-white border border-gray-100">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  onError={e => { e.target.src = '/images/placeholder.png'; }} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. Maintenance Plans Section (replacing testimonials) --- */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* FAQs Section - Improved */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 hover:border-indigo-300 transition-colors duration-300">
                <div className="p-6 sm:p-8">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                <div>
                      <h4 className="text-xl font-semibold text-indigo-700 mb-3">How quickly can you respond to service requests?</h4>
                      <p className="text-gray-600 text-base">We offer same-day service for most repairs in Mumbai. Our technicians are strategically located across the city to ensure quick response times. For emergency requests, we can often arrive within hours.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 hover:border-indigo-300 transition-colors duration-300">
                <div className="p-6 sm:p-8">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                </div>
                 <div>
                      <h4 className="text-xl font-semibold text-indigo-700 mb-3">Do you provide warranty on repair services?</h4>
                      <p className="text-gray-600 text-base">Yes, all our repair services come with a 90-day warranty on both parts and labor. If the same issue recurs within this period, we'll fix it at no additional cost to you.</p>
                    </div>
                  </div>
                 </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 hover:border-indigo-300 transition-colors duration-300">
                <div className="p-6 sm:p-8">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                   </div>
                   <div>
                      <h4 className="text-xl font-semibold text-indigo-700 mb-3">What are your service charges?</h4>
                      <p className="text-gray-600 text-base">Our service charges vary depending on the type of appliance and the nature of the repair needed. We charge a standard diagnostic fee which is waived if you proceed with the repair. We provide transparent, upfront pricing before beginning any work.</p>
                    </div>
                   </div>
                 </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 hover:border-indigo-300 transition-colors duration-300">
                <div className="p-6 sm:p-8">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-indigo-700 mb-3">Do you service all areas in Mumbai?</h4>
                      <p className="text-gray-600 text-base">Yes, we currently cover all major areas in Mumbai and surrounding regions. Our technicians are distributed across the city to ensure prompt service. If you're unsure about coverage in your specific area, please contact us directly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MaintenanceRepair; 