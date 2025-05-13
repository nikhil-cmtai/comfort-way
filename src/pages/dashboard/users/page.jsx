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
import { fetchUserData, selectUserData, selectUserLoading, selectUserError, addUser, editUser, deleteUser } from '../../../features/slices/userSlice';

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUserData);
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
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'NpkR5K3M242WKHPdVTTw',
    status: 'active',
    provider: 'manual',
    createdOn: '',
    updatedOn: '',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // Filter users based on search term and filter status
  const filteredUsers = users.filter(user => {
    const name = user.name || '';
    const email = user.email || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.joinDate) - new Date(a.joinDate);
    } else if (sortBy === 'oldest') {
      return new Date(a.joinDate) - new Date(b.joinDate);
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Pagination logic
  const totalUsers = sortedUsers.length;
  const totalPages = Math.ceil(totalUsers / pageSize);
  const paginatedUsers = sortedUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset to page 1 on filter/sort/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, sortBy, users]);

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
  
  // User type options for the form
  const userTypeOptions = [
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
      password: '',
      phone: '',
      address: '',
      role: 'NpkR5K3M242WKHPdVTTw',
      status: 'active',
      provider: 'manual',
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
    });
    setIsAddModalOpen(true);
  };
  
  // Open edit modal and set current user data
  const openEditModal = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      phone: user.phone,
      address: user.address,
      role: user.role || 'NpkR5K3M242WKHPdVTTw',
      status: user.status || 'active',
      provider: user.provider || 'manual',
      createdOn: user.createdOn || user.createdAt || '',
      updatedOn: new Date().toISOString(),
    });
    setIsEditModalOpen(true);
  };
  
  // Open delete modal
  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };
  
  // Add a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(addUser(formData));
    setIsSubmitting(false);
    setIsAddModalOpen(false);
  };
  
  // Update an existing user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { password, ...rest } = formData;
    await dispatch(editUser(currentUser._id || currentUser.id, rest));
    setIsSubmitting(false);
    setIsEditModalOpen(false);
  };
  
  // Delete a user
  const handleDeleteUser = async () => {
    setIsSubmitting(true);
    await dispatch(deleteUser(currentUser._id || currentUser.id));
    setIsSubmitting(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader 
        title="Users Management" 
        description="Manage your user database and information"
        actions={
          <Button 
            variant="primary" 
            onClick={openAddModal}
          >
            Add User
          </Button>
        }
      />

      {/* Filter Bar */}
      <FilterBar>
        <SearchInput
          placeholder="Search users by name, email, or address..."
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

      {/* Users Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
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
              {paginatedUsers.map((user) => (
                <tr key={user._id || user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar initials={user.name.charAt(0)} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.address || '-----'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      status={user.status} 
                      type="default"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center space-x-2">
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => openEditModal(user)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => openDeleteModal(user)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                    No users found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalUsers > pageSize && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(totalUsers === 0 ? 0 : (currentPage - 1) * pageSize + 1)}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, totalUsers)}</span> of <span className="font-medium">{totalUsers}</span> users
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

      {/* Add User Modal */}
      <Modal.Form
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
        title="Add New User"
        submitText="Add User"
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

      {/* Edit User Modal */}
      <Modal.Form
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateUser}
        title={`Edit User: ${currentUser?.name}`}
        submitText="Update User"
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
        onConfirm={handleDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete ${currentUser?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default UsersPage;

    