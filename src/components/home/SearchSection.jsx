import React, { useState, useEffect } from 'react';
import { FiSearch, FiSettings, FiArrowRight, FiTool } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { fetchProductData, selectProductData, selectProductError, selectProductLoading } from '../../features/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceData, selectServiceData, selectServiceError, selectServiceLoading } from '../../features/slices/serviceSlice';

const SearchSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector(selectProductData);
  const productError = useSelector(selectProductError);
  const productLoading = useSelector(selectProductLoading);
  const popularServices = useSelector(selectServiceData);
  const serviceError = useSelector(selectServiceError);
  const serviceLoading = useSelector(selectServiceLoading);
  const [searchInput, setSearchInput] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchProductData());
    dispatch(fetchServiceData());
  }, [dispatch]);

  // Enhanced background with animated gradient
  const backgroundStyle = {
    background: 'linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    position: 'relative',
    marginTop: '-5px', // Ensure no gap with the hero
  };

  // Filtered product suggestions
  const filteredProducts = searchInput.trim()
    ? productData.filter(product =>
        (product.name + ' ' + product.description)
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSearch = () => {
    if (searchInput.trim()) {
      // Convert search input to kebab case for URL
      const searchTerm = searchInput.trim().toLowerCase().replace(/\s+/g, '-');
      navigate(`/maintenance-repair/${searchTerm}`);
    }
  };

  const handleDeviceClick = (deviceCategory) => {
    navigate(`/maintenance-repair/${deviceCategory}`);
  };

  return (
    <div className="relative py-16 md:py-24 overflow-hidden" style={backgroundStyle}>
      {/* Background pattern overlay with better visuals */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: '60px 60px',
        }}></div>
      </div>

      {/* Enhanced floating decorative elements with subtle animation */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-indigo-300 opacity-10 rounded-full blur-2xl animate-float-slow"></div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Expert Care For Your Devices
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Find qualified technicians for all your home appliance needs in just a few clicks
          </p>
        </div>

        {/* Enhanced Search Form with better shadows and animations */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20 max-w-4xl mx-auto transform transition-all hover:shadow-indigo-500/20">
          {/* Device Input with enhanced animation - Full Width */}
          <div className="relative w-full mb-6">
            <label className="block text-left text-blue-100 text-sm font-medium mb-1.5 ml-1">Search for any device</label>
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowDropdown(true);
                }}
                placeholder="What device needs service? (AC, Refrigerator, etc.)"
                className="w-full px-4 py-4 text-white placeholder-blue-200/70 bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-300/50 border border-white/20 rounded-xl transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FiSettings className="text-blue-300 animate-spin-slow" size={18} />
              </div>
              {/* Autocomplete Dropdown */}
              {showDropdown && searchInput.trim() && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-72 overflow-y-auto z-20 animate-fade-in-down">
                  {productLoading ? (
                    <div className="p-3 text-gray-500 text-center text-sm">Loading...</div>
                  ) : productError ? (
                    <div className="p-3 text-red-500 text-center text-sm">Error: {productError}</div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="p-3 text-gray-400 text-center text-sm">No products found</div>
                  ) : (
                    filteredProducts.map(product => (
                      <div
                        key={product._id}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 border-gray-100"
                        onMouseDown={() => {
                          setShowDropdown(false);
                          navigate('/buy-rent'); // Or `/product/${product._id}` if you have a detail page
                        }}
                      >
                        <img
                          src={product.imageUrl || '/images/products/default.webp'}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                          onError={e => { e.target.src = '/images/products/default.webp'; }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 truncate">{product.name}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Popular Devices Section with enhanced buttons */}
          <div className="mb-8">
            <div className="text-left text-blue-100 text-sm font-medium mb-3 ml-1">Popular Devices:</div>
            <div className="flex flex-wrap gap-2">
              {serviceLoading ? (
                <div className="text-white text-sm">Loading...</div>
              ) : serviceError ? (
                <div className="text-red-200 text-sm">Error loading services</div>
              ) : (
                popularServices && popularServices.length > 0 && popularServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleDeviceClick(service.label.toLowerCase().replace(/\s+/g, '-'))}
                    className="flex items-center px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full border border-white/20 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    {service.img ? (
                      <img
                        src={service.img}
                        alt={service.label}
                        className="w-6 h-6 rounded-full object-cover mr-2 border border-white/30 bg-white/20"
                        onError={e => { e.target.src = '/images/products/default.webp'; }}
                      />
                    ) : (
                      <span className="mr-2 text-lg"><FiTool /></span>
                    )}
                    {service.label}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Search Button with enhanced hover effects */}
          <button 
            onClick={handleSearch}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-medium flex items-center justify-center shadow-lg gap-2 group focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <FiSearch size={18} className={`transition-all duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
            <span>Find Service</span>
            <FiArrowRight className={`transition-all duration-300 ${isButtonHovered ? 'translate-x-1' : ''}`} />
          </button>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SearchSection; 