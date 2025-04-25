import React, { useState } from 'react';
import { FiTool, FiClock, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';

const MaintenanceRepair = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    equipmentType: '',
    serialNumber: '',
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
    // Replace with your actual request submission logic (e.g., API call, email)
    console.log('Repair Request Submitted:', formData);
    alert('Thank you for your repair request! We will contact you shortly to arrange the service.');
    // Optionally reset form
    setFormData({ name: '', email: '', phone: '', equipmentType: '', serialNumber: '', issueDescription: '' });
  };

  return (
    <div className="bg-gray-50">
      {/* --- Hero Section --- */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 sm:py-28 text-center shadow-lg relative overflow-hidden">
         <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
         <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Maintenance & Repair</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">Keep your equipment in top condition with our expert maintenance and repair services.</p>
        </div>
      </section>

      {/* --- Services Overview Section --- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Maintenance Info */}
            <div>
              <FiClock className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Preventative Maintenance</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Regular maintenance is key to extending the life of your electric equipment and preventing costly breakdowns. We offer scheduled maintenance plans tailored to your specific tools and usage.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500"/> Inspections & diagnostics</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500"/> Lubrication & adjustments</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500"/> Filter and fluid changes</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500"/> Performance testing</li>
              </ul>
            </div>
            {/* Repair Info */}
            <div>
              <FiTool className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Expert Repair Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When breakdowns happen, our certified technicians are ready to help. We provide efficient and reliable repairs for a wide range of electric equipment, minimizing your downtime.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                 <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500"/> Fast diagnostic service</li>
                 <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500"/> Repairs for major brands</li>
                 <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500"/> Use of quality parts</li>
                 <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500"/> Warranty on repair work</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- Raise Repair Request Section --- */}
      <section className="py-16 sm:py-24 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <div className="bg-white p-8 sm:p-10 rounded-lg shadow-xl">
            <div className="text-center mb-8">
               <FiMessageSquare className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
               <h2 className="text-3xl font-bold text-gray-800">Request a Repair</h2>
               <p className="text-gray-600 mt-2">Fill out the form below to initiate a repair request. We'll get back to you promptly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
               <div>
                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                 <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
               </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div>
                     <label htmlFor="equipmentType" className="block text-sm font-medium text-gray-700 mb-1">Type of Equipment</label>
                     <input type="text" id="equipmentType" name="equipmentType" value={formData.equipmentType} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                   </div>
                   <div>
                     <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-1">Serial Number (Optional)</label>
                     <input type="text" id="serialNumber" name="serialNumber" value={formData.serialNumber} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                   </div>
                 </div>
              <div>
                <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 mb-1">Describe the Issue</label>
                <textarea id="issueDescription" name="issueDescription" rows="4" value={formData.issueDescription} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea>
              </div>
              <div className="text-center pt-4">
                <button type="submit" className="inline-flex justify-center py-3 px-8 border border-transparent shadow-lg text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default MaintenanceRepair; 