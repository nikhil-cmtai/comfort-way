import React, { useState } from 'react';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi'; // Example icons

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
    // Replace with your actual form submission logic (e.g., API call)
    console.log('Form data submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gray-100">
      {/* --- Hero Section --- */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-24 sm:py-32 md:py-40 text-center shadow-lg relative overflow-hidden">
        {/* Optional: Add subtle background pattern or shapes */}
        <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Contact Us</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
        </div>
      </section>

      {/* --- Contact Form & Details Section --- */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:grid md:grid-cols-5">

          {/* Contact Details (Column 1/2) */}
          <div className="md:col-span-2 bg-gradient-to-b from-blue-50 to-blue-100 p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">Fill in the form or use our contact details below. We are always happy to help.</p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FiMapPin className="text-blue-600 text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Our Office</h3>
                  <p className="text-gray-600 text-sm">
                    123 Comfort Way, Suite 456<br />
                    Cityville, State 78900
                  </p> {/* Replace with actual address */}
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FiMail className="text-blue-600 text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Email Us</h3>
                  <a href="mailto:info@comfortway.com" className="text-blue-600 hover:text-blue-800 transition duration-200 text-sm">info@comfortway.com</a> {/* Replace with actual email */}
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FiPhone className="text-blue-600 text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Call Us</h3>
                  <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800 transition duration-200 text-sm">+1 (234) 567-890</a> {/* Replace with actual phone */}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Column 3/4/5) */}
          <div className="md:col-span-3 p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50"
                    placeholder="Your Full Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50"
                  placeholder="Reason for contacting us"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none bg-gray-50"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-8 border border-transparent shadow-lg text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* --- Map Section (Now at the bottom) --- */}
      <section className="w-full h-[450px] md:h-[550px] bg-gray-300">
        {/* IMPORTANT: Replace the src below with your actual Google Maps embed code */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086414904673!2d144.95373531590418!3d-37.8172099797516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1618886800000!5m2!1sen!2sau" // Placeholder SRC
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
      </section>

    </div>
  );
};

export default Contact;