import React from 'react';
import terms from '/images/terms-banner.jpg';

const Terms = () => {
  // Replace with your actual Terms and Conditions content
  const lastUpdated = "October 26, 2023"; // Replace with actual date

  return (
    <div className="bg-gray-100">
      {/* --- Hero Section --- */}
      <section
        className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${terms})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight text-white drop-shadow-lg">Terms & Conditions</h1>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl bg-white p-8 sm:p-10 lg:p-12 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

          {/* --- Introduction --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to ComfortWay Electric Services ("Company", "we", "our", "us")! These Terms and Conditions ("Terms") govern your use of our website located at [Your Website URL] (the "Site") and any related services provided by ComfortWay Electric Services (collectively, the "Services").
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              By accessing or using our Site and Services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </section>

          {/* --- Use of Service --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Use of Our Service</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to use our Services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the Services. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our Services.
            </p>
            {/* Add more specific clauses regarding account creation, purchases, rentals, etc. */}
          </section>

          {/* --- Intellectual Property --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of ComfortWay Electric Services and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Your Country] and foreign countries.
            </p>
          </section>

          {/* --- Disclaimers --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Services are provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, express or implied. We do not warrant that the service will be uninterrupted, secure, or error-free.
            </p>
            {/* Add specific disclaimers related to equipment, repairs, etc. */}
          </section>

          {/* --- Limitation of Liability --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall ComfortWay Electric Services, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          {/* --- Governing Law --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.
            </p>
          </section>

          {/* --- Changes to Terms --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last Updated" date.
            </p>
          </section>

          {/* --- Contact Us --- */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms, please contact us at [Your Contact Email] or via our <a href="/contact" className="text-blue-600 hover:underline">Contact Page</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms; 