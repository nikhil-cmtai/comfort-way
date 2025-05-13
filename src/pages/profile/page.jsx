import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiUser, FiMail, FiPhone, FiEdit, FiChevronRight, FiSettings, FiShield, FiClock, FiCalendar, FiMapPin, FiTool, FiAward, FiCreditCard } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Avatar from '../../components/ui/Avatar';
import PageHeader from '../../components/ui/PageHeader';
import { fetchUserById, selectSelectedUser } from '../../features/slices/userSlice';
import {fetchServiceHistoriesByUserId, selectServiceHistoryData, selectServiceHistoryError, selectServiceHistoryLoading} from '../../features/slices/serviceHistorySlice';
import { fetchPurchasedPlansByUserId, selectSelectedPurchasedPlan, selectPurchasedPlanError, selectPurchasedPlanLoading } from '../../features/slices/purchasedPlanSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(selectSelectedUser);
  const serviceHistory = useSelector(selectServiceHistoryData);
  const isLoading = useSelector(selectServiceHistoryLoading);
  const purchasedPlan = useSelector(selectSelectedPurchasedPlan);
  const purchasedPlanLoading = useSelector(selectPurchasedPlanLoading);
  const purchasedPlanError = useSelector(selectPurchasedPlanError);
  const error = useSelector(selectServiceHistoryError);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(fetchUserById(userId));
      dispatch(fetchServiceHistoriesByUserId(userId));
      dispatch(fetchPurchasedPlansByUserId(userId));
    }
  }, [dispatch]);


  useEffect(() => {
    if (selectedUser) {
      setFormData({
        displayName: selectedUser.name || '',
        email: selectedUser.email || '',
        phoneNumber: selectedUser.phoneNumber || '',
        address: selectedUser.address || ''
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    setIsEditing(false);
  };

  const stats = [
    {
      id: 1,
      name: 'Total Services',
      value: serviceHistory.length,
      icon: <FiTool className="h-6 w-6" />
    },
    {
      id: 2,
      name: 'Completed Services',
      value: serviceHistory.filter(service => service.status == 'completed').length,
      icon: <FiAward className="h-6 w-6" />
    },
    {
      id: 3,
      name: 'In Progress',
      value: serviceHistory.filter(service => service.status == 'in-progress').length,
      icon: <FiClock className="h-6 w-6" />
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="p-8 rounded-xl bg-white/80 backdrop-blur-md shadow-xl">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="text-blue-600 font-medium mt-4">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const renderProfileInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 relative">
        <div className="absolute top-0 right-0 p-4">
          <button 
            onClick={() => setIsEditing(true)}
            className="text-white hover:text-blue-100 flex items-center gap-1 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1.5 transition-all"
          >
            <FiEdit className="h-4 w-4" />
            <span>Edit</span>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
        <p className="text-blue-100 text-sm">Your personal details as stored in our system</p>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
              <FiUser className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="font-medium text-gray-900 text-lg">{selectedUser?.name || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
              <FiMail className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium text-gray-900 text-lg">{selectedUser?.email || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
              <FiPhone className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="font-medium text-gray-900 text-lg">{selectedUser?.phoneNumber || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
              <FiMapPin className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <p className="font-medium text-gray-900 text-lg">{selectedUser?.address || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderEditForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Edit Profile</h2>
        <p className="text-indigo-100 text-sm">Update your personal information</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="(123) 456-7890"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Your complete address"
          />
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-6 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md hover:shadow-lg transition-all focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );

  const renderServiceHistory = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className="bg-blue-100 h-14 w-14 rounded-full flex items-center justify-center text-blue-600">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Service History</h2>
          <p className="text-blue-100 text-sm">Track all your past and ongoing service requests</p>
        </div>

        <div className="divide-y">
          {serviceHistory.length > 0 ? (
            serviceHistory.map((service) => (
              <motion.div 
                key={service.id} 
                className="p-6 hover:bg-gray-50 transition-all cursor-pointer"
                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.8)' }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4">
                    <div className="rounded-xl overflow-hidden h-32 md:h-40 bg-gray-100">
                      <img src={service.image} alt={service.service} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <div className="flex flex-wrap justify-between items-center mb-3">
                      <h3 className="font-bold text-xl text-gray-800">{service.service}</h3>
                      <span 
                        className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                          service.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : service.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {service.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                      <div className="flex items-center">
                        <FiCalendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium ml-1">{service.date}</span>
                      </div>
                      <div className="flex items-center">
                        <FiUser className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-500">Technician:</span>
                        <span className="font-medium ml-1">{service.technician}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{service.details}</p>
                    
                    <div className="flex justify-end">
                      <button className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg flex items-center transition-all">
                        View Details
                        <FiChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-16 text-center text-gray-500">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-600">You haven't requested any services yet.</p>
              <p className="text-sm text-gray-500 mt-1">When you request a service, it will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader
            title={selectedUser?.name ? `Welcome, ${selectedUser.name}` : 'My Profile'}
          description="Manage your account, view your service history, and update your details."
         
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-center">
                <Avatar
                  initials={selectedUser?.name ? selectedUser.name.charAt(0) : 'U'}
                  src={selectedUser?.photoURL}
                  size="lg"
                  className="mb-2 shadow-lg mx-auto"
                />
                <h2 className="font-bold text-white text-xl mt-2">{selectedUser?.name || 'User'}</h2>
                  <p className="text-blue-100 mt-1">{selectedUser?.email || 'No email'}</p>
                <div className="mt-2 inline-block px-3 py-1 bg-white/20 rounded-full text-xs text-white">
                  Premium Member
                </div>
              </div>
              <div className="border-b border-gray-100 my-2 mx-4"></div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <nav className="space-y-1">
                  <motion.button 
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === 'profile' 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium shadow' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiUser className="w-5 h-5" />
                    <span>Profile</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveTab('services')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === 'services' 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium shadow' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiClock className="w-5 h-5" />
                    <span>Service History</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveTab('managePlan')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === 'managePlan' 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium shadow' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiCreditCard className="w-5 h-5" />
                    <span>Manage Plan</span>
                  </motion.button>
                </nav>
                <div className="mt-8">
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 font-medium transition-all"
                    onClick={() => window.location.href = '/logout'}
                  >
                    <FiUser className="w-5 h-5" /> Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <>
                {isEditing ? renderEditForm() : renderProfileInfo()}
              </>
            )}
            
            {activeTab === 'services' && renderServiceHistory()}

            {activeTab === 'managePlan' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden p-8 flex flex-col items-center justify-center min-h-[300px]"
              >
                <FiCreditCard className="w-12 h-12 text-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Your Plan</h2>
                {purchasedPlanLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                    <p className="text-blue-500">Loading plan details...</p>
                  </div>
                ) : purchasedPlanError ? (
                  <p className="text-red-500">{purchasedPlanError}</p>
                ) : !purchasedPlan ? (
                  <p className="text-gray-500">No plan found for your account.</p>
                ) : (
                  <div className="w-full max-w-md bg-blue-50 rounded-xl shadow p-6 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-blue-700">{purchasedPlan.planName || 'Plan'}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${purchasedPlan.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>{purchasedPlan.active ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-gray-700">
                        <span>Price:</span>
                        <span className="font-medium">₹{purchasedPlan.price}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Period:</span>
                        <span className="font-medium">{purchasedPlan.period || purchasedPlan.duration || '-'} {purchasedPlan.period ? '' : 'months'}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Amount Paid:</span>
                        <span className="font-medium">₹{purchasedPlan.amount || purchasedPlan.price}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Start Date:</span>
                        <span className="font-medium">{purchasedPlan.startDate ? new Date(purchasedPlan.startDate).toLocaleDateString() : '-'}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>End Date:</span>
                        <span className="font-medium">{purchasedPlan.endDate ? new Date(purchasedPlan.endDate).toLocaleDateString() : '-'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
