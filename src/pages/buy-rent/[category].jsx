import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiHome, FiShoppingCart, FiArrowLeft, FiArrowRight 
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByCategory, selectProductData, selectProductLoading, selectProductError } from '../../features/slices/productSlice';
import { fetchCategoryByName, selectSelectedCategory, selectCategoryLoading, selectCategoryError } from '../../features/slices/categorySlice';

export default function CategoryDetails() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const productData = useSelector(selectProductData);
  const isLoading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const categoryData = useSelector(selectSelectedCategory);
  const isCategoryLoading = useSelector(selectCategoryLoading);
  const categoryError = useSelector(selectCategoryError);
  const [selectedOption, setSelectedOption] = useState('buy');
  

  useEffect(() => {
    dispatch(fetchCategoryByName(category));
  }, [dispatch, category]);

  useEffect(() => {
    if (categoryData) {
      dispatch(fetchProductByCategory(categoryData.id));
    }
  }, [dispatch, categoryData]);

  useEffect(() => {
    if (categoryData) {
      if (categoryData.buy && !categoryData.rent) setSelectedOption('buy');
      else if (!categoryData.buy && categoryData.rent) setSelectedOption('rent');
      else if (categoryData.buy && categoryData.rent) setSelectedOption('buy');
    }
  }, [categoryData]);


  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 text-red-600">{error}</div>;
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Category Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">Sorry, we couldn't find the appliance you're looking for.</p>
        <Link to="/buy-rent" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow hover:bg-indigo-700 transition">
          <FiArrowLeft className="mr-2" /> Back to Buy/Rent
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 h-64 md:h-80">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-4 p-2">
            <img 
              src={categoryData.img} 
              alt={categoryData.name}
              className="w-16 h-16 object-contain"
              onError={e => { e.target.src = '/images/placeholder.png'; }}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 text-center">{categoryData.name}</h1>
          <div className="flex flex-wrap gap-2 justify-center">
            {categoryData.buy && <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium">Buy</span>}
            {categoryData.rent && <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium">Rent</span>}
          </div>
        </div>
        <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
          <Link to="/buy-rent" className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-lg font-medium text-indigo-700 hover:bg-indigo-50 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> 
            Back to Categories
          </Link>
        </div>
      </div>
      
      {/* Description */}
      <div className="max-w-5xl mx-auto px-4 mt-16 text-center">
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">{categoryData.desc}</p>
      </div>
      
      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Available {categoryData.name} Products</h2>
        {/* Buy/Rent Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          {categoryData.buy && (
            <button
              className={`px-6 py-2 rounded-full font-semibold text-base transition-all duration-200 border-2 ${selectedOption === 'buy' ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'}`}
              onClick={() => setSelectedOption('buy')}
            >
              Buy
            </button>
          )}
          {categoryData.rent && (
            <button
              className={`px-6 py-2 rounded-full font-semibold text-base transition-all duration-200 border-2 ${selectedOption === 'rent' ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'}`}
              onClick={() => setSelectedOption('rent')}
            >
              Rent
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productData && productData
            .filter(product => selectedOption === 'buy' ? product.buy : product.rent)
            .map((product) => (
              <div key={product.id || product.name} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col h-full group">
                {/* Top curved accent */}
                <div className="w-full h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
                {/* Product Image */}
                <div className="pt-6 px-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-full flex items-center justify-center shadow-md overflow-hidden p-5 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={product.img || `/images/brands/${(product.brand || product.name).toLowerCase().replace(/ /g, '-')}.webp`}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={e => { e.target.src = '/images/placeholder.png'; }}
                    />
                  </div>
                </div>
                {/* Product Details */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-1 text-center">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">{product.brand || product.name}</span>
                  </div>
                  {/* Show Buy/Rent badges for each product */}
                  <div className="flex justify-center gap-2 mb-2">
                    {product.buy && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-0.5 rounded-full text-xs font-semibold">Buy</span>
                    )}
                    {product.rent && (
                      <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs font-semibold">Rent</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 text-center flex-grow">{product.desc || product.description}</p>
                  {product.price && (
                    <p className="text-blue-600 text-lg font-semibold text-center mb-4">₹{product.price}</p>
                  )}
                  <div className="flex gap-3 justify-center mt-auto">
                    {selectedOption === 'buy' && product.buy && (
                      <a 
                        href={`https://wa.me/919967157463?text=I'm interested in buying ${product.name} (${product.brand || ''} ${categoryData.name})`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-blue-700 transition-all text-sm"
                      >
                        Buy Now <FiShoppingCart className="ml-1.5 w-4 h-4" />
                      </a>
                    )}
                    {selectedOption === 'rent' && product.rent && (
                      <a 
                        href={`https://wa.me/919967157463?text=I'm interested in renting ${product.name} (${product.brand || ''} ${categoryData.name})`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-blue-700 hover:to-green-700 transition-all text-sm"
                      >
                        Rent Now <FiHome className="ml-1.5 w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 md:p-8 text-center shadow-xl overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Get Your {categoryData.name}?</h2>
            <p className="text-base md:text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
              Get the best deals, fast delivery, and expert installation in Mumbai. Contact our team today!
            </p>
            <a 
              href={`https://wa.me/919967157463?text=I'm interested in ${categoryData.name} products. Please provide more information.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white hover:bg-indigo-50 text-indigo-700 font-medium rounded-full shadow-lg text-base transition-all duration-300 hover:scale-105"
            >
              Contact on WhatsApp <FiArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 