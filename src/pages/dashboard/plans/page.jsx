import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../components/ui/PageHeader';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/button';
import SearchInput from '../../../components/ui/SearchInput';
import StatusBadge from '../../../components/ui/StatusBadge';
import FilterBar from '../../../components/ui/FilterBar';
import Select from '../../../components/ui/Select';
import Avatar from '../../../components/ui/Avatar';
import Modal from '../../../components/ui/Modal';
import {
  fetchPurchasedPlanData,
  selectPurchasedPlanData,
  selectPurchasedPlanLoading,
  selectPurchasedPlanError
} from '../../../features/slices/purchasedPlanSlice';
import {
  fetchProtectionData,
  selectProtectionData,
  selectProtectionLoading,
  selectProtectionError,
  addProtectionPlan,
  editProtectionPlan,
  deleteProtectionPlan
} from '../../../features/slices/protectionSlice';
import { fetchRoleById, selectSelectedRole } from '../../../features/slices/roleSlice';

// Utility function to get permissions for a module
function getModulePermission(permissions, moduleName) {
    return permissions?.find(p => p.module === moduleName) || {};
} 

const PlansPage = () => {
  const dispatch = useDispatch();
  const role = useSelector(selectSelectedRole);
  const roleId = localStorage.getItem('role');
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [planForm, setPlanForm] = useState({ name: '', price: '', bhk: '' });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch live data on mount
  useEffect(() => {
    dispatch(fetchPurchasedPlanData());
    dispatch(fetchProtectionData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRoleById(roleId));
  }, [dispatch, roleId]);

  // Selectors for live data
  const purchasedPlans = useSelector(selectPurchasedPlanData) || [];
  const purchasedPlansLoading = useSelector(selectPurchasedPlanLoading);
  const purchasedPlansError = useSelector(selectPurchasedPlanError);
  const protectionPlans = useSelector(selectProtectionData) || [];
  const protectionPlansLoading = useSelector(selectProtectionLoading);
  const protectionPlansError = useSelector(selectProtectionError);

  // Helper: get plan by id
  const getPlanById = (planId) => {
    return protectionPlans.find(plan => plan.id === planId) || { name: 'Unknown Plan', price: 0 };
  };

  // Filter subscriptions based on search term and filters
  const filteredSubscriptions = purchasedPlans.filter(subscription => {
    const plan = getPlanById(subscription.planId);
    const matchesSearch = (subscription.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPlan = filterPlan === 'all' || subscription.planId === filterPlan;
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
      return getPlanById(b.planId).price - getPlanById(a.planId).price;
    } else if (sortBy === 'price-low') {
      return getPlanById(a.planId).price - getPlanById(b.planId).price;
    }
    return 0;
  });

  // Pagination logic
  const totalSubscriptions = sortedSubscriptions.length;
  const totalPages = Math.ceil(totalSubscriptions / pageSize);
  const paginatedSubscriptions = sortedSubscriptions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset to page 1 if filters/search change and currentPage is out of range
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Plan filter options
  const planOptions = [
    { value: 'all', label: 'All Plans' },
    ...protectionPlans.map(plan => ({ value: plan.id, label: plan.bhk || plan.name || 'Unnamed Plan' }))
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
    const plan = getPlanById(subscription.planId);
    setSelectedSubscription({
      ...subscription,
      planName: plan.bhk || plan.name || 'Unknown Plan',
      planPrice: plan.price || 0
    });
    setIsViewModalOpen(true);
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Add/Edit Modal Handlers
  const openAddModal = () => {
    setModalMode('add');
    setPlanForm({ name: '', price: '', bhk: '' });
    setIsAddEditModalOpen(true);
    setModalError('');
  };
  const openEditModal = (plan) => {
    setModalMode('edit');
    setSelectedPlan(plan);
    setPlanForm({ name: plan.name || '', price: plan.price || '', bhk: plan.bhk || '' });
    setIsAddEditModalOpen(true);
    setModalError('');
  };
  const handlePlanFormChange = (e) => {
    const { name, value } = e.target;
    setPlanForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddEditSubmit = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError('');
    try {
      if (modalMode === 'add') {
        await dispatch(addProtectionPlan(planForm));
      } else if (modalMode === 'edit' && selectedPlan) {
        await dispatch(editProtectionPlan({ id: selectedPlan.id, ...planForm }));
      }
      setIsAddEditModalOpen(false);
    } catch (err) {
      setModalError('Failed to save plan.');
    } finally {
      setModalLoading(false);
    }
  };
  // Delete Modal Handlers
  const openDeleteModal = (plan) => {
    setSelectedPlan(plan);
    setIsDeleteModalOpen(true);
  };
  const handleDelete = async () => {
    setModalLoading(true);
    setModalError('');
    try {
      await dispatch(deleteProtectionPlan(selectedPlan.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      setModalError('Failed to delete plan.');
    } finally {
      setModalLoading(false);
    }
  };

  // Loading and error states
  if (purchasedPlansLoading || protectionPlansLoading) {
    return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-3 text-gray-600">Loading subscriptions...</p>
      </div>
    </div>;
  }
  if (purchasedPlansError || protectionPlansError) {
    return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center bg-red-100 rounded-xl p-6 max-w-md">
        <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="mt-2 text-lg font-semibold text-red-800">Error</h2>
        <p className="mt-1 text-red-600">{purchasedPlansError || protectionPlansError}</p>
      </div>
    </div>;
  }

  const permissions = role?.permissions || [];
  const planPerm = getModulePermission(permissions, 'plans');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <PageHeader 
          title="Plan Subscriptions" 
          description="View and manage customer plan subscriptions"
        />
        {planPerm.create && (
        <Button 
          variant="primary"
          onClick={openAddModal}
        >
          + Add Plan
        </Button>
        )}
      </div>

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
              {paginatedSubscriptions.map((subscription) => {
                const plan = getPlanById(subscription.planId);
                return (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar initials={subscription.customerName?.charAt(0) || '?'} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{subscription.customerName}</div>
                          <div className="text-sm text-gray-500">{subscription.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{plan.bhk || plan.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{plan.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(subscription.startDate)}</div>
                      <div className="text-sm text-gray-500">to {formatDate(subscription.endDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge 
                        status={subscription.status}
                        type="default"
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                      {planPerm.read && (
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => viewSubscriptionDetails(subscription)}
                      >
                        View Details
                      </Button>
                      )}
                      {planPerm.update && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(plan)}
                      >
                        Edit
                      </Button>
                      )}
                      {planPerm.delete && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => openDeleteModal(plan)}
                      >
                        Delete
                      </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
              
              {paginatedSubscriptions.length === 0 && (
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
            <Button 
              variant="outline" 
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >Previous</Button>
            <Button 
              variant="outline" 
              size="sm"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >Next</Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                {totalSubscriptions === 0 ? (
                  <>Showing 0 of 0 subscriptions</>
                ) : (
                  <>Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, totalSubscriptions)}</span> of <span className="font-medium">{totalSubscriptions}</span> subscriptions</>
                )}
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button 
                  variant="outline" 
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <span className="sr-only">Previous</span>
                  {'<'}
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? 'primary' : 'outline'}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  <span className="sr-only">Next</span>
                  {'>'}
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
                    initials={selectedSubscription.customerName?.charAt(0) || '?'} 
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
                  <span className="font-medium">Price:</span> ₹{selectedSubscription.planPrice}
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
            
            {selectedSubscription.appliances && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Covered Appliances</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedSubscription.appliances.map((appliance, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-green-600 font-bold mr-1">✓</span>
                      <span className="text-sm text-gray-700">{appliance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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

      {/* Add/Edit Plan Modal */}
      <Modal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Plan' : 'Edit Plan'}
        size="md"
      >
        <form onSubmit={handleAddEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
            <input
              type="text"
              name="name"
              value={planForm.name}
              onChange={handlePlanFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={planForm.price}
              onChange={handlePlanFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">BHK/Plan Type</label>
            <input
              type="text"
              name="bhk"
              value={planForm.bhk}
              onChange={handlePlanFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {modalError && <div className="text-red-600 text-sm">{modalError}</div>}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddEditModalOpen(false)} type="button">Cancel</Button>
            <Button variant="primary" type="submit" disabled={modalLoading}>{modalMode === 'add' ? 'Add Plan' : 'Save Changes'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Plan Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Plan"
        size="sm"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this plan?</p>
          {modalError && <div className="text-red-600 text-sm">{modalError}</div>}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} disabled={modalLoading}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PlansPage;

