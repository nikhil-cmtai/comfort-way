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
import { fetchLeadData, selectLeadData, selectLeadLoading, selectLeadError } from '../../../features/slices/leadSlice';

const Leads = () => {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeadData);
  const loading = useSelector(selectLeadLoading);
  const error = useSelector(selectLeadError);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    status: 'New'
  });

  useEffect(() => {
    dispatch(fetchLeadData());
  }, [dispatch]);

  // Sample leads data
  const [leadsData, setLeadsData] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '(123) 456-7890', service: 'AC Installation', status: 'New', date: '2023-10-25' },
    { id: 2, name: 'Emily Johnson', email: 'emily.j@example.com', phone: '(234) 567-8901', service: 'Refrigerator Repair', status: 'Contacted', date: '2023-10-24' },
    { id: 3, name: 'Michael Brown', email: 'mbrown@example.com', phone: '(345) 678-9012', service: 'Washing Machine', status: 'Qualified', date: '2023-10-23' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah.w@example.com', phone: '(456) 789-0123', service: 'Dishwasher', status: 'New', date: '2023-10-22' },
    { id: 5, name: 'David Miller', email: 'dmiller@example.com', phone: '(567) 890-1234', service: 'Microwave Repair', status: 'Contacted', date: '2023-10-21' },
    { id: 6, name: 'Jessica Davis', email: 'jdavis@example.com', phone: '(678) 901-2345', service: 'Oven Installation', status: 'Qualified', date: '2023-10-20' },
    { id: 7, name: 'Thomas Martinez', email: 'tmartinez@example.com', phone: '(789) 012-3456', service: 'Water Heater', status: 'Contacted', date: '2023-10-19' },
    { id: 8, name: 'Jennifer Taylor', email: 'jtaylor@example.com', phone: '(890) 123-4567', service: 'AC Repair', status: 'New', date: '2023-10-18' },
  ]);

  // Filter leads based on search term and filter status
  const filteredLeads = leadsData.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Sort leads
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Status filter options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' }
  ];
  
  // Service options for the form
  const serviceOptions = [
    { value: 'AC Installation', label: 'AC Installation' },
    { value: 'AC Repair', label: 'AC Repair' },
    { value: 'Refrigerator Repair', label: 'Refrigerator Repair' },
    { value: 'Washing Machine', label: 'Washing Machine' },
    { value: 'Dishwasher', label: 'Dishwasher' },
    { value: 'Microwave Repair', label: 'Microwave Repair' },
    { value: 'Oven Installation', label: 'Oven Installation' },
    { value: 'Water Heater', label: 'Water Heater' }
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
      service: '',
      status: 'New'
    });
    setIsAddModalOpen(true);
  };
  
  // Open edit modal and set current lead data
  const openEditModal = (lead) => {
    setCurrentLead(lead);
    setFormData({
      status: lead.status,
    });
    setIsEditModalOpen(true);
  };
  
  // Open delete modal
  const openDeleteModal = (lead) => {
    setCurrentLead(lead);
    setIsDeleteModalOpen(true);
  };
  
  // Add a new lead
  const handleAddLead = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newLead = {
        id: Math.max(0, ...leadsData.map(lead => lead.id)) + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      
      setLeadsData([newLead, ...leadsData]);
      setIsSubmitting(false);
      setIsAddModalOpen(false);
    }, 1000);
  };
  
  // Update an existing lead
  const handleUpdateLead = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedLeads = leadsData.map(lead => 
        lead.id === currentLead.id ? { ...lead, status: formData.status } : lead
      );
      
      setLeadsData(updatedLeads);
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 1000);
  };
  
  // Delete a lead
  const handleDeleteLead = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedLeads = leadsData.filter(lead => lead.id !== currentLead.id);
      setLeadsData(updatedLeads);
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
    }, 1000);
  };

  if (loading) {
    return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading leads...</p>
        </div>
    </div>;
}

if (error) {
    return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-100 rounded-xl p-6 max-w-md">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-2 text-lg font-semibold text-red-800">Error</h2>
            <p className="mt-1 text-red-600">{error}</p>
        </div>
    </div>;
}

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader 
        title="Leads Management" 
        description="Track and manage potential customer inquiries" 
      />

      {/* Filter Bar */}
      <FilterBar>
        <SearchInput
          placeholder="Search leads by name, email, or service..."
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

      {/* Leads Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar initials={lead.name.charAt(0)} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.email}</div>
                    <div className="text-sm text-gray-500">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center space-x-2">
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => openEditModal(lead)}
                        aria-label="Edit status"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => openDeleteModal(lead)}
                        aria-label="Delete lead"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedLeads.length}</span> of <span className="font-medium">{leadsData.length}</span> results
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

      {/* Add Lead Modal */}
      <Modal.Form
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Lead"
        onSubmit={handleAddLead}
        submitText="Add Lead"
        isLoading={isSubmitting}
      >
        <FormInput
          label="Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="bg-white"
        />
        
        <FormInput
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="bg-white"
        />
        
        <FormInput
          label="Phone"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="bg-white"
        />
        
        <FormInput.Select
          label="Service"
          id="service"
          name="service"
          options={serviceOptions}
          value={formData.service}
          onChange={handleInputChange}
          required
          className="bg-white"
        />
        
        <FormInput.Select
          label="Status"
          id="status"
          name="status"
          options={[
            { value: 'New', label: 'New' },
            { value: 'Contacted', label: 'Contacted' },
            { value: 'Qualified', label: 'Qualified' }
          ]}
          value={formData.status}
          onChange={handleInputChange}
          required
          className="bg-white"
        />
      </Modal.Form>

      {/* Edit Lead Modal */}
      <Modal.Form
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Status: ${currentLead?.name}`}
        onSubmit={handleUpdateLead}
        submitText="Update Status"
        isLoading={isSubmitting}
        size="sm"
      >
        <div className="py-4">
          <FormInput.Select
            label="Status"
            id="edit-status"
            name="status"
            options={[
              { value: 'New', label: 'New' },
              { value: 'Contacted', label: 'Contacted' },
              { value: 'Qualified', label: 'Qualified' }
            ]}
            value={formData.status}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
        </div>
      </Modal.Form>

      {/* Delete Confirmation Modal */}
      <Modal.Confirm
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteLead}
        title="Delete Lead"
        message={`Are you sure you want to delete ${currentLead?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Leads;

