import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, updateUser } from '../../features/slices/authSlice';
import { FiUser, FiMail, FiPhone, FiHome, FiEdit, FiChevronRight, FiSettings, FiShield, FiClock, FiCalendar, FiMapPin, FiTool, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || ''
      });
    }
  }, [user]);

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

  // Mock service history data (this would come from an API in a real app)
  const serviceHistory = [
    {
      id: '1',
      service: 'AC Repair',
      date: '2023-12-15',
      status: 'Completed',
      technician: 'John Smith',
      details: 'Fixed compressor and replaced filter',
      image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGFpcmNvbmRpdGlvbmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      service: 'Refrigerator Maintenance',
      date: '2024-02-20',
      status: 'Completed',
      technician: 'Sarah Johnson',
      details: 'Regular maintenance and cleaning',
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVmcmlnZXJhdG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '3',
      service: 'Washing Machine Repair',
      date: '2024-04-10',
      status: 'In Progress',
      technician: 'Mike Davis',
      details: 'Replacing motor belt',
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FzaGluZyUyMG1hY2hpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    }
  ];

  // Stats for dashboard view
  const stats = [
    { id: 1, name: 'Total Services', value: '7', icon: <FiTool className="h-6 w-6" /> },
    { id: 2, name: 'Active Requests', value: '1', icon: <FiClock className="h-6 w-6" /> },
    { id: 3, name: 'Completed', value: '6', icon: <FiAward className="h-6 w-6" /> }
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
              <p className="font-medium text-gray-900 text-lg">{user?.displayName || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
              <FiMail className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium text-gray-900 text-lg">{user?.email || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
              <FiPhone className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="font-medium text-gray-900 text-lg">{user?.phoneNumber || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
              <FiMapPin className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <p className="font-medium text-gray-900 text-lg">{user?.address || 'Not provided'}</p>
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
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-8"
        >
          My Profile
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-center">
                <div className="h-24 w-24 rounded-full mx-auto bg-white/20 backdrop-blur-lg flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {user?.displayName ? user.displayName.charAt(0) : 'U'}
                </div>
                <h2 className="font-bold text-white text-xl mt-4">{user?.displayName || 'User'}</h2>
                <p className="text-blue-100 mt-1">{user?.email || 'No email'}</p>
                <div className="mt-4 inline-block px-3 py-1 bg-white/20 rounded-full text-xs text-white">
                  Premium Member
                </div>
              </div>
              
              <div className="p-4">
                <nav className="space-y-1">
                  <motion.button 
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === 'profile' 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium' 
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
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiClock className="w-5 h-5" />
                    <span>Service History</span>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === 'settings' 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiSettings className="w-5 h-5" />
                    <span>Settings</span>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === 'security' 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiShield className="w-5 h-5" />
                    <span>Security</span>
                  </motion.button>
                </nav>
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
            
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
                  <p className="text-blue-100 text-sm">Manage your account preferences</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">Account settings and preferences will be available here.</p>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Security</h2>
                  <p className="text-blue-100 text-sm">Manage your account security</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">Security settings and password change options will be available here.</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
