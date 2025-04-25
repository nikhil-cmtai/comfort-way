import React, { useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';

const RaiseRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requestType: 'Repair', // Default or add options like 'Maintenance', 'Quote'
    equipmentType: '',
    serialNumber: '',
    description: '',
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
    // Replace with your actual request submission logic (e.g., API call, email)
    console.log('Service Request Submitted:', formData);
    alert('Thank you for your request! We will contact you shortly.');
    // Optionally reset form
    setFormData({
        name: '',
        email: '',
        phone: '',
        requestType: 'Repair',
        equipmentType: '',
        serialNumber: '',
        description: '',
    });
  };

  return (
    <div className="bg-gray-100 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <div className="bg-white p-8 sm:p-10 lg:p-12 rounded-lg shadow-xl">
            <div className="text-center mb-8 md:mb-10">
               <FiMessageSquare className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
               <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Submit a Service Request</h1>
               <p className="text-gray-600 mt-3">Fill out the form below to request repair, maintenance, or other services. We'll respond promptly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Contact Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
                 <div>
                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                   <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                 </div>
              </div>

               {/* Phone & Request Type Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                   <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                 </div>
                 <div>
                   <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-1">Type of Request</label>
                   <select id="requestType" name="requestType" value={formData.requestType} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white">
                      <option>Repair</option>
                      <option>Maintenance</option>
                      <option>Quote Request</option>
                      <option>General Inquiry</option>
                      {/* Add other relevant options */}
                   </select>
                 </div>
              </div>

                {/* Equipment Info Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div>
                     <label htmlFor="equipmentType" className="block text-sm font-medium text-gray-700 mb-1">Type of Equipment</label>
                     <input type="text" id="equipmentType" name="equipmentType" value={formData.equipmentType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                   </div>
                   <div>
                     <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-1">Serial Number (Optional)</label>
                     <input type="text" id="serialNumber" name="serialNumber" value={formData.serialNumber} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                   </div>
                 </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description / Details</label>
                <textarea id="description" name="description" rows="5" value={formData.description} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Please describe the issue or your request..."></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button type="submit" className="inline-flex justify-center py-3 px-10 border border-transparent shadow-lg text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default RaiseRequest; 