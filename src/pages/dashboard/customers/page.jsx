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
import { useSelector, useDispatch } from 'react-redux';

const CustomersPage = () => {
  const dispatch = useDispatch();
  
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
    phone: '',
    address: '',
    status: 'Active',
    customerType: 'Individual'
  });

  // Sample customer data (will be replaced with API call)
  const [customersData, setCustomersData] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '(123) 456-7890', address: '123 Main St, Anytown', status: 'Active', customerType: 'Individual', joinDate: '2023-05-15' },
    { id: 2, name: 'Emily Johnson', email: 'emily.j@example.com', phone: '(234) 567-8901', address: '456 Oak Ave, Somewhere', status: 'Active', customerType: 'Individual', joinDate: '2023-06-22' },
    { id: 3, name: 'Tech Solutions Inc', email: 'info@techsolutions.com', phone: '(345) 678-9012', address: '789 Business Blvd, Cityville', status: 'Active', customerType: 'Business', joinDate: '2023-04-10' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah.w@example.com', phone: '(456) 789-0123', address: '321 Pine Rd, Townsville', status: 'Inactive', customerType: 'Individual', joinDate: '2023-02-18' },
    { id: 5, name: 'Green Meadows LLC', email: 'contact@greenmeadows.com', phone: '(567) 890-1234', address: '555 Corporate Way, Metropolis', status: 'Active', customerType: 'Business', joinDate: '2023-08-05' },
    { id: 6, name: 'Michael Davis', email: 'mdavis@example.com', phone: '(678) 901-2345', address: '777 Vista Ln, Suburbia', status: 'Active', customerType: 'Individual', joinDate: '2023-03-30' },
    { id: 7, name: 'Sunshine Cafe', email: 'hello@sunshinecafe.com', phone: '(789) 012-3456', address: '888 Culinary Ave, Foodtown', status: 'Inactive', customerType: 'Business', joinDate: '2023-01-12' },
    { id: 8, name: 'Jennifer Taylor', email: 'jtaylor@example.com', phone: '(890) 123-4567', address: '999 Sunset Dr, Beachside', status: 'Active', customerType: 'Individual', joinDate: '2023-07-08' },
  ]);

  // Filter customers based on search term and filter status
  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.joinDate) - new Date(a.joinDate);
    } else if (sortBy === 'oldest') {
      return new Date(a.joinDate) - new Date(b.joinDate);
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Status filter options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' }
  ];
  
  // Customer type options for the form
  const customerTypeOptions = [
    { value: 'Individual', label: 'Individual' },
    { value: 'Business', label: 'Business' }
  ];
  
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
      phone: '',
      address: '',
      status: 'Active',
      customerType: 'Individual'
    });
    setIsAddModalOpen(true);
  };
  
  // Open edit modal and set current customer data
  const openEditModal = (customer) => {
    setCurrentCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status,
      customerType: customer.customerType
    });
    setIsEditModalOpen(true);
  };
  
  // Open delete modal
  const openDeleteModal = (customer) => {
    setCurrentCustomer(customer);
    setIsDeleteModalOpen(true);
  };
  
  // Add a new customer
  const handleAddCustomer = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newCustomer = {
        id: Math.max(0, ...customersData.map(customer => customer.id)) + 1,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0]
      };
      
      setCustomersData([newCustomer, ...customersData]);
      setIsSubmitting(false);
      setIsAddModalOpen(false);
    }, 1000);
  };
  
  // Update an existing customer
  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedCustomers = customersData.map(customer => 
        customer.id === currentCustomer.id ? { ...customer, ...formData } : customer
      );
      
      setCustomersData(updatedCustomers);
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 1000);
  };
  
  // Delete a customer
  const handleDeleteCustomer = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedCustomers = customersData.filter(customer => customer.id !== currentCustomer.id);
      setCustomersData(updatedCustomers);
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
    }, 1000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader 
        title="Customers Management" 
        description="Manage your customer database and information"
        actions={
          <Button 
            variant="primary" 
            onClick={openAddModal}
          >
            Add Customer
          </Button>
        }
      />

      {/* Filter Bar */}
      <FilterBar>
        <SearchInput
          placeholder="Search customers by name, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <FilterBar.Group>
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
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar initials={customer.name.charAt(0)} />
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
                    <div className="text-sm text-gray-900">{customer.customerType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      status={customer.status} 
                      type="default"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center space-x-2">
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => openEditModal(customer)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => openDeleteModal(customer)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {sortedCustomers.length === 0 && (
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
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedCustomers.length}</span> of <span className="font-medium">{customersData.length}</span> customers
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
            label="Phone"
            id="add-phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          
          <FormInput.Select
            label="Customer Type"
            id="add-customer-type"
            name="customerType"
            options={customerTypeOptions}
            value={formData.customerType}
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
            />
          </div>
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
          
          <FormInput.Select
            label="Customer Type"
            id="edit-customer-type"
            name="customerType"
            options={customerTypeOptions}
            value={formData.customerType}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          
          <FormInput.Select
            label="Status"
            id="edit-status"
            name="status"
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' }
            ]}
            value={formData.status}
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
            />
          </div>
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

    