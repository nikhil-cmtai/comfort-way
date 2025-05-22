import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiEdit3, FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { addMaintenanceRequest } from '../../features/slices/maintenanceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedCategory, selectCategoryLoading, selectCategoryError, fetchCategoryByName } from '../../features/slices/categorySlice';
import { fetchProductByCategory, selectProductData, selectProductError, selectProductLoading } from '../../features/slices/productSlice';
import { fetchProductPlansByCategory, selectProductPlanData, selectProductPlanLoading, selectProductPlanError } from '../../features/slices/productPlanSlice';

const ProductRepairForm = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const categoryData = useSelector(selectSelectedCategory);
  const categoryLoading = useSelector(selectCategoryLoading);
  const categoryError = useSelector(selectCategoryError);
  const productData = useSelector(selectProductData);
  const productLoading = useSelector(selectProductLoading);
  const productError = useSelector(selectProductError);
  const productPlanData = useSelector(selectProductPlanData);
  const productPlanLoading = useSelector(selectProductPlanLoading);
  const productPlanError = useSelector(selectProductPlanError);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    issueDescription: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openPlan, setOpenPlan] = useState(null);
  const [selectedPlans, setSelectedPlans] = useState([]);

  useEffect(() => {
    console.log("name", name);
    if (name) {
      dispatch(fetchCategoryByName(name));
    }
  }, [dispatch, name]);

  useEffect(() => {
    if (categoryData && categoryData.id) {
      dispatch(fetchProductByCategory(categoryData.id));
    }
  }, [dispatch, categoryData]);

  useEffect(() => {
    if (categoryData && categoryData.id) {
      dispatch(fetchProductPlansByCategory(categoryData.id));
    }
  }, [dispatch, categoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getPlanQty = (planId) => selectedPlans.find(p => p.id === planId)?.quantity || 0;

  const handleAdd = (planId) => {
    setSelectedPlans(prev => [...prev, { id: planId, quantity: 1 }]);
  };

  const handleQtyChange = (planId, delta) => {
    setSelectedPlans(prev =>
      prev
        .map(p => p.id === planId ? { ...p, quantity: p.quantity + delta } : p)
        .filter(p => p.quantity > 0)
    );
  };

  const handleRemove = (planId) => {
    setSelectedPlans(prev => prev.filter(p => p.id !== planId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      await dispatch(addMaintenanceRequest({ ...formData, selectedPlans }));
      setFormData({ name: '', email: '', phone: '', address: '', category: '', issueDescription: '' });
      setSelectedPlans([]);
      setSuccessMessage('Thank you for your service request! We will contact you shortly to arrange the service.');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setErrorMessage('Failed to submit your request. Please try again.');
      setTimeout(() => setErrorMessage(''), 2000);
    }
  };

  if (!categoryData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Service Not Found</h2>
        <p className="text-gray-600">Sorry, we couldn't find the requested service.</p>
      </div>
    );
  }

  // Background for the hero section - with a gradient overlay
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/gallery/Image${Math.floor(Math.random() * 8) + 1}.jpeg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full h-[250px] sm:h-[300px] flex items-center justify-center text-center shadow-lg"
        style={heroStyle}
      >
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
          <div className="bg-white/90 p-3 rounded-full shadow-lg mb-4">
            <img
              src={categoryData.img}
              alt={categoryData.name}
              className="h-16 w-16 object-contain rounded-full"
              onError={e => { e.target.src = '/images/placeholder.png'; }}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight text-white drop-shadow-lg">
            {categoryData.name} Service Request
          </h1>
          <p className="text-lg font-light opacity-90 max-w-2xl mx-auto text-white drop-shadow">
            Professional {categoryData.description} in Mumbai with Same-Day Service
          </p>
        </div>
      </section>

      {/* Heading above product cards */}
      <section className="pt-8 pb-2 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Get Your Appliance Serviced</h2>
          <p className="text-gray-500 text-base mb-2">Choose the appliance you need service for</p>
        </div>
      </section>

      {/* Plans Section Above Form */}
      <section className="mb-8 w-full">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {productPlanData.map(plan => {
              const qty = getPlanQty(plan.id);
              const isOpen = openPlan === plan.id;
              return (
                <div key={plan.id} className="bg-white rounded-lg shadow border flex flex-col transition-all duration-200">
                  <div className="flex items-stretch">
                    <div className="flex-1 flex flex-col justify-center min-w-0 px-6 py-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.title}</h3>
                      <p className="text-base text-gray-600 mb-0.5">{plan.description}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between py-4 pr-4 min-w-[180px]">
                      <div className="text-xl font-bold text-blue-700 mb-2">₹{plan.price}</div>
                    </div>
                    <button
                        className="my-auto mr-2 flex items-center justify-center w-9 h-9 rounded-lg text-xl transition-all duration-150 focus:outline-none"
                        onClick={() => setOpenPlan(isOpen ? null : plan.id)}
                        aria-label="Toggle features"
                      >
                        {isOpen ? <FiChevronUp className="w-5 h-5 text-black" /> : <FiChevronDown className="w-5 h-5 text-black" />}
                      </button>
                  </div>
                  {isOpen && (
                    <div className="px-6 pb-4">
                      <ul className="text-base text-gray-700 space-y-1">
                        {plan.features && plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-green-500">✔</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section Below Cards */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <h2 className="text-2xl font-bold">Book Your {categoryData.name} Service Now</h2>
              <p className="opacity-90">Fill out the form below and our team will get back to you within 2 hours</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <div className="flex items-center">
                      <FiUser className="absolute left-3 top-1/2 text-indigo-400 w-5 h-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Full Name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="flex items-center">
                      <FiMail className="absolute left-3 top-1/2 text-indigo-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="relative">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="flex items-center">
                      <FiPhone className="absolute left-3 top-1/2 text-indigo-400 w-5 h-5" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Your contact number"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 roundw-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">

                  {/* Issue Description */}
                  <div className="relative">
                    <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 mb-1">Issue Description</label>
                    <div className="flex items-center">
                      <FiEdit3 className="absolute left-3 top-1/4 text-indigo-400 w-5 h-5" />
                      <textarea
                        id="issueDescription"
                        name="issueDescription"
                        rows="6"
                        value={formData.issueDescription}
                        onChange={handleChange}
                        required
                        placeholder="Please describe the issue you're facing with your appliance"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                >
                  Submit Service Request
                  <FiCheckCircle className="ml-2 h-5 w-5" />
                </button>
                {successMessage && (
                  <div className="mt-4 text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm font-medium">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm font-medium">
                    {errorMessage}
                  </div>
                )}
                <p className="mt-3 text-sm text-gray-500">Our support team typically responds within 2 hours during business hours</p>
              </div>
            </form>
          </div>
        </div>
      </section>

            {/* Device Cards Grid Above Form (all products) */}
            <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="w-full overflow-x-auto pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-6 md:gap-8">
          {productData && productData.length > 0 ? (
            productData.map((item, index) => (
              <div key={item.id || index} className="relative bg-white rounded-2xl shadow group flex flex-col items-center overflow-hidden">
                {/* Badge */}
                {item.popular && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow">
                      POPULAR
                    </div>
                  </div>
                )}
                {/* Card Image */}
                <img
                  src={item.img}
                  alt={item.label || item.name}
                  className="w-auto h-48 object-contain rounded-t-2xl"
                  onError={e => { e.target.src = '/images/placeholder.png'; }}
                />
                {/* Card Content */}
                <div className="flex flex-col flex-1 px-4 py-4">
                  <h3 className="font-bold text-xl text-center mt-2 mb-1 text-gray-900">
                    {item.label || item.name}
                  </h3>
                  <p className="text-gray-500 text-center text-sm mb-4">
                    {item.desc}
                  </p>
                  <div className="mt-auto text-center">
                  </div>
                </div>
                {/* Corner Accent */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-indigo-50 rounded-tl-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">No products found for this category.</div>
          )}
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductRepairForm; 