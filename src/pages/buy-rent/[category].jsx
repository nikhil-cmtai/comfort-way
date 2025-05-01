import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiHome, FiShoppingCart, FiArrowLeft, FiArrowRight 
} from 'react-icons/fi';
import { FaFire, FaSnowflake } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByCategory, selectProductData, selectProductLoading, selectProductError } from '../../features/slices/productSlice';

const categories = [
  {
    key: 'ac',
    name: 'AC (Air Conditioner)',
    icon: <FiHome className="w-8 h-8 text-blue-500" />,
    img: '/images/products/ac-2.webp',
    brands: ['Daikin', 'Voltas', 'LG', 'Samsung', 'Blue Star', 'Hitachi'],
    buy: true,
    rent: true,
    desc: 'Stay cool and comfortable with our range of top-brand air conditioners. Buy or rent with fast delivery and expert installation in Mumbai.'
  },
  {
    key: 'air-purifier',
    name: 'Air Purifier',
    icon: <FaSnowflake className="w-8 h-8 text-blue-400" />,
    img: '/images/products/Air-purifier.webp',
    brands: ['Philips', 'LG', 'Samsung', 'Blue Star', 'Hitachi'],
    buy: true,
    rent: false,
    desc: 'Breathe easy with advanced air purifiers from trusted brands. Perfect for Mumbai homes. Buy now for fresher, cleaner air.'
  },
  {
    key: 'chopper',
    name: 'Chopper',
    icon: <FiHome className="w-8 h-8 text-pink-500" />,
    img: '/images/products/Chopper.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
    desc: 'Make meal prep effortless with high-quality choppers. Buy from top brands for durability and performance.'
  },
  {
    key: 'blender',
    name: 'Blender',
    icon: <FiHome className="w-8 h-8 text-yellow-500" />,
    img: '/images/products/Blender.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
    desc: 'Blend, mix, and create with ease. Choose from the best blenders in Mumbai, available for purchase.'
  },
  {
    key: 'iron',
    name: 'Iron',
    icon: <FiHome className="w-8 h-8 text-gray-500" />,
    img: '/images/products/Iron.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
    desc: 'Get crisp, wrinkle-free clothes every day. Shop for reliable irons from leading brands.'
  },
  {
    key: 'geyser',
    name: 'Geyser',
    icon: <FaFire className="w-8 h-8 text-red-500" />,
    img: '/images/products/Geyser.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
    desc: 'Enjoy hot water on demand. Buy premium geysers with installation in Mumbai.'
  },
  {
    key: 'boiler',
    name: 'Boiler',
    icon: <FiHome className="w-8 h-8 text-orange-500" />,
    img: '/images/products/Boiler.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
    desc: 'Efficient and safe boilers for your kitchen needs. Buy from trusted brands.'
  },
  {
    key: 'juicer',
    name: 'Juicer',
    icon: <FiHome className="w-8 h-8 text-green-500" />,
    img: '/images/products/Juicer.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
    desc: 'Fresh juice, every day. Shop juicers from top brands for a healthy lifestyle.'
  },
  {
    key: 'microwave',
    name: 'Microwave',
    icon: <FiHome className="w-8 h-8 text-indigo-500" />,
    img: '/images/products/Microwave.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
    desc: 'Cook and reheat with ease. Buy microwaves from the best brands, delivered and installed in Mumbai.'
  },
  {
    key: 'washing-machine',
    name: 'Washing Machine',
    icon: <FiHome className="w-8 h-8 text-green-500" />,
    img: '/images/products/Washing-machine.webp',
    brands: ['LG', 'Samsung', 'IFB', 'Bosch', 'Whirlpool'],
    buy: true,
    rent: false,
    desc: 'Powerful washing machines for spotless laundry. Buy from leading brands with expert installation.'
  },
  {
    key: 'chimney',
    name: 'Chimney',
    icon: <FiHome className="w-8 h-8 text-gray-400" />,
    img: '/images/products/Chimney.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
    desc: 'Keep your kitchen smoke-free. Buy chimneys from top brands, installed by professionals.'
  },
  {
    key: 'hob',
    name: 'Hob',
    icon: <FaFire className="w-8 h-8 text-red-400" />,
    img: '/images/products/Hob.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
    desc: 'Modern hobs for efficient cooking. Buy from the best brands in Mumbai.'
  },
  {
    key: 'water-purifier',
    name: 'Water Purifier',
    icon: <FiHome className="w-8 h-8 text-indigo-500" />,
    img: '/images/products/Water-purifier.webp',
    brands: ['Kent', 'Aquaguard', 'Livpure', 'Pureit', 'AO Smith'],
    buy: true,
    rent: true,
    desc: 'Pure, safe water for your family. Buy or rent water purifiers with free installation.'
  },
  {
    key: 'refrigerator',
    name: 'Refrigerator',
    icon: <FiHome className="w-8 h-8 text-purple-500" />,
    img: '/images/products/Refrigerator.webp',
    brands: ['LG', 'Samsung', 'Whirlpool', 'Godrej', 'Haier'],
    buy: true,
    rent: false,
    desc: 'Keep your food fresh and cool. Buy refrigerators from top brands, delivered fast in Mumbai.'
  },
];

// Placeholder product info for each brand
const brandInfo = {
  Daikin: {
    title: 'Daikin Inverter AC',
    desc: 'Energy efficient, fast cooling, 1-year warranty.',
    price: 'From ₹28,999',
  },
  Voltas: {
    title: 'Voltas Split AC',
    desc: 'High performance, low noise, 5-star rated.',
    price: 'From ₹25,499',
  },
  LG: {
    title: 'LG DualCool AC',
    desc: 'Smart cooling, WiFi enabled, 10-year compressor warranty.',
    price: 'From ₹30,999',
  },
  Samsung: {
    title: 'Samsung WindFree AC',
    desc: 'WindFree technology, digital inverter, fast installation.',
    price: 'From ₹29,499',
  },
  'Blue Star': {
    title: 'Blue Star AC',
    desc: 'Copper condenser, turbo cool, anti-bacterial filter.',
    price: 'From ₹27,999',
  },
  Hitachi: {
    title: 'Hitachi Kaze Plus',
    desc: 'Powerful cooling, eco-friendly, 5-year warranty.',
    price: 'From ₹26,999',
  },
  Philips: {
    title: 'Philips Air Purifier',
    desc: 'HEPA filter, real-time air quality, silent operation.',
    price: 'From ₹9,999',
  },
  IFB: {
    title: 'IFB Washing Machine',
    desc: 'Front load, 5-star, 4 years warranty.',
    price: 'From ₹21,999',
  },
  Bosch: {
    title: 'Bosch Washing Machine',
    desc: 'German engineering, low vibration, 10-year motor warranty.',
    price: 'From ₹24,999',
  },
  Whirlpool: {
    title: 'Whirlpool Refrigerator',
    desc: 'IntelliSense inverter, 265L, 5-in-1 modes.',
    price: 'From ₹19,499',
  },
  Godrej: {
    title: 'Godrej Refrigerator',
    desc: 'Frost-free, toughened glass shelves, 10-year compressor warranty.',
    price: 'From ₹17,999',
  },
  Haier: {
    title: 'Haier Refrigerator',
    desc: 'Convertible, 8-in-1 modes, energy saving.',
    price: 'From ₹18,499',
  },
  Kent: {
    title: 'Kent Water Purifier',
    desc: 'RO+UV+UF, mineral RO, 1-year free service.',
    price: 'From ₹12,499',
  },
  Aquaguard: {
    title: 'Aquaguard Water Purifier',
    desc: 'Active copper, UV e-boiling, smart LED display.',
    price: 'From ₹13,499',
  },
  Livpure: {
    title: 'Livpure Water Purifier',
    desc: '7-stage purification, taste enhancer, 1-year warranty.',
    price: 'From ₹10,999',
  },
  Pureit: {
    title: 'Pureit Water Purifier',
    desc: 'Advanced RO, 6L storage, power saving mode.',
    price: 'From ₹9,499',
  },
  'AO Smith': {
    title: 'AO Smith Water Purifier',
    desc: 'Hot & cold, digital display, 2-year warranty.',
    price: 'From ₹15,499',
  },
  Bajaj: {
    title: 'Bajaj Appliance',
    desc: 'Reliable, affordable, trusted by millions.',
    price: 'From ₹2,499',
  },
  Havells: {
    title: 'Havells Appliance',
    desc: 'Modern design, energy efficient, long-lasting.',
    price: 'From ₹2,999',
  },
  Panasonic: {
    title: 'Panasonic Appliance',
    desc: 'Japanese technology, durable, smart features.',
    price: 'From ₹3,499',
  },
};

export default function CategoryDetails() {
  const { category } = useParams();
  const cat = categories.find((c) => c.key === category);
  const dispatch = useDispatch();
  const productData = useSelector(selectProductData);
  const isLoading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);

  useEffect(() => {
    dispatch(fetchProductByCategory(category));
  }, [dispatch, category]);

  if (!cat) {
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
              src={cat.img} 
              alt={cat.name}
              className="w-16 h-16 object-contain"
              onError={e => { e.target.src = '/images/placeholder.png'; }}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 text-center">{cat.name}</h1>
          <div className="flex flex-wrap gap-2 justify-center">
            {cat.buy && <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium">Buy</span>}
            {cat.rent && <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium">Rent</span>}
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
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">{cat.desc}</p>
      </div>
      
      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Available {cat.name} Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cat.brands.map((brand) => {
            const info = brandInfo[brand] || { title: brand, desc: 'Top quality appliance from ' + brand, price: 'Contact for price' };
            return (
              <div key={brand} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col h-full group">
                {/* Top curved accent */}
                <div className="w-full h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
                
                {/* Brand Logo */}
                <div className="pt-6 px-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-full flex items-center justify-center shadow-md overflow-hidden p-5 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={`/images/brands/${brand.toLowerCase().replace(/ /g, '-')}.webp`}
                      alt={brand}
                      className="w-full h-full object-contain"
                      onError={e => { e.target.src = '/images/placeholder.png'; }}
                    />
                  </div>
                </div>
                
                {/* Product Details */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-1 text-center">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">{brand}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{info.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 text-center flex-grow">{info.desc}</p>
                  
                  <div className="flex gap-3 justify-center">
                    {cat.buy && (
                      <a 
                        href={`https://wa.me/919967157463?text=I'm interested in buying ${info.title} (${brand} ${cat.name})`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-blue-700 transition-all text-sm"
                      >
                        Buy Now <FiShoppingCart className="ml-1.5 w-4 h-4" />
                      </a>
                    )}
                    {cat.rent && (
                      <a 
                        href={`https://wa.me/919967157463?text=I'm interested in renting ${info.title} (${brand} ${cat.name})`} 
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
            );
          })}
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Get Your {cat.name}?</h2>
            <p className="text-base md:text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
              Get the best deals, fast delivery, and expert installation in Mumbai. Contact our team today!
            </p>
            <a 
              href={`https://wa.me/919967157463?text=I'm interested in ${cat.name} products. Please provide more information.`}
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