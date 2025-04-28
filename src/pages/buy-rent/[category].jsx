import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiHome, FiShoppingCart, FiArrowLeft, FiArrowRight 
} from 'react-icons/fi';
import { FaFire, FaSnowflake } from 'react-icons/fa';

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
      {/* Top Bar */}
      <div className="max-w-4xl mx-auto px-4 pt-8 flex items-center">
        <Link to="/buy-rent" className="inline-flex items-center text-indigo-600 font-semibold hover:underline">
          <FiArrowLeft className="mr-2" /> Back
        </Link>
      </div>
      {/* Main Card */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-100 p-0 overflow-hidden" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)'}}>
          <div className="flex flex-col md:flex-row items-center md:items-stretch">
            {/* Image Section */}
            <div className="flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 md:rounded-l-3xl rounded-t-3xl md:rounded-t-none w-full md:w-60 h-56 md:h-auto border-b md:border-b-0 md:border-r border-indigo-100 p-6">
              <img src={cat.img} alt={cat.name} className="w-40 h-40 object-contain rounded-2xl border-4 border-white shadow-lg" onError={e => { e.target.src = '/images/placeholder.png'; }} />
            </div>
            {/* Info Section */}
            <div className="flex-1 flex flex-col justify-center items-center md:items-start px-8 py-8 md:py-0">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 text-center md:text-left drop-shadow-lg">{cat.name}</h1>
              <p className="text-lg text-gray-700 mb-4 text-center md:text-left max-w-xl">{cat.desc}</p>
              <div className="flex flex-wrap gap-2 mb-2 justify-center md:justify-start">
                {cat.buy && <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold shadow">Buy</span>}
                {cat.rent && <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold shadow">Rent</span>}
              </div>
            </div>
          </div>
        </div>
        {/* Brands Product Grid */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Available Brands</h2>
          <div className="flex flex-col gap-8">
            {cat.brands.map((brand) => {
              const info = brandInfo[brand] || { title: brand, desc: 'Top quality appliance from ' + brand, price: 'Contact for price' };
              return (
                <div key={brand} className="flex flex-col sm:flex-row items-center bg-gradient-to-br from-indigo-100 to-blue-50 rounded-2xl shadow-xl border border-indigo-100 p-6 gap-6 sm:gap-10 min-h-[160px] transition-all duration-300 hover:shadow-2xl overflow-hidden">
                  {/* Brand Logo */}
                  <div className="flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow border-2 border-indigo-100 overflow-hidden mb-4 sm:mb-0">
                    <img
                      src={`/images/brands/${brand.toLowerCase().replace(/ /g, '-')}.webp`}
                      alt={brand}
                      className="w-16 h-16 object-contain"
                      onError={e => { e.target.src = '/images/placeholder.png'; }}
                    />
                  </div>
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
                    <div className="font-extrabold text-gray-900 text-lg mb-1 uppercase tracking-wide">{brand}</div>
                    <div className="font-bold text-indigo-700 text-base mb-1">{info.title}</div>
                    <div className="text-gray-600 text-sm mb-2">{info.desc}</div>
                    <div className="text-xl font-bold text-blue-600 mb-4">{info.price}</div>
                    <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
                      {cat.buy && (
                        <Link to={`/contact?type=buy&category=${cat.key}&brand=${brand}`} className="inline-flex items-center px-7 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-blue-700 transition-all text-base">
                          Buy <FiShoppingCart className="ml-2" />
                        </Link>
                      )}
                      {cat.rent && (
                        <Link to={`/contact?type=rent&category=${cat.key}&brand=${brand}`} className="inline-flex items-center px-7 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold shadow-lg hover:scale-105 hover:from-blue-700 hover:to-green-700 transition-all text-base">
                          Rent <FiHome className="ml-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Buy or Rent?</h2>
          <p className="text-lg text-indigo-100 mb-6">Get the best deals, fast delivery, and expert installation in Mumbai. Click below to talk to our team or book your appliance now.</p>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-indigo-50 text-indigo-700 font-bold rounded-full shadow-lg text-lg transition-all duration-300 hover:scale-105">
            Contact Us <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 