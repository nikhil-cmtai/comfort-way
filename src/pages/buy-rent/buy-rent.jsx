import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiWind, 
  FiDroplet, 
  FiBox, 
  FiZap, 
  FiCoffee, 
  FiHome, 
  FiSliders, 
  FiGrid, 
  FiCpu,
  FiShoppingCart,
  FiArrowRight,
} from 'react-icons/fi';
import {FaFire, FaSnowflake} from 'react-icons/fa';
import BannerBuyRent from '/images/products/buy-rent-banner.jpg';

const categories = [
  {
    key: 'ac',
    name: 'AC (Air Conditioner)',
    icon: <FiWind className="w-8 h-8 text-blue-500" />,
    img: '/images/products/ac-2.webp',
    brands: ['Daikin', 'Voltas', 'LG', 'Samsung', 'Blue Star', 'Hitachi'],
    buy: true,
    rent: true,
  },
  {
    key: 'air-purifier',
    name: 'Air Purifier',
    icon: <FaSnowflake className="w-8 h-8 text-blue-400" />,
    img: '/images/products/Air-purifier.webp',
    brands: ['Philips', 'LG', 'Samsung', 'Blue Star', 'Hitachi'],
    buy: true,
    rent: false,
  },
  {
    key: 'chopper',
    name: 'Chopper',
    icon: <FiGrid className="w-8 h-8 text-pink-500" />, // Grid icon for Chopper
    img: '/images/products/Chopper.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
  },
  {
    key: 'blender',
    name: 'Blender',
    icon: <FiSliders className="w-8 h-8 text-yellow-500" />, // Sliders for blending
    img: '/images/products/Blender.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
  },
  {
    key: 'iron',
    name: 'Iron',
    icon: <FiCpu className="w-8 h-8 text-gray-500" />, // CPU-like for heating device
    img: '/images/products/Iron.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
  },
  {
    key: 'geyser',
    name: 'Geyser',
    icon: <FaFire className="w-8 h-8 text-red-500" />,
    img: '/images/products/Geyser.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
  },
  {
    key: 'boiler',
    name: 'Boiler',
    icon: <FiCoffee className="w-8 h-8 text-orange-500" />, // Coffee icon for Boiler
    img: '/images/products/Boiler.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
  },
  {
    key: 'juicer',
    name: 'Juicer',
    icon: <FiDroplet className="w-8 h-8 text-green-500" />,
    img: '/images/products/Juicer.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
  },
  {
    key: 'microwave',
    name: 'Microwave',
    icon: <FiHome className="w-8 h-8 text-indigo-500" />, // Home icon for kitchen appliance
    img: '/images/products/Microwave.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
  },
  {
    key: 'washing-machine',
    name: 'Washing Machine',
    icon: <FiZap className="w-8 h-8 text-green-500" />,
    img: '/images/products/Washing-machine.webp',
    brands: ['LG', 'Samsung', 'IFB', 'Bosch', 'Whirlpool'],
    buy: true,
    rent: false,
  },
  {
    key: 'chimney',
    name: 'Chimney',
    icon: <FiWind className="w-8 h-8 text-gray-400" />, // Wind icon for airflow
    img: '/images/products/Chimney.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
  },
  {
    key: 'hob',
    name: 'Hob',
    icon: <FaFire className="w-8 h-8 text-red-400" />, // Fire icon for Hob burners
    img: '/images/products/Hob.webp',
    brands: ['Bajaj', 'Havells', 'Panasonic', 'Samsung', 'LG'],
    buy: true,
    rent: false,
  },
  {
    key: 'water-purifier',
    name: 'Water Purifier',
    icon: <FiDroplet className="w-8 h-8 text-indigo-500" />,
    img: '/images/products/Water-purifier.webp',
    brands: ['Kent', 'Aquaguard', 'Livpure', 'Pureit', 'AO Smith'],
    buy: true,
    rent: true,
  },
  {
    key: 'refrigerator',
    name: 'Refrigerator',
    icon: <FiBox className="w-8 h-8 text-purple-500" />,
    img: '/images/products/Refrigerator.webp',
    brands: ['LG', 'Samsung', 'Whirlpool', 'Godrej', 'Haier'],
    buy: true,
    rent: false,
  },
];

export default function BuyRent() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full h-[250px] sm:h-[320px] md:h-[420px] flex items-center justify-center text-center shadow"
        style={{
          background: `url(${BannerBuyRent}) no-repeat center center`,
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight text-white drop-shadow-lg">Buy or Rent Appliances</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto text-white drop-shadow mb-2">
            Mumbai's #1 destination for hassle-free appliance buying and renting. Enjoy instant delivery, expert installation, and total peace of mind.
          </p>
          <span className="inline-block mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg tracking-wider uppercase">Trusted by 10,000+ Mumbai Homes</span>
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Browse Appliances to Buy or Rent</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              One-stop shop for all your home appliance needs. Choose your appliance below to see all available brands and options for buying or renting. Enjoy fast delivery, expert installation, and the best prices in Mumbai.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((cat) => (
              <Link
                to={`/buy-rent/${cat.key}`}
                key={cat.key}
                className={
                  `relative bg-white rounded-2xl shadow-2xl border-2 border-gray-100 hover:border-blue-500 transition-all duration-300 flex flex-col overflow-hidden group hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400`
                  + (cat.key === 'ac' ? ' ring-2 ring-blue-400' : '')
                }
                style={{ textDecoration: 'none' }}
              >
                {/* Best Value Badge for AC */}
                {cat.key === 'ac' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-green-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-20 uppercase tracking-wider animate-bounce">Best Value</div>
                )}
                <div className="flex flex-col items-center p-6 cursor-pointer">
                  <img src={cat.img} alt={cat.name} className="h-20 w-20 object-contain mb-3 drop-shadow-xl rounded-xl group-hover:scale-110 transition-transform duration-300" />
                  {cat.icon}
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1 group-hover:text-indigo-700 transition-colors duration-300">{cat.name}</h3>
                  <span className="text-xs text-blue-600 font-semibold flex items-center gap-1">See Details <FiArrowRight className="ml-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">Why Choose ComfortWay?</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {/* Card 1 */}
            <div className="flex-1 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 group border-t-4 border-blue-400">
              <FiArrowRight className="w-12 h-12 text-indigo-600 mb-4 group-hover:animate-bounce" />
              <h3 className="font-bold text-xl mb-2 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600 text-base">Get your appliance delivered and installed within 24 hours in Mumbai. No waiting, no hassle.</p>
            </div>
            {/* Card 2 */}
            <div className="flex-1 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 group border-t-4 border-green-400">
              <FiShoppingCart className="w-12 h-12 text-blue-600 mb-4 group-hover:animate-bounce" />
              <h3 className="font-bold text-xl mb-2 text-gray-800">Genuine Brands</h3>
              <p className="text-gray-600 text-base">We only offer trusted, top brands with full manufacturer warranty and after-sales support.</p>
            </div>
            {/* Card 3 */}
            <div className="flex-1 bg-gradient-to-br from-green-100 to-indigo-100 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 group border-t-4 border-indigo-400">
              <FiHome className="w-12 h-12 text-green-600 mb-4 group-hover:animate-bounce" />
              <h3 className="font-bold text-xl mb-2 text-gray-800">Expert Installation</h3>
              <p className="text-gray-600 text-base">Certified technicians ensure safe, professional setup every time. We handle everything for you.</p>
            </div>
            {/* Card 4 */}
            <div className="flex-1 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 group border-t-4 border-purple-400">
              <FiSliders className="w-12 h-12 text-purple-600 mb-4 group-hover:animate-bounce" />
              <h3 className="font-bold text-xl mb-2 text-gray-800">Flexible Plans</h3>
              <p className="text-gray-600 text-base">Choose to buy or rent, with easy upgrades, no hidden charges, and plans for every budget.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">How It Works</h2>
          {/* Horizontal Stepper */}
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 mt-12">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-blue-200 to-green-200 -z-10" style={{transform: 'translateY(-50%)'}}></div>
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-1 z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4 border-4 border-white">1</div>
              <div className="bg-white rounded-xl shadow-lg p-6 w-56 hover:scale-105 transition-transform duration-300">
                <FiGrid className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Select Your Appliance</h3>
                <p className="text-gray-600 text-base">Explore our wide range of appliances and brands. Find the perfect fit for your home and lifestyle.</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1 z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4 border-4 border-white">2</div>
              <div className="bg-white rounded-xl shadow-lg p-6 w-56 hover:scale-105 transition-transform duration-300">
                <FiSliders className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Choose Buy or Rent</h3>
                <p className="text-gray-600 text-base">Pick the plan that fits your needs. Enjoy total flexibility, transparent pricing, and no long-term lock-ins.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1 z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4 border-4 border-white">3</div>
              <div className="bg-white rounded-xl shadow-lg p-6 w-56 hover:scale-105 transition-transform duration-300">
                <FiHome className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Get Delivered & Installed</h3>
                <p className="text-gray-600 text-base">We deliver and install at your doorstep, fast and hassle-free. Sit back and relax while we do the work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Need Help CTA Section */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Help Deciding?</h2>
          <p className="text-lg text-indigo-100 mb-8">Not sure which appliance or plan is right for you? Our experts are here to help you choose the best option for your home and budget.</p>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-indigo-50 text-indigo-700 font-bold rounded-full shadow-lg text-lg transition-all duration-300 hover:scale-105">
            Talk to an Expert <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
} 