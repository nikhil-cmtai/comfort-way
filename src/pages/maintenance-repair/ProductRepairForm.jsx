import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit3, FiCheckCircle, FiTool, FiClock, FiShield, FiThumbsUp } from 'react-icons/fi';
import { addMaintenanceRequest } from '../../features/slices/maintenanceSlice';
import { useDispatch } from 'react-redux';

// Device plans data with image and description
const serviceTypes = [
  { name: 'AC', category: 'ac', img: '/images/products/ac-2.webp', desc: 'AC Repair, Installation & Service' },
  { name: 'Air Purifier', category: 'air-purifier', img: '/images/products/Air-purifier.webp', desc: 'Air Purifier Cleaning & Repair' },
  { name: 'Chopper', category: 'chopper', img: '/images/products/Chopper.webp', desc: 'Chopper Blade & Motor Service' },
  { name: 'Blender', category: 'blender', img: '/images/products/Blender.webp', desc: 'Blender Repair & Maintenance' },
  { name: 'Iron', category: 'iron', img: '/images/products/Iron.webp', desc: 'Iron Plate & Wiring Fix' },
  { name: 'Geyser', category: 'geyser', img: '/images/products/Geyser.webp', desc: 'Geyser Installation & Repair' },
  { name: 'Boiler', category: 'boiler', img: '/images/products/Boiler.webp', desc: 'Boiler Service & Repair' },
  { name: 'Juicer', category: 'juicer', img: '/images/products/Juicer.webp', desc: 'Juicer Motor & Blade Service' },
  { name: 'Microwave', category: 'microwave', img: '/images/products/Microwave.webp', desc: 'Microwave Repair & Cleaning' },
  { name: 'Washing Machine', category: 'washing-machine', img: '/images/products/Washing-machine.webp', desc: 'Washing Machine Service' },
  { name: 'Chimney', category: 'chimney', img: '/images/products/Chimney.webp', desc: 'Chimney Cleaning & Repair' },
  { name: 'Hob', category: 'hob', img: '/images/products/Hob.webp', desc: 'Hob Burner & Ignition Service' },
  { name: 'Water Purifier', category: 'water-purifier', img: '/images/products/Water-purifier.webp', desc: 'Water Purifier Filter Change' },
  { name: 'Refrigerator', category: 'refrigerator', img: '/images/products/Refrigerator.webp', desc: 'Refrigerator Gas & Cooling Repair' },
];

// Service types
const devicePlansData = [
  { id: 'ac', label: 'AC', img: '/images/products/ac-2.webp', desc: 'AC Repair, Installation & Service', popular: true  },
  { id: 'ro', label: 'RO', img: '/images/products/Water-purifier.webp', desc: 'Water Purifier Filter Change', popular: true },
  { id: 'electrician', label: 'Electrician', img: '/images/products/electrician.webp', desc: 'Electrician Service & Repair' },
  { id: 'plumbing', label: 'Plumbing', img: '/images/products/plumbing.webp', desc: 'Plumbing Service & Repair' },
  { id: 'home-appliances', label: 'Home Appliances', img: '/images/products/home-appliances.jpeg', desc: 'Home Appliance Repair & Maintenance' },
  { id: 'kitchen-appliances', label: 'Kitchen Appliances', img: '/images/products/kitchen-appliances.webp', desc: 'Kitchen Appliance Repair & Maintenance' },
];

// Service benefits/tips
const serviceTips = [
  {
    icon: <FiClock className="w-6 h-6 text-indigo-600" />, 
    title: 'Same-Day Service', 
    desc: 'Our technicians arrive within hours for emergency calls in Mumbai'
  },
  { 
    icon: <FiTool className="w-6 h-6 text-indigo-600" />, 
    title: 'Certified Experts', 
    desc: 'All our technicians are factory-trained and background verified'
  },
  { 
    icon: <FiShield className="w-6 h-6 text-indigo-600" />, 
    title: '90-Day Warranty', 
    desc: 'All parts and labor covered for 3 months after service'
  },
  { 
    icon: <FiThumbsUp className="w-6 h-6 text-indigo-600" />, 
    title: 'Transparent Pricing', 
    desc: 'No hidden fees or surprise charges after the service'
  }
];

const ProductRepairForm = () => {
  const dispatch = useDispatch();
  const { product } = useParams();
  const productItem = devicePlansData.find((item) => item.category === product || item.id === product);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: 'repair',
    issueDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMaintenanceRequest(formData));
    // Replace with your actual request submission logic (e.g., API call, email)
    alert(`Thank you for your ${productItem ? productItem.name : ''} service request! We will contact you shortly to arrange the service.`);
    setFormData({ name: '', email: '', phone: '', address: '', serviceType: 'repair', issueDescription: '' });
  };

  if (!productItem) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Service Not Found</h2>
        <p className="text-gray-600">Sorry, we couldn't find the requested service.</p>
      </div>
    );
  }

  // Background for the hero section - with a gradient overlay
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/gallery/Image${Math.floor(Math.random() * 8) + 1}.jpeg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative w-full h-[250px] sm:h-[300px] flex items-center justify-center text-center shadow-lg"
        style={heroStyle}
      >
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
          <div className="bg-white/90 p-3 rounded-full shadow-lg mb-4">
            <img
              src={productItem.img}
              alt={productItem.name}
              className="h-16 w-16 object-contain"
              onError={e => { e.target.src = '/images/placeholder.png'; }}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight text-white drop-shadow-lg">
            {productItem.name} Service Request
          </h1>
          <p className="text-lg font-light opacity-90 max-w-2xl mx-auto text-white drop-shadow">
            Professional {productItem.desc} in Mumbai with Same-Day Service
          </p>
        </div>
      </section>

      {/* Heading above product cards */}
      <section className="pt-8 pb-2 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Select Your Appliance</h2>
          <p className="text-gray-500 text-base mb-2">Choose the appliance you need service for</p>
        </div>
      </section>

      {/* Device Cards Grid Above Form (all products) */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="w-full overflow-x-auto pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 min-w-[400px]">
              {serviceTypes.map((item) => (
                <a
                  key={item.category}
                  className={`group relative bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col p-0 hover:-translate-y-2 cursor-pointer overflow-hidden min-h-[240px] ${(item.category === productItem.category || item.category === productItem.id) ? 'ring-2 ring-indigo-500 border-indigo-500' : ''}`}
                  style={{ textDecoration: 'none', maxWidth: 220 }}
                >
                  {/* Card Image */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mt-4 mb-2 border-2 border-indigo-100 shadow"
                    onError={e => { e.target.src = '/images/placeholder.png'; }}
                  />
                  {/* Card Content */}
                  <div className="flex flex-col flex-1 px-4 py-3">
                    <h3 className="font-bold text-base text-center mt-2 mb-1 text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-center text-xs mb-2">
                      {item.desc}
                    </p>
                  </div>
                  {/* Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-50 rounded-tl-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section Below Cards */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <h2 className="text-2xl font-bold">Book Your {productItem.name} Service Now</h2>
              <p className="opacity-90">Fill out the form below and our team will get back to you within 2 hours</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <div className="flex items-center">
                      <FiUser className="absolute left-3 top-1/2 text-indigo-400 w-5 h-5" />
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        placeholder="Full Name" 
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white" 
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="flex items-center">
                      <FiMail className="absolute left-3 top-1/2 text-indigo-400 w-5 h-5" />
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        placeholder="you@example.com" 
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white" 
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="relative">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="flex items-center">
                      <FiPhone className="absolute left-3 top-1/2 text-indigo-400 w-5 h-5" />
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required
                        placeholder="Your contact number" 
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white" 
                      />
                    </div>
                  </div>

                  {/* Address Field */}
                  <div className="relative">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Service Address</label>
                    <div className="flex items-center">
                      <FiMapPin className="absolute left-3 top-1/3 text-indigo-400 w-5 h-5" />
                      <textarea 
                        id="address" 
                        name="address" 
                        rows="3" 
                        value={formData.address} 
                        onChange={handleChange} 
                        required 
                        placeholder="Your complete address" 
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white resize-none" 
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  {/* Service Type Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                    >
                      <option value="" disabled>Select a service type</option>
                      {serviceTypes.map((type) => (
                        <option key={type.category} value={type.category}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Issue Description */}
                  <div className="relative">
                    <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 mb-1">Issue Description</label>
                    <div className="flex items-center">
                      <FiEdit3 className="absolute left-3 top-1/4 text-indigo-400 w-5 h-5" />
                      <textarea 
                        id="issueDescription" 
                        name="issueDescription" 
                        rows="6" 
                        value={formData.issueDescription} 
                        onChange={handleChange} 
                        required 
                        placeholder="Please describe the issue you're facing with your appliance" 
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white resize-none" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                >
                  Submit Service Request
                  <FiCheckCircle className="ml-2 h-5 w-5" />
                </button>
                <p className="mt-3 text-sm text-gray-500">Our support team typically responds within 2 hours during business hours</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductRepairForm; 