import React, { useState, useEffect } from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/button';
import SearchInput from '../../../components/ui/SearchInput';
import StatusBadge from '../../../components/ui/StatusBadge';
import FilterBar from '../../../components/ui/FilterBar';
import Select from '../../../components/ui/Select';
import Avatar from '../../../components/ui/Avatar';
import Modal from '../../../components/ui/Modal';
import FormInput from '../../../components/ui/FormInput';
import { FiShield, FiUsers, FiHome, FiZap, FiCheckSquare, FiInfo } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';

const PlansPage = () => {
  const dispatch = useDispatch();
  
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // Sample plans data
  const plans = [
    { id: 1, name: '1 BHK', price: 5999, icon: <FiHome className="w-6 h-6 text-indigo-600" /> },
    { id: 2, name: '2 BHK', price: 7799, icon: <FiUsers className="w-6 h-6 text-blue-600" /> },
    { id: 3, name: '3 BHK', price: 9599, icon: <FiZap className="w-6 h-6 text-purple-600" /> },
    { id: 4, name: '4 BHK', price: 11999, icon: <FiShield className="w-6 h-6 text-yellow-500" /> },
    { id: 5, name: 'Custom Plan', price: 0, icon: <FiShield className="w-6 h-6 text-green-600" /> },
  ];
  
  // Sample subscription data
  const [subscriptionsData, setSubscriptionsData] = useState([
    { 
      id: 1, 
      customerId: 1, 
      customerName: 'John Smith', 
      customerEmail: 'john.smith@example.com',
      planId: 2, 
      status: 'Active', 
      startDate: '2023-05-15', 
      endDate: '2024-05-14',
      price: 7799,
      paymentStatus: 'Paid',
      appliances: ['AC', 'Refrigerator', 'Washing Machine', 'Water Purifier', 'Microwave']
    },
    { 
      id: 2, 
      customerId: 3, 
      customerName: 'Tech Solutions Inc', 
      customerEmail: 'info@techsolutions.com',
      planId: 4, 
      status: 'Active', 
      startDate: '2023-07-10', 
      endDate: '2024-07-09',
      price: 11999,
      paymentStatus: 'Paid',
      appliances: ['AC', 'Refrigerator', 'Washing Machine', 'Water Purifier', 'Microwave', 'Geyser', 'Dishwasher', 'Oven']
    },
    { 
      id: 3, 
      customerId: 5, 
      customerName: 'Green Meadows LLC', 
      customerEmail: 'contact@greenmeadows.com',
      planId: 3, 
      status: 'Active', 
      startDate: '2023-06-01', 
      endDate: '2024-05-31',
      price: 9599,
      paymentStatus: 'Paid',
      appliances: ['AC', 'Refrigerator', 'Washing Machine', 'Water Purifier', 'Microwave', 'Geyser']
    },
    { 
      id: 4, 
      customerId: 2, 
      customerName: 'Emily Johnson', 
      customerEmail: 'emily.j@example.com',
      planId: 1, 
      status: 'Active', 
      startDate: '2023-04-20', 
      endDate: '2024-04-19',
      price: 5999,
      paymentStatus: 'Paid',
      appliances: ['AC', 'Refrigerator', 'Washing Machine']
    },
    { 
      id: 5, 
      customerId: 7, 
      customerName: 'Sunshine Cafe', 
      customerEmail: 'hello@sunshinecafe.com',
      planId: 5, 
      status: 'Expired', 
      startDate: '2022-12-15', 
      endDate: '2023-12-14',
      price: 8599,
      paymentStatus: 'Paid',
      appliances: ['AC', 'Refrigerator', 'Water Purifier', 'Oven', 'Hob', 'Microwave']
    },
    { 
      id: 6, 
      customerId: 4, 
      customerName: 'Sarah Wilson', 
      customerEmail: 'sarah.w@example.com',
      planId: 2, 
      status: 'Pending', 
      startDate: '2023-09-01', 
      endDate: '2024-08-31',
      price: 7799,
      paymentStatus: 'Due',
      appliances: ['AC', 'Refrigerator', 'Washing Machine', 'Water Purifier', 'Microwave']
    },
    { 
      id: 7, 
      customerId: 8, 
      customerName: 'Jennifer Taylor', 
      customerEmail: 'jtaylor@example.com',
      planId: 2, 
      status: 'Active', 
      startDate: '2023-08-15', 
      endDate: '2024-08-14',
      price: 7799,
      paymentStatus: 'Paid',
      appliances: ['AC', 'Refrigerator', 'Washing Machine', 'Water Purifier', 'Microwave']
    },
    { 
      id: 8, 
      customerId: 6, 
      customerName: 'Michael Davis', 
      customerEmail: 'mdavis@example.com',
      planId: 3, 
      status: 'Cancelled', 
      startDate: '2023-02-10', 
      endDate: '2024-02-09',
      price: 9599,
      paymentStatus: 'Refunded',
      appliances: ['AC', 'Refrigerator', 'Washing Machine', 'Water Purifier', 'Microwave', 'Geyser']
    },
  ]);

  // Filter subscriptions based on search term and filters
  const filteredSubscriptions = subscriptionsData.filter(subscription => {
    const matchesSearch = subscription.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          subscription.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlan = filterPlan === 'all' || subscription.planId === parseInt(filterPlan);
    const matchesStatus = filterStatus === 'all' || subscription.status === filterStatus;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  // Sort subscriptions
  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.startDate) - new Date(a.startDate);
    } else if (sortBy === 'oldest') {
      return new Date(a.startDate) - new Date(b.startDate);
    } else if (sortBy === 'name') {
      return a.customerName.localeCompare(b.customerName);
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    return 0;
  });

  // Plan filter options
  const planOptions = [
    { value: 'all', label: 'All Plans' },
    ...plans.map(plan => ({
      value: plan.id.toString(),
      label: plan.name
    }))
  ];

  // Status filter options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Expired', label: 'Expired' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Customer Name A-Z' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' }
  ];
  
  // View subscription details
  const viewSubscriptionDetails = (subscription) => {
    setSelectedSubscription({
      ...subscription,
      planName: plans.find(plan => plan.id === subscription.planId)?.name || 'Unknown Plan'
    });
    setIsViewModalOpen(true);
  };

  // Get plan details by ID
  const getPlanById = (planId) => {
    return plans.find(plan => plan.id === planId) || { name: 'Unknown Plan', icon: null };
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader 
        title="Plan Subscriptions" 
        description="View and manage customer plan subscriptions"
      />

      {/* Filter Bar */}
      <FilterBar>
        <SearchInput
          placeholder="Search customers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <FilterBar.Group>
          <Select
            options={planOptions}
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
          />
          
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          />
          
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />
        </FilterBar.Group>
      </FilterBar>

      {/* Subscriptions Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription Period
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedSubscriptions.map((subscription) => {
                const plan = getPlanById(subscription.planId);
                return (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar initials={subscription.customerName.charAt(0)} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{subscription.customerName}</div>
                          <div className="text-sm text-gray-500">{subscription.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-2">
                          {plan.icon}
                        </div>
                        <div className="text-sm text-gray-900">{plan.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{subscription.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(subscription.startDate)}</div>
                      <div className="text-sm text-gray-500">to {formatDate(subscription.endDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge 
                        status={subscription.status}
                        type={
                          subscription.status === 'Active' ? 'default' :
                          subscription.status === 'Pending' ? 'default' :
                          subscription.status === 'Expired' ? 'default' :
                          'default'
                        }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge 
                        status={subscription.paymentStatus}
                        type={
                          subscription.paymentStatus === 'Paid' ? 'default' :
                          subscription.paymentStatus === 'Due' ? 'priority' :
                          subscription.paymentStatus === 'Refunded' ? 'stock' :
                          'default'
                        }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => viewSubscriptionDetails(subscription)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                )
              })}
              
              {sortedSubscriptions.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                    No subscriptions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedSubscriptions.length}</span> of <span className="font-medium">{subscriptionsData.length}</span> subscriptions
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button variant="outline" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>
                <Button variant="outline" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </Button>
                <Button variant="primary" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  2
                </Button>
                <Button variant="outline" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </Button>
                <Button variant="outline" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </Card>

      {/* Subscription Details Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Subscription Details"
        size="md"
      >
        {selectedSubscription && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="mr-3">
                  {getPlanById(selectedSubscription.planId).icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedSubscription.planName}</h3>
                  <p className="text-sm text-gray-600">ID: #{selectedSubscription.id}</p>
                </div>
              </div>
              <StatusBadge 
                status={selectedSubscription.status}
                className="ml-2"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h4>
                <div className="flex items-center mb-2">
                  <Avatar 
                    initials={selectedSubscription.customerName.charAt(0)} 
                    size="sm"
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">{selectedSubscription.customerName}</span>
                </div>
                <p className="text-sm text-gray-600">{selectedSubscription.customerEmail}</p>
                <p className="text-sm text-gray-600 mt-1">ID: #{selectedSubscription.customerId}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Subscription Details</h4>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Start Date:</span> {formatDate(selectedSubscription.startDate)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">End Date:</span> {formatDate(selectedSubscription.endDate)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Price:</span> ₹{selectedSubscription.price}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Payment Status:</span> 
                  <StatusBadge 
                    status={selectedSubscription.paymentStatus}
                    type={selectedSubscription.paymentStatus === 'Due' ? 'priority' : 'default'}
                    className="ml-2"
                  />
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Covered Appliances</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {selectedSubscription.appliances.map((appliance, index) => (
                  <div key={index} className="flex items-center">
                    <FiCheckSquare className="text-green-500 mr-1" />
                    <span className="text-sm text-gray-700">{appliance}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PlansPage;

