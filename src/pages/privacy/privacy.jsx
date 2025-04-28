import React from 'react';
import privacy from '/images/privacy-banner.jpg';

const Privacy = () => {
  // Replace with your actual Privacy Policy content
  const lastUpdated = "October 26, 2023"; // Replace with actual date

  return (
    <div className="bg-gray-100">
      {/* --- Hero Section --- */}
      <section
        className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${privacy})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight text-white drop-shadow-lg">Privacy Policy</h1>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl bg-white p-8 sm:p-10 lg:p-12 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

          {/* --- Introduction --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              ComfortWay Electric Services ("Company", "we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by ComfortWay Electric Services when you use our website located at [Your Website URL] (the "Site") and related services (the "Services").
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and our Terms and Conditions.
            </p>
          </section>

          {/* --- Information We Collect --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed">
              We collect information about you in various ways when you use our Services. This may include:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-3 space-y-1">
              <li><strong>Information You Provide Directly:</strong> Name, email address, phone number, company information, payment information, information provided in contact forms or repair requests, etc.</li>
              <li><strong>Information Collected Automatically:</strong> IP address, browser type, operating system, referring URLs, pages viewed, links clicked, device information, and usage data collected through cookies and similar technologies.</li>
              {/* Add other types of collected information */}
            </ul>
          </section>

          {/* --- How We Use Your Information --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We use the information we collect for various purposes, including to:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-3 space-y-1">
              <li>Provide, operate, and maintain our Services.</li>
              <li>Process transactions (sales, rentals, repairs).</li>
              <li>Improve, personalize, and expand our Services.</li>
              <li>Understand and analyze how you use our Services.</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes.</li>
              <li>Send you emails and other communications.</li>
              <li>Find and prevent fraud.</li>
              {/* Add other uses */}
            </ul>
          </section>

          {/* --- Cookies and Tracking Technologies --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
          </section>

          {/* --- Data Security --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We use reasonable administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>
          </section>

          {/* --- Your Data Protection Rights --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Your Data Protection Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, update, or request deletion of your personal information. Please contact us to exercise these rights.
            </p>
            {/* Add specific rights based on regulations like GDPR, CCPA, etc. if applicable */}
          </section>

          {/* --- Changes to This Privacy Policy --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          {/* --- Contact Us --- */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at [Your Contact Email] or via our <a href="/contact" className="text-blue-600 hover:underline">Contact Page</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Privacy; 