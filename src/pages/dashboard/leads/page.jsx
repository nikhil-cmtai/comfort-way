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
import { fetchLeadData, selectLeadData, selectLeadLoading, selectLeadError, addLead, editLead } from '../../../features/slices/leadSlice';
import { fetchUserData, selectUserData } from '../../../features/slices/userSlice';

const Leads = () => {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeadData) || [];
  const users = useSelector(selectUserData) || [];
  const loading = useSelector(selectLeadLoading);
  const error = useSelector(selectLeadError);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    status: 'New',
    notes: '',
    assignee: '',
  });
  const [noteInput, setNoteInput] = useState('');
  const [assignInput, setAssignInput] = useState('');

  useEffect(() => {
    dispatch(fetchLeadData());
    dispatch(fetchUserData());
  }, [dispatch]);

  // Filter leads based on search term and filter status
  const filteredLeads = leads.filter(lead => {
    const name = lead.name || '';
    const email = lead.email || '';
    const service = lead.service || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalLeads = filteredLeads.length;
  const totalPages = Math.ceil(totalLeads / pageSize);
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  useEffect(() => { setCurrentPage(1); }, [searchTerm, filterStatus, leads]);

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

  // Status filter options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' }
  ];


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add Lead Modal
  const openAddModal = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      status: 'New',
      notes: '',
      assignee: '',
    });
    setIsAddModalOpen(true);
  };

  // Edit Lead Modal (status, notes, assignee)
  const openEditModal = (lead) => {
    setCurrentLead(lead);
    setFormData({
      status: lead.status,
      notes: lead.notes || '',
      assignee: lead.assignee || '',
    });
    setIsEditModalOpen(true);
  };

  // Add Note Modal
  const openNoteModal = (lead) => {
    setCurrentLead(lead);
    setNoteInput('');
    setIsNoteModalOpen(true);
  };

  // Assign Modal
  const openAssignModal = (lead) => {
    setCurrentLead(lead);
    setAssignInput(lead.assignee || '');
    setIsAssignModalOpen(true);
  };

  // Add a new lead
  const handleAddLead = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(addLead({ ...formData, notes: formData.notes ? [formData.notes] : [] }));
    setIsSubmitting(false);
    setIsAddModalOpen(false);
  };

  // Update status/notes/assignee
  const handleUpdateLead = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(editLead(currentLead._id || currentLead.id, formData));
    setIsSubmitting(false);
    setIsEditModalOpen(false);
  };

  // Add note to lead
  const handleAddNote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const notes = Array.isArray(currentLead.notes) ? [...currentLead.notes, noteInput] : [noteInput];
    await dispatch(editLead(currentLead._id || currentLead.id, { ...currentLead, notes }));
    setIsSubmitting(false);
    setIsNoteModalOpen(false);
  };

  // Assign lead
  const handleAssign = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(editLead(currentLead._id || currentLead.id, { ...currentLead, assignee: assignInput }));
    setIsSubmitting(false);
    setIsAssignModalOpen(false);
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
        </FilterBar.Group>
      </FilterBar>

      {/* Leads Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedLeads.map((lead) => (
                <tr key={lead._id || lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar initials={(lead.name || '').charAt(0)} />
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ASSIGNEE_OPTIONS.find(a => a.value === lead.assignee)?.label || 'Unassigned'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-gray-700 max-w-xs truncate">
                      {(Array.isArray(lead.notes) ? lead.notes.join('; ') : lead.notes) || ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.date ? new Date(lead.date).toLocaleDateString() : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center space-x-2">
                      <Button variant="primary" size="sm" onClick={() => openEditModal(lead)} aria-label="Edit status">Edit</Button>
                      <Button variant="outline" size="sm" onClick={() => openNoteModal(lead)} aria-label="Add note">Add Note</Button>
                      <Button variant="outline" size="sm" onClick={() => openAssignModal(lead)} aria-label="Assign">Assign</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedLeads.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-10 text-center text-gray-500">No leads found matching your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalLeads > pageSize && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(totalLeads === 0 ? 0 : (currentPage - 1) * pageSize + 1)}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, totalLeads)}</span> of <span className="font-medium">{totalLeads}</span> leads
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
          options={statusOptions.slice(1)}
          value={formData.status}
          onChange={handleInputChange}
          required
          className="bg-white"
        />
        <FormInput.Select
          label="Assignee"
          id="assignee"
          name="assignee"
          options={users.map(user => ({ value: user._id, label: user.name }))}
          value={formData.assignee}
          onChange={handleInputChange}
          className="bg-white"
        />
        <FormInput
          label="Notes"
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="bg-white"
          type="textarea"
        />
      </Modal.Form>

      {/* Edit Lead Modal (status, notes, assignee) */}
      <Modal.Form
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Lead: ${currentLead?.name}`}
        onSubmit={handleUpdateLead}
        submitText="Update Lead"
        isLoading={isSubmitting}
      >
        <FormInput.Select
          label="Status"
          id="edit-status"
          name="status"
          options={statusOptions.slice(1)}
          value={formData.status}
          onChange={handleInputChange}
          required
          className="bg-white"
        />
        <FormInput.Select
          label="Assignee"
          id="edit-assignee"
          name="assignee"
          options={users.map(user => ({ value: user._id, label: user.name }))}
          value={formData.assignee}
          onChange={handleInputChange}
          className="bg-white"
        />
        <FormInput
          label="Notes"
          id="edit-notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="bg-white"
          type="textarea"
        />
      </Modal.Form>

      {/* Add Note Modal */}
      <Modal.Form
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSubmit={handleAddNote}
        title={`Add Note: ${currentLead?.name}`}
        submitText="Add Note"
        isLoading={isSubmitting}
        size="sm"
      >
        <FormInput
          label="Note"
          id="note-input"
          name="note-input"
          value={noteInput}
          onChange={e => setNoteInput(e.target.value)}
          className="bg-white"
          type="textarea"
        />
      </Modal.Form>

      {/* Assign Modal */}
      <Modal.Form
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onSubmit={handleAssign}
        title={`Assign Lead: ${currentLead?.name}`}
        submitText="Assign"
        isLoading={isSubmitting}
        size="sm"
      >
        <FormInput.Select
          label="Assignee"
          id="assign-input"
          name="assign-input"
          options={users.map(user => ({ value: user._id, label: user.name }))}
          value={assignInput}
          onChange={e => setAssignInput(e.target.value)}
          className="bg-white"
        />
      </Modal.Form>
    </div>
  );
};

export default Leads;

