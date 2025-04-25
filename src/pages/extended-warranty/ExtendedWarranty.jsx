import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExtendedWarranty = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb and Location */}
        <div className="flex justify-between items-center mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Air Conditioner - Extended Warranty Plans</span>
          </nav>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Mumbai</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
          <section className="px-6 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex-1">
                <img
                  src="/images/extend-01.png"
                  alt="Extended Warranty Illustration"
                  className="w-full max-w-[500px]"
                />
              </div>
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Extended Warranty Plans for Your Air Conditioner
                </h1>
                <p className="text-xl text-gray-600">
                  Sit back, relax and let us take care of your devices
                </p>
                <Button 
                  size="lg" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-6 text-lg rounded-xl"
                >
                  GET STARTED
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* Features Section with Background */}
        <div className="relative -mx-[calc(50vw-50%)]" style={{ width: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
          {/* Teal Background */}
          <div className="absolute inset-x-0 h-1/2 bg-teal-600">
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: '30px 30px'
              }}
            />
          </div>

          {/* Content */}
          <div className="relative max-w-6xl mx-auto px-4">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Features List */}
                <div className="bg-white p-8 md:p-10">
                  <h2 className="text-2xl font-bold mb-8 text-gray-900">Extended Warranty Features</h2>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="bg-teal-50 rounded-full p-1">
                        <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Extends your manufacturer's warranty of your Air Conditioner</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-teal-50 rounded-full p-1">
                        <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Covers Malfunctions & Breakdowns</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-teal-50 rounded-full p-1">
                        <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">'No Questions asked' repair policy</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-teal-50 rounded-full p-1">
                        <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Free At-Home Service, Completely Paperless process</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Button 
                      variant="link" 
                      className="text-teal-600 hover:text-teal-700 underline-offset-4 font-medium"
                    >
                      Read the FAQs
                    </Button>
                  </div>
                </div>

                {/* Price Input Section */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-gray-900">Explore Plans for your device</h2>
                  <div className="space-y-5 mt-8">
                    <p className="text-gray-600">Enter price of your Air Conditioner</p>
                    <Input 
                      type="text" 
                      placeholder="Device Price" 
                      className="w-full max-w-md text-lg py-6 px-4 border-2 border-gray-300 focus:border-teal-500 rounded-lg bg-white"
                    />
                    <Button 
                      className="w-full max-w-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-6 text-lg rounded-xl"
                    >
                      VIEW PLANS
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How Does It Work Section */}
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-flex items-center gap-2">
              How Does It Work?
              <span className="text-teal-500 text-3xl">✦</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-teal-50 rounded-full p-5 inline-block">
                  <img 
                    src="/images/book-service.png" 
                    alt="Book Service" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Book a service request
              </h3>
              <p className="text-gray-600">
                <button className="text-teal-600 hover:text-teal-700 font-medium">Click here</button>
                {" "}to raise a service request or{" "}
                <button className="text-teal-600 hover:text-teal-700 font-medium">send "Hi"</button>
                {" "}on WhatsApp
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-teal-50 rounded-full p-5 inline-block">
                  <img 
                    src="/images/repair.png" 
                    alt="Repair Service" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Repair And Maintenance
              </h3>
              <p className="text-gray-600">
                Get doorstep pick-up of your device or at-home service by a qualified engineer.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-teal-50 rounded-full p-5 inline-block">
                  <img 
                    src="/images/enjoy.png" 
                    alt="Enjoy Device" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Enjoy Your Device
              </h3>
              <p className="text-gray-600">
                Use it like it's a new one
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedWarranty; 