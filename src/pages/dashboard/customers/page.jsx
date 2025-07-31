import React, { useState, useEffect } from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/button';
import SearchInput from '../../../components/ui/SearchInput';
import StatusBadge from '../../../components/ui/StatusBadge';
import FilterBar from '../../../components/ui/FilterBar';
import Avatar from '../../../components/ui/Avatar';
import Modal from '../../../components/ui/Modal';
import FormInput from '../../../components/ui/FormInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers, selectUserData, selectUserLoading, selectUserError, addUser, editUser, deleteUser } from '../../../features/slices/userSlice';
import { fetchRoleById, selectSelectedRole } from '../../../features/slices/roleSlice';

// Utility function to get permissions for a module
function getModulePermission(permissions, moduleName) {
    return permissions?.find(p => p.module === moduleName) || {};
} 

const CustomersPage = () => {
  const dispatch = useDispatch();
  const customers = useSelector(selectUserData);
  const role = useSelector(selectSelectedRole);
  const roleId = localStorage.getItem('role');
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'HX0obee9I27951XIW2GB',
    status: 'active',
    provider: 'manual',
    createdOn: '',
    updatedOn: '',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRoleById(roleId));
  }, [dispatch, roleId]);

  // Filter customers based on search term and filter status
  const filteredCustomers = customers.filter(customer => {
    const name = customer.name || '';
    const email = customer.email || '';
    const address = customer.address || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });


  // Pagination logic
  const totalCustomers = filteredCustomers.length;
  const totalPages = Math.ceil(totalCustomers / pageSize);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset to page 1 on filter/sort/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, sortBy, customers]);

  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Open add modal
  const openAddModal = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      role: 'HX0obee9I27951XIW2GB',
      status: 'active',
      provider: 'manual',
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
    });
    setIsAddModalOpen(true);
  };
  
  // Open edit modal and set current customer data
  const openEditModal = (customer) => {
    setCurrentCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      password: '',
      phone: customer.phone,
      address: customer.address,
      role: customer.role || 'HX0obee9I27951XIW2GB',
      status: customer.status || 'active',
      provider: customer.provider || 'manual',
      createdOn: customer.createdOn || customer.createdAt || '',
      updatedOn: new Date().toISOString(),
    });
    setIsEditModalOpen(true);
  };
  
  // Open delete modal
  const openDeleteModal = (customer) => {
    setCurrentCustomer(customer);
    setIsDeleteModalOpen(true);
  };
  
  // Add a new customer
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(addUser(formData));
    setIsSubmitting(false);
    setIsAddModalOpen(false);
  };
  
  // Update an existing customer
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { password, ...rest } = formData;
    await dispatch(editUser(currentCustomer._id || currentCustomer.id, rest));
    setIsSubmitting(false);
    setIsEditModalOpen(false);
  };
  
  // Delete a customer
  const handleDeleteCustomer = async () => {
    setIsSubmitting(true);
    await dispatch(deleteUser(currentCustomer._id || currentCustomer.id));
    setIsSubmitting(false);
    setIsDeleteModalOpen(false);
  };

  if (loading) {
    return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">Loading customers...</div>;
  }
  if (error) {
    return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  const permissions = role?.permissions || [];
  const customerPerm = getModulePermission(permissions, 'users');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader 
        title="Customers Management" 
        description="Manage your customer database and information"
        actions={
          customerPerm.create && (
            <Button 
              variant="primary" 
              onClick={openAddModal}
            >
              Add Customer
            </Button>
          )
        }
      />

      {/* Filter Bar */}
      <FilterBar>
        <SearchInput
          placeholder="Search customers by name, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
      </FilterBar>

      {/* Customers Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCustomers.map((customer) => (
                <tr key={customer._id || customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar initials={(customer.name || '').charAt(0)} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      status={customer.status} 
                      type="default"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center space-x-2">
                      {customerPerm.update && (
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => openEditModal(customer)}
                      >
                        Edit
                      </Button>
                      )}
                      {customerPerm.delete && (
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => openDeleteModal(customer)}
                      >
                        Delete
                      </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                    No customers found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalCustomers > pageSize && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(totalCustomers === 0 ? 0 : (currentPage - 1) * pageSize + 1)}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, totalCustomers)}</span> of <span className="font-medium">{totalCustomers}</span> customers
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <Button variant="outline" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
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
                  <Button variant="outline" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Add Customer Modal */}
      <Modal.Form
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCustomer}
        title="Add New Customer"
        submitText="Add Customer"
        isLoading={isSubmitting}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            id="add-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <FormInput
            label="Email"
            id="add-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <FormInput
            label="Password"
            id="add-password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <FormInput
            label="Phone"
            id="add-phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <div className="md:col-span-2">
            <FormInput
              label="Address"
              id="add-address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="bg-white"
              type="textarea"
            />
          </div>
          {/* Hidden fields for role, status, provider, createdOn, updatedOn */}
          <input type="hidden" name="role" value={formData.role} />
          <input type="hidden" name="status" value={formData.status} />
          <input type="hidden" name="provider" value={formData.provider} />
          <input type="hidden" name="createdOn" value={formData.createdOn} />
          <input type="hidden" name="updatedOn" value={formData.updatedOn} />
        </div>
      </Modal.Form>

      {/* Edit Customer Modal */}
      <Modal.Form
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateCustomer}
        title={`Edit Customer: ${currentCustomer?.name}`}
        submitText="Update Customer"
        isLoading={isSubmitting}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            id="edit-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <FormInput
            label="Email"
            id="edit-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <FormInput
            label="Phone"
            id="edit-phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <div className="md:col-span-2">
            <FormInput
              label="Address"
              id="edit-address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="bg-white"
              type="textarea"
            />
          </div>
        </div>
        {/* Info section for read-only fields */}
        <div className="mt-4 p-3 bg-gray-50 rounded border text-xs text-gray-700 space-y-1">
          <div><b>Role:</b> {formData.role}</div>
          <div><b>Status:</b> {formData.status}</div>
          <div><b>Provider:</b> {formData.provider}</div>
          <div><b>Created On:</b> {formData.createdOn ? new Date(formData.createdOn).toLocaleString() : ''}</div>
          <div><b>Updated On:</b> {formData.updatedOn ? new Date(formData.updatedOn).toLocaleString() : ''}</div>
        </div>
      </Modal.Form>

      {/* Delete Confirmation Modal */}
      <Modal.Confirm
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCustomer}
        title="Delete Customer"
        message={`Are you sure you want to delete ${currentCustomer?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default CustomersPage;

    