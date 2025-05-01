import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit3, FiCheckCircle, FiTool, FiClock, FiShield, FiThumbsUp } from 'react-icons/fi';
import { addMaintenanceRequest } from '../../features/slices/maintenanceSlice';
import { useDispatch } from 'react-redux';

// Device plans data with image and description
const devicePlansData = [
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
const serviceTypes = [
  { id: 'repair', name: 'Repair Service', desc: 'Fix your broken appliance' },
  { id: 'maintenance', name: 'Maintenance Service', desc: 'Regular check-up and cleaning' },
  { id: 'installation', name: 'Installation Service', desc: 'Setup your new appliance' }
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
  const productItem = devicePlansData.find((item) => item.category === product);

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
    <div className="bg-gray-50">
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

      {/* Info & Tips Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Why Choose Our {productItem.name} Service?</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-5"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our {productItem.name} experts are certified professionals with years of experience. 
              We provide efficient, reliable service with genuine parts and transparent pricing to 
              ensure your appliance operates at peak performance.
            </p>
          </div>

          {/* Service Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {serviceTips.map((tip, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col items-center text-center">
                <div className="bg-indigo-100 p-3 rounded-full mb-4">
                  {tip.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
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
                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                    <div className="grid grid-cols-1 gap-3">
                      {serviceTypes.map((type) => (
                        <div key={type.id} className="relative">
                          <input
                            type="radio"
                            id={type.id}
                            name="serviceType"
                            value={type.id}
                            checked={formData.serviceType === type.id}
                            onChange={handleChange}
                            className="peer absolute opacity-0 h-0 w-0"
                            required
                          />
                          <label
                            htmlFor={type.id}
                            className="flex items-center p-3 w-full border border-gray-300 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 peer-checked:border-indigo-500 peer-checked:bg-indigo-50"
                          >
                            <div className="h-5 w-5 rounded-full border-2 border-gray-400 mr-3 flex items-center justify-center peer-checked:border-indigo-500">
                              <div className={`h-2.5 w-2.5 rounded-full ${formData.serviceType === type.id ? 'bg-indigo-500' : 'bg-transparent'}`}></div>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{type.name}</p>
                              <p className="text-xs text-gray-500">{type.desc}</p>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
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